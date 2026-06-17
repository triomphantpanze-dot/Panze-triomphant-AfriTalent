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