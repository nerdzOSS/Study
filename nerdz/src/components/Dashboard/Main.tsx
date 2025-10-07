'use client';

import Image from "next/image"
import { useTheme } from '../../utils/theme';

export function DashboardComponent(){
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    return (    <main className="main-content">
        <header className="dashboard-header">
            <div className="header-left">
                <button className="menu-toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
            <div className="header-right">
                <div className="search-box">
<Image src="/dashboard/SearchIcon.svg" width={18} height={18} alt="search" />
                    <input type="text" placeholder="Search courses, notes, assignments..." className="nav-srh" />
                </div>
                <button className="theme-toggle" id="themeToggle" aria-label="Toggle dark mode" onClick={toggleTheme}>
                    {!isDark ? (
                        <Image src="/dashboard/MoonIcon.svg" width={20} height={20} alt="moon toggle" />
                    ) : (
                        <Image src="/dashboard/SunIcon.svg" width={20} height={20} alt="sun toggle" />
                    )}
                </button>
                <button className="notification-btn">
<Image src="/dashboard/BellIcon.svg" width={22} height={22} alt="notifications" />
                    <span className="notification-dot"></span>
                </button>
            </div>
        </header>

        <section className="stats-section">
            <div className="stat-card">
                <div className="stat-icon" style={{background:'#E8F5E9'}}>
<Image src="/dashboard/StatIcon1.svg" width={28} height={28} alt="active courses" />
                </div>
                <div className="stat-info">
                    <p className="stat-label">Active Courses</p>
                    <h3 className="stat-value">6</h3>
                    <span className="stat-change positive">+2 this month</span>
                </div>
            </div>

            <div className="stat-card">
                <div className="stat-icon" style={{background: '#FFF3E0'}}>
<Image src="/dashboard/StatIcon2.svg" width={28} height={28} alt="pending tasks" />
                </div>
                <div className="stat-info">
                    <p className="stat-label">Pending Tasks</p>
                    <h3 className="stat-value">12</h3>
                    <span className="stat-change">3 due today</span>
                </div>
            </div>

            <div className="stat-card">
                <div className="stat-icon" style={{background: '#E3F2FD'}}>
<Image src="/dashboard/StatIcon3.svg" width={28} height={28} alt="average grade" />
                </div>
                <div className="stat-info">
                    <p className="stat-label">Average Grade</p>
                    <h3 className="stat-value">87%</h3>
                    <span className="stat-change positive">+5% from last month</span>
                </div>
            </div>

            <div className="stat-card">
                <div className="stat-icon" style={{background: '#F3E5F5'}}>
<Image src="/dashboard/StatIcon4.svg" width={28} height={28} alt="study hours" />
                </div>
                <div className="stat-info">
                    <p className="stat-label">Study Hours</p>
                    <h3 className="stat-value">24h</h3>
                    <span className="stat-change">This week</span>
                </div>
            </div>
        </section>

        <div className="dashboard-grid">
            <section className="dashboard-card courses-card">
                <div className="card-header">
                    <h2>Current Courses</h2>
                    <a href="#" className="view-all">View All →</a>
                </div>
                <div className="courses-list">
                    <div className="course-item">
                        <div className="course-thumbnail" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
<Image src="/dashboard/CourseIcon1.svg" width={30} height={30} alt="clock" />
                        </div>
                        <div className="course-details">
                            <h4>Advanced Mathematics</h4>
                            <p>Prof. Sarah Johnson</p>
                            <div className="progress-bar">
                                <div className="progress-fill" style={{width: '75%'}}></div>
                            </div>
                            <span className="progress-text">75% Complete</span>
                        </div>
                    </div>

                    <div className="course-item">
                        <div className="course-thumbnail" style={{background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'}}>
<Image src="/dashboard/CourseIcon2.svg" width={30} height={30} alt="computer" />
                        </div>
                        <div className="course-details">
                            <h4>Computer Science</h4>
                            <p>Dr. Michael Chen</p>
                            <div className="progress-bar">
                                <div className="progress-fill" style={{width: '60%'}}></div>
                            </div>
                            <span className="progress-text">60% Complete</span>
                        </div>
                    </div>

                    <div className="course-item">
                        <div className="course-thumbnail" style={{background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'}}>
<Image src="/dashboard/CourseIcon3.svg" width={30} height={30} alt="physics" />
                        </div>
                        <div className="course-details">
                            <h4>Physics Fundamentals</h4>
                            <p>Prof. Emma Wilson</p>
                            <div className="progress-bar">
                                <div className="progress-fill" style={{width: '40%'}}></div>
                            </div>
                            <span className="progress-text">40% Complete</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="dashboard-card assignments-card">
                <div className="card-header">
                    <h2>Upcoming Assignments</h2>
                    <a href="#" className="view-all">View All →</a>
                </div>
                <div className="assignments-list">
                    <div className="assignment-item urgent">
                        <div className="assignment-icon">
<Image src="/dashboard/AssignmentIcon1.svg" width={20} height={20} alt="urgent assignment" />
                        </div>
                        <div className="assignment-details">
                            <h4>Calculus Problem Set</h4>
                            <p>Due Tomorrow, 11:59 PM</p>
                        </div>
                        <span className="priority-badge urgent">Urgent</span>
                    </div>

                    <div className="assignment-item">
                        <div className="assignment-icon">
<Image src="/dashboard/AssignmentIcon2.svg" width={20} height={20} alt="lab report" />
                        </div>
                        <div className="assignment-details">
                            <h4>Physics Lab Report</h4>
                            <p>Due in 3 days</p>
                        </div>
                        <span className="priority-badge">Medium</span>
                    </div>

                    <div className="assignment-item">
                        <div className="assignment-icon">
<Image src="/dashboard/AssignmentIcon3.svg" width={20} height={20} alt="completed assignment" />
                        </div>
                        <div className="assignment-details">
                            <h4>Essay on Modern Literature</h4>
                            <p>Due in 1 week</p>
                        </div>
                        <span className="priority-badge low">Low</span>
                    </div>

                    <div className="assignment-item">
                        <div className="assignment-icon">
<Image src="/dashboard/AssignmentIcon4.svg" width={20} height={20} alt="chemistry quiz" />
                        </div>
                        <div className="assignment-details">
                            <h4>Chemistry Quiz</h4>
                            <p>Due in 5 days</p>
                        </div>
                        <span className="priority-badge">Medium</span>
                    </div>
                </div>
            </section>

            <section className="dashboard-card calendar-card">
                <div className="card-header">
                    <h2>Calendar</h2>
                    <div className="calendar-controls">
                        <button className="calendar-nav">‹</button>
                        <span className="calendar-month">November 2025</span>
                        <button className="calendar-nav">›</button>
                    </div>
                </div>
                <div className="calendar-grid">
                    <div className="calendar-day-header">Sun</div>
                    <div className="calendar-day-header">Mon</div>
                    <div className="calendar-day-header">Tue</div>
                    <div className="calendar-day-header">Wed</div>
                    <div className="calendar-day-header">Thu</div>
                    <div className="calendar-day-header">Fri</div>
                    <div className="calendar-day-header">Sat</div>
                    
                    <div className="calendar-day inactive">29</div>
                    <div className="calendar-day inactive">30</div>
                    <div className="calendar-day inactive">31</div>
                    <div className="calendar-day">1</div>
                    <div className="calendar-day">2</div>
                    <div className="calendar-day">3</div>
                    <div className="calendar-day">4</div>
                    <div className="calendar-day">5</div>
                    <div className="calendar-day">6</div>
                    <div className="calendar-day today">7</div>
                    <div className="calendar-day">8</div>
                    <div className="calendar-day event">9</div>
                    <div className="calendar-day">10</div>
                    <div className="calendar-day">11</div>
                    <div className="calendar-day">12</div>
                    <div className="calendar-day">13</div>
                    <div className="calendar-day event">14</div>
                    <div className="calendar-day">15</div>
                    <div className="calendar-day">16</div>
                    <div className="calendar-day">17</div>
                    <div className="calendar-day">18</div>
                    <div className="calendar-day">19</div>
                    <div className="calendar-day">20</div>
                    <div className="calendar-day">21</div>
                    <div className="calendar-day">22</div>
                    <div className="calendar-day">23</div>
                    <div className="calendar-day">24</div>
                    <div className="calendar-day">25</div>
                    <div className="calendar-day">26</div>
                    <div className="calendar-day">27</div>
                    <div className="calendar-day">28</div>
                    <div className="calendar-day">29</div>
                    <div className="calendar-day">30</div>
                </div>
                <div className="calendar-events">
                    <div className="event-item">
                        <div className="event-dot" style={{background: '#FF6B9D'}}></div>
                        <span>Assignment Due - Nov 9</span>
                    </div>
                    <div className="event-item">
                        <div className="event-dot" style={{background: '#A8D8EA'}}></div>
                        <span>Exam - Nov 14</span>
                    </div>
                </div>
            </section>

            <section className="dashboard-card quick-actions-card">
                <div className="card-header">
                    <h2>Quick Actions</h2>
                </div>
                <div className="quick-actions-grid">
                    <button className="action-btn">
                        <Image src="/dashboard/ActionIcon1.svg" width={24} height={24} alt="new note" />
                        <span>New Note</span>
                    </button>
                    <button className="action-btn">
                        <Image src="/dashboard/ActionIcon2.svg" width={24} height={24} alt="set reminder" />
                        <span>Set Reminder</span>
                    </button>
                    <button className="action-btn">
                        <Image src="/dashboard/ActionIcon3.svg" width={24} height={24} alt="upload file" />
                        <span>Upload File</span>
                    </button>
                    <button className="action-btn">
                        <Image src="/dashboard/ActionIcon4.svg" width={24} height={24} alt="find resources" />
                        <span>Find Resources</span>
                    </button>
                </div>
            </section>

            <section className="dashboard-card activity-card">
                <div className="card-header">
                    <h2>Recent Activity</h2>
                    <a href="#" className="view-all">View All →</a>
                </div>
                <div className="activity-list">
                    <div className="activity-item">
                        <div className="activity-icon" style={{background: '#E8F5E9'}}>
                            <Image src="/dashboard/ActivityIcon1.svg" width={18} height={18} alt="completed" />
                        </div>
                        <div className="activity-details">
                            <p><strong>Completed</strong> Chemistry Lab Assignment</p>
                            <span className="activity-time">2 hours ago</span>
                        </div>
                    </div>

                    <div className="activity-item">
                        <div className="activity-icon" style={{background: '#E3F2FD'}}>
                            <Image src="/dashboard/ActivityIcon2.svg" width={18} height={18} alt="enrolled" />
                        </div>
                        <div className="activity-details">
                            <p><strong>Enrolled</strong> in Web Development Course</p>
                            <span className="activity-time">5 hours ago</span>
                        </div>
                    </div>

                    <div className="activity-item">
                        <div className="activity-icon" style={{background: '#FFF3E0'}}>
                            <Image src="/dashboard/ActivityIcon3.svg" width={18} height={18} alt="achieved" />
                        </div>
                        <div className="activity-details">
                            <p><strong>Achieved</strong> 95% in Math Quiz</p>
                            <span className="activity-time">1 day ago</span>
                        </div>
                    </div>

                    <div className="activity-item">
                        <div className="activity-icon" style={{background: '#F3E5F5'}}>
                            <Image src="/dashboard/ActivityIcon4.svg" width={18} height={18} alt="downloaded" />
                        </div>
                        <div className="activity-details">
                            <p><strong>Downloaded</strong> Physics Study Notes</p>
                            <span className="activity-time">2 days ago</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="dashboard-card progress-card">
                <div className="card-header">
                    <h2>Learning Progress</h2>
                    <select className="time-filter">
                        <option>This Week</option>
                        <option>This Month</option>
                        <option>This Year</option>
                    </select>
                </div>
                <div className="progress-chart">
                    <div className="chart-bars">
                        <div className="chart-bar">
                            <div className="bar-fill" style={{height: '60%'}} data-value="6"></div>
                            <span className="bar-label">Mon</span>
                        </div>
                        <div className="chart-bar">
                            <div className="bar-fill" style={{height: '80%'}} data-value="8"></div>
                            <span className="bar-label">Tue</span>
                        </div>
                        <div className="chart-bar">
                            <div className="bar-fill" style={{height: '45%'}} data-value="4.5"></div>
                            <span className="bar-label">Wed</span>
                        </div>
                        <div className="chart-bar">
                            <div className="bar-fill" style={{height: '90%'}} data-value="9"></div>
                            <span className="bar-label">Thu</span>
                        </div>
                        <div className="chart-bar">
                            <div className="bar-fill" style={{height: '70%'}} data-value="7"></div>
                            <span className="bar-label">Fri</span>
                        </div>
                        <div className="chart-bar">
                            <div className="bar-fill" style={{height: '35%'}} data-value="3.5"></div>
                            <span className="bar-label">Sat</span>
                        </div>
                        <div className="chart-bar">
                            <div className="bar-fill" style={{height: '50%'}} data-value="5"></div>
                            <span className="bar-label">Sun</span>
                        </div>
                    </div>
                    <p className="chart-footer">Study hours per day</p>
                </div>
            </section>
        </div>
    </main>)
}