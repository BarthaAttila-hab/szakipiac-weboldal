// Itt add meg a saját Supabase projekted URL-jét és public kulcsát!
const SUPABASE_URL = https://eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiO.supabase.com
const SUPABASE_KEY = ;

const supabase = window.supabase
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY)
  : supabase.createClient(SUPABASE_URL, SUPABASE_eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR6bWNvZml1cWVhbmZ0dmlxdXdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1ODAzMjYsImV4cCI6MjA2NjE1NjMyNn0.oxD20AplWIl7p6znO0GoVxDWX7aeD_8fhFRmooS2xm4KEY);

