// =========================================
// DNA HUB - CONFIGURAZIONE SUPABASE
// =========================================

// Sostituisci questi valori con quelli del tuo progetto Supabase!
const SUPABASE_URL = 'https://TUA_URL_SUPABASE.supabase.co';
const SUPABASE_ANON_KEY = 'TUA_ANON_KEY_SUPABASE';

// Inizializzazione del client Supabase (usa la variabile globale 'supabase' importata da CDN)
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Rendi il client disponibile globalmente per tutti gli altri script
window.db = supabaseClient;

console.log("Supabase client inizializzato correttamente.");