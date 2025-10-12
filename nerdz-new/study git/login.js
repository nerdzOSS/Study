// ==================== THEME TOGGLE ====================
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference
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

// ==================== USER TYPE SELECTION ====================
const userTypeBtns = document.querySelectorAll('.user-type-btn');
let selectedUserType = 'student';

userTypeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        userTypeBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Store selected type
        selectedUserType = btn.dataset.type;
    });
});

// ==================== PASSWORD TOGGLE ====================
const togglePasswordBtn = document.querySelector('.toggle-password');
const passwordInput = document.getElementById('password');
const eyeOpen = document.querySelector('.eye-open');
const eyeClosed = document.querySelector('.eye-closed');

if (togglePasswordBtn) {
    togglePasswordBtn.addEventListener('click', () => {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        
        // Toggle eye icons
        eyeOpen.style.display = type === 'password' ? 'block' : 'none';
        eyeClosed.style.display = type === 'password' ? 'none' : 'block';
    });
}

// ==================== FORM SUBMISSION ====================
const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    const submitBtn = loginForm.querySelector('button[type="submit"]');
    
    // Show loading state
    const originalBtnContent = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
            <circle cx="12" cy="12" r="10" stroke-opacity="0.3"></circle>
            <path d="M12 2 A10 10 0 0 1 22 12"></path>
        </svg>
        <span>Signing in...</span>
    `;
    
    // Simulate API call delay
    setTimeout(() => {
        // Store user info (in real app, this would be an API call)
        const userData = {
            email,
            userType: selectedUserType,
            remember,
            loginTime: new Date().toISOString()
        };
        
        // Store in localStorage
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('isLoggedIn', 'true');
        
        // Redirect based on user type
        if (selectedUserType === 'student') {
            console.log('✅ Redirecting to Student Dashboard...');
            window.location.href = 'student.html';
        } else {
            console.log('✅ Redirecting to Teacher Dashboard...');
            window.location.href = 'teachers.html';
        }
    }, 1000);
});

// Add spin animation
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// ==================== SOCIAL LOGIN ====================
const googleBtn = document.querySelector('.google-btn');
const githubBtn = document.querySelector('.github-btn');

googleBtn.addEventListener('click', () => {
    alert('Google login would be implemented here');
});

githubBtn.addEventListener('click', () => {
    alert('GitHub login would be implemented here');
});

console.log('✨ NerdZ Login Page Loaded!');
