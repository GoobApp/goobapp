import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.PROD
  ? "https://wfdcqaqihwsilzegcknq.supabase.co"
  : "http://127.0.0.1:54321";
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_KEY as string;

export const Client = supabasePublishableKey
  ? createClient(supabaseUrl, supabasePublishableKey)
  : null;
