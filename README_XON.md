# XON HOSPITAL

Многоязычный сайт клиники на Next.js, TypeScript, Payload CMS и PostgreSQL.

## Что уже работает

- языки: русский, узбекский, английский, казахский, таджикский;
- адаптивная главная с фирменной анимацией;
- CMS `/admin` для главной страницы, палитры, врачей, направлений, цен, страниц, медиа и SEO;
- заявки с валидацией, согласием, UTM-метками и статусами CRM;
- синхронизация заявок с Google Sheets через webhook;
- production Dockerfile и PostgreSQL-конфигурация.

## Локальный запуск

Требования: Node.js 22.23.4+ и pnpm 11.

```bash
pnpm install
pnpm dev
```

Откройте:

- сайт: `http://localhost:3000/ru`
- админка: `http://localhost:3000/admin`

Локально используется SQLite. В production задайте PostgreSQL через `DATABASE_URL`.

## Проверки

```bash
pnpm lint
pnpm build
```

## Документация

- [Развёртывание](docs/DEPLOYMENT.md)
- [Google Sheets](docs/GOOGLE_SHEETS.md)
