// 1. Désactiver la mémoire du scroll du navigateur
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// 2. Fonction pour remonter et nettoyer l'URL
function resetScroll() {
    // Remonte tout en haut
    window.scrollTo(0, 0);
    
    // Si l'URL contient une ancre (#work, etc.), on la retire sans recharger
    if (window.location.hash) {
        history.replaceState("", document.title, window.location.pathname + window.location.search);
    }
}

// 3. Exécuter au chargement
window.addEventListener('load', resetScroll);

// 4. Exécuter immédiatement au cas où
resetScroll();

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

document.addEventListener("DOMContentLoaded", () => {
    const overlay = document.querySelector('.page-transition-overlay');
    const transitionLinks = document.querySelectorAll('.project-card, .nav-links a'); // Ajoute les classes de tes liens

    transitionLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // On vérifie que c'est bien un lien interne
            const href = link.getAttribute('href');
            if (href && href.startsWith('http') === false && !href.includes('#')) {
                e.preventDefault(); // Empêche de partir tout de suite
                
                overlay.classList.add('active'); // Baisse le store

                // On attend la fin de l'animation (600ms) avant de changer de page
                setTimeout(() => {
                    window.location.href = href;
                }, 600);
            }
        });
    });
});

// Effet au chargement : Le store remonte
window.addEventListener('load', () => {
    const overlay = document.querySelector('.page-transition-overlay');
    // On le met d'abord en plein écran, puis on le remonte
    overlay.style.top = 'auto';
    overlay.style.bottom = '0';
    overlay.style.height = '100vh';
    
    setTimeout(() => {
        overlay.style.height = '0';
    }, 100);
});