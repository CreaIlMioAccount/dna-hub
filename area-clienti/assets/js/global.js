// =========================================
// DNA HUB - FUNZIONI GLOBALI
// =========================================

// Funzione per gestire il click sul menu
document.addEventListener("DOMContentLoaded", () => {
    const menuLinks = document.querySelectorAll('.menu a');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Rimuove la classe active da tutti
            menuLinks.forEach(l => l.classList.remove('active'));
            // Aggiunge la classe active a quello cliccato
            this.classList.add('active');
        });
    });
});