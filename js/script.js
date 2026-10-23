(function () {
  'use strict';

  /* ===================================================================
     DATI MENU
     =================================================================== */

  const ICONS = {
    brain: '<path d="M12 4a4 4 0 1 0 0 8 4 4 0 1 0 0-8zM5 8a3 3 0 1 0 0 6 3 3 0 1 0 0-6zM19 8a3 3 0 1 0 0 6 3 3 0 1 0 0-6zM9 16a3 3 0 1 0 0 6 3 3 0 1 0 0-6zM15 16a3 3 0 1 0 0 6 3 3 0 1 0 0-6z"/>',
    network: '<rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3M12 12V8"/>',
    blocks: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M6 10v4M10 6h4"/>',
    cloud: '<path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    code: '<path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/>',
    layers: '<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>',
    database: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>',
    cpu: '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/>',
    chart: '<path d="M18 20V10M12 20V4M6 20v-6"/>',
    users: '<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>',
    rocket: '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09zM12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/>',
    lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 010 20 15 15 0 010-20z"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/>',
    help: '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01"/>',
    message: '<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>',
    phone: '<path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.36 1.9.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0122 16.92z"/>',
    zap: '<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    factory: '<path d="M2 20h20M4 20V8l6 4V8l6 4V4h4v16"/>',
    briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>'
  };

  const MENU_DATA = {
    home: {
      groups: [
        {
          title: 'Percorso',
          items: [
            { icon: 'grid',    title: 'Benvenuti',  desc: 'Un punto di partenza per orientarti.' },
            { icon: 'book',    title: 'Introduzione', desc: 'Chi siamo e cosa facciamo.' },
            { icon: 'chart',   title: 'Studi',      desc: 'Ricerche, dati e approfondimenti.' },
            { icon: 'layers',  title: 'Logo & Brand', desc: 'Identità visiva e linee guida.' }
          ]
        },
        {
          title: 'Approfondimenti',
          items: [
            { icon: 'help',    title: 'Ricerca',    desc: 'Metodo e processo di ricerca.' },
            { icon: 'briefcase', title: 'Strategia', desc: 'Obiettivi, roadmap e posizionamento.' },
            { icon: 'rocket',  title: 'Progetti',   desc: 'Casi studio e lavori realizzati.' }
          ]
        }
      ],
      promo: {
        icon: 'zap',
        title: 'Inizia da qui',
        desc: 'Segui il percorso introduttivo per scoprire DNA Informatica.',
        link: 'Apri la guida',
        href: '#'
      }
    },
    prodotti: {
      groups: [
        {
          title: 'Prodotti DNA',
          items: [
            { icon: 'globe',       title: 'DNA Web',                 desc: 'Siti web, portali e applicazioni web su misura.' },
            { icon: 'message',     title: 'DNA Comunicazione',       desc: 'Strumenti per la comunicazione aziendale.' },
            { icon: 'chart',       title: 'DNA Marketing',           desc: 'Campagne, automazioni e analytics di marketing.' },
            { icon: 'briefcase',   title: 'DNA Business',            desc: 'Gestione e processi per il business.' }
          ]
        },
        {
          title: 'Soluzioni tecniche',
          items: [
            { icon: 'code',        title: 'DNA Software',            desc: 'Software personalizzato e integrazioni.' },
            { icon: 'cpu',         title: 'DNA Infrastructure',      desc: 'Server, networking e infrastruttura IT.' },
            { icon: 'layers',      title: 'DNA Servizi Gestionali',  desc: 'ERP, gestionali e automazione dei processi.' },
            { icon: 'cloud',       title: 'DNA Cloud',               desc: 'Infrastruttura cloud gestita.', badge: 'Top' }
          ]
        }
      ],
      promo: {
        icon: 'zap',
        title: 'Prova gratis 30 giorni',
        desc: 'Nessuna carta richiesta. Accesso completo a tutte le funzionalità.',
        link: 'Inizia la prova',
        href: '#'
      }
    },
    tecnologie: {
      groups: [
        {
          title: 'Frontiera Tech',
          items: [
            { icon: 'brain',    title: 'Intelligenza Artificiale', desc: 'Soluzioni AI, machine learning e automazione.', badge: 'Hot' },
            { icon: 'network',  title: 'IoT',                      desc: 'Internet of Things e dispositivi connessi.' },
            { icon: 'database', title: 'Big Data',                 desc: 'Analisi dati, data lake e business intelligence.' },
            { icon: 'blocks',   title: 'Blockchain',               desc: 'Smart contract, Web3 e tracciabilità.' }
          ]
        },
        {
          title: 'Infrastrutture',
          items: [
            { icon: 'cloud',    title: 'Edge Computing',           desc: 'Elaborazione dati vicino alla fonte.' },
            { icon: 'cpu',      title: 'Quantum Computing',        desc: 'Calcolo quantistico e crittografia.' },
            { icon: 'shield',   title: 'Zero Trust',               desc: 'Architetture di sicurezza moderne.' }
          ]
        }
      ],
      promo: {
        icon: 'rocket',
        title: 'Esplora il futuro',
        desc: 'Scopri come integriamo le tecnologie emergenti nel tuo business.',
        link: 'Leggi il whitepaper',
        href: '#'
      }
    },
    soluzioni: {
      groups: [
        {
          title: 'Per esigenza',
          items: [
            { icon: 'cloud', title: 'Cloud & Infrastruttura', desc: 'Migrazione, hosting e scalabilità.' },
            { icon: 'shield', title: 'Cybersecurity', desc: 'Protezione dati e conformità GDPR.' },
            { icon: 'layers', title: 'Digital Transformation', desc: 'Ripensare i processi aziendali.' },
            { icon: 'chart', title: 'Data & Analytics', desc: 'Business intelligence e dashboard.' }
          ]
        },
        {
          title: 'Per ruolo',
          items: [
            { icon: 'users', title: 'IT Manager', desc: 'Soluzioni per team tecnici.' },
            { icon: 'briefcase', title: 'CEO & Management', desc: 'Strategia digitale e KPI.' },
            { icon: 'code', title: 'Sviluppatori', desc: 'API, SDK e ambienti dev.' }
          ]
        }
      ],
      promo: {
        icon: 'rocket',
        title: 'Trasforma il tuo business',
        desc: 'Scopri come le nostre soluzioni hanno aiutato oltre 500 aziende a crescere.',
        link: 'Leggi i case study',
        href: '#'
      }
    },
    servizi: {
      groups: [
        {
          title: 'Consulenza',
          items: [
            { icon: 'briefcase', title: 'Consulenza strategica', desc: 'Roadmap digitale su misura.' },
            { icon: 'shield', title: 'Security assessment', desc: 'Audit e penetration test.' },
            { icon: 'chart', title: 'Performance audit', desc: 'Ottimizzazione sistemi esistenti.' }
          ]
        },
        {
          title: 'Sviluppo',
          items: [
            { icon: 'code', title: 'Sviluppo custom', desc: 'Web app e software su misura.' },
            { icon: 'layers', title: 'Integrazione sistemi', desc: 'Collega i tuoi strumenti.' },
            { icon: 'rocket', title: 'DevOps & CI/CD', desc: 'Automazione deploy e testing.' }
          ]
        }
      ],
      promo: {
        icon: 'help',
        title: 'Non sai da dove iniziare?',
        desc: 'Prenota una consulenza gratuita con un nostro esperto.',
        link: 'Prenota ora',
        href: '#'
      }
    },
    settori: {
      groups: [
        {
          title: 'Industrie',
          items: [
            { icon: 'factory', title: 'Manifattura', desc: 'Industria 4.0 e automazione.' },
            { icon: 'briefcase', title: 'Servizi finanziari', desc: 'Fintech e compliance.' },
            { icon: 'users', title: 'Sanità', desc: 'Soluzioni per strutture sanitarie.' },
            { icon: 'globe', title: 'Retail', desc: 'E-commerce e omnicanalità.' }
          ]
        },
        {
          title: 'Settore pubblico',
          items: [
            { icon: 'shield', title: 'Pubblica amministrazione', desc: 'Digitalizzazione PA.' },
            { icon: 'book', title: 'Istruzione', desc: 'Piattaforme per scuole e università.' }
          ]
        }
      ],
      promo: {
        icon: 'chart',
        title: 'Caso studio: Retail',
        desc: 'Come abbiamo ridotto i costi del 40% per un leader del settore.',
        link: 'Scopri di più',
        href: '#'
      }
    },
    risorse: {
      groups: [
        {
          title: 'Documentazione',
          items: [
            { icon: 'book', title: 'Guide', desc: 'Tutorial e best practice.' },
            { icon: 'code', title: 'API Reference', desc: 'Documentazione tecnica completa.' },
            { icon: 'message', title: 'Changelog', desc: 'Ultimi aggiornamenti e release.' }
          ]
        },
        {
          title: 'Community',
          items: [
            { icon: 'users', title: 'Forum', desc: 'Confrontati con altri utenti.' },
            { icon: 'globe', title: 'Blog', desc: 'Articoli, trend e approfondimenti.' },
            { icon: 'zap', title: 'Webinar', desc: 'Eventi live e registrazioni.' }
          ]
        }
      ],
      promo: {
        icon: 'book',
        title: 'Whitepaper 2025',
        desc: 'Il futuro del cloud computing: trend e previsioni.',
        link: 'Scarica gratis',
        href: '#'
      }
    },
    azienda: {
      groups: [
        {
          title: 'Chi siamo',
          items: [
            { icon: 'users', title: 'La nostra storia', desc: '20 anni di innovazione.' },
            { icon: 'briefcase', title: 'Lavora con noi', desc: 'Posizioni aperte e cultura.' },
            { icon: 'chart', title: 'Investitori', desc: 'Report e comunicati.' },
            { icon: 'mail', title: 'Contatti', desc: 'Parla con il nostro team.' }
          ]
        },
        {
          title: 'Newsroom',
          items: [
            { icon: 'message', title: 'Comunicati stampa', desc: 'Ultime notizie aziendali.' },
            { icon: 'globe', title: 'Eventi', desc: 'Fiere e conferenze.' }
          ]
        }
      ],
      promo: {
        icon: 'rocket',
        title: 'Unisciti al team',
        desc: 'Cerchiamo talenti appassionati di tecnologia. Scopri le opportunità.',
        link: 'Vedi posizioni',
        href: '#'
      }
    },
    supporto: {
      groups: [
        {
          title: 'Assistenza',
          items: [
            { icon: 'help', title: 'Help Center', desc: 'Risposte alle domande frequenti.' },
            { icon: 'message', title: 'Chat live', desc: 'Supporto in tempo reale.' },
            { icon: 'phone', title: 'Telefono', desc: 'Parla con un operatore.' },
            { icon: 'mail', title: 'Email', desc: 'Invia una richiesta scritta.' }
          ]
        },
        {
          title: 'Stato servizi',
          items: [
            { icon: 'chart', title: 'Status page', desc: 'Uptime e incidenti in tempo reale.' },
            { icon: 'shield', title: 'Sicurezza', desc: 'Come proteggiamo i tuoi dati.' }
          ]
        }
      ],
      promo: {
        icon: 'zap',
        title: 'Supporto prioritario',
        desc: 'Passa al piano Enterprise per assistenza dedicata 24/7.',
        link: 'Scopri di più',
        href: '#'
      }
    }
  };

  /* ===================================================================
     THEME
     =================================================================== */

  const html = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('dna-theme', theme);
  }

  (function initTheme() {
    const saved = localStorage.getItem('dna-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(saved || (prefersDark ? 'dark' : 'light'));
  })();

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const current = html.getAttribute('data-theme');
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  /* ===================================================================
     HEADER — ombra allo scroll
     =================================================================== */

  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', function () {
    if (header) header.classList.toggle('scrolled', window.scrollY > 8);
  }, { passive: true });

  /* ===================================================================
     SCROLL ORIZZONTALE MENU + AUTO-SCROLL HOVER
     =================================================================== */
  const navList = document.querySelector('.nav-list');
  const navArrowPrev = document.getElementById('navArrowPrev');
  const navArrowNext = document.getElementById('navArrowNext');
  const navScrollContainer = document.querySelector('.nav-scroll-container');

  if (navList && navArrowPrev && navArrowNext && navScrollContainer) {
    
    // Aggiornamento frecce
    const updateArrows = () => {
      if (window.innerWidth <= 1024) return;

      const scrollLeft = Math.round(navList.scrollLeft);
      const scrollWidth = Math.round(navList.scrollWidth);
      const clientWidth = Math.round(navList.clientWidth);

      if (scrollLeft > 5) {
        navArrowPrev.classList.add('visible');
        navScrollContainer.classList.add('show-left-fade');
      } else {
        navArrowPrev.classList.remove('visible');
        navScrollContainer.classList.remove('show-left-fade');
      }

      if (scrollLeft + clientWidth < scrollWidth - 5) {
        navArrowNext.classList.add('visible');
        navScrollContainer.classList.add('show-right-fade');
      } else {
        navArrowNext.classList.remove('visible');
        navScrollContainer.classList.remove('show-right-fade');
      }
    };

    // Click frecce
    navArrowPrev.addEventListener('click', () => navList.scrollBy({ left: -250, behavior: 'smooth' }));
    navArrowNext.addEventListener('click', () => navList.scrollBy({ left: 250, behavior: 'smooth' }));

    navList.addEventListener('scroll', updateArrows);
    window.addEventListener('resize', updateArrows);
    
    // Controllo iniziale ritardato
    setTimeout(updateArrows, 200);

    // --- AUTO-SCROLL SU HOVER ---
    let scrollInterval = null;
    const scrollSpeed = 8;

    function startAutoScroll(direction) {
      stopAutoScroll();
      scrollInterval = setInterval(() => {
        navList.scrollLeft += (direction === 'next' ? scrollSpeed : -scrollSpeed);
      }, 16);
    }

    function stopAutoScroll() {
      if (scrollInterval) {
        clearInterval(scrollInterval);
        scrollInterval = null;
      }
    }

    navArrowNext.addEventListener('mouseenter', () => startAutoScroll('next'));
    navArrowNext.addEventListener('mouseleave', stopAutoScroll);
    
    navArrowPrev.addEventListener('mouseenter', () => startAutoScroll('prev'));
    navArrowPrev.addEventListener('mouseleave', stopAutoScroll);

    navArrowNext.addEventListener('click', stopAutoScroll);
    navArrowPrev.addEventListener('click', stopAutoScroll);
    window.addEventListener('blur', stopAutoScroll);
    document.addEventListener('touchstart', stopAutoScroll);
  }

  /* ===================================================================
     MEGA MENU DESKTOP
     =================================================================== */

  const megaMenu = document.getElementById('megaMenu');
  const megaInner = document.getElementById('megaInner');
  const navItems = document.querySelectorAll('.nav-item[data-menu]');
  const indicator = document.querySelector('.nav-indicator');
  
  let activeKey = null;
  let closeTimer = null;

  function svg(path) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + path + '</svg>';
  }

  function buildMega(key) {
    const data = MENU_DATA[key];
    if (!data) return;

    const cols = data.groups.map(function (group) {
      const links = group.items.map(function (item) {
        return '<a href="#" class="mega-link">' +
            '<span class="mega-link-icon">' + svg(ICONS[item.icon] || ICONS.zap) + '</span>' +
            '<span class="mega-link-body">' +
              '<span class="mega-link-title">' + item.title +
                (item.badge ? '<span class="mega-badge">' + item.badge + '</span>' : '') +
              '</span>' +
              '<span class="mega-link-desc">' + item.desc + '</span>' +
            '</span>' +
          '</a>';
      }).join('');

      return '<div class="mega-col">' +
          '<div class="mega-col-title">' + group.title + '</div>' +
          '<div class="mega-links">' + links + '</div>' +
        '</div>';
    }).join('');

    const promo = data.promo ? (
      '<div class="mega-col">' +
        '<div class="mega-promo">' +
          '<span class="mega-promo-icon">' + svg(ICONS[data.promo.icon] || ICONS.zap) + '</span>' +
          '<h4>' + data.promo.title + '</h4>' +
          '<p>' + data.promo.desc + '</p>' +
          '<a href="' + data.promo.href + '">' + data.promo.link + ' →</a>' +
        '</div>' +
      '</div>'
    ) : '';

    megaInner.innerHTML =
      '<div class="mega-grid">' + cols + promo + '</div>' +
      '<div class="mega-footer">' +
        '<span class="mega-footer-text">Hai bisogno di aiuto per scegliere?</span>' +
        '<a href="#">Parla con un esperto →</a>' +
      '</div>';
  }

  function positionIndicator(itemEl) {
    if (!indicator || !itemEl) return;
    const listRect = itemEl.parentElement.parentElement.getBoundingClientRect();
    const rect = itemEl.getBoundingClientRect();
    const left = rect.left - listRect.left + 12;
    const width = rect.width - 24;
    indicator.style.left = left + 'px';
    indicator.style.width = width + 'px';
    indicator.style.opacity = '1';
  }

  function hideIndicator() {
    if (indicator) indicator.style.opacity = '0';
  }

  function openMega(key, itemEl) {
    clearTimeout(closeTimer);
    if (activeKey === key) return;

    activeKey = key;
    buildMega(key);

    navItems.forEach(function (item) {
      const isActive = item.dataset.menu === key;
      item.classList.toggle('open', isActive);
      const btn = item.querySelector('.nav-link');
      if (btn) btn.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });

    if (megaMenu) {
      megaMenu.classList.add('open');
      megaMenu.setAttribute('aria-hidden', 'false');
    }
    positionIndicator(itemEl);
  }

  function closeMega() {
    if (!activeKey) return;
    activeKey = null;
    if (megaMenu) {
      megaMenu.classList.remove('open');
      megaMenu.setAttribute('aria-hidden', 'true');
    }
    navItems.forEach(function (item) {
      item.classList.remove('open');
      const btn = item.querySelector('.nav-link');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
    hideIndicator();
  }

  navItems.forEach(function (item) {
    const key = item.dataset.menu;
    const btn = item.querySelector('.nav-link');

    item.addEventListener('mouseenter', function () {
      if (!MENU_DATA[key]) return;
      openMega(key, item);
    });

    item.addEventListener('mouseleave', function () {
      closeTimer = setTimeout(closeMega, 150);
    });

    if (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        if (activeKey === key) closeMega();
        else openMega(key, item);
      });

      btn.addEventListener('focus', function () {
        if (!MENU_DATA[key]) return;
        positionIndicator(item);
      });

      btn.addEventListener('blur', hideIndicator);
    }
  });

  if (megaMenu) {
    megaMenu.addEventListener('mouseenter', function () {
      clearTimeout(closeTimer);
    });

    megaMenu.addEventListener('mouseleave', function () {
      closeTimer = setTimeout(closeMega, 150);
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMega();
  });

  document.addEventListener('click', function (e) {
    if (header && !header.contains(e.target)) closeMega();
  });

  /* ===================================================================
     MOBILE MENU
     =================================================================== */

  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');
  const mobileBody = document.getElementById('mobileBody');
  const mobileOverlay = document.getElementById('mobileOverlay');

  function buildMobileMenu() {
    if (!mobileBody) return;

    const htmlStr = Object.keys(MENU_DATA).map(function (key) {
      const data = MENU_DATA[key];
      const labelMap = {
        home: 'Home', 
        prodotti: 'Prodotti',
        tecnologie: 'Tecnologie',
        soluzioni: 'Soluzioni',
        servizi: 'Servizi',
        settori: 'Settori',
        risorse: 'Risorse',
        azienda: 'Azienda',
        supporto: 'Supporto'
      };

      const allItems = data.groups.reduce(function (acc, g) {
        return acc.concat(g.items);
      }, []);

      const links = allItems.map(function (item) {
        return '<a href="#" class="mobile-link">' +
            '<span class="mobile-link-icon">' + svg(ICONS[item.icon] || ICONS.zap) + '</span>' +
            '<span>' +
              '<span class="mobile-link-title">' + item.title + '</span>' +
              '<span class="mobile-link-desc">' + item.desc + '</span>' +
            '</span>' +
          '</a>';
      }).join('');

      return '<div class="acc" data-key="' + key + '">' +
          '<button class="acc-trigger" type="button" aria-expanded="false">' +
            '<span>' + labelMap[key] + '</span>' +
            '<svg class="acc-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>' +
          '</button>' +
          '<div class="acc-content">' +
            '<div class="acc-inner">' + links + '</div>' +
          '</div>' +
        '</div>';
    }).join('');

    mobileBody.innerHTML = htmlStr;

    mobileBody.querySelectorAll('.acc-trigger').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const acc = btn.parentElement;
        const content = acc.querySelector('.acc-content');
        const isOpen = acc.classList.contains('open');

        mobileBody.querySelectorAll('.acc.open').forEach(function (other) {
          if (other !== acc) {
            other.classList.remove('open');
            const oc = other.querySelector('.acc-content');
            oc.style.height = oc.scrollHeight + 'px';
            requestAnimationFrame(function () { oc.style.height = '0px'; });
            other.querySelector('.acc-trigger').setAttribute('aria-expanded', 'false');
          }
        });

        if (isOpen) {
          content.style.height = content.scrollHeight + 'px';
          requestAnimationFrame(function () { content.style.height = '0px'; });
          acc.classList.remove('open');
          btn.setAttribute('aria-expanded', 'false');
        } else {
          acc.classList.add('open');
          btn.setAttribute('aria-expanded', 'true');
          content.style.height = content.scrollHeight + 'px';
          content.addEventListener('transitionend', function onEnd() {
            if (acc.classList.contains('open')) content.style.height = 'auto';
            content.removeEventListener('transitionend', onEnd);
          });
        }
      });
    });
  }

  buildMobileMenu();

  function openMobile() {
    if (!mobileMenu || !mobileOverlay || !hamburger) return;
    mobileMenu.classList.add('open');
    mobileOverlay.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobile() {
    if (!mobileMenu || !mobileOverlay || !hamburger) return;
    mobileMenu.classList.remove('open');
    mobileOverlay.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      if (mobileMenu.classList.contains('open')) closeMobile();
      else openMobile();
    });
  }

  if (mobileClose) mobileClose.addEventListener('click', closeMobile);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobile);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('open')) closeMobile();
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 1024 && mobileMenu && mobileMenu.classList.contains('open')) {
      closeMobile();
    }
  });


  /* ===================================================================
     LOGICA RICERCA ESPANDIBILE
     =================================================================== */
  const searchContainer = document.getElementById('searchContainer');
  const searchBtn = document.getElementById('searchBtn');
  const searchClose = document.getElementById('searchClose');
  const searchInput = document.getElementById('searchInput');

  if (searchContainer && searchBtn && searchClose && searchInput) {
    
    // Apri la ricerca
    searchBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      searchContainer.classList.add('open');
      // Piccolo ritardo per far finire l'animazione di apertura prima di dare il focus
      setTimeout(() => searchInput.focus(), 250); 
    });

    // Chiudi la ricerca
    function closeSearch() {
      searchContainer.classList.remove('open');
      searchInput.value = ''; // Opzionale: svuota il campo alla chiusura
    }

    searchClose.addEventListener('click', closeSearch);

    // Chiudi se si preme ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && searchContainer.classList.contains('open')) {
        closeSearch();
      }
    });

    // Chiudi se si clicca fuori
    document.addEventListener('click', (e) => {
      if (!searchContainer.contains(e.target) && searchContainer.classList.contains('open')) {
        closeSearch();
      }
    });

    // Impedisci la chiusura se si clicca dentro il campo di testo
    searchInput.addEventListener('click', (e) => e.stopPropagation());
  }













})();