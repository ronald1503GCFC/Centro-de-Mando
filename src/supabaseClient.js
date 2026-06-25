import { createClient } from "@supabase/supabase-js";

// Datos de TU proyecto Supabase (la publishable key es segura de incluir aquí).
const SUPABASE_URL = "https://yeudwnberojdeilhurny.supabase.co";
const SUPABASE_KEY = "sb_publishable_9WsfdYb12lmJqLhivHL1Ig_XAc_qiHI";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
