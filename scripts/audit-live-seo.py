"""Read-only sitemap/HTML audit. Run with Python 3; uses only the standard library."""
import argparse
import datetime
import concurrent.futures
import collections
import json
import time
import urllib.request
import urllib.error
import xml.etree.ElementTree as ET
from html.parser import HTMLParser

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--output', default='/tmp/xon-live-seo-audit.json')
args = parser.parse_args()
ORIGIN = 'https://xon-hospital.uz'
NS = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9'}

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.title = ''
        self.in_title = False
        self.h1 = 0
        self.lang = None
        self.canonical = []
        self.alternates = []
        self.meta = {}
        self.script = False
        self.buffer = ''
        self.schemas = []
        self.schema_errors = []

    def handle_starttag(self, tag, attributes):
        a = dict(attributes)
        if tag == 'html': self.lang = a.get('lang')
        if tag == 'title': self.in_title = True
        if tag == 'h1': self.h1 += 1
        if tag == 'meta': self.meta[a.get('name') or a.get('property')] = a.get('content', '')
        if tag == 'link' and a.get('rel') == 'canonical': self.canonical.append(a.get('href'))
        if tag == 'link' and a.get('rel') == 'alternate' and a.get('hreflang'): self.alternates.append(a)
        if tag == 'script' and a.get('type') == 'application/ld+json': self.script = True; self.buffer = ''

    def handle_data(self, data):
        if self.in_title: self.title += data
        if self.script: self.buffer += data

    def handle_endtag(self, tag):
        if tag == 'title': self.in_title = False
        if tag == 'script' and self.script:
            try: self.schemas.append(json.loads(self.buffer))
            except ValueError as error: self.schema_errors.append(str(error))
            self.script = False

with urllib.request.urlopen(ORIGIN + '/sitemap.xml', timeout=40) as response:
    root = ET.fromstring(response.read())
urls = [entry.find('s:loc', NS).text for entry in root]
url_set = set(urls)

def inspect(url):
    result = {'url': url, 'issues': []}
    start = time.monotonic()
    try:
        with urllib.request.urlopen(url, timeout=40) as response:
            html = response.read().decode('utf-8')
            result['status'] = response.status
            result['finalURL'] = response.url
            result['xRobotsTag'] = response.headers.get('X-Robots-Tag', '')
        page = Page(); page.feed(html)
        result.update(title=page.title, description=page.meta.get('description'),
                      language=page.lang, h1=page.h1, canonical=page.canonical,
                      robots=page.meta.get('robots'),
                      schemaTypes=[schema.get('@type', '@graph') for schema in page.schemas])
        expected_locale = url.split('/')[3]
        if result['finalURL'] != url: result['issues'].append('URL redirected')
        if not page.title: result['issues'].append('Missing title')
        if not page.meta.get('description'): result['issues'].append('Missing description')
        if page.canonical != [url]: result['issues'].append('Canonical does not match sitemap URL')
        if page.h1 != 1: result['issues'].append('Expected one h1')
        if page.lang != expected_locale: result['issues'].append('Incorrect html language')
        if 'noindex' in (page.meta.get('robots', '') + result['xRobotsTag']).lower(): result['issues'].append('Sitemap URL marked noindex')
        if page.schema_errors: result['issues'].append('Invalid JSON-LD')
        for alternate in page.alternates:
            if alternate.get('href') not in url_set: result['issues'].append('Alternate absent from sitemap: ' + str(alternate.get('href')))
    except Exception as error:
        result['issues'].append(str(error))
    result['requestSeconds'] = round(time.monotonic() - start, 3)
    return result

with concurrent.futures.ThreadPoolExecutor(max_workers=3) as executor:
    results = list(executor.map(inspect, urls))

issues = [result for result in results if result['issues']]
titles = collections.defaultdict(list)
for result in results:
    if result.get('title'): titles[result['title']].append(result['url'])
duplicates = {title: pages for title, pages in titles.items() if len(pages) > 1}
report = {'date': datetime.date.today().isoformat(), 'sitemapURLs': len(urls), 'uniqueURLs': len(url_set),
          'pagesWithIssues': len(issues), 'duplicateTitles': duplicates,
          'results': results}
with open(args.output, 'w') as file:
    json.dump(report, file, ensure_ascii=False, indent=2)
print(json.dumps({key: value for key, value in report.items() if key != 'results'}, ensure_ascii=False))
for result in issues: print(json.dumps(result, ensure_ascii=False))

raise SystemExit(1 if issues or not urls or len(urls) != len(url_set) else 0)
