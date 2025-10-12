const contactForm = document.getElementById('contactForm');
const submitText = document.getElementById('submitText');
const submitLoader = document.getElementById('submitLoader');
const toastContainer = document.getElementById('toastContainer');

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-icon">${type === 'success' ? '✅' : '❌'}</div>
        <div class="toast-message">${message}</div>
    `;
    toastContainer.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    submitText.style.display = 'none';
    submitLoader.style.display = 'flex';
    contactForm.querySelector('button[type="submit"]').disabled = true;
    
    console.log('Form Data:', { name, email, subject, message });
    
    setTimeout(() => {
        submitText.style.display = 'block';
        submitLoader.style.display = 'none';
        contactForm.querySelector('button[type="submit"]').disabled = false;
        
        showToast('Message sent successfully! We\'ll get back to you soon.', 'success');
        contactForm.reset();
    }, 1500);
});
