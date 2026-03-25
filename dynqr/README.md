# DynQR (Free Version)

DynQR is a separate free service app for dynamic QR code management.

## Included in this MVP

- Dynamic QR code create, edit, delete
- Redirect route with active or inactive toggle
- Scan counter + last scanned timestamp
- Dashboard stats + analytics list
- PNG and SVG QR download API
- Share link copy
- Auth pages (demo UI flow)

## Run locally

1. `cd dynqr`
2. `npm install`
3. `npm run dev`
4. Open `http://localhost:3000`

## Build

- `npm run build`

## Notes

- This app is intentionally separate from your portfolio app.
- Current storage uses in-memory mock DB (`src/lib/db/mock-db.ts`).
- For production persistence and real auth, connect Supabase and migrate DB/auth handlers.
