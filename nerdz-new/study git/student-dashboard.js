// Student Dashboard JavaScript

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
    });

    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-mode');
    }
}

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const dashboardSidebar = document.getElementById('dashboardSidebar') || document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const hamburger = document.getElementById('hamburger');
const sidebarClose = document.getElementById('sidebarClose');

// Hamburger menu for mobile
if (hamburger && dashboardSidebar) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        dashboardSidebar.classList.toggle('active');
        document.querySelector('.nav-links')?.classList.toggle('active');
    });
}

// Sidebar close button
if (sidebarClose && dashboardSidebar) {
    sidebarClose.addEventListener('click', () => {
        dashboardSidebar.classList.remove('active');
        hamburger?.classList.remove('active');
    });
}

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        dashboardSidebar.classList.toggle('active');
        sidebarOverlay?.classList.toggle('active');
    });
}

if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', () => {
        dashboardSidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        if (mobileMenuToggle) {
            mobileMenuToggle.classList.remove('active');
        }
    });
}

// Close sidebar when clicking nav link on mobile
document.querySelectorAll('.nav-item, .menu-item').forEach(item => {
    item.addEventListener('click', () => {
        if (window.innerWidth <= 968) {
            dashboardSidebar.classList.remove('active');
            sidebarOverlay?.classList.remove('active');
            hamburger?.classList.remove('active');
            if (mobileMenuToggle) {
                mobileMenuToggle.classList.remove('active');
            }
        }
    });
});

// Display User Name
const userData = JSON.parse(localStorage.getItem('userData') || '{}');
const userNameElement = document.querySelector('.user-name');
if (userNameElement && userData.email) {
    const userName = userData.email.split('@')[0];
    userNameElement.textContent = userName.charAt(0).toUpperCase() + userName.slice(1);
}

// Greeting based on time
function updateGreeting() {
    const hour = new Date().getHours();
    const greetingElement = document.querySelector('.dashboard-title');
    if (!greetingElement) return;

    let greeting = 'Good Morning';
    if (hour >= 12 && hour < 17) {
        greeting = 'Good Afternoon';
    } else if (hour >= 17) {
        greeting = 'Good Evening';
    }

    const currentText = greetingElement.innerHTML;
    const newText = currentText.replace(/Good (Morning|Afternoon|Evening)/, greeting);
    greetingElement.innerHTML = newText;
}

updateGreeting();

// Progress Bar Animation
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill, .progress-bar, .course-progress-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0%';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    progressBars.forEach(bar => observer.observe(bar));
}

// Call animation on load
setTimeout(animateProgressBars, 500);

// Countdown Timer for Assignments
function updateCountdowns() {
    const countdownElements = document.querySelectorAll('.due-time');
    
    countdownElements.forEach(element => {
        const text = element.textContent;
        
        if (text.includes('6 hours')) {
            element.innerHTML = '⏰ <span style="color: #ef4444; font-weight: 700;">6 hours left</span>';
        }
    });
}

updateCountdowns();

// Search Functionality
const searchInput = document.querySelector('.search-box input');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        console.log('Searching for:', searchTerm);
        // Implement search logic here
    });

    // Keyboard shortcut Ctrl+K
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
        }
    });
}

// Quick Action Buttons
document.querySelectorAll('.quick-action-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const action = btn.textContent.trim();
        console.log('Quick action:', action);
        // Implement quick action logic
    });
});

// Assignment Start Buttons
document.querySelectorAll('.assignment-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const assignmentName = e.target.closest('.assignment-item').querySelector('h4').textContent;
        console.log('Starting assignment:', assignmentName);
        // Implement assignment start logic
    });
});

// Course Continue Buttons
document.querySelectorAll('.course-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const courseName = e.target.closest('.course-card').querySelector('h3').textContent;
        console.log('Continuing course:', courseName);
        // Implement course continue logic
    });
});

// Card Action Buttons
document.querySelectorAll('.card-action-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const cardTitle = btn.closest('.content-card').querySelector('h3').textContent;
        console.log('Card action:', cardTitle);
        // Implement card action logic
    });
});

// Study Timer functionality (placeholder)
function startStudyTimer() {
    let seconds = 0;
    let minutes = 0;
    let hours = 0;
    
    const timer = setInterval(() => {
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        if (minutes === 60) {
            minutes = 0;
            hours++;
        }
        
        // Update display
        console.log(`Study Time: ${hours}h ${minutes}m ${seconds}s`);
        
        // You can update a timer display element here
    }, 1000);
    
    // Store timer reference to stop it later
    return timer;
}

// Notification badge pulse animation
const notificationDot = document.querySelector('.notification-dot');
if (notificationDot) {
    setInterval(() => {
        notificationDot.style.animation = 'none';
        setTimeout(() => {
            notificationDot.style.animation = 'pulse 2s infinite';
        }, 10);
    }, 5000);
}

// Add pulse animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
            opacity: 1;
        }
        50% {
            transform: scale(1.2);
            opacity: 0.8;
        }
    }
    
    .notification-dot {
        animation: pulse 2s infinite;
    }
`;
document.head.appendChild(style);

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth > 968) {
            dashboardSidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
            if (mobileMenuToggle) {
                mobileMenuToggle.classList.remove('active');
            }
        }
    }, 250);
});

// Page visibility - pause animations when tab is not active
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('Dashboard hidden - pausing updates');
    } else {
        console.log('Dashboard visible - resuming updates');
        updateGreeting();
        updateCountdowns();
    }
});

// Initialize tooltips (if needed)
function initTooltips() {
    const elements = document.querySelectorAll('[data-tooltip]');
    elements.forEach(element => {
        element.addEventListener('mouseenter', (e) => {
            const tooltip = e.target.getAttribute('data-tooltip');
            console.log('Tooltip:', tooltip);
            // Show tooltip
        });
    });
}

initTooltips();

// Log successful load
console.log('✨ Student Dashboard Loaded Successfully!');
console.log('📊 User:', userData.email || 'Guest');
console.log('🎓 Dashboard ready for use!');
