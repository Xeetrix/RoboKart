create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  image_url text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.categories add column if not exists sort_order integer not null default 0;

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.categories(id) on delete set null,
  name text not null,
  slug text unique not null,
  short_description text,
  description text,
  price numeric(12, 2) not null check (price >= 0),
  image_url text,
  stock_status text not null default 'in_stock' check (stock_status in ('in_stock', 'low_stock', 'out_of_stock')),
  is_featured boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  phone text not null,
  delivery_address text,
  payment_method text not null check (payment_method in ('COD', 'bKash')),
  notes text,
  total_amount numeric(12, 2) not null check (total_amount >= 0),
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at timestamptz not null default now()
);

alter table public.orders drop constraint if exists orders_status_check;
alter table public.orders add constraint orders_status_check check (status in ('pending', 'confirmed', 'cancelled', 'completed'));

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid not null references public.products(id),
  product_name text not null,
  quantity integer not null check (quantity > 0),
  unit_price numeric(12, 2) not null check (unit_price >= 0),
  line_total numeric(12, 2) not null check (line_total >= 0),
  created_at timestamptz not null default now()
);

alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

drop policy if exists "Public can read active categories" on public.categories;
drop policy if exists "Public can read active products" on public.products;
drop policy if exists "Public can insert orders" on public.orders;
drop policy if exists "Public can insert order items" on public.order_items;
drop policy if exists "Authenticated admins can read all categories" on public.categories;
drop policy if exists "Authenticated admins can create categories" on public.categories;
drop policy if exists "Authenticated admins can update categories" on public.categories;
drop policy if exists "Authenticated admins can delete categories" on public.categories;
drop policy if exists "Authenticated admins can read all products" on public.products;
drop policy if exists "Authenticated admins can create products" on public.products;
drop policy if exists "Authenticated admins can update products" on public.products;
drop policy if exists "Authenticated admins can delete products" on public.products;
drop policy if exists "Authenticated admins can read all orders" on public.orders;
drop policy if exists "Authenticated admins can update order status" on public.orders;
drop policy if exists "Authenticated admins can read order items" on public.order_items;

create policy "Public can read active categories" on public.categories for select using (is_active = true);
create policy "Public can read active products" on public.products for select using (is_active = true);
create policy "Public can insert orders" on public.orders for insert with check (true);
create policy "Public can insert order items" on public.order_items for insert with check (true);

create policy "Authenticated admins can read all categories" on public.categories for select to authenticated using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
create policy "Authenticated admins can create categories" on public.categories for insert to authenticated with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
create policy "Authenticated admins can update categories" on public.categories for update to authenticated using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin') with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
create policy "Authenticated admins can delete categories" on public.categories for delete to authenticated using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "Authenticated admins can read all products" on public.products for select to authenticated using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
create policy "Authenticated admins can create products" on public.products for insert to authenticated with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
create policy "Authenticated admins can update products" on public.products for update to authenticated using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin') with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
create policy "Authenticated admins can delete products" on public.products for delete to authenticated using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

create policy "Authenticated admins can read all orders" on public.orders for select to authenticated using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
create policy "Authenticated admins can update order status" on public.orders for update to authenticated using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin') with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin' and status in ('pending', 'confirmed', 'cancelled', 'completed'));

create policy "Authenticated admins can read order items" on public.order_items for select to authenticated using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
