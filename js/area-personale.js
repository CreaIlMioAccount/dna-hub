document.addEventListener('DOMContentLoaded', async () => {
  // 1. Inizializziamo Supabase
  
  const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  // 2. Controlliamo se l'utente è loggato
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    window.location.href = "login.html";
    return;
  }

  const userId = session.user.id;
  const userEmail = session.user.email;

  // 3. Carichiamo i dati dal database
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (profile) {
    // 4. Riempiamo i campi del form
    document.getElementById('firstName').value = profile.first_name || '';
    document.getElementById('lastName').value = profile.last_name || '';
    document.getElementById('email').value = userEmail;
    document.getElementById('phone').value = profile.phone || '';
    document.getElementById('role').value = profile.role || '';
    document.getElementById('companyName').value = profile.company_name || '';
    document.getElementById('vatNumber').value = profile.vat_number || '';
    document.getElementById('industry').value = profile.industry || '';
    document.getElementById('website').value = profile.website || '';
    document.getElementById('address').value = profile.address || '';
    document.getElementById('city').value = profile.city || '';
    document.getElementById('zipCode').value = profile.zip_code || '';
    document.getElementById('interests').value = profile.interests || '';
    document.getElementById('source').value = profile.source || '';
    document.getElementById('notes').value = profile.notes || '';
    document.getElementById('newsletterConsent').checked = profile.newsletter_consent || false;
    document.getElementById('marketingConsent').checked = profile.marketing_consent || false;

    // Aggiorniamo la sidebar
    const displayName = profile.first_name ? `${profile.first_name} ${profile.last_name}` : 'Utente';
    document.getElementById('userNameDisplay').textContent = displayName;
    document.getElementById('userRoleDisplay').textContent = profile.role || 'Utente';
    document.getElementById('avatarImage').src = `https://ui-avatars.com/api/?name=${profile.first_name}+${profile.last_name}&background=0076bc&color=fff&size=128`;
  }

  // 5. Funzione di salvataggio
  async function saveProfile() {
    const btnTop = document.getElementById('saveProfileBtn');
    const btnBottom = document.getElementById('saveProfileBtnBottom');
    
    btnTop.textContent = 'Salvataggio...';
    btnTop.disabled = true;
    if (btnBottom) { btnBottom.textContent = 'Salvataggio...'; btnBottom.disabled = true; }

    const updates = {
      first_name: document.getElementById('firstName').value,
      last_name: document.getElementById('lastName').value,
      phone: document.getElementById('phone').value,
      role: document.getElementById('role').value,
      company_name: document.getElementById('companyName').value,
      vat_number: document.getElementById('vatNumber').value,
      industry: document.getElementById('industry').value,
      website: document.getElementById('website').value,
      address: document.getElementById('address').value,
      city: document.getElementById('city').value,
      zip_code: document.getElementById('zipCode').value,
      interests: document.getElementById('interests').value,
      source: document.getElementById('source').value,
      notes: document.getElementById('notes').value,
      newsletter_consent: document.getElementById('newsletterConsent').checked,
      marketing_consent: document.getElementById('marketingConsent').checked,
      updated_at: new Date().toISOString()
    };

    // Calcolo Lead Score
    let score = 0;
    if (updates.phone) score += 10;
    if (updates.company_name) score += 10;
    if (updates.vat_number) score += 15;
    if (updates.industry) score += 5;
    if (updates.notes) score += 5;
    if (updates.newsletter_consent) score += 5;
    updates.lead_score = score;

    const { error } = await supabase.from('profiles').update(updates).eq('id', userId);

    btnTop.textContent = 'Salva Modifiche';
    btnTop.disabled = false;
    if (btnBottom) { btnBottom.textContent = 'Salva Modifiche'; btnBottom.disabled = false; }

    if (error) {
      alert("Errore durante il salvataggio: " + error.message);
    } else {
      alert("Dati salvati! Lead Score: " + score);
      document.getElementById('userNameDisplay').textContent = `${updates.first_name} ${updates.last_name}`;
      document.getElementById('userRoleDisplay').textContent = updates.role || 'Utente';
      document.getElementById('avatarImage').src = `https://ui-avatars.com/api/?name=${updates.first_name}+${updates.last_name}&background=0076bc&color=fff&size=128`;
    }
  }

  if (document.getElementById('saveProfileBtn')) document.getElementById('saveProfileBtn').addEventListener('click', (e) => { e.preventDefault(); saveProfile(); });
  if (document.getElementById('saveProfileBtnBottom')) document.getElementById('saveProfileBtnBottom').addEventListener('click', (e) => { e.preventDefault(); saveProfile(); });

  // Logout
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      await supabase.auth.signOut();
      window.location.href = '../index.html';
    });
  }
});