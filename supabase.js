const SUPABASE_URL = "https://tzmcofiuqeanfvtviquwp.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInN1YiI6InN1cGVyYWRtaW4iLCJpYXQiOjE2ODAwMDAwMDAsImV4cCI6MjAwMDAwMDAwMH0.wJ8U5kbHuN7CPfTfD4-YpW_LkEsnM3BsQ6TRjRU0GrU";

const supabase = window.supabase
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY)
  : supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
