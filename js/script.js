(function () {
  'use strict';

  /* ===================================================================
     MENU A SCHEDE (TABS) INFERIORE — Messo all'inizio per sicurezza
     =================================================================== */
  const initTabs = () => {
    const tabButtons = document.querySelectorAll('.hero-tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    if (tabButtons.length > 0 && tabPanes.length > 0) {
      tabButtons.forEach(button => {
        button.addEventListener('click', function() {
          // Rimuovi active da tutto
          tabButtons.forEach(btn => btn.classList.remove('active'));
          tabPanes.forEach(pane => pane.classList.remove('active'));

          // Aggiungi active al bottone cliccato
          this.classList.add('active');

          // Mostra la scheda
          const targetId = this.getAttribute('data-target');
          const targetPane = document.getElementById(targetId);
          if (targetPane) {
            targetPane.classList.add('active');
          }
        });
      });
    }
  };

  // Esegui quando il DOM è pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTabs);
  } else {
    initTabs();
  }

  /* ===================================================================
     IL RESTO DEL TUO CODICE (ICONS, MENU_DATA, THEME, HEADER, HERO)
     =================================================================== */
  // ... (tutto il tuo codice originale del file script.js va qui sotto) ...

})();