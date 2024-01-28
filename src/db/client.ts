import { Database } from "@/db/types";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient<Database>(
  process.env.DB_URL!,
  process.env.DB_KEY!
);
