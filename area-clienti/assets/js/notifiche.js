import { supabase } from "./supabase-client.js";

export async function initNotifiche() {
  const btnNotifiche = document.getElementById('btnNotifiche');
  const pannelloNotifiche = document.getElementById('pannelloNotifiche');
  const listaNotifiche = document.getElementById('listaNotifiche');
  const badgeNotifiche = document.getElementById('badgeNotifiche');

  if (!btnNotifiche) return; // Se la pagina non ha la campanella, non fare nulla

  // Carica i ticket aperti
  const { data: tickets } = await supabase
    .from('tickets')
    .select('*')
    .eq('stato', 'Aperto')
    .order('created_at', { ascending: false })
    .limit(5);

  if (tickets && tickets.length > 0) {
    badgeNotifiche.textContent = tickets.length;
    badgeNotifiche.style.display = 'flex';
    
    // Calcola il percorso corretto per andare alla pagina ticket
    const isInPages = window.location.pathname.includes('/pages/');
    const ticketPath = isInPages ? 'ticket.html' : 'pages/ticket.html';

    listaNotifiche.innerHTML = tickets.map(t => `
      <div style="padding:var(--space-3) var(--space-4); border-bottom:1px solid var(--color-border); cursor:pointer; transition: background 0.2s;" 
           onmouseover="this.style.background='var(--color-surface-hover)'" 
           onmouseout="this.style.background='transparent'" 
           onclick="window.location.href='${ticketPath}'">
        <div style="font-size:var(--text-sm); font-weight:var(--weight-medium);">${t.oggetto}</div>
        <div style="font-size:var(--text-xs); color:var(--color-text-secondary); margin-top:2px;">Stato: ${t.stato} · ${new Date(t.created_at).toLocaleDateString('it-IT')}</div>
      </div>
    `).join('');
  } else {
    badgeNotifiche.style.display = 'none';
    listaNotifiche.innerHTML = '<div style="padding:var(--space-4); text-align:center; color:var(--color-text-secondary); font-size:var(--text-sm);">Nessuna notifica.</div>';
  }

  // Gestione click per aprire/chiudere
  btnNotifiche.addEventListener('click', (e) => {
    e.stopPropagation();
    pannelloNotifiche.style.display = pannelloNotifiche.style.display === 'block' ? 'none' : 'block';
  });

  // Chiudi se clicchi fuori
  document.addEventListener('click', (e) => {
    if (pannelloNotifiche && !pannelloNotifiche.contains(e.target) && e.target !== btnNotifiche) {
      pannelloNotifiche.style.display = 'none';
    }
  });
}