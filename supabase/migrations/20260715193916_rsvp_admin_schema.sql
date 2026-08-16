create extension if not exists pgcrypto;

create table if not exists public.event_settings (
  event_slug text primary key,
  rsvp_open boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  event_slug text not null,
  full_name text not null,
  email text not null,
  phone text not null,
  social_handle text not null,
  email_status text not null default 'pending' check (email_status in ('pending', 'sending', 'sent', 'failed')),
  email_sent_at timestamptz,
  email_error text,
  created_at timestamptz not null default now(),
  unique (event_slug, email)
);

create table if not exists public.ticket_orders (
  reference text primary key,
  event_slug text not null,
  event_title text not null,
  buyer_name text not null,
  buyer_email text not null,
  buyer_phone text not null default '',
  quantity integer not null check (quantity > 0),
  amount integer not null check (amount >= 0),
  currency text not null default 'NGN',
  tier_name text not null,
  ticket_code text not null,
  email_status text not null default 'pending' check (email_status in ('pending', 'sending', 'sent', 'failed')),
  email_sent_at timestamptz,
  email_error text,
  created_at timestamptz not null default now()
);

alter table public.event_settings enable row level security;
alter table public.rsvps enable row level security;
alter table public.ticket_orders enable row level security;

insert into public.event_settings (event_slug, rsvp_open)
values ('abuja-homecoming', true)
on conflict (event_slug) do nothing;
