# Supabase Setup for Caffiq

This guide will help you set up Supabase as the backend for the Caffiq website.

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click "New Project"
4. Choose your organization
5. Enter project details:
   - Name: `caffiq`
   - Database Password: (choose a strong password)
   - Region: (choose closest to your users)
6. Click "Create new project"

## 2. Get Your Project Credentials

1. In your Supabase dashboard, go to Settings > API
2. Copy the following values:
   - Project URL
   - Anon public key

## 3. Set Up Environment Variables

Create a `.env.local` file in your project root with:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 4. Create Database Tables

1. In your Supabase dashboard, go to SQL Editor
2. Copy and paste the contents of `supabase-schema.sql`
3. Click "Run" to create the tables

## 5. Verify Setup

1. Go to Table Editor in your Supabase dashboard
2. You should see two tables:
   - `waitlist_signups`
   - `comments`

## 6. Test the API

1. Start your development server: `npm run dev`
2. Try submitting the waitlist form
3. Check the `waitlist_signups` table in Supabase to see if data is being stored

## Database Schema

### waitlist_signups
- `id` (BIGSERIAL PRIMARY KEY)
- `email` (TEXT NOT NULL UNIQUE)
- `name` (TEXT, optional)
- `created_at` (TIMESTAMPTZ DEFAULT NOW())

### comments
- `id` (BIGSERIAL PRIMARY KEY)
- `name` (TEXT, optional)
- `email` (TEXT NOT NULL)
- `subject` (TEXT, optional)
- `comment` (TEXT NOT NULL)
- `created_at` (TIMESTAMPTZ DEFAULT NOW())

## Security

The current setup allows public access to insert and read data. For production, consider:

1. Adding authentication
2. Implementing more restrictive RLS policies
3. Adding rate limiting
4. Setting up proper user roles

## Troubleshooting

- Make sure your environment variables are correctly set
- Check the Supabase logs for any errors
- Verify that the tables were created successfully
- Ensure RLS policies are set up correctly
