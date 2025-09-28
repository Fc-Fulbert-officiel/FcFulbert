function toggleMenu() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.toggle('show');
}

// Animation au scroll pour l'header
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 6px 25px rgba(0,0,0,0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    }
});

// Animation des éléments au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer tous les éléments avec animation
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
});

// Effet parallax subtil pour le hero
window.addEventListener('scroll', function () {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    const speed = 0.5;
    const yPos = -(scrolled * speed);
    heroSection.style.transform = `translateY(${yPos}px)`;
});

// Simulation de données structurées pour le SEO
const structuredData = {
    "@context": "https://schema.org",
    "@type": "SportsTeam",
    "name": "FC Fulbert",
    "alternateName": "Football Club Fulbert",
    "description": "Club de football professionnel français fondé en 1923 à Chartres",
    "foundingDate": "1923",
    "location": {
        "@type": "Place",
        "name": "Chartres",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Chartres",
            "addressCountry": "France"
        }
    },
    "homeLocation": {
        "@type": "StadiumOrArena",
        "name": "Stade Fulbert de Chartres",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Chartres",
            "addressCountry": "France"
        }
    },
    "sport": "Football",
    "memberOf": {
        "@type": "SportsLeague",
        "name": "Ligue 1"
    }
};

// Injection des données structurées
const script = document.createElement('script');
script.type = 'application/ld+json';
script.textContent = JSON.stringify(structuredData);
document.head.appendChild(script);

// Simulation Google Analytics pour le SEO
if (typeof gtag !== 'undefined') {
    gtag('config', 'GA-FULBERT-123', {
        page_title: 'FC Fulbert - Accueil',
        page_location: window.location.href
    });
}















// JavaScript pour le filtrage des actualités FC Fulbert
// À ajouter au fichier javascript.js existant

document.addEventListener('DOMContentLoaded', function () {
    // Fonction de filtrage des actualités
    function initNewsFilter() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const newsArticles = document.querySelectorAll('.news-article');

        if (filterButtons.length === 0 || newsArticles.length === 0) {
            return; // Pas sur la page actualités
        }

        // Fonction pour filtrer les articles
        function filterNews(category) {
            newsArticles.forEach(article => {
                if (category === 'all') {
                    article.style.display = 'block';
                    article.classList.remove('hidden');
                    article.classList.add('show');
                } else {
                    if (article.classList.contains(category)) {
                        article.style.display = 'block';
                        article.classList.remove('hidden');
                        article.classList.add('show');
                    } else {
                        article.style.display = 'none';
                        article.classList.add('hidden');
                        article.classList.remove('show');
                    }
                }
            });
        }

        // Animation d'apparition des articles filtrés
        function animateFilteredArticles() {
            const visibleArticles = document.querySelectorAll('.news-article.show');

            visibleArticles.forEach((article, index) => {
                article.style.opacity = '0';
                article.style.transform = 'translateY(20px)';

                setTimeout(() => {
                    article.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    article.style.opacity = '1';
                    article.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }

        // Gestionnaire d'événements pour les boutons de filtre
        filterButtons.forEach(button => {
            button.addEventListener('click', function () {
                // Retirer la classe active de tous les boutons
                filterButtons.forEach(btn => btn.classList.remove('active'));

                // Ajouter la classe active au bouton cliqué
                this.classList.add('active');

                // Obtenir la catégorie à filtrer
                const filterCategory = this.getAttribute('data-filter');

                // Appliquer le filtre
                filterNews(filterCategory);

                // Animer les articles après un court délai
                setTimeout(animateFilteredArticles, 50);

                // Faire défiler vers les résultats
                setTimeout(() => {
                    document.querySelector('.news-grid').scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 200);
            });
        });

        // Initialiser avec tous les articles visibles
        filterNews('all');
    }

    // Fonction de recherche d'actualités
    function initNewsSearch() {
        const searchInput = document.querySelector('.search-form input');
        const searchButton = document.querySelector('.search-form button');

        if (!searchInput || !searchButton) {
            return; // Pas sur la page actualités
        }

        function performSearch(searchTerm) {
            const newsArticles = document.querySelectorAll('.news-article');
            const featuredArticle = document.querySelector('.featured-article');
            let foundResults = false;

            searchTerm = searchTerm.toLowerCase().trim();

            // Si terme vide, tout afficher
            if (searchTerm === '') {
                newsArticles.forEach(article => {
                    article.style.display = 'block';
                    article.classList.remove('search-hidden');
                });
                if (featuredArticle) {
                    featuredArticle.style.display = 'grid';
                }
                return;
            }

            // Rechercher dans les articles normaux
            newsArticles.forEach(article => {
                const title = article.querySelector('h3').textContent.toLowerCase();
                const content = article.querySelector('p').textContent.toLowerCase();
                const category = article.querySelector('.article-category').textContent.toLowerCase();

                if (title.includes(searchTerm) || content.includes(searchTerm) || category.includes(searchTerm)) {
                    article.style.display = 'block';
                    article.classList.remove('search-hidden');
                    foundResults = true;
                } else {
                    article.style.display = 'none';
                    article.classList.add('search-hidden');
                }
            });

            // Rechercher dans l'article à la une
            if (featuredArticle) {
                const featuredTitle = featuredArticle.querySelector('h3').textContent.toLowerCase();
                const featuredContent = featuredArticle.querySelector('p').textContent.toLowerCase();

                if (featuredTitle.includes(searchTerm) || featuredContent.includes(searchTerm)) {
                    featuredArticle.style.display = 'grid';
                    foundResults = true;
                } else {
                    featuredArticle.style.display = 'none';
                }
            }

            // Afficher un message si aucun résultat
            if (!foundResults) {
                showNoResultsMessage(searchTerm);
            } else {
                hideNoResultsMessage();
            }
        }

        function showNoResultsMessage(searchTerm) {
            // Supprimer le message existant s'il y en a un
            hideNoResultsMessage();

            const noResultsDiv = document.createElement('div');
            noResultsDiv.className = 'no-results-message';
            noResultsDiv.innerHTML = `
                <div style="text-align: center; padding: 3rem; background: var(--light-gray); border-radius: 15px; margin: 2rem 0;">
                    <h3 style="color: var(--primary); margin-bottom: 1rem;">Aucun résultat trouvé</h3>
                    <p style="color: var(--gray); margin-bottom: 1.5rem;">
                        Aucune actualité ne correspond à votre recherche "<strong>${searchTerm}</strong>"
                    </p>
                    <button onclick="document.querySelector('.search-form input').value = ''; document.querySelector('.search-form button').click();" 
                            class="btn" style="font-size: 0.9rem; padding: 0.8rem 1.5rem;">
                        Voir toutes les actualités
                    </button>
                </div>
            `;

            const newsGrid = document.querySelector('.news-grid');
            newsGrid.parentNode.insertBefore(noResultsDiv, newsGrid.nextSibling);
        }

        function hideNoResultsMessage() {
            const existingMessage = document.querySelector('.no-results-message');
            if (existingMessage) {
                existingMessage.remove();
            }
        }

        // Événement sur le bouton de recherche
        searchButton.addEventListener('click', function (e) {
            e.preventDefault();
            const searchTerm = searchInput.value;
            performSearch(searchTerm);
        });

        // Recherche en temps réel (optionnel)
        searchInput.addEventListener('input', function () {
            const searchTerm = this.value;
            // Attendre un peu avant de chercher pour éviter trop d'appels
            clearTimeout(this.searchTimeout);
            this.searchTimeout = setTimeout(() => {
                performSearch(searchTerm);
            }, 300);
        });

        // Recherche avec Enter
        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const searchTerm = this.value;
                performSearch(searchTerm);
            }
        });
    }

    // Fonction pour les archives par mois
    function initArchives() {
        const archiveLinks = document.querySelectorAll('.archive-links a');

        if (archiveLinks.length === 0) {
            return; // Pas de liens d'archives
        }

        // Données simulées d'articles par mois
        const articlesByMonth = {
            'septembre-2025': [
                {
                    title: 'FC Fulbert 4-1 Lyon : Victor Martinez signe un triplé historique',
                    date: '2025-09-28',
                    category: 'matchs',
                    excerpt: 'Performance exceptionnelle du buteur international français...'
                },
                {
                    title: 'Mamadou Keita prolonge jusqu\'en 2028',
                    date: '2025-09-26',
                    category: 'transferts',
                    excerpt: 'Le capitaine et défenseur central international français...'
                },
                {
                    title: 'Tirage Ligue des Champions : FC Fulbert vs Borussia Dortmund',
                    date: '2025-09-24',
                    category: 'matchs',
                    excerpt: 'Le FC Fulbert Chartres affrontera le Borussia Dortmund...'
                }
            ],
            'aout-2025': [
                {
                    title: 'Mercato : Arrivée d\'Alexis Dubois en provenance de Nantes',
                    date: '2025-08-30',
                    category: 'transferts',
                    excerpt: 'Le milieu offensif rejoint le FC Fulbert pour 8 millions d\'euros...'
                },
                {
                    title: 'Stage de préparation réussi en Autriche',
                    date: '2025-08-15',
                    category: 'club',
                    excerpt: '3 victoires en 3 matchs amicaux pour préparer la nouvelle saison...'
                }
            ],
            'juillet-2025': [
                {
                    title: 'Présentation de Laurent Charlemagne comme nouvel entraîneur',
                    date: '2025-07-20',
                    category: 'club',
                    excerpt: 'L\'ancien international français prend les rênes de l\'équipe...'
                },
                {
                    title: 'Tournée estivale : 4 matchs amicaux programmés',
                    date: '2025-07-10',
                    category: 'club',
                    excerpt: 'Le FC Fulbert disputera des amicaux contre des clubs européens...'
                }
            ],
            'juin-2025': [
                {
                    title: 'Bilan de saison : objectifs atteints avec la 2e place',
                    date: '2025-06-15',
                    category: 'club',
                    excerpt: 'Retour sur une saison réussie avec la qualification en Ligue des Champions...'
                }
            ],
            'mai-2025': [
                {
                    title: 'Finale de Coupe de France : FC Fulbert 2-1 Marseille',
                    date: '2025-05-25',
                    category: 'matchs',
                    excerpt: 'Quatrième Coupe de France de l\'histoire du club chartrain...'
                }
            ],
            'avril-2025': [
                {
                    title: 'Record d\'affluence au Stade Fulbert : 36,500 spectateurs',
                    date: '2025-04-20',
                    category: 'club',
                    excerpt: 'Nouveau record pour le derby contre Orléans...'
                }
            ]
        };

        function displayArchiveArticles(monthKey, monthName) {
            const articles = articlesByMonth[monthKey] || [];
            const newsGrid = document.querySelector('.news-grid');
            const featuredNews = document.querySelector('.featured-news');

            // Masquer l'article à la une
            if (featuredNews) {
                featuredNews.style.display = 'none';
            }

            // Vider la grille actuelle
            newsGrid.innerHTML = '';

            if (articles.length === 0) {
                newsGrid.innerHTML = `
                    <div style="grid-column: 1/-1; text-align: center; padding: 3rem; background: var(--light-gray); border-radius: 15px;">
                        <h3 style="color: var(--primary); margin-bottom: 1rem;">Aucune actualité</h3>
                        <p style="color: var(--gray); margin-bottom: 1.5rem;">
                            Aucune actualité disponible pour ${monthName}
                        </p>
                        <button onclick="showAllNews()" class="btn" style="font-size: 0.9rem; padding: 0.8rem 1.5rem;">
                            Voir toutes les actualités
                        </button>
                    </div>
                `;
                return;
            }

            // Créer un titre pour les archives
            const archiveTitle = document.createElement('div');
            archiveTitle.className = 'archive-title';
            archiveTitle.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; margin-bottom: 2rem;">
                    <h2 style="color: var(--primary); font-size: 1.8rem; margin-bottom: 1rem;">
                        Archives - ${monthName}
                    </h2>
                    <button onclick="showAllNews()" class="btn btn-secondary" style="font-size: 0.9rem; padding: 0.8rem 1.5rem;">
                        ← Retour aux actualités récentes
                    </button>
                </div>
            `;
            newsGrid.appendChild(archiveTitle);

            // Afficher les articles du mois
            articles.forEach(article => {
                const articleElement = document.createElement('article');
                articleElement.className = `news-article ${article.category}`;
                articleElement.innerHTML = `
                    <div class="article-image">
                        <div style="width: 100%; height: 200px; background: var(--gradient-primary); display: flex; align-items: center; justify-content: center; color: var(--light); font-size: 3rem;">
                            📰
                        </div>
                    </div>
                    <div class="article-content">
                        <div class="article-category ${article.category}">${getCategoryName(article.category)}</div>
                        <time class="article-date" datetime="${article.date}">${formatDate(article.date)}</time>
                        <h3>
                            <a href="#${article.title.toLowerCase().replace(/\s+/g, '-')}">${article.title}</a>
                        </h3>
                        <p>${article.excerpt}</p>
                        <div class="article-footer">
                            <span class="author">Par Rédaction FC Fulbert</span>
                            <span class="reading-time">2 min</span>
                        </div>
                    </div>
                `;
                newsGrid.appendChild(articleElement);
            });
        }

        function getCategoryName(category) {
            const categories = {
                'matchs': 'MATCHS',
                'transferts': 'MERCATO',
                'interviews': 'INTERVIEW',
                'formation': 'FORMATION',
                'club': 'VIE DU CLUB'
            };
            return categories[category] || 'ACTUALITÉ';
        }

        function formatDate(dateString) {
            const date = new Date(dateString);
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            return date.toLocaleDateString('fr-FR', options);
        }

        // Fonction globale pour revenir aux actualités récentes
        window.showAllNews = function () {
            location.reload(); // Solution simple pour revenir à l'état initial
        };

        // Ajouter les événements aux liens d'archives
        archiveLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();

                // Retirer la classe active de tous les liens
                archiveLinks.forEach(l => l.classList.remove('active-archive'));
                // Ajouter la classe active au lien cliqué
                this.classList.add('active-archive');

                const href = this.getAttribute('href').substring(1); // Enlever le #
                const monthName = this.textContent;

                displayArchiveArticles(href, monthName);

                // Faire défiler vers les résultats
                document.querySelector('.news-grid').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            });
        });
    }

    // Fonction pour animer l'apparition des actualités au scroll
    function initScrollAnimations() {
        const newsArticles = document.querySelectorAll('.news-article');

        if (newsArticles.length === 0) {
            return; // Pas sur la page actualités
        }

        function isElementInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }

        function animateOnScroll() {
            newsArticles.forEach(article => {
                if (isElementInViewport(article) && !article.classList.contains('animated')) {
                    article.classList.add('animated');
                    article.style.opacity = '1';
                    article.style.transform = 'translateY(0)';
                }
            });
        }

        // Initialiser les articles comme invisibles
        newsArticles.forEach(article => {
            if (!article.classList.contains('animated')) {
                article.style.opacity = '0';
                article.style.transform = 'translateY(30px)';
                article.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            }
        });

        // Écouter le scroll
        window.addEventListener('scroll', animateOnScroll);
        // Vérifier immédiatement au chargement
        animateOnScroll();
    }

    // Fonction pour la newsletter
    function initNewsletter() {
        const newsletterForm = document.querySelector('.newsletter-form form');

        if (!newsletterForm) {
            return; // Pas de formulaire newsletter
        }

        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const email = this.querySelector('input[type="email"]').value;
            const checkbox = this.querySelector('input[type="checkbox"]').checked;

            if (!email) {
                alert('Veuillez saisir votre adresse email.');
                return;
            }

            if (!checkbox) {
                alert('Veuillez accepter de recevoir la newsletter.');
                return;
            }

            // Simulation d'inscription
            const button = this.querySelector('.newsletter-btn');
            const originalText = button.textContent;

            button.textContent = 'Inscription en cours...';
            button.disabled = true;

            setTimeout(() => {
                button.textContent = 'Inscription réussie !';
                button.style.background = '#4CAF50';

                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                    button.style.background = '';
                    this.reset();
                }, 3000);
            }, 1500);
        });
    }

    // Initialiser toutes les fonctionnalités
    initNewsFilter();
    initNewsSearch();
    initArchives();
    initScrollAnimations();
    initNewsletter();

    // Fonction existante pour le menu mobile (si elle n'existe pas déjà)
    if (typeof window.toggleMenu === 'undefined') {
        window.toggleMenu = function () {
            const nav = document.getElementById('nav-menu');
            const button = document.querySelector('.mobile-menu');

            nav.classList.toggle('show');
            const isExpanded = nav.classList.contains('show');
            button.setAttribute('aria-expanded', isExpanded);
        };
    }
});

// CSS supplémentaire pour les animations (à ajouter au style.css)
const additionalCSS = `
/* Animations pour le filtrage des actualités */
.news-article {
    transition: opacity 0.5s ease, transform 0.5s ease;
}

.news-article.hidden {
    opacity: 0 !important;
    transform: translateY(-20px) !important;
    pointer-events: none;
}

.news-article.show {
    opacity: 1 !important;
    transform: translateY(0) !important;
}

/* Message aucun résultat */
.no-results-message {
    animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

/* Animation de chargement pour les boutons */
.filter-btn:disabled,
.newsletter-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}

/* Focus amélioré pour l'accessibilité */
.search-form input:focus,
.newsletter-form input:focus {
    box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.3);
}

/* Animation de survol pour les cartes */
.news-article:hover {
    transform: translateY(-5px) scale(1.02);
}

/* Responsive pour les filtres */
@media (max-width: 768px) {
    .filter-btn {
        font-size: 0.8rem;
        padding: 0.6rem 1.2rem;
    }
    
    .no-results-message div {
        padding: 2rem 1rem;
    }
}
`;

// Ajouter le CSS si on est dans un environnement qui le permet
if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = additionalCSS;
    document.head.appendChild(style);
}