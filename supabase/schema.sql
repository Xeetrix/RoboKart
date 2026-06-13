create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  image_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

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
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

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

create policy "Public can read active categories" on public.categories for select using (is_active = true);
create policy "Public can read active products" on public.products for select using (is_active = true);
create policy "Public can insert orders" on public.orders for insert with check (true);
create policy "Public can insert order items" on public.order_items for insert with check (true);
