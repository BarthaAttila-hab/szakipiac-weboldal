const SUPABASE_URL = "https://tzmcofiuqeanfvtviquwp.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6bWNvZml1cWVhbmZ0dmlxdXdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc0ODA4MDAsImV4cCI6IjI4MTM0ODA0MDAsInN1YiI6IjEifQ.aKZdnV9K8LuU19NBG4KkQ4niB5JtDthQz2-hjPYVYwU";
const supabase = window.supabase
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY)
  : supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
