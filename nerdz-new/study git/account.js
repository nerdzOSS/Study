// Account Management JavaScript

const resetPasswordForm = document.getElementById('resetPasswordForm');
const forgotPasswordForm = document.getElementById('forgotPasswordForm');
const logoutBtn = document.getElementById('logoutBtn');
const logoutAllBtn = document.getElementById('logoutAllBtn');
const deleteAccountBtn = document.getElementById('deleteAccountBtn');
const enable2FABtn = document.getElementById('enable2FABtn');
const deleteModal = document.getElementById('deleteModal');
const closeDeleteModal = document.getElementById('closeDeleteModal');
const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
const deleteConfirmInput = document.getElementById('deleteConfirmInput');
const toastContainer = document.getElementById('toastContainer');

// Load user data
const userData = JSON.parse(localStorage.getItem('userData') || '{}');
const userEmailElement = document.querySelector('.user-email');
const loginTimeElement = document.querySelector('.login-time');

if (userEmailElement && userData.email) {
    userEmailElement.textContent = userData.email;
}

if (loginTimeElement && userData.loginTime) {
    const loginDate = new Date(userData.loginTime);
    loginTimeElement.textContent = loginDate.toLocaleString();
}

// Toast function
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : '⚠️'}</div>
        <div class="toast-message">${message}</div>
    `;
    toastContainer.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Reset Password
resetPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const resetText = document.getElementById('resetText');
    const resetLoader = document.getElementById('resetLoader');
    
    if (newPassword !== confirmPassword) {
        showToast('Passwords do not match', 'error');
        return;
    }
    
    if (newPassword.length < 6) {
        showToast('Password must be at least 6 characters', 'error');
        return;
    }
    
    resetText.style.display = 'none';
    resetLoader.style.display = 'flex';
    
    setTimeout(() => {
        resetText.style.display = 'block';
        resetLoader.style.display = 'none';
        showToast('Password reset successfully!', 'success');
        resetPasswordForm.reset();
    }, 1500);
});

// Forgot Password
forgotPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('resetEmail').value;
    const forgotText = document.getElementById('forgotText');
    const forgotLoader = document.getElementById('forgotLoader');
    
    forgotText.style.display = 'none';
    forgotLoader.style.display = 'flex';
    
    setTimeout(() => {
        forgotText.style.display = 'block';
        forgotLoader.style.display = 'none';
        showToast(`Reset link sent to ${email}`, 'success');
        forgotPasswordForm.reset();
    }, 1500);
});

// Logout
logoutBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to logout?')) {
        showToast('Logging out...', 'success');
        setTimeout(() => {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userData');
            window.location.href = 'login.html';
        }, 1000);
    }
});

// Logout All Devices
logoutAllBtn.addEventListener('click', () => {
    if (confirm('Logout from all devices?')) {
        showToast('Logged out from all devices', 'success');
        setTimeout(() => {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userData');
            window.location.href = 'login.html';
        }, 1500);
    }
});

// Enable 2FA
enable2FABtn.addEventListener('click', () => {
    showToast('Two-Factor Authentication setup coming soon!', 'success');
});

// Delete Account Modal
deleteAccountBtn.addEventListener('click', () => {
    deleteModal.classList.add('active');
});

closeDeleteModal.addEventListener('click', () => {
    deleteModal.classList.remove('active');
    deleteConfirmInput.value = '';
    confirmDeleteBtn.disabled = true;
});

cancelDeleteBtn.addEventListener('click', () => {
    deleteModal.classList.remove('active');
    deleteConfirmInput.value = '';
    confirmDeleteBtn.disabled = true;
});

deleteModal.addEventListener('click', (e) => {
    if (e.target === deleteModal) {
        deleteModal.classList.remove('active');
        deleteConfirmInput.value = '';
        confirmDeleteBtn.disabled = true;
    }
});

// Enable delete button when typing DELETE
deleteConfirmInput.addEventListener('input', (e) => {
    confirmDeleteBtn.disabled = e.target.value !== 'DELETE';
});

// Confirm Delete
confirmDeleteBtn.addEventListener('click', () => {
    if (deleteConfirmInput.value === 'DELETE') {
        showToast('Deleting account...', 'error');
        setTimeout(() => {
            localStorage.clear();
            window.location.href = 'index.html';
        }, 2000);
    }
});

// Add spinner and toast styles
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    
    .toast-container {
        position: fixed;
        top: 2rem;
        right: 2rem;
        z-index: 10000;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    
    .toast {
        background: var(--card-bg);
        border: 1px solid var(--border-color);
        border-radius: 16px;
        padding: 1rem 1.5rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(10px);
        min-width: 300px;
        opacity: 0;
        transform: translateX(400px);
        transition: all 0.3s ease;
    }
    
    .toast.show {
        opacity: 1;
        transform: translateX(0);
    }
    
    .toast-icon {
        font-size: 1.5rem;
    }
    
    .toast-message {
        color: var(--text-primary);
        font-size: 0.95rem;
        font-weight: 500;
    }
    
    .toast-success {
        border-left: 4px solid #10b981;
    }
    
    .toast-error {
        border-left: 4px solid #ef4444;
    }
    
    .toast-warning {
        border-left: 4px solid #f59e0b;
    }
    
    @media (max-width: 768px) {
        .toast-container {
            top: 1rem;
            right: 1rem;
            left: 1rem;
        }
        
        .toast {
            min-width: auto;
            width: 100%;
        }
    }
`;
document.head.appendChild(style);

console.log('✨ Account Management Page Loaded!');
