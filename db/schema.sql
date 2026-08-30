-- The Matcha Company — order capture schema.
-- Run once against your database:  psql "$DATABASE_URL" -f db/schema.sql

create table if not exists orders (
  id             bigserial primary key,
  reference      text        not null unique,
  customer_name  text        not null,
  email          text        not null,
  phone          text,
  address        text        not null,
  city           text        not null,
  postcode       text        not null,
  notes          text,
  item_count     integer     not null check (item_count > 0),
  status         text        not null default 'pending'
                 check (status in ('pending', 'confirmed', 'shipped', 'cancelled')),
  created_at     timestamptz not null default now()
);

create index if not exists orders_created_at_idx on orders (created_at desc);
create index if not exists orders_email_idx      on orders (lower(email));

-- One row per line. product_id is the catalog id; name and kind are copied in
-- at order time so a later catalog edit never rewrites the historical record of
-- what somebody actually ordered.
create table if not exists order_items (
  id         bigserial primary key,
  order_id   bigint  not null references orders (id) on delete cascade,
  product_id text    not null,
  name       text    not null,
  kind       text    not null,
  qty        integer not null check (qty > 0)
);

create index if not exists order_items_order_id_idx on order_items (order_id);

create table if not exists subscribers (
  id              bigserial primary key,
  email           text        not null,
  created_at      timestamptz not null default now(),
  unsubscribed_at timestamptz
);

-- Case-insensitive uniqueness: Alex@x.com and alex@x.com are one person.
create unique index if not exists subscribers_email_key on subscribers (lower(email));

-- Per-IP throttle. A plain in-memory counter is useless here because every
-- serverless invocation may be a fresh process, so the counter has to live
-- somewhere shared.
create table if not exists rate_limit (
  bucket       text        not null,
  window_start timestamptz not null,
  count        integer     not null default 1,
  primary key (bucket, window_start)
);

create index if not exists rate_limit_window_idx on rate_limit (window_start);
