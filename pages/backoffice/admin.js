// Inizializza Supabase
const SUPABASE_URL = 'https://wqtywckdavadoqjunkhl.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_iSHItBqOWsFVXduYinpx6Q_JNiNXPE5';
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let allUsers = []; // Salviamo gli utenti in memoria per la modale

document.addEventListener('DOMContentLoaded', async () => {
  const loadingScreen = document.getElementById('loading-screen');
  const accessDenied = document.getElementById('access-denied');
  const adminContent = document.getElementById('admin-content');
  
  // Menu Mobile
  const mobileToggle = document.getElementById('mobileToggle');
  const adminSidebar = document.getElementById('adminSidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      adminSidebar.classList.add('active');
      sidebarOverlay.classList.add('active');
    });
  }
  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', () => {
      adminSidebar.classList.remove('active');
      sidebarOverlay.classList.remove('active');
    });
  }

  // Controllo Permessi
  loadingScreen.style.display = 'block';
  const { data: { session } } = await supabaseClient.auth.getSession();

  if (!session) {
    window.location.href = "../login.html";
    return;
  }

  const { data: currentAdmin, error: profileError } = await supabaseClient
    .from('profiles')
    .select('role')
    .eq('id', session.user.id)
    .single();

  loadingScreen.style.display = 'none';

  // Accetta sia 'admin' che il tuo vecchio ruolo scritto a mano
  if (profileError || !currentAdmin || (currentAdmin.role !== 'admin' && currentAdmin.role !== 'Fondatore di DNA Informatica')) {
    accessDenied.style.display = 'block';
    return;
  }

  // Se siamo admin, mostriamo il contenuto
  adminContent.style.display = 'block';
  caricaUtenti();

  // --- CARICA TABELLA UTENTI ---
  async function caricaUtenti() {
    const { data: users, error } = await supabaseClient
      .from('profiles')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) {
      alert("Errore nel caricamento utenti: " + error.message);
      return;
    }

    allUsers = users;
    const tbody = document.getElementById('usersTableBody');
    tbody.innerHTML = '';

    let completati = 0;

    users.forEach(user => {
      if(user.first_name && user.last_name && user.phone) completati++;
      
      const isAdmin = (user.role === 'admin' || user.role === 'Fondatore di DNA Informatica');
      const roleBadge = isAdmin ? '<span class="badge badge-admin">Admin</span>' : '<span class="badge badge-user">Utente</span>';

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${user.first_name || 'N/D'} ${user.last_name || ''}</td>
        <td>${user.email}</td>
        <td>${roleBadge}</td>
        <td>
          <button class="btn btn-primary" onclick="apriModale('${user.id}')">Modifica</button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    document.getElementById('totalUsers').textContent = users.length;
    document.getElementById('completedProfiles').textContent = completati;
  }

  // --- GESTIONE MODALE ---
  const modal = document.getElementById('editModal');
  const editForm = document.getElementById('editUserForm');

  // Funzione globale per aprire la modale (chiamata dal pulsante HTML)
  window.apriModale = (userId) => {
    const user = allUsers.find(u => u.id === userId);
    if (!user) return;

    document.getElementById('editUserId').value = user.id;
    document.getElementById('editFirstName').value = user.first_name || '';
    document.getElementById('editLastName').value = user.last_name || '';
    document.getElementById('editEmail').value = user.email || '';
    document.getElementById('editPhone').value = user.phone || '';
    document.getElementById('editRole').value = (user.role === 'admin' || user.role === 'Fondatore di DNA Informatica') ? 'admin' : 'user';
    document.getElementById('editCompanyName').value = user.company_name || '';
    document.getElementById('editNotes').value = user.notes || '';

    modal.style.display = 'flex';
  };

  // Chiudi modale
  document.getElementById('closeModalBtn').addEventListener('click', () => {
    modal.style.display = 'none';
  });
  
  // Chiudi se clicco fuori
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });

  // Salva modifiche dalla modale
  editForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = document.getElementById('saveUserBtn');
    btn.textContent = 'Salvataggio...';
    btn.disabled = true;

    const userId = document.getElementById('editUserId').value;
    
    const updates = {
      first_name: document.getElementById('editFirstName').value,
      last_name: document.getElementById('editLastName').value,
      phone: document.getElementById('editPhone').value,
      role: document.getElementById('editRole').value,
      company_name: document.getElementById('editCompanyName').value,
      notes: document.getElementById('editNotes').value,
      updated_at: new Date().toISOString()
    };

    const { error } = await supabaseClient
      .from('profiles')
      .update(updates)
      .eq('id', userId);

    btn.textContent = 'Salva Modifiche';
    btn.disabled = false;

    if (error) {
      alert("Errore durante il salvataggio: " + error.message);
    } else {
      alert("Utente aggiornato con successo!");
      modal.style.display = 'none';
      caricaUtenti(); // Ricarica la tabella per mostrare le modifiche
    }
  });

  // Logout
  document.getElementById('logoutBtn').addEventListener('click', async () => {
    await supabaseClient.auth.signOut();
    window.location.href = "../login.html";
  });
});