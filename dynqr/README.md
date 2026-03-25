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
- Supabase DB support with mock fallback

## Run locally

1. `cd dynqr`
2. `npm install`
3. Create `.env.local` with:
   - `NEXT_PUBLIC_SUPABASE_URL=...`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY=...`
4. Run SQL from `supabase/schema.sql` in Supabase SQL Editor
5. `npm run dev`
6. Open `http://localhost:3000`

## Build

- `npm run build`

## Notes

- This app is intentionally separate from your portfolio app.
- If Supabase config/table is missing, app automatically falls back to in-memory mock DB.
