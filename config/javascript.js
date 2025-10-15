const burger = document.getElementById('burger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-menu li a');

burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        burger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});














let currentVideo = '';

const videoData = {
    'video1': {
        title: 'Façade principale Castellana'
    },
    'video2': {
        title: 'Place Sagrados Corazones'
    },
    'video3': {
        title: 'Carrefour de la Castellana avec Rafael Salgado'
    },
    'video4': {
        title: 'Carrefour de Padre Damián avec Rafael Salgado'
    }
};

function openVideo(title, videoId) {
    currentVideo = videoId;
    const modal = document.getElementById('videoModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    loadVideo(videoId);
}

function switchVideo(videoId) {
    // Arrêter la vidéo actuelle
    if (currentVideo) {
        const oldVideo = document.getElementById(currentVideo);
        if (oldVideo) {
            oldVideo.pause();
            oldVideo.currentTime = 0;
        }
    }

    currentVideo = videoId;
    loadVideo(videoId);
}

function loadVideo(videoId) {
    const videoTitle = document.getElementById('videoTitle');
    const data = videoData[videoId];

    videoTitle.textContent = data.title;

    // Masquer toutes les vidéos
    document.querySelectorAll('.video-player').forEach(video => {
        video.classList.remove('active');
        video.pause();
    });

    // Afficher la vidéo sélectionnée
    const selectedVideo = document.getElementById(videoId);
    selectedVideo.classList.add('active');
    selectedVideo.play();

    // Mettre à jour les boutons actifs
    document.querySelectorAll('.nav-video-btn').forEach((btn, index) => {
        btn.classList.remove('active');
        if (videoId === `video${index + 1}`) {
            btn.classList.add('active');
        }
    });
}

function closeVideo() {
    const modal = document.getElementById('videoModal');

    // Arrêter toutes les vidéos
    document.querySelectorAll('.video-player').forEach(video => {
        video.pause();
        video.currentTime = 0;
        video.classList.remove('active');
    });

    modal.classList.remove('active');
    document.body.style.overflow = 'auto';

    // Réinitialiser les boutons actifs
    document.querySelectorAll('.nav-video-btn').forEach(btn => {
        btn.classList.remove('active');
    });
}

// Fermer la modal en cliquant en dehors
document.getElementById('videoModal').addEventListener('click', function (e) {
    if (e.target === this) {
        closeVideo();
    }
});

// Fermer avec la touche Échap
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeVideo();
    }
});













let currentIndex = 0;
const carousel = document.getElementById('carousel');
const cards = document.querySelectorAll('.joueur-card');
const totalCards = cards.length;
let cardsPerView = 3;

// Calculer le nombre de cartes visibles selon la taille d'écran
function updateCardsPerView() {
    if (window.innerWidth <= 768) {
        cardsPerView = 1;
    } else if (window.innerWidth <= 1024) {
        cardsPerView = 2;
    } else {
        cardsPerView = 3;
    }
    updateCarousel();
    createIndicators();
}

function moveCarousel(direction) {
    const maxIndex = Math.max(0, totalCards - cardsPerView);
    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = maxIndex;
    } else if (currentIndex > maxIndex) {
        currentIndex = 0;
    }

    updateCarousel();
}

function updateCarousel() {
    const cardWidth = cards[0].offsetWidth;
    const gap = 30;
    const offset = -(currentIndex * (cardWidth + gap));
    carousel.style.transform = `translateX(${offset}px)`;
    updateIndicators();
}

function createIndicators() {
    const indicatorsContainer = document.getElementById('indicators');
    indicatorsContainer.innerHTML = '';
    const numIndicators = Math.max(1, totalCards - cardsPerView + 1);

    for (let i = 0; i < numIndicators; i++) {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        if (i === currentIndex) {
            indicator.classList.add('active');
        }
        indicator.addEventListener('click', () => {
            currentIndex = i;
            updateCarousel();
        });
        indicatorsContainer.appendChild(indicator);
    }
}

function updateIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
    });
}

// Initialisation
window.addEventListener('load', () => {
    updateCardsPerView();
});

window.addEventListener('resize', () => {
    updateCardsPerView();
});

// Auto-play (optionnel)
setInterval(() => {
    moveCarousel(1);
}, 5000);