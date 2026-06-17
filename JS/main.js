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