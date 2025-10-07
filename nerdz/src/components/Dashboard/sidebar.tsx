export function SideBar(){
return (    <aside className="sidebar">
    <div className="sidebar-header">
        <div className="logo">
            <svg width="35" height="35" viewBox="0 0 40 40" fill="none">
                <rect width="40" height="40" rx="8" fill="#A8D8EA"/>
                <path d="M20 10L12 15V25L20 30L28 25V15L20 10Z" fill="white"/>
                <path d="M20 20V30" stroke="white" strokeWidth="2"/>
            </svg>
            <span>NerdZ</span>
        </div>
    </div>

    <nav className="sidebar-nav">
        <a href="#" className="nav-item active" data-page="dashboard">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="2" y="2" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="11" y="2" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="2" y="11" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                <rect x="11" y="11" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            <span>Dashboard</span>
        </a>

        <a href="#" className="nav-item" data-page="courses">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="3" y="4" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="3" y1="8" x2="17" y2="8" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="7" cy="11" r="1.5" fill="currentColor"/>
            </svg>
            <span>My Courses</span>
        </a>

        <a href="#" className="nav-item" data-page="assignments">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="4" y="2" width="12" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="7" y1="6" x2="13" y2="6" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="7" y1="10" x2="13" y2="10" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="7" y1="14" x2="11" y2="14" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            <span>Assignments</span>
            <span className="badge">3</span>
        </a>

        <a href="#" className="nav-item" data-page="materials">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 4 L10 2 L16 4 L16 14 L10 16 L4 14 Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <line x1="10" y1="2" x2="10" y2="16" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            <span>Study Materials</span>
        </a>

        <a href="#" className="nav-item" data-page="grades">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M10 6 L10 10 L13 13" stroke="currentColor" strokeWidth="1.5" stroke-linecap="round"/>
            </svg>
            <span>Grades</span>
        </a>

        <a href="#" className="nav-item" data-page="calendar">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="3" y="4" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="3" y1="8" x2="17" y2="8" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="7" y1="2" x2="7" y2="6" stroke="currentColor" strokeWidth="1.5" stroke-linecap="round"/>
                <line x1="13" y1="2" x2="13" y2="6" stroke="currentColor" strokeWidth="1.5" stroke-linecap="round"/>
            </svg>
            <span>Calendar</span>
        </a>

        <a href="#" className="nav-item" data-page="notes">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M5 2 L15 2 L15 18 L5 18 Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <line x1="8" y1="6" x2="12" y2="6" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="8" y1="10" x2="12" y2="10" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="8" y1="14" x2="10" y2="14" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            <span>My Notes</span>
        </a>
    </nav>

    <div className="sidebar-footer">
        <div className="user-profile">
            <div className="user-avatar">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="20" r="20" fill="#A8D8EA"/>
                    <circle cx="20" cy="15" r="6" fill="white"/>
                    <path d="M10 32 Q10 25 20 25 Q30 25 30 32" fill="white"/>
                </svg>
            </div>
            <div className="user-info">
                <h4>Student Name</h4>
                <p>student@email.com</p>
            </div>
        </div>
        <a href="/" className="btn-logout">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M7 2 L2 2 L2 16 L7 16" stroke="currentColor" strokeWidth="1.5" stroke-linecap="round"/>
                <path d="M12 13 L16 9 L12 5" stroke="currentColor" strokeWidth="1.5" stroke-linecap="round"/>
                <line x1="16" y1="9" x2="7" y2="9" stroke="currentColor" strokeWidth="1.5" stroke-linecap="round"/>
            </svg>
            Logout
        </a>
    </div>
</aside>)
}