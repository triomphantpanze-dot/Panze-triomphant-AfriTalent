document.addEventListener('DOMContentLoaded', () => {

    initDarkMode();
    initDynamicNavbar();
    initBackToTop();

});

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
        if (isDark) {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
}

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
function initFadeInSections() {

    const sections = document.querySelectorAll('.fade-in-section');

    const observerOptions = {
        root: null,
        threshold: 0.15
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }

        });

    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

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

            counterElement.innerText = newValue;

            setTimeout(() => startCounting(counterElement), 1);

        } else {

            counterElement.innerText = target;

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

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}
function initFreelanceFiltering() {

    const filterSelect = document.getElementById('filterCategory');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const freelanceCards = document.querySelectorAll('.freelance-card');

    if (freelanceCards.length === 0) return;

    const applyFilter = (selectedCategory) => {

        freelanceCards.forEach(card => {

            const cardCategory = card.getAttribute('data-category');

            if (
                selectedCategory === 'all' ||
                cardCategory === selectedCategory
            ) {
                card.classList.remove('d-none');
            } else {
                card.classList.add('d-none');
            }

        });

    };

    if (filterSelect) {

        filterSelect.addEventListener('change', (e) => {
            applyFilter(e.target.value);
        });

    }

    if (filterButtons.length > 0) {

        filterButtons.forEach(button => {

            button.addEventListener('click', (e) => {

                e.preventDefault();

                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                });

                button.classList.add('active');

                const targetCategory =
                    button.getAttribute('data-filter');

                applyFilter(targetCategory);

            });

        });

    }
}

function initContactFormValidation() {

    const form = document.getElementById('contactForm');

    const successAlert =
        document.getElementById('contactSuccess');

    if (!form) return;

    form.addEventListener('submit', (event) => {

        event.preventDefault();

        let isFormValid = true;

        const nom = document.getElementById('nom');
        const prenom = document.getElementById('prenom');
        const email = document.getElementById('email');
        const sujet = document.getElementById('sujet');
        const message = document.getElementById('message');

        const emailRegex =
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        if (nom.value.trim() === "") {
            setInvalid(nom);
            isFormValid = false;
        } else {
            setValid(nom);
        }

        if (prenom.value.trim() === "") {
            setInvalid(prenom);
            isFormValid = false;
        } else {
            setValid(prenom);
        }

        if (
            email.value.trim() === "" ||
            !emailRegex.test(email.value.trim())
        ) {
            setInvalid(email);
            isFormValid = false;
        } else {
            setValid(email);
        }

        if (sujet.value === "") {
            setInvalid(sujet);
            isFormValid = false;
        } else {
            setValid(sujet);
        }

        if (message.value.trim().length < 20) {
            setInvalid(message);
            isFormValid = false;
        } else {
            setValid(message);
        }

        if (isFormValid) {

            if (successAlert) {
                successAlert.classList.remove('d-none');
            }

            form.reset();

            clearValidationClasses(form);

        }
    });
}

function setInvalid(element) {
    element.classList.remove('is-valid');
    element.classList.add('is-invalid');
}

function setValid(element) {
    element.classList.remove('is-invalid');
    element.classList.add('is-valid');
}

function clearValidationClasses(formElement) {

    const validatedElements =
        formElement.querySelectorAll('.is-valid, .is-invalid');

    validatedElements.forEach(el => {

        el.classList.remove(
            'is-valid',
            'is-invalid'
        );

    });
}