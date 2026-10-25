import { supabase } from "./supabase-client.js";

// Piccolo ritardo per assicurarci che il browser abbia inizializzato Supabase
setTimeout(async () => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    // Se c'è un errore o non c'è sessione, manda al login
    if (error || !session) {
      const currentPath = window.location.pathname;
      const isInPagesFolder = currentPath.includes('/pages/');
      
      // Se siamo già nella pagina di login, non fare nulla (evita loop)
      if (!currentPath.includes('login.html')) {
        window.location.href = isInPagesFolder ? '../login.html' : 'login.html';
      }
    }
  } catch (err) {
    console.error("Errore durante il controllo di autenticazione:", err);
  }
}, 100);