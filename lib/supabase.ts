import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://psdaycsuawyoqtppbgec.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBzZGF5Y3N1YXd5b3F0cHBiZ2VjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg2NDY0MjAsImV4cCI6MjA5NDIyMjQyMH0.DQ-vJh12vBz0gS-zOzPNzF43Hpze_9csTahGYsQEmQE'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
