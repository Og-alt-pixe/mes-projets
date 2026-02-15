// 1. Gestion du Scroll (Indispensable pour ton design)
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

function resetScroll() {
    window.scrollTo(0, 0);
    if (window.location.hash) {
        history.replaceState("", document.title, window.location.pathname + window.location.search);
    }
}

window.addEventListener('load', resetScroll);
resetScroll();

// 2. Gestion des Filtres (Graphisme / Artisanat)
const filters = document.querySelectorAll('.filter-btn');
const projects = document.querySelectorAll('.project-card');

filters.forEach(filter => {
    filter.addEventListener('click', () => {
        // Gérer la classe active sur les boutons
        filters.forEach(btn => btn.classList.remove('active'));
        filter.classList.add('active');

        const filterValue = filter.getAttribute('data-filter');

        projects.forEach(project => {
            if (filterValue === 'all' || project.classList.contains(filterValue)) {
                project.classList.remove('hidden');
            } else {
                project.classList.add('hidden');
            }
        });
    });
});

// Gestion du Custom Select
document.querySelector('.custom-select-wrapper').addEventListener('click', function() {
    this.querySelector('.custom-select').classList.toggle('open');
});

for (const option of document.querySelectorAll(".custom-option")) {
    option.addEventListener('click', function() {
        if (!this.classList.contains('selected')) {
            this.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
            this.classList.add('selected');
            this.closest('.custom-select').querySelector('.custom-select__trigger span').textContent = this.textContent;
            // On met à jour l'input caché pour le formulaire
            document.getElementById('subject-input').value = this.getAttribute('data-value');
        }
    });
}

// Fermer le menu si on clique ailleurs sur la page
window.addEventListener('click', function(e) {
    const select = document.querySelector('.custom-select');
    if (!select.contains(e.target)) {
        select.classList.remove('open');
    }
});