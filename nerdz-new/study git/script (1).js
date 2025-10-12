// ==================== THEME TOGGLE ====================
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
    body.classList.add('light-mode');
}

// Toggle theme
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        
        // Save theme preference
        const theme = body.classList.contains('light-mode') ? 'light' : 'dark';
        localStorage.setItem('theme', theme);
    });
}

// ==================== MOBILE NAVIGATION ====================
const hamburger = document.getElementById('hamburger');
const navLinksMenu = document.querySelector('.nav-links');
const mobileNavLinks = document.querySelectorAll('.nav-links a');

if (hamburger && navLinksMenu) {
    // Toggle mobile menu
    function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        navLinksMenu.classList.toggle('active');
        body.classList.toggle('menu-open');
    }

    // Close mobile menu
    function closeMobileMenu() {
        hamburger.classList.remove('active');
        navLinksMenu.classList.remove('active');
        body.classList.remove('menu-open');
    }

    // Hamburger button click
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMobileMenu();
    });

    // Close menu when clicking on links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        const isMenuOpen = navLinksMenu.classList.contains('active');
        const clickedOutside = !navLinksMenu.contains(e.target) && !hamburger.contains(e.target);
        
        if (isMenuOpen && clickedOutside) {
            closeMobileMenu();
        }
    });

    // Close menu on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinksMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

// ==================== AUTO-HIDE NAV ON SCROLL (MOBILE) ====================
const nav = document.querySelector('nav');

if (nav) {
    let lastScrollTop = 0;
    const scrollThreshold = 100;

    window.addEventListener('scroll', () => {
        // Only apply on mobile devices
        if (window.innerWidth <= 768) {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
            
            if (currentScroll > lastScrollTop && currentScroll > scrollThreshold) {
                // Scrolling down - hide nav
                nav.classList.add('nav-hidden');
            } else {
                // Scrolling up - show nav
                nav.classList.remove('nav-hidden');
            }
            
            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
        } else {
            // Remove on desktop
            nav.classList.remove('nav-hidden');
        }
    }, { passive: true });
}

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

console.log('✨ NerdZ Website Loaded!');
