# Заявки → Google Sheets

Сайт всегда сначала сохраняет заявку в разделе **CRM → Заявки**. Отправка в Google Sheets выполняется дополнительно и не может потерять лид при временной ошибке Google.

## 1. Создайте таблицу

Создайте Google Sheet и назовите первый лист `Leads`. В первой строке можно добавить заголовки:

`Дата | ID | Имя | Телефон | Способ связи | Направление | Язык | Источник | UTM Source | UTM Campaign`

## 2. Добавьте Apps Script

В таблице откройте **Расширения → Apps Script** и вставьте:

```javascript
function doPost(e) {
  const expected = PropertiesService.getScriptProperties().getProperty('WEBHOOK_TOKEN')
  if (!expected || e.parameter.token !== expected) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false }))
      .setMimeType(ContentService.MimeType.JSON)
  }

  const data = JSON.parse(e.postData.contents)
  const sheet = SpreadsheetApp.getActive().getSheetByName('Leads')
  sheet.appendRow([
    data.createdAt,
    data.id,
    data.name,
    data.phone,
    data.preferredContact,
    data.service,
    data.locale,
    data.source,
    data.utmSource,
    data.utmCampaign,
  ])

  return ContentService.createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON)
}
```

В **Настройки проекта → Свойства скрипта** добавьте `WEBHOOK_TOKEN` со случайной длинной строкой.

## 3. Опубликуйте webhook

Нажмите **Deploy → New deployment → Web app**:

- Execute as: **Me**
- Who has access: **Anyone**

Скопируйте URL и добавьте к нему токен:

```env
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/ВАШ_ID/exec?token=ВАШ_СЕКРЕТ
```

Перезапустите сайт. Новые заявки будут отмечаться в админке как `Синхронизировано`; при ошибке — `Ошибка`, при этом сама заявка останется в CMS.

## Telegram

На следующем этапе бот может читать новые строки таблицы или получать событие напрямую с сайта. Для надёжности лучше отправлять Telegram-уведомление после сохранения лида в CMS и хранить статус доставки отдельно.
