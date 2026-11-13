# XON HOSPITAL

Многоязычный многостраничный сайт клиники с полноценной CMS, лид-формами и подготовкой к production-развёртыванию.

Разработка сайта: [PLOV AGENCY](https://plovagency.uz/)

## Возможности

- пять языков: русский, узбекский, английский, казахский и таджикский;
- главная, врачи, направления, цены, о клинике, контакты и детальные профили;
- Payload CMS на `/admin` для врачей, услуг, цен, страниц, медиа, SEO и заявок;
- заявки с серверной валидацией, UTM-метками и синхронизацией с Google Sheets;
- адаптивный дизайн, анимации, reduced motion, sitemap и Open Graph;
- SQLite для локальной разработки и PostgreSQL для production;
- Dockerfile и `docker-compose.yml`.

## Стек

Next.js 16, React 19, TypeScript, Payload CMS 3, SQLite/PostgreSQL, pnpm.

## Локальный запуск

Требования: Node.js 22.23.4+ и pnpm 9–11.

```bash
cp .env.example .env
pnpm install
pnpm seed:clinic
pnpm dev
```

Откройте:

- сайт: `http://localhost:3000/ru`
- CMS: `http://localhost:3000/admin`

Перед запуском замените тестовые секреты в `.env`. Сам `.env`, локальная база и загруженные через CMS файлы в Git не попадают.

## Проверка и production

```bash
pnpm lint
pnpm build
pnpm start
```

Для публичной версии нужен Node.js-хостинг и PostgreSQL. GitHub Pages не подходит, так как CMS и заявки работают на сервере.

## Документация

- [Развёртывание](docs/DEPLOYMENT.md)
- [Google Sheets](docs/GOOGLE_SHEETS.md)

## Лицензия и контент

Исходный код и брендовые материалы предназначены для XON HOSPITAL. Медицинские тексты требуют финального согласования с клиникой перед публикацией.
