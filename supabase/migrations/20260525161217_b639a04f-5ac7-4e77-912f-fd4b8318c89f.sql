
create table public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null default '',
  body text not null default '',
  category text not null,
  date date not null default current_date,
  tags text[] not null default '{}',
  image text,
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.posts enable row level security;

create policy "posts are readable by everyone"
  on public.posts for select
  using (true);

create policy "authenticated users can insert posts"
  on public.posts for insert
  to authenticated
  with check (true);

create policy "authenticated users can update posts"
  on public.posts for update
  to authenticated
  using (true) with check (true);

create policy "authenticated users can delete posts"
  on public.posts for delete
  to authenticated
  using (true);

create index posts_date_idx on public.posts (date desc);
create index posts_category_idx on public.posts (category);
