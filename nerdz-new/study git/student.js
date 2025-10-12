let selectedClass = null;
let quizData = [];
let currentQuestionIndex = 0;
let score = 0;
let timerInterval = null;
let pomodoroState = 'focus';
let totalSeconds = 25 * 60;
let currentSeconds = totalSeconds;
let isPaused = true;
let completedPomodoros = 0;

document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeClassSelection();
    initializeMaterialsFilter();
    initializeAIChat();
    initializeQuiz();
    initializeSchedule();
    initializePomodoro();
    initializeNotes();
    initializeSidebar();
    initializeThemeToggle();
});

function initializeNavigation() {
    const menuItems = document.querySelectorAll('.menu-item');
    const navMenuItems = document.querySelectorAll('.nav-menu-item');
    const sections = document.querySelectorAll('.content-section');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    const switchSection = (sectionId) => {
        menuItems.forEach(m => m.classList.remove('active'));
        navMenuItems.forEach(m => m.classList.remove('active'));

        sections.forEach(s => s.classList.remove('active'));
        document.getElementById(sectionId)?.classList.add('active');

        if (window.innerWidth <= 768) {
            document.getElementById('sidebar')?.classList.remove('active');
            hamburger?.classList.remove('active');
            navLinks?.classList.remove('active');
        }
    };

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const sectionId = item.dataset.section;
            item.classList.add('active');
            switchSection(sectionId);
        });
    });

    navMenuItems.forEach(item => {
        item.addEventListener('click', () => {
            const sectionId = item.dataset.section;
            switchSection(sectionId);
            
            menuItems.forEach(menuItem => {
                if (menuItem.dataset.section === sectionId) {
                    menuItem.classList.add('active');
                }
            });
        });
    });
}

function initializeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebarClose = document.getElementById('sidebarClose');

    sidebarToggle?.addEventListener('click', () => {
        sidebar?.classList.add('active');
    });

    sidebarClose?.addEventListener('click', () => {
        sidebar?.classList.remove('active');
    });
}

function initializeThemeToggle() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
    }
}

function initializeClassSelection() {
    const classCards = document.querySelectorAll('.class-card');

    classCards.forEach(card => {
        card.addEventListener('click', () => {
            classCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');

            selectedClass = card.dataset.class;
            const classInfo = document.getElementById('classInfo');
            if (classInfo) {
                classInfo.textContent = `Showing materials for Class ${selectedClass}`;
            }

            showNotification(`Class ${selectedClass} selected!`);
        });
    });
}

function initializeMaterialsFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const materialCards = document.querySelectorAll('.material-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const subject = btn.dataset.subject;

            materialCards.forEach(card => {
                if (subject === 'all' || card.dataset.subject === subject) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    const downloadBtns = document.querySelectorAll('.btn-download');
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            showNotification('PDF download started!');
        });
    });
}

function initializeAIChat() {
    const chatInput = document.getElementById('chatInput');
    const chatSend = document.getElementById('chatSend');
    const chatMessages = document.getElementById('chatMessages');
    const quickQuestions = document.querySelectorAll('.quick-q');

    const sendMessage = () => {
        const message = chatInput.value.trim();
        if (!message) return;

        addChatMessage(message, 'user');
        chatInput.value = '';

        setTimeout(() => {
            const response = generateAIResponse(message);
            addChatMessage(response, 'ai');
        }, 1000);
    };

    chatSend?.addEventListener('click', sendMessage);
    chatInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    quickQuestions.forEach(btn => {
        btn.addEventListener('click', () => {
            chatInput.value = btn.textContent;
            sendMessage();
        });
    });
}

function addChatMessage(text, type) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${type}-message`;

    messageDiv.innerHTML = `
        <div class="message-avatar">${type === 'ai' ? '🤖' : '👤'}</div>
        <div class="message-content">
            <p>${text}</p>
        </div>
    `;

    chatMessages?.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function generateAIResponse(question) {
    const responses = {
        'photosynthesis': 'Photosynthesis is the process by which green plants use sunlight to synthesize nutrients from carbon dioxide and water. It involves the conversion of light energy into chemical energy stored in glucose.',
        'pythagoras': 'The Pythagorean theorem states that in a right triangle, the square of the hypotenuse (the side opposite the right angle) is equal to the sum of the squares of the other two sides. Formula: a² + b² = c²',
        'chemical': 'The main types of chemical reactions are: 1) Combination reactions, 2) Decomposition reactions, 3) Displacement reactions, 4) Double displacement reactions, and 5) Redox reactions.',
        'default': 'That\'s a great question! Based on your query, I recommend reviewing the relevant chapter materials and practice problems. Would you like me to break down a specific concept?'
    };

    const lowerQuestion = question.toLowerCase();
    for (let key in responses) {
        if (lowerQuestion.includes(key)) {
            return responses[key];
        }
    }
    return responses.default;
}

function initializeQuiz() {
    const startQuizBtn = document.getElementById('startQuiz');
    const nextQuestionBtn = document.getElementById('nextQuestion');
    const retryQuizBtn = document.getElementById('retryQuiz');

    startQuizBtn?.addEventListener('click', startQuiz);
    nextQuestionBtn?.addEventListener('click', nextQuestion);
    retryQuizBtn?.addEventListener('click', resetQuiz);
}

function startQuiz() {
    const subject = document.getElementById('quizSubject').value;
    const numQuestions = parseInt(document.getElementById('quizQuestions').value);
    const difficulty = document.getElementById('quizDifficulty').value;

    quizData = generateQuizQuestions(subject, numQuestions, difficulty);
    currentQuestionIndex = 0;
    score = 0;

    document.getElementById('quizSetup').classList.add('hidden');
    document.getElementById('quizContainer').classList.remove('hidden');

    displayQuestion();
}

function generateQuizQuestions(subject, num, difficulty) {
    const questions = {
        mathematics: [
            {
                question: 'What is 15 + 27?',
                options: ['42', '43', '41', '44'],
                correct: 0
            },
            {
                question: 'Solve: 8 × 7 = ?',
                options: ['54', '56', '58', '52'],
                correct: 1
            },
            {
                question: 'What is the square root of 144?',
                options: ['10', '11', '12', '13'],
                correct: 2
            }
        ],
        science: [
            {
                question: 'What is the chemical symbol for water?',
                options: ['H2O', 'CO2', 'O2', 'N2'],
                correct: 0
            },
            {
                question: 'How many planets are in our solar system?',
                options: ['7', '8', '9', '10'],
                correct: 1
            },
            {
                question: 'What is the powerhouse of the cell?',
                options: ['Nucleus', 'Ribosome', 'Mitochondria', 'Chloroplast'],
                correct: 2
            }
        ]
    };

    const subjectQuestions = questions[subject] || questions.mathematics;
    return subjectQuestions.slice(0, num);
}

function displayQuestion() {
    if (currentQuestionIndex >= quizData.length) {
        showQuizResults();
        return;
    }

    const question = quizData[currentQuestionIndex];
    const progress = ((currentQuestionIndex) / quizData.length) * 100;

    document.getElementById('quizProgress').style.width = `${progress}%`;
    document.getElementById('questionCounter').textContent = 
        `Question ${currentQuestionIndex + 1} of ${quizData.length}`;
    document.getElementById('quizQuestion').textContent = question.question;

    const optionsContainer = document.getElementById('quizOptions');
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'quiz-option';
        optionDiv.textContent = option;
        optionDiv.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(optionDiv);
    });
}

function selectOption(index) {
    const options = document.querySelectorAll('.quiz-option');
    options.forEach(opt => opt.classList.remove('selected'));
    options[index].classList.add('selected');

    const question = quizData[currentQuestionIndex];
    if (index === question.correct) {
        score++;
        options[index].classList.add('correct');
    } else {
        options[index].classList.add('incorrect');
        options[question.correct].classList.add('correct');
    }

    setTimeout(() => {
        currentQuestionIndex++;
        displayQuestion();
    }, 1500);
}

function nextQuestion() {
    currentQuestionIndex++;
    displayQuestion();
}

function showQuizResults() {
    document.getElementById('quizContainer').classList.add('hidden');
    document.getElementById('quizResults').classList.remove('hidden');

    const percentage = Math.round((score / quizData.length) * 100);
    document.getElementById('resultScore').textContent = `${percentage}%`;

    let feedback = '';
    if (percentage >= 90) feedback = 'Excellent! You\'re a star! 🌟';
    else if (percentage >= 70) feedback = 'Great job! Keep it up! 👍';
    else if (percentage >= 50) feedback = 'Good effort! Practice more! 📚';
    else feedback = 'Keep studying! You\'ll improve! 💪';

    document.getElementById('resultFeedback').textContent = feedback;

    updateProgressStats();
}

function resetQuiz() {
    document.getElementById('quizResults').classList.add('hidden');
    document.getElementById('quizSetup').classList.remove('hidden');
}

function initializeSchedule() {
    const addTaskBtn = document.getElementById('addTask');

    addTaskBtn?.addEventListener('click', addTask);
    renderWeekDays();
}

function renderWeekDays() {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const tasks = JSON.parse(localStorage.getItem('studyTasks')) || {};

    days.forEach((day, index) => {
        const dayColumn = document.querySelectorAll('.day-column')[index];
        const tasksContainer = dayColumn?.querySelector('.day-tasks');
        if (!tasksContainer) return;

        tasksContainer.innerHTML = '';
        const dayTasks = tasks[index] || [];

        dayTasks.forEach(task => {
            const taskDiv = document.createElement('div');
            taskDiv.className = 'task-item';
            taskDiv.innerHTML = `
                <div class="task-time">${task.time}</div>
                <div>${task.title}</div>
            `;
            tasksContainer.appendChild(taskDiv);
        });
    });
}

function addTask() {
    const title = document.getElementById('taskTitle').value;
    const day = document.getElementById('taskDay').value;
    const time = document.getElementById('taskTime').value;
    const subject = document.getElementById('taskSubject').value;

    if (!title || !time) {
        showNotification('Please fill all fields!');
        return;
    }

    const tasks = JSON.parse(localStorage.getItem('studyTasks')) || {};
    if (!tasks[day]) tasks[day] = [];

    tasks[day].push({ title, time, subject });
    localStorage.setItem('studyTasks', JSON.stringify(tasks));

    document.getElementById('taskTitle').value = '';
    document.getElementById('taskTime').value = '';

    renderWeekDays();
    showNotification('Task added successfully!');
}

function initializePomodoro() {
    const startBtn = document.getElementById('startTimer');
    const pauseBtn = document.getElementById('pauseTimer');
    const resetBtn = document.getElementById('resetTimer');

    startBtn?.addEventListener('click', startPomodoro);
    pauseBtn?.addEventListener('click', pausePomodoro);
    resetBtn?.addEventListener('click', resetPomodoro);

    updateTimerDisplay();
}

function startPomodoro() {
    if (!isPaused) return;

    isPaused = false;
    timerInterval = setInterval(() => {
        if (currentSeconds > 0) {
            currentSeconds--;
            updateTimerDisplay();
            updateTimerCircle();
        } else {
            pomodoroComplete();
        }
    }, 1000);
}

function pausePomodoro() {
    isPaused = true;
    clearInterval(timerInterval);
}

function resetPomodoro() {
    isPaused = true;
    clearInterval(timerInterval);
    pomodoroState = 'focus';
    currentSeconds = parseInt(document.getElementById('focusDuration').value) * 60;
    totalSeconds = currentSeconds;
    updateTimerDisplay();
    updateTimerCircle();
    document.getElementById('timerMode').textContent = 'Focus Time';
}

function pomodoroComplete() {
    clearInterval(timerInterval);
    playNotificationSound();

    if (pomodoroState === 'focus') {
        completedPomodoros++;
        document.getElementById('completedSessions').textContent = completedPomodoros;
        updateTotalFocusTime();

        const sessionsBeforeLongBreak = parseInt(document.getElementById('sessionsCount').value);
        if (completedPomodoros % sessionsBeforeLongBreak === 0) {
            pomodoroState = 'longBreak';
            currentSeconds = parseInt(document.getElementById('longBreak').value) * 60;
            document.getElementById('timerMode').textContent = 'Long Break';
        } else {
            pomodoroState = 'shortBreak';
            currentSeconds = parseInt(document.getElementById('shortBreak').value) * 60;
            document.getElementById('timerMode').textContent = 'Short Break';
        }
    } else {
        pomodoroState = 'focus';
        currentSeconds = parseInt(document.getElementById('focusDuration').value) * 60;
        document.getElementById('timerMode').textContent = 'Focus Time';
    }

    totalSeconds = currentSeconds;
    isPaused = true;
    updateTimerDisplay();
    updateTimerCircle();
    showNotification('Pomodoro session complete!');
}

function updateTimerDisplay() {
    const minutes = Math.floor(currentSeconds / 60);
    const seconds = currentSeconds % 60;
    const display = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    document.getElementById('timerDisplay').textContent = display;
}

function updateTimerCircle() {
    const circle = document.getElementById('timerCircle');
    if (!circle) return;

    const progress = (currentSeconds / totalSeconds) * 880;
    circle.style.strokeDashoffset = 880 - progress;
}

function updateTotalFocusTime() {
    const focusDuration = parseInt(document.getElementById('focusDuration').value);
    const totalMinutes = completedPomodoros * focusDuration;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    document.getElementById('totalFocusTime').textContent = `${hours}h ${minutes}m`;
}

function playNotificationSound() {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjaP1fPTgjMGHm7A7+OZUA0PVaziPMc=');
    audio.play().catch(() => {});
}

function initializeNotes() {
    const newNoteBtn = document.getElementById('newNote');
    const saveNoteBtn = document.getElementById('saveNote');
    const noteItems = document.querySelectorAll('.note-item');

    newNoteBtn?.addEventListener('click', createNewNote);
    saveNoteBtn?.addEventListener('click', saveNote);

    noteItems.forEach(item => {
        item.addEventListener('click', () => {
            noteItems.forEach(n => n.classList.remove('active'));
            item.classList.add('active');
        });
    });
}

function createNewNote() {
    document.getElementById('noteTitle').value = '';
    document.getElementById('noteContent').value = '';
    showNotification('New note created!');
}

function saveNote() {
    const title = document.getElementById('noteTitle').value;
    const content = document.getElementById('noteContent').value;

    if (!title || !content) {
        showNotification('Please add title and content!');
        return;
    }

    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push({
        title,
        content,
        date: new Date().toLocaleString()
    });

    localStorage.setItem('notes', JSON.stringify(notes));
    showNotification('Note saved successfully!');
}

function updateProgressStats() {
    const stats = JSON.parse(localStorage.getItem('progressStats')) || {
        streak: 0,
        totalTime: 0,
        quizzes: 0,
        avgScore: 0
    };

    stats.quizzes++;
    const currentAvg = stats.avgScore;
    const newScore = Math.round((score / quizData.length) * 100);
    stats.avgScore = Math.round((currentAvg * (stats.quizzes - 1) + newScore) / stats.quizzes);

    localStorage.setItem('progressStats', JSON.stringify(stats));

    document.getElementById('studyStreak').textContent = stats.streak;
    document.getElementById('totalStudyTime').textContent = `${stats.totalTime}h`;
    document.getElementById('completedQuizzes').textContent = stats.quizzes;
    document.getElementById('avgScore').textContent = `${stats.avgScore}%`;
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(99, 102, 241, 0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        font-weight: 600;
    `;
    notification.textContent = message;

    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}


