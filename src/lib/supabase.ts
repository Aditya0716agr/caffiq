import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface WaitlistSignup {
  id: number
  email: string
  name?: string
  created_at: string
}

export interface Comment {
  id: number
  name?: string
  email: string
  subject?: string
  comment: string
  created_at: string
}
