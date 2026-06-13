# Robokart

Production-ready MVP ecommerce website for Robokart, a Bangladesh-based robotics and electronics component platform with manual project mentoring through WhatsApp.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase JS client
- LocalStorage cart persistence
- Vercel-ready environment variables

## Environment variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_WHATSAPP_NUMBER=8801000000000
NEXT_PUBLIC_FACEBOOK_URL=https://facebook.com/robokart
NEXT_PUBLIC_PHONE_NUMBER=+880 1000-000000
```

## Supabase setup

Run `supabase/schema.sql` in the Supabase SQL editor. It creates `categories`, `products`, `orders`, and `order_items` with RLS policies that allow public reads for active categories/products and public inserts for orders/order items only.

### Admin authentication

Admin login uses Supabase Auth email/password accounts. The app does not include, seed, or hardcode any admin email or password. Create admin users in Supabase Auth, then mark only those users with admin app metadata so the RLS policies and admin UI can authorize them:

```json
{ "role": "admin" }
```

Set that metadata from the Supabase dashboard or a secure server-side/admin script that uses the service role key. Never expose the service role key or admin passwords in client code, committed files, or `NEXT_PUBLIC_*` environment variables.

## Development

```bash
npm install
npm run dev
```

## Deployment

Push to GitHub, import the repository into Vercel, and add the environment variables above in the Vercel project settings.
