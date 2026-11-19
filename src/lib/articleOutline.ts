import type { ClinicArticle } from '@/payload-types'

type TextNode = { text?: string; children?: TextNode[] }

export function articleText(node: TextNode): string {
  return node.text || node.children?.map(articleText).join(' ') || ''
}

export function articleSections(content: ClinicArticle['content']) {
  const sections: { id: string; title?: string; content: ClinicArticle['content'] }[] = []
  let heading = 0
  for (const node of content.root.children) {
    if (node.type === 'heading' || !sections.length) {
      const title = node.type === 'heading' ? articleText(node as TextNode) : undefined
      sections.push({
        id: title ? `article-section-${++heading}` : 'article-introduction',
        title,
        content: { root: { ...content.root, children: [] } },
      })
    }
    sections.at(-1)!.content.root.children.push(node)
  }
  return sections
}
