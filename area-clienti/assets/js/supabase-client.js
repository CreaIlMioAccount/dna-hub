import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const supabaseUrl = "https://xxqfbgwkwopffzdztljs.supabase.co/";// <-- Togli /rest/v1/ e la barra finale
const supabaseKey = "sb_publishable_Fa6DQbBzK0Imej5c6fmjMg_cq36AXhn";

export const supabase = createClient(supabaseUrl, supabaseKey);
window.GEMINI_API_KEY = "AIzaSyATupklOqYbo93GZCM29dg7Tx22Tl7qgCQ";