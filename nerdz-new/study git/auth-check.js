// Authentication Check Script
// Add this to dashboard pages to ensure user is logged in

(function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const currentPage = window.location.pathname.split('/').pop();
    
    // Check if user is logged in
    if (!isLoggedIn || isLoggedIn !== 'true') {
        console.log('❌ Not logged in. Redirecting to login...');
        window.location.href = 'login.html';
        return;
    }
    
    // Check if user is on correct dashboard
    if (currentPage === 'student-dashboard.html' && userData.userType !== 'student') {
        console.log('⚠️ Wrong dashboard type. Redirecting...');
        window.location.href = 'teachers.html';
        return;
    }
    
    if ((currentPage === 'teachers.html' || currentPage === 'teacher-dashboard.html') && userData.userType !== 'teacher') {
        console.log('⚠️ Wrong dashboard type. Redirecting...');
        window.location.href = 'student-dashboard.html';
        return;
    }
    
    // Display user info in console
    console.log('✅ Authenticated as:', userData.userType);
    console.log('📧 Email:', userData.email);
    console.log('🕐 Login time:', new Date(userData.loginTime).toLocaleString());
    
    // Optional: Add user info to page
    const userEmail = document.querySelector('.user-email');
    if (userEmail) {
        userEmail.textContent = userData.email;
    }
})();

// Logout function
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userData');
        console.log('👋 Logged out successfully');
        window.location.href = 'login.html';
    }
}

// Add logout button functionality if exists
document.addEventListener('DOMContentLoaded', () => {
    const logoutBtns = document.querySelectorAll('[data-logout], .logout-btn, #logoutBtn');
    logoutBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    });
});
