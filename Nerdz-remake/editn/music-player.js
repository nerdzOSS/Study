const audio = document.getElementById('audioElement');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressFill = document.getElementById('progressFill');
const progressHandle = document.getElementById('progressHandle');
const progressBar = document.querySelector('.progress-bar');
const volumeSlider = document.getElementById('volumeSlider');
const currentTimeEl = document.querySelector('.current-time');
const totalTimeEl = document.querySelector('.total-time');
const playerClose = document.getElementById('playerClose');
const musicPlayer = document.getElementById('musicPlayer');
const playerContainer = document.querySelector('.music-player-container');
const musicToggleBtn = document.getElementById('musicToggleBtn');

let isPlaying = false;
let isDragging = false;
let dragStartY = 0;
let isDraggingBtn = false;

playBtn.addEventListener('click', togglePlay);

function togglePlay() {
    if (isPlaying) {
        audio.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        playerContainer.classList.add('paused');
    } else {
        audio.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        playerContainer.classList.remove('paused');
    }
    isPlaying = !isPlaying;
}

audio.addEventListener('timeupdate', updateProgress);

function updateProgress() {
    if (!isDragging) {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressFill.style.width = progress + '%';
        progressHandle.style.left = progress + '%';
        
        currentTimeEl.textContent = formatTime(audio.currentTime);
        totalTimeEl.textContent = formatTime(audio.duration);
    }
}

function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

progressBar.addEventListener('click', seek);

function seek(e) {
    const rect = progressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audio.currentTime = percent * audio.duration;
}

progressHandle.addEventListener('mousedown', startDrag);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', stopDrag);

function startDrag() {
    isDragging = true;
}

function drag(e) {
    if (!isDragging) return;
    
    const rect = progressBar.getBoundingClientRect();
    let percent = (e.clientX - rect.left) / rect.width;
    percent = Math.max(0, Math.min(1, percent));
    
    progressFill.style.width = (percent * 100) + '%';
    progressHandle.style.left = (percent * 100) + '%';
}

function stopDrag(e) {
    if (!isDragging) return;
    
    isDragging = false;
    const rect = progressBar.getBoundingClientRect();
    let percent = (e.clientX - rect.left) / rect.width;
    percent = Math.max(0, Math.min(1, percent));
    
    audio.currentTime = percent * audio.duration;
}

volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value / 100;
    
    const volumeIcon = document.querySelector('.player-volume i');
    if (e.target.value == 0) {
        volumeIcon.className = 'fas fa-volume-mute';
    } else if (e.target.value < 50) {
        volumeIcon.className = 'fas fa-volume-down';
    } else {
        volumeIcon.className = 'fas fa-volume-up';
    }
});

audio.volume = 0.7;

window.addEventListener('load', () => {
    audio.play().catch(err => console.log('Autoplay blocked:', err));
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    isPlaying = true;
    musicToggleBtn.style.display = 'flex';
});

playerClose.addEventListener('click', () => {
    musicPlayer.classList.remove('active');
    setTimeout(() => {
        musicToggleBtn.style.display = 'flex';
    }, 400);
});

musicToggleBtn.addEventListener('click', () => {
    musicPlayer.classList.add('active');
    musicToggleBtn.style.display = 'none';
});

musicToggleBtn.addEventListener('mousedown', startDragBtn);
musicToggleBtn.addEventListener('touchstart', startDragBtn);

function startDragBtn(e) {
    dragStartY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
    isDraggingBtn = false;
    document.addEventListener('mousemove', dragBtn);
    document.addEventListener('touchmove', dragBtn);
    document.addEventListener('mouseup', stopDragBtn);
    document.addEventListener('touchend', stopDragBtn);
}

function dragBtn(e) {
    const currentY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
    const deltaY = currentY - dragStartY;
    
    if (deltaY > 10) {
        isDraggingBtn = true;
    }
    
    if (deltaY > 50) {
        musicPlayer.style.display = 'block';
        musicToggleBtn.style.display = 'none';
        stopDragBtn();
    }
}

function stopDragBtn() {
    document.removeEventListener('mousemove', dragBtn);
    document.removeEventListener('touchmove', dragBtn);
    document.removeEventListener('mouseup', stopDragBtn);
    document.removeEventListener('touchend', stopDragBtn);
    isDraggingBtn = false;
}

prevBtn.addEventListener('click', () => {
    audio.currentTime = Math.max(0, audio.currentTime - 10);
});

nextBtn.addEventListener('click', () => {
    audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
});

audio.addEventListener('loadedmetadata', () => {
    totalTimeEl.textContent = formatTime(audio.duration);
});

document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && e.target.tagName !== 'INPUT') {
        e.preventDefault();
        togglePlay();
    }
});
