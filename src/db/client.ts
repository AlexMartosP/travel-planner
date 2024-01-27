import { Database } from "@/db/type";
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient<Database>(
  process.env.DB_URL!,
  process.env.DB_KEY!
);
