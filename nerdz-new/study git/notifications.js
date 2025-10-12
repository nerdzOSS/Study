// Notifications Page JavaScript

const tabBtns = document.querySelectorAll('.tab-btn');
const notificationItems = document.querySelectorAll('.notification-item');
const emptyState = document.getElementById('emptyState');
const markAllReadBtn = document.getElementById('markAllRead');
const clearAllBtn = document.getElementById('clearAll');

// Tab filtering
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        filterNotifications(filter);
    });
});

function filterNotifications(filter) {
    let visibleCount = 0;
    
    notificationItems.forEach(item => {
        const type = item.dataset.type;
        const isUnread = item.classList.contains('unread');
        
        let shouldShow = false;
        
        if (filter === 'all') {
            shouldShow = true;
        } else if (filter === 'unread') {
            shouldShow = isUnread;
        } else {
            shouldShow = type === filter;
        }
        
        if (shouldShow) {
            item.style.display = 'grid';
            visibleCount++;
        } else {
            item.style.display = 'none';
        }
    });
    
    emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
}

// Mark all as read
markAllReadBtn.addEventListener('click', () => {
    notificationItems.forEach(item => {
        item.classList.remove('unread');
    });
    
    updateCounts();
    showToast('All notifications marked as read', 'success');
});

// Clear all
clearAllBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all notifications?')) {
        notificationItems.forEach(item => {
            item.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                item.remove();
            }, 300);
        });
        
        setTimeout(() => {
            emptyState.style.display = 'block';
            updateCounts();
        }, 400);
    }
});

// Action buttons
document.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const action = btn.dataset.action;
        const notificationItem = btn.closest('.notification-item');
        const notificationId = notificationItem.dataset.id;
        
        if (action === 'view') {
            console.log('Viewing notification:', notificationId);
            notificationItem.classList.remove('unread');
            updateCounts();
        } else if (action === 'dismiss') {
            notificationItem.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                notificationItem.remove();
                updateCounts();
                checkEmpty();
            }, 300);
        }
    });
});

// Mark as read when clicked
notificationItems.forEach(item => {
    item.addEventListener('click', (e) => {
        if (!e.target.closest('.action-btn')) {
            item.classList.remove('unread');
            updateCounts();
        }
    });
});

// Update notification counts
function updateCounts() {
    const allCount = document.querySelectorAll('.notification-item').length;
    const unreadCount = document.querySelectorAll('.notification-item.unread').length;
    const assignmentsCount = document.querySelectorAll('.notification-item[data-type="assignments"]').length;
    const gradesCount = document.querySelectorAll('.notification-item[data-type="grades"]').length;
    const announcementsCount = document.querySelectorAll('.notification-item[data-type="announcements"]').length;
    
    tabBtns.forEach(btn => {
        const filter = btn.dataset.filter;
        const countElement = btn.querySelector('.tab-count');
        
        if (filter === 'all') {
            countElement.textContent = allCount;
        } else if (filter === 'unread') {
            countElement.textContent = unreadCount;
            countElement.classList.toggle('new', unreadCount > 0);
        } else if (filter === 'assignments') {
            countElement.textContent = assignmentsCount;
        } else if (filter === 'grades') {
            countElement.textContent = gradesCount;
        } else if (filter === 'announcements') {
            countElement.textContent = announcementsCount;
        }
    });
}

function checkEmpty() {
    const remainingItems = document.querySelectorAll('.notification-item').length;
    emptyState.style.display = remainingItems === 0 ? 'block' : 'none';
}

// Toast notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-icon">${type === 'success' ? '✅' : '❌'}</div>
        <div class="toast-message">${message}</div>
    `;
    
    let container = document.getElementById('toastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    
    container.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Add slide out animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
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

// Initial count update
updateCounts();

console.log('✨ Notifications Page Loaded!');
