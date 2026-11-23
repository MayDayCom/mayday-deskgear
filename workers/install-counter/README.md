# Deskgear USB installation counter

Use a separate Cloudflare D1 database `mayday-deskgear-install-counter` (not the OBI database). Apply `migrations/0001_init.sql` and deploy `index.mjs` as the Worker `mayday-deskgear-install-counter`, binding the database as `INSTALL_COUNTS`. Configure a rate limit binding `INSTALL_RATE_LIMIT` of 12 requests per minute per key. The expected public endpoint is `https://mayday-deskgear-install-counter.cgibank0.workers.dev/install-count`.

The counter includes reports from successful USB OTA and factory installations only; download, preview, and failed installations are not included. Event IDs are random and retries are idempotent. The number is an approximate count of successful browser reports, not unique devices.

Deployed on 2026-11-24 (Korea time). The checked-in `wrangler.jsonc` binds only the Deskgear database; never substitute the OBI database.
