/* ==========================================================================
   PROJET : AfriTalent - Script JavaScript Principal (main.js)
   COMMIT 6 : JS : dark mode avec localStorage, navbar dynamique au scroll
   ========================================================================== */

// Attendre que le DOM (la structure HTML) soit entièrement chargé avant d'exécuter le script
document.addEventListener('DOMContentLoaded', () => {
    
    // Initialisation des fonctionnalités
    initDarkMode();
    initDynamicNavbar();
    initBackToTop();
});

/* --------------------------------------------------------------------------
   1. FONCTION : DARK MODE / LIGHT MODE (Avec persistance localStorage)
   -------------------------------------------------------------------------- */
function initDarkMode() {
    const toggleButton = document.getElementById('darkModeToggle');
    
    // Sécurité : on vérifie que le bouton existe sur la page avant de poursuivre
    if (!toggleButton) return;

    // 1.1. Vérifier si un choix de thème a déjà été sauvegardé précédemment
    const savedTheme = localStorage.getItem('theme');
    
    // 1.2. Appliquer le thème sauvegardé dès le chargement de la page
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        updateDarkModeIcon(toggleButton, true);
    } else {
        document.body.classList.remove('dark-theme');
        updateDarkModeIcon(toggleButton, false);
    }

    // 1.3. Écouteur d'événement sur le clic du bouton toggle
    toggleButton.addEventListener('click', () => {
        // Basculer (ajouter/supprimer) la classe sur le body
        const isDark = document.body.classList.toggle('dark-theme');
        
        // Sauvegarder le nouveau choix de l'utilisateur dans le localStorage
        if (isDark) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
        
        // Mettre à jour l'icône visuelle du bouton
        updateDarkModeIcon(toggleButton, isDark);
    });
}

// Fonction utilitaire pour changer l'icône du bouton (Lune / Soleil)
function updateDarkModeIcon(button, isDark) {
    const icon = button.querySelector('i');
    if (icon) {
        if (isDark) {
            icon.className = 'fas fa-sun'; // Icône soleil si le mode sombre est actif
        } else {
            icon.className = 'fas fa-moon'; // Icône lune si le mode clair est actif
        }
    }
}

/* --------------------------------------------------------------------------
   2. FONCTION : NAVBAR DYNAMIQUE AU SCROLL (Effet shrink, fond et ombre)
   -------------------------------------------------------------------------- */
function initDynamicNavbar() {
    const navbar = document.getElementById('mainNavbar');
    if (!navbar) return;

    // Écouter le défilement de la fenêtre de navigation
    window.addEventListener('scroll', () => {
        // Si l'utilisateur défile vers le bas de plus de 50 pixels
        if (window.scrollY > 50) {
            // Ajouter la classe CSS définie au Commit 4/5 pour réduire la taille et ajouter l'ombre
            navbar.classList.add('navbar-shrink');
        } else {
            // Retirer la classe lorsque l'utilisateur revient tout en haut
            navbar.classList.remove('navbar-shrink');
        }
    });
}

/* --------------------------------------------------------------------------
   3. FONCTION : BOUTON "RETOUR EN HAUT" (Back to Top avec Smooth Scroll)
   -------------------------------------------------------------------------- */
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;

    // 3.1. Gérer l'apparition/disparition du bouton au défilement
    window.addEventListener('scroll', () => {
        // Le bouton apparaît si l'utilisateur descend à plus de 300 pixels de hauteur
        if (window.scrollY > 300) {
            backToTopBtn.classList.remove('d-none'); // Supprime la classe d'invisibilité Bootstrap
        } else {
            backToTopBtn.classList.add('d-none'); // Cache le bouton s'il est en haut
        }
    });

    // 3.2. Gérer l'action de clic pour remonter en douceur
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Déclenche le défilement fluide natif (Smooth Scroll)
        });
    });
}
/* ==========================================================================
   PROJET : AfriTalent - Script JavaScript Principal (main.js)
   COMMIT 7 : JS : compteurs animés au scroll et animations fade-in des sections
   ========================================================================== */

// Attendre que la structure HTML soit entièrement chargée avant de lancer les scripts
document.addEventListener('DOMContentLoaded', () => {
    
    // Initialisations des commits précédents (Commit 6)
    initDarkMode();
    initDynamicNavbar();
    initBackToTop();

    // Nouveautés du Commit 7 : Animations au scroll
    initFadeInSections();
    initAnimatedCounters();
});

/* --------------------------------------------------------------------------
   1. FONCTION : DARK MODE / LIGHT MODE (Identique Commit 6)
   -------------------------------------------------------------------------- */
function initDarkMode() {
    const toggleButton = document.getElementById('darkModeToggle');
    if (!toggleButton) return;

    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        updateDarkModeIcon(toggleButton, true);
    } else {
        document.body.classList.remove('dark-theme');
        updateDarkModeIcon(toggleButton, false);
    }

    toggleButton.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark-theme');
        if (isDark) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
        updateDarkModeIcon(toggleButton, isDark);
    });
}

function updateDarkModeIcon(button, isDark) {
    const icon = button.querySelector('i');
    if (icon) {
        icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    }
}

/* --------------------------------------------------------------------------
   2. FONCTION : NAVBAR DYNAMIQUE AU SCROLL (Identique Commit 6)
   -------------------------------------------------------------------------- */
function initDynamicNavbar() {
    const navbar = document.getElementById('mainNavbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-shrink');
        } else {
            navbar.classList.remove('navbar-shrink');
        }
    });
}

/* --------------------------------------------------------------------------
   3. FONCTION : BOUTON "RETOUR EN HAUT" (Identique Commit 6)
   -------------------------------------------------------------------------- */
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.remove('d-none');
        } else {
            backToTopBtn.classList.add('d-none');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}


/* ==========================================================================
   NOUVEAUTÉS DU COMMIT 7 : INTERSECTION OBSERVER & ANIMATIONS VISUELLES
   ========================================================================== */

/* --------------------------------------------------------------------------
   4. FONCTION : APPARITION EN FONDU DES SECTIONS (Fade-in au Scroll)
   -------------------------------------------------------------------------- */
function initFadeInSections() {
    // Sélectionner toutes les sections portant la classe d'animation (définie au Commit 4/5)
    const sections = document.querySelectorAll('.fade-in-section');
    
    // Configuration de l'observateur : déclenche l'effet quand 15% de la section est visible
    const observerOptions = {
        root: null, // Zone d'affichage par défaut (Viewport du navigateur)
        threshold: 0.15 
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Si la section entre dans l'écran
            if (entry.isIntersecting) {
                // Ajouter la classe CSS qui bascule l'opacité à 1 et retire la translation
                entry.target.classList.add('is-visible');
                // Optionnel : on arrête d'observer la section une fois l'animation jouée
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Activer l'observation sur chaque section trouvée
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

/* --------------------------------------------------------------------------
   5. FONCTION : COMPTEURS DE STATISTIQUES ANIMÉS (0 à Valeur Cible)
   -------------------------------------------------------------------------- */
function initAnimatedCounters() {
    // Cibles : Les éléments contenant les nombres sur index.html et about.html (ex: classe .stat-number ou [data-target])
    // Pour être compatible avec vos intégrations, on cible les éléments possédant un attribut 'data-target'
    const counters = document.querySelectorAll('[data-target]');
    
    if (counters.length === 0) return;

    // Fonction qui exécute l'incrémentation fluide du nombre
    const startCounting = (counterElement) => {
        const target = +counterElement.getAttribute('data-target'); // Récupère la valeur finale (ex: 1500)
        const count = +counterElement.innerText.replace(/[^0-9]/g, ''); // Valeur initiale (souvent 0)
        
        // Vitesse d'animation : adapter le diviseur pour ajuster la fluidité
        const speed = 200; 
        const increment = target / speed;

        if (count < target) {
            // Calculer la nouvelle valeur intermédiaire
            const newValue = Math.ceil(count + increment);
            
            // Si l'élément d'origine contient un suffixe (ex: "+", "F" ou "%"), on le conserve au formatage
            if (counterElement.getAttribute('data-target').includes('+') || counterElement.innerText.includes('+')) {
                counterElement.innerText = `${newValue}+`;
            } else {
                counterElement.innerText = newValue;
            }
            
            // Rappeler la fonction au prochain rafraîchissement d'image (60 FPS)
            setTimeout(() => startCounting(counterElement), 1);
        } else {
            // Sécurité : s'assurer que la valeur finale exacte est bien affichée à la fin
            counterElement.innerText = counterElement.getAttribute('data-target');
        }
    };

    // Utilisation d'un IntersectionObserver pour ne lancer le calcul que lorsque les stats sont visibles
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounting(entry.target);
                // On stoppe l'observation pour ne pas relancer l'animation à chaque scroll
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 }); // Déclenchement dès que 50% du bloc de stats est visible

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}
/* ==========================================================================
   PROJET : AfriTalent - Script JavaScript Principal (main.js)
   COMMIT 8 : JS : filtrage dynamique des freelances et validation du formulaire
   ========================================================================== */

// Attendre que la structure HTML soit entièrement chargée avant de lancer les scripts
document.addEventListener('DOMContentLoaded', () => {
    
    // Initialisations des commits précédents (Commits 6 et 7)
    initDarkMode();
    initDynamicNavbar();
    initBackToTop();
    initFadeInSections();
    initAnimatedCounters();

    // Nouveautés du Commit 8 : Filtrage et Formulaire de contact
    initFreelanceFiltering();
    initContactFormValidation();
});

/* --------------------------------------------------------------------------
   1. FONCTION : DARK MODE / LIGHT MODE (Persistance localStorage)
   -------------------------------------------------------------------------- */
function initDarkMode() {
    const toggleButton = document.getElementById('darkModeToggle');
    if (!toggleButton) return;

    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        updateDarkModeIcon(toggleButton, true);
    } else {
        document.body.classList.remove('dark-theme');
        updateDarkModeIcon(toggleButton, false);
    }

    toggleButton.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateDarkModeIcon(toggleButton, isDark);
    });
}

function updateDarkModeIcon(button, isDark) {
    const icon = button.querySelector('i');
    if (icon) {
        icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    }
}

/* --------------------------------------------------------------------------
   2. FONCTION : NAVBAR DYNAMIQUE AU SCROLL (Effet shrink, fond et ombre)
   -------------------------------------------------------------------------- */
function initDynamicNavbar() {
    const navbar = document.getElementById('mainNavbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-shrink');
        } else {
            navbar.classList.remove('navbar-shrink');
        }
    });
}

/* --------------------------------------------------------------------------
   3. FONCTION : BOUTON "RETOUR EN HAUT" (Back to Top)
   -------------------------------------------------------------------------- */
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.remove('d-none');
        } else {
            backToTopBtn.classList.add('d-none');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* --------------------------------------------------------------------------
   4. FONCTION : APPARITION EN FONDU DES SECTIONS (IntersectionObserver)
   -------------------------------------------------------------------------- */
function initFadeInSections() {
    const sections = document.querySelectorAll('.fade-in-section');
    const observerOptions = { root: null, threshold: 0.15 };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));
}

/* --------------------------------------------------------------------------
   5. FONCTION : COMPTEURS DE STATISTIQUES ANIMÉS
   -------------------------------------------------------------------------- */
function initAnimatedCounters() {
    const counters = document.querySelectorAll('[data-target]');
    if (counters.length === 0) return;

    const startCounting = (counterElement) => {
        const target = +counterElement.getAttribute('data-target');
        const count = +counterElement.innerText.replace(/[^0-9]/g, '');
        const speed = 200; 
        const increment = target / speed;

        if (count < target) {
            const newValue = Math.ceil(count + increment);
            if (counterElement.getAttribute('data-target').includes('+') || counterElement.innerText.includes('+')) {
                counterElement.innerText = `${newValue}+`;
            } else {
                counterElement.innerText = newValue;
            }
            setTimeout(() => startCounting(counterElement), 1);
        } else {
            counterElement.innerText = counterElement.getAttribute('data-target');
        }
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounting(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
}


/* ==========================================================================
   NOUVEAUTÉS DU COMMIT 8 : FILTRAGE DYNAMIQUE ET VALIDATION CLIENT SIDE
   ========================================================================= */

/* --------------------------------------------------------------------------
   6. FONCTION : FILTRAGE DYNAMIQUE (Sur la page freelances.html)
   -------------------------------------------------------------------------- */
function initFreelanceFiltering() {
    // Cibler les boutons ou les options du filtre de catégorie (ex: sélecteur ou boutons radio/tabs)
    const filterSelect = document.getElementById('filterCategory'); // Si vous utilisez un <select>
    const filterButtons = document.querySelectorAll('.filter-btn'); // Si vous utilisez des boutons de filtres
    const freelanceCards = document.querySelectorAll('.freelance-card');

    if (freelanceCards.length === 0) return; // Sécurité si on n'est pas sur la page freelances.html

    // Fonction logique interne de masquage/affichage
    const applyFilter = (selectedCategory) => {
        freelanceCards.forEach(card => {
            // Récupérer la catégorie stockée dans l'attribut data (ex: data-category="python")
            const cardCategory = card.getAttribute('data-category');

            if (selectedCategory === 'all' || cardCategory === selectedCategory) {
                card.classList.remove('d-none'); // Affiche la carte avec l'utilitaire Bootstrap
            } else {
                card.classList.add('d-none');    // Masque la carte sans recharger la page
            }
        });
    };

    // Cas 1 : Gestion si c'est un menu déroulant <select> (Filtres latéraux/haut)
    if (filterSelect) {
        filterSelect.addEventListener('change', (e) => {
            applyFilter(e.target.value);
        });
    }

    // Cas 2 : Gestion si ce sont des boutons cliquables (Style badges ou onglets)
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                // Gérer la classe active visuelle sur les boutons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const targetCategory = button.getAttribute('data-filter');
                applyFilter(targetCategory);
            });
        });
    }
}

/* --------------------------------------------------------------------------
   7. FONCTION : VALIDATION DU FORMULAIRE DE CONTACT
   -------------------------------------------------------------------------- */
function initContactFormValidation() {
    const form = document.getElementById('contactForm');
    const successAlert = document.getElementById('contactSuccess');

    if (!form) return; // Sécurité si on n'est pas sur la page contact.html

    form.addEventListener('submit', (event) => {
        // Bloquer la soumission par défaut du navigateur pour laisser le contrôle au script JS
        event.preventDefault();
        event.stopPropagation();

        let isFormValid = true;

        // 7.1. Sélection et références des champs cibles
        const nom = document.getElementById('nom');
        const prenom = document.getElementById('prenom');
        const email = document.getElementById('email');
        const sujet = document.getElementById('sujet');
        const message = document.getElementById('message');

        // 7.2. Expression régulière (Regex) pour vérifier la structure d'un email standard
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        // --- VALIDATION CHAMP PAR CHAMP ---

        // Validation du Nom (Requis)
        if (nom.value.trim() === "") {
            setInvalid(nom);
            isFormValid = false;
        } else {
            setValid(nom);
        }

        // Validation du Prénom (Requis)
        if (prenom.value.trim() === "") {
            setInvalid(prenom);
            isFormValid = false;
        } else {
            setValid(prenom);
        }

        // Validation de l'Email (Requis + Format Regex)
        if (email.value.trim() === "" || !emailRegex.test(email.value.trim())) {
            setInvalid(email);
            isFormValid = false;
        } else {
            setValid(email);
        }

        // Validation du Sujet (Requis - Sélection dans la liste déroulante)
        if (sujet.value === "" || sujet.value === null) {
            setInvalid(sujet);
            isFormValid = false;
        } else {
            setValid(sujet);
        }

        // Validation du Message (Requis + Longueur minimum de 20 caractères)
        if (message.value.trim().length < 20) {
            setInvalid(message);
            isFormValid = false;
        } else {
            setValid(message);
        }

        // 7.3. Gestion finale du statut du formulaire
        if (isFormValid) {
            // Afficher le bandeau de succès (retrait de d-none)
            if (successAlert) {
                successAlert.classList.remove('d-none');
                // Optionnel : masquer automatiquement le bandeau au bout de 5 secondes
                setTimeout(() => successAlert.classList.add('d-none'), 5000);
            }

            // Réinitialiser le formulaire et effacer les classes de validation vertes
            form.reset();
            clearValidationClasses(form);
        } else {
            // Si invalide, masquer le message de succès au cas où il était visible
            if (successAlert) successAlert.classList.add('d-none');
        }
    });
}

/* --- FONCTIONS UTILITAIRES DE VALIDATION INTERFACE GRAPHIQUE (Bootstrap 5) --- */

// Applique le style d'erreur visuel rouge natif de Bootstrap
function setInvalid(element) {
    element.classList.remove('is-valid');
    element.classList.add('is-invalid');
}

// Applique le style de succès visuel vert natif de Bootstrap
function setValid(element) {
    element.classList.remove('is-invalid');
    element.classList.add('is-valid');
}

// Nettoie l'affichage après une soumission réussie
function clearValidationClasses(formElement) {
    const validatedElements = formElement.querySelectorAll('.is-valid, .is-invalid');
    validatedElements.forEach(el => {
        el.classList.remove('is-valid', 'is-invalid');
    });
}