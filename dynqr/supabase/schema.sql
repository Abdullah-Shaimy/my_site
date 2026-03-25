create extension if not exists "pgcrypto";

create table if not exists public.qr_codes (
  id uuid primary key default gen_random_uuid(),
  short_id text not null unique,
  name text not null,
  destination_url text not null,
  active boolean not null default true,
  scans integer not null default 0,
  last_scanned_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  user_id text not null default 'demo-user'
);

create index if not exists qr_codes_user_id_idx on public.qr_codes(user_id);
create index if not exists qr_codes_short_id_idx on public.qr_codes(short_id);

alter table public.qr_codes enable row level security;

drop policy if exists "anon_manage_qr_codes" on public.qr_codes;
create policy "anon_manage_qr_codes"
  on public.qr_codes
  for all
  to anon
  using (true)
  with check (true);

drop policy if exists "authenticated_manage_qr_codes" on public.qr_codes;
create policy "authenticated_manage_qr_codes"
  on public.qr_codes
  for all
  to authenticated
  using (true)
  with check (true);
