import { supabase } from "./supabase-client.js";

async function checkAuth() {
  const { data: { session } } = await supabase.auth.getSession();
  
  // Se non c'è una sessione attiva, reindirizza al login
  if (!session) {
    const currentPath = window.location.pathname;
    // Se siamo nella cartella pages, dobbiamo tornare indietro di un livello
    const isInPagesFolder = currentPath.includes('/pages/');
    window.location.href = isInPagesFolder ? '../login.html' : 'login.html';
  }
}

checkAuth();