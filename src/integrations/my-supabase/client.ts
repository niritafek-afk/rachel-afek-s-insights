// Custom Supabase client pointing to the user's own Supabase project.
// This is intentionally separate from src/integrations/supabase/client.ts
// (which is auto-managed by Lovable Cloud and should not be edited).

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_MY_SUPABASE_URL || "https://veqceqhzpmynmvloobbn.supabase.co";
const SUPABASE_ANON_KEY =
  import.meta.env.VITE_MY_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZlcWNlcWh6cG15bm12bG9vYmJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3MTI0NDUsImV4cCI6MjA5NTI4ODQ0NX0.-S9zmxp--lhn23QNQM5LGjtNfWNwUXtdGjG74DnEaKo";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storageKey: "my-supabase-auth",
  },
});
