import { createClient } from "@supabase/supabase-js";

// connect to db
export const supabase = createClient(
    "https://bgbdukcubxnelarwjoyl.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJnYmR1a2N1YnhuZWxhcndqb3lsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg5MTAxMTUsImV4cCI6MjAyNDQ4NjExNX0.R3EIwQQr6yQYpRiOlOZ2NI_hc9tJBfpoJb08yzx9usY"
);
