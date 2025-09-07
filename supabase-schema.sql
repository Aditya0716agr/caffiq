-- Supabase Database Schema for Caffiq
-- Run this in your Supabase SQL Editor

-- Create waitlist_signups table
CREATE TABLE IF NOT EXISTS waitlist_signups (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
  id BIGSERIAL PRIMARY KEY,
  name TEXT,
  email TEXT NOT NULL,
  subject TEXT,
  comment TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_waitlist_signups_email ON waitlist_signups(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_signups_created_at ON waitlist_signups(created_at);
CREATE INDEX IF NOT EXISTS idx_comments_email ON comments(email);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE waitlist_signups ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (adjust as needed for your security requirements)
-- Allow anyone to insert into waitlist_signups
CREATE POLICY "Allow public insert on waitlist_signups" ON waitlist_signups
  FOR INSERT WITH CHECK (true);

-- Allow anyone to read waitlist_signups count
CREATE POLICY "Allow public read count on waitlist_signups" ON waitlist_signups
  FOR SELECT USING (true);

-- Allow anyone to insert into comments
CREATE POLICY "Allow public insert on comments" ON comments
  FOR INSERT WITH CHECK (true);

-- Allow anyone to read comments
CREATE POLICY "Allow public read on comments" ON comments
  FOR SELECT USING (true);
