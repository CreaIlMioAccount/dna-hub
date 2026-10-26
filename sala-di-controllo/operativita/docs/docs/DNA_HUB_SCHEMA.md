# DNA HUB - SCHEMA DATABASE (Backend Supabase)

Questo documento contiene la struttura finale del database PostgreSQL su Supabase.
Tutte le tabelle usano UUID come chiavi primarie e created_by punta ad auth.users.id.

## REGOLE GENERALI
- Sicurezza (RLS): Attiva su tutte le tabelle (policy permissive per utenti autenticati in Fase 1).
- Audit: Tutte le tabelle principali hanno created_at, updated_at, created_by.

## AREE E TABELLE ESISTENTI (Pre-Fasi)

### Clienti
- id (UUID, PK)
- ragione_sociale (TEXT)
- partita_iva (TEXT)
- codice_fiscale (TEXT)
- azienda (TEXT)
- stato (TEXT)
- contatti_count (INTEGER)
- created_at (TIMESTAMPTZ)

---

## FASE 1: AREA UTENTI E COLLABORATORI

### collaborators (Esistente + Estesa)
- id (UUID, PK)
- nome, cognome, email, telefono, ruolo, stato, avatar_url
- created_at, updated_at, created_by, updated_by

### profiles (Identità di accesso - 1:1 con collaborators)
- id (UUID, PK, FK -> auth.users.id)
- collaboratore_id (UUID, FK -> collaboratori.id, UNIQUE)
- role_id (UUID, FK -> roles.id)
- is_active (BOOLEAN)
- last_sign_in_at (TIMESTAMPTZ)
- created_at, updated_at, created_by

### roles
- id (UUID, PK)
- code (TEXT, UNIQUE)
- name (TEXT)
- is_system (BOOLEAN)
- created_at, updated_at, created_by

### role_permissions
- id (UUID, PK)
- role_id (UUID, FK -> roles.id)
- module (TEXT)
- can_read, can_write, can_delete (BOOLEAN)
- created_at, updated_at, created_by

### timesheets
- id (UUID, PK)
- collaboratore_id (UUID, FK -> collaboratori.id)
- progetto_id (UUID, FK -> progetti.id)
- project_task_id (UUID, FK -> project_tasks.id, nullable)
- data (DATE)
- ore (NUMERIC)
- descrizione (TEXT)
- approvato (BOOLEAN)
- created_at, updated_at, created_by

---

## FASE 2: AREA PROGETTI

### progetti (Esistente + Estesa)
- id (UUID, PK)
- cliente_id (UUID, FK -> clienti.id)
- nome (TEXT)
- stato (TEXT)
- avanzamento (INTEGER)
- descrizione, codice_progetto (TEXT UNIQUE), data_inizio, data_fine_prevista, data_fine_effettiva, priorita, categoria, budget_previsto, costo_effettivo
- project_manager_id (UUID, FK -> collaboratori.id)
- created_at, updated_at, created_by, updated_by

### project_tasks (Nuova)
- id (UUID, PK)
- progetto_id (UUID, FK -> progetti.id)
- titolo, descrizione (TEXT)
- assegnato_a (UUID, FK -> collaboratori.id)
- stato, priorita (TEXT)
- stima_ore (NUMERIC)
- data_scadenza, data_completamento (DATE)
- created_at, updated_at, created_by, updated_by

### project_milestones (Nuova)
- id (UUID, PK)
- progetto_id (UUID, FK -> progetti.id)
- nome, descrizione, stato (TEXT)
- data_target, data_completamento (DATE)
- created_at, updated_at, created_by, updated_by

### collaboratori_progetti (Esistente + Estesa)
- id (UUID, PK)
- collaboratore_id (UUID, FK -> collaboratori.id)
- progetto_id (UUID, FK -> progetti.id)
- ruolo_nel_progetto (TEXT)
- allocazione_pct (INTEGER)
- data_inizio, data_fine (DATE)
- tariffa_oraria (NUMERIC)
- note (TEXT)
- created_at, updated_at, created_by

### progetti_servizi (Esistente + Estesa)
- id (UUID, PK)
- progetto_id (UUID, FK -> progetti.id)
- servizio_id (UUID, FK -> servizi.id)
- quantita, prezzo_applicato, sconto, totale (NUMERIC)
- data_erogazione (DATE)
- stato (TEXT)
- created_at, created_by

### progetti_contratti (Nuova - Ponte)
- id (UUID, PK)
- progetto_id (UUID, FK -> progetti.id)
- contratto_id (UUID, FK -> contratti.id)
- created_at, created_by

### documenti_progetti (Nuova - Ponte)
- id (UUID, PK)
- documento_id (UUID, FK -> documenti.id)
- progetto_id (UUID, FK -> progetti.id)
- created_at, created_by

---

## FASE 3: AREA CONTRATTI

### contratti (Esistente + Estesa)
- id (UUID, PK)
- cliente_id (UUID, FK -> clienti.id)
- nome_contratto, importo, stato, tipo_contratto, note
- data_inizio, data_fine, documento_firmato_id (UUID, FK -> documenti.id)
- rinnovo_automatico (BOOLEAN), preavviso_giorni (INTEGER)
- codice_contratto (TEXT UNIQUE), descrizione, categoria, motivo_chiusura
- ultimo_rinnovo, prossimo_rinnovo, data_disdetta (DATE)
- created_at, updated_at, created_by, updated_by

### contratti_servizi (Nuova)
- id (UUID, PK)
- contratto_id (UUID, FK -> contratti.id)
- servizio_id (UUID, FK -> servizi.id)
- quantita, prezzo_applicato, sconto, totale (NUMERIC)
- stato (TEXT)
- created_at, updated_at, created_by, updated_by

---

## FASE 4: AREA SERVIZI

### servizi (Esistente + Estesa)
- id (UUID, PK)
- nome, descrizione, stato (TEXT)
- prezzo, costo_interno (NUMERIC)
- aliquota_iva (NUMERIC)
- unita_misura, durata_standard (TEXT/INTEGER)
- visibile_catalogo, ordinabile (BOOLEAN)
- codice_servizio (TEXT UNIQUE)
- categoria_id (UUID, FK -> categorie_servizi.id)
- created_at, updated_at, created_by, updated_by

### categorie_servizi (Nuova)
- id (UUID, PK)
- nome (TEXT UNIQUE), descrizione
- created_at, updated_at, created_by

---

## FASE 5: AREA DOCUMENTAZIONE

### documenti (Esistente + Estesa)
- id (UUID, PK)
- cliente_id (UUID, FK -> clienti.id)
- nome_file, file_url, tipo_file
- titolo, descrizione, nome_originale, mime_type, estensione_file
- file_size (BIGINT), checksum (TEXT)
- categoria_id (UUID, FK -> categorie_documenti.id)
- tag (TEXT[])
- livello_riservatezza (TEXT: pubblico, interno, riservato, amministrazione)
- created_at, updated_at, created_by, updated_by

### categorie_documenti (Nuova)
- id (UUID, PK)
- nome (TEXT UNIQUE), descrizione
- created_at, updated_at, created_by

### documenti_versions (Nuova)
- id (UUID, PK)
- documento_id (UUID, FK -> documenti.id)
- numero_versione (INTEGER)
- nome_file, file_url, mime_type, checksum (TEXT)
- file_size (BIGINT)
- note_versione (TEXT)
- created_at, created_by