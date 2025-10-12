// ==================== THEME TOGGLE ====================
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Load saved theme
const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
    body.classList.add('light-mode');
}

// Toggle theme
themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    const theme = body.classList.contains('light-mode') ? 'light' : 'dark';
    localStorage.setItem('theme', theme);
});

// ==================== SIDEBAR TOGGLE ====================
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.getElementById('premiumSidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');

function toggleSidebar() {
    sidebar.classList.toggle('active');
    sidebarOverlay.classList.toggle('active');
    body.classList.toggle('sidebar-active');
}

function closeSidebar() {
    sidebar.classList.remove('active');
    sidebarOverlay.classList.remove('active');
    body.classList.remove('sidebar-active');
}

sidebarToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleSidebar();
});

// Close sidebar on overlay click
sidebarOverlay.addEventListener('click', closeSidebar);

// Close sidebar on nav click (mobile)
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024) {
            closeSidebar();
        }
        
        // Update active state
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Close on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('active')) {
        closeSidebar();
    }
});

// ==================== USER DATA ====================
const userData = JSON.parse(localStorage.getItem('userData'));

if (userData) {
    // Update user name
    const userName = document.querySelector('.user-profile-btn span');
    const welcomeName = document.querySelector('.welcome-content .gradient-text');
    
    if (userData.email) {
        const name = userData.email.split('@')[0];
        const displayName = name.charAt(0).toUpperCase() + name.slice(1);
        
        if (userName) userName.textContent = displayName;
        if (welcomeName) welcomeName.textContent = displayName + '!';
    }
}

// ==================== DYNAMIC GREETING ====================
function updateGreeting() {
    const hour = new Date().getHours();
    const greetingElement = document.querySelector('.welcome-content h1');
    let greeting = 'Good Morning';
    
    if (hour >= 12 && hour < 17) {
        greeting = 'Good Afternoon';
    } else if (hour >= 17) {
        greeting = 'Good Evening';
    }
    
    if (greetingElement) {
        const name = greetingElement.querySelector('.gradient-text');
        greetingElement.childNodes[0].textContent = greeting + ', ';
    }
}

updateGreeting();

// ==================== SEARCH FUNCTIONALITY ====================
const searchInput = document.querySelector('.premium-search input');

// Keyboard shortcut for search
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInput.focus();
    }
});

searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    console.log('Searching:', query);
    // In real app, this would filter content
});

// ==================== ANIMATIONS ====================
// Animate cards on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.priority-card, .course-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// ==================== LIVE CLOCK ====================
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    // Update if there's a clock element
    const clockElement = document.querySelector('.live-clock');
    if (clockElement) {
        clockElement.textContent = timeString;
    }
}

updateClock();
setInterval(updateClock, 1000);

// ==================== PROGRESS ANIMATION ====================
function animateProgress() {
    document.querySelectorAll('.progress-bar-fill, .stat-progress, .course-progress-bar').forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 200);
    });
}

// Animate on load
window.addEventListener('load', () => {
    setTimeout(animateProgress, 500);
});

// ==================== QUICK ACTIONS ====================
const quickActions = document.querySelectorAll('.quick-action-card');

quickActions.forEach(action => {
    action.addEventListener('click', () => {
        const text = action.querySelector('.action-text').textContent;
        console.log('Quick action:', text);
        // In real app, this would trigger modals/actions
    });
});

// ==================== COURSE CONTINUE ====================
document.querySelectorAll('.course-continue-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const courseName = btn.closest('.course-card').querySelector('h3').textContent;
        console.log('Continue course:', courseName);
        // In real app, this would navigate to course
    });
});

// ==================== RESPONSIVE UPDATES ====================
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth > 1024) {
            sidebar.classList.remove('active');
            body.classList.remove('sidebar-active');
        }
    }, 250);
});

console.log('✨ Premium NerdZ Dashboard Loaded!');
