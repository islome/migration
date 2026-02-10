import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// TypeScript uchun database type
export type Database = {
  public: {
    Tables: {
      registrations: {
        Row: {
          id: string
          number: string
          full_name: string
          intention: string
          created_at: string
        }
        Insert: {
          id?: string
          number: string
          full_name: string
          intention: string
          created_at?: string
        }
        Update: {
          id?: string
          number?: string
          full_name?: string
          intention?: string
          created_at?: string
        }
      }
    }
  }
}