create table if not exists products(
id uuid default gen_random_uuid() primary key,
name text,
category text,
price numeric,
image_url text,
description text,
active boolean default true
);

create table if not exists orders(
id uuid default gen_random_uuid() primary key,
customer_name text,
contact text,
telegram text,
payment_method text,
payment_screenshot text,
items jsonb,
total_amount numeric,
status text default 'pending'
);

create table if not exists settings(
id uuid default gen_random_uuid() primary key,
store_name text,
telegram text,
kbz text,
wave text
);
