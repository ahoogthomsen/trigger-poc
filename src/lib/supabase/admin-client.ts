import "server-only";

import { createClient } from "@supabase/supabase-js";

// Create an admin client with the service role key
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!, // Note: This is different from the anon key
  {
    auth: {
      persistSession: false, // Recommended for server-side operations
      autoRefreshToken: false,
    },
  }
);
