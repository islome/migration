import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ojhqnvlgqlxyiipzzneq.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qaHFudmxncWx4eWlpcHp6bmVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3NDE0MjEsImV4cCI6MjA4NjMxNzQyMX0.Qgjr5zfCp5DHjBgg8vbFvvUzMyY9GG20keuLMpJ4lDY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// TypeScript uchun database type
export type Database = {
  public: {
    Tables: {
      users: {
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