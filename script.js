var sentences = [
    "Are you sure? 🥺", 
    "Really? Think again! 💭", 
    "But we'd be so cute together! 🥰", 
    "Please reconsider! 🙏", 
    "I promise I'm worth it! ✨",
    "Just give me a chance! 💖",
    "You're breaking my heart! 💔",
    "I'll buy you coffee every day! ☕",
    "We could watch movies together! 🎬",
    "I'll sing for you! 🎵",
    "Pretty please with a cherry on top? 🍒"
];

var romanticMessages = [
    "My heart beats only for you 💓",
    "You're my sunshine on a cloudy day ☀️",
    "Every moment with you would be magical ✨",
    "You make my world brighter 🌟",
    "I'd choose you in every lifetime 💕"
];

var previousSentenceIndex = -1;
var noButtonClickCount = 0;
var yesButtonSizeIncrease = 0;
var currentRomanticIndex = 0;

// Add floating hearts effect
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
    heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
    heart.style.zIndex = '1000';
    heart.className = 'floating-heart';
    
    const style = document.createElement('style');
    style.textContent = `
        .floating-heart {
            animation: floatUp linear forwards;
            pointer-events: none;
        }
        @keyframes floatUp {
            to {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
        style.remove();
    }, 5000);
}

// Add sparkle effect
function createSparkle(x, y) {
    for (let i = 0; i < 10; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'fixed';
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '1000';
        sparkle.style.fontSize = Math.random() * 15 + 10 + 'px';
        
        const angle = (Math.PI * 2 * i) / 10;
        const velocity = Math.random() * 100 + 50;
        
        sparkle.animate([
            { 
                transform: 'translate(0, 0) scale(1)', 
                opacity: 1 
            },
            { 
                transform: `translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity}px) scale(0)`, 
                opacity: 0 
            }
        ], {
            duration: 1000,
            easing: 'ease-out'
        });
        
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1000);
    }
}

// Add screen shake effect
function shakeScreen() {
    document.body.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
        document.body.style.animation = '';
    }, 500);
}

// Update romantic message
function updateRomanticMessage() {
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) {
        subtitle.innerHTML = `<i class="fas fa-heart"></i> ${romanticMessages[currentRomanticIndex]} <i class="fas fa-heart"></i>`;
        currentRomanticIndex = (currentRomanticIndex + 1) % romanticMessages.length;
    }
}

function getRandomSentence() {
    var randomIndex = Math.floor(Math.random() * sentences.length);
    
    while (randomIndex === previousSentenceIndex) {
        randomIndex = Math.floor(Math.random() * sentences.length);
    }
    
    previousSentenceIndex = randomIndex;
    return sentences[randomIndex];
}

function increaseSize(event) {
    // Make sure we have an event object
    if (!event) {
        event = window.event; // For older browsers
    }
    
    var targetButton = event.target.closest('button');
    
    if (targetButton.classList.contains('No')) {
        noButtonClickCount++;
        
        // Add shake effect to button
        targetButton.classList.add('shake');
        setTimeout(() => targetButton.classList.remove('shake'), 500);
        
        // Create floating hearts when No is clicked
        createFloatingHeart();
        
        // Update romantic message
        updateRomanticMessage();

        if (noButtonClickCount >= 3) {
            // Make No button smaller and Yes button bigger
            targetButton.style.transform = `scale(${1 - (noButtonClickCount - 2) * 0.1})`;
            
            const yesButton = document.querySelector('.Yes');
            yesButton.style.transform = `scale(${1 + (noButtonClickCount - 2) * 0.15})`;
            
            // Add pulsing effect to Yes button
            yesButton.style.animation = 'pulse 0.5s ease-in-out infinite';
        }

        if (noButtonClickCount >= 7) {
            // Hide No button and make Yes button full screen
            targetButton.style.display = 'none';
            
            const yesButton = document.querySelector('.Yes');
            yesButton.classList.add('fullscreen');
            yesButton.innerHTML = '<i class="fas fa-heart"></i><span>You have no choice but to say YES! 💖</span>';
            
            // Shake screen for dramatic effect
            shakeScreen();
            
            // Show celebration message
            const mainTitle = document.querySelector('.main-title');
            if (mainTitle) {
                mainTitle.innerHTML = `
                    <span class="title-line1">You can't escape!</span>
                    <span class="title-line2 gradient-text">Say YES! 💕</span>
                `;
            }
        } else {
            // Change text on No button
            const noText = targetButton.querySelector('.no-text');
            if (noText) {
                noText.textContent = getRandomSentence();
            }
        }
        
    } else if (targetButton.classList.contains('Yes')) {
        // Create sparkle effect at button position
        const rect = targetButton.getBoundingClientRect();
        createSparkle(rect.left + rect.width/2, rect.top + rect.height/2);
        
        // Add celebration hearts
        for (let i = 0; i < 20; i++) {
            setTimeout(() => createFloatingHeart(), i * 100);
        }
        
        // Wait for animation then redirect
        setTimeout(() => {
            window.location.href = 'page.html';
        }, 1000);
    }
}

// Add some automatic romantic messages
setInterval(updateRomanticMessage, 8000);

// Add automatic floating hearts
setInterval(createFloatingHeart, 3000);

// Add cursor trail effect
document.addEventListener('mousemove', function(e) {
    if (Math.random() > 0.95) { // Only sometimes to not overwhelm
        const heart = document.createElement('div');
        heart.innerHTML = '💕';
        heart.style.position = 'fixed';
        heart.style.left = e.clientX + 'px';
        heart.style.top = e.clientY + 'px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '999';
        heart.style.fontSize = '12px';
        heart.style.animation = 'fadeOut 2s ease-out forwards';
        
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 2000);
    }
});

// Music Control Functions
let musicPlaying = false;
let backgroundMusic = null;
let isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

function initializeMusic() {
    backgroundMusic = document.getElementById('backgroundMusic');
    const musicBtn = document.getElementById('musicToggle');
    
    if (backgroundMusic) {
        // Set volume to a comfortable level
        backgroundMusic.volume = 0.5;
        
        // Add event listeners
        backgroundMusic.addEventListener('canplaythrough', function() {
            console.log('Music loaded successfully');
        });
        
        backgroundMusic.addEventListener('error', function(e) {
            console.log('Music loading error:', e);
            musicBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
            musicBtn.classList.add('muted');
        });
        
        // Mobile-friendly setup
        if (isMobile) {
            // On mobile, always show play button initially
            musicBtn.innerHTML = '<i class="fas fa-play"></i>';
            musicBtn.classList.add('mobile-ready');
            
            // Add touch event for better mobile interaction
            musicBtn.addEventListener('touchstart', function(e) {
                e.preventDefault(); // Prevent double-tap zoom
                toggleMusic();
            });
            
            // Show instruction for mobile users
            setTimeout(() => {
                if (!musicPlaying) {
                    showMobileInstruction();
                }
            }, 2000);
        } else {
            // Desktop setup
            musicBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    }
}

function showMobileInstruction() {
    const instruction = document.createElement('div');
    instruction.className = 'mobile-instruction';
    instruction.innerHTML = `
        <div class="instruction-content">
            <i class="fas fa-music"></i>
            <p>แตะปุ่มเพลงเพื่อเล่นเสียง 🎵</p>
        </div>
    `;
    document.body.appendChild(instruction);
    
    // Auto hide after 3 seconds
    setTimeout(() => {
        if (instruction && instruction.parentNode) {
            instruction.remove();
        }
    }, 3000);
    
    // Hide when music starts playing
    if (backgroundMusic) {
        backgroundMusic.addEventListener('play', () => {
            if (instruction && instruction.parentNode) {
                instruction.remove();
            }
        });
    }
}

function toggleMusic() {
    const musicBtn = document.getElementById('musicToggle');
    
    if (!backgroundMusic) {
        backgroundMusic = document.getElementById('backgroundMusic');
    }
    
    if (backgroundMusic) {
        if (musicPlaying) {
            backgroundMusic.pause();
            musicPlaying = false;
            musicBtn.classList.remove('playing');
            musicBtn.classList.add('muted');
            musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            // For mobile, we need to handle the interaction properly
            backgroundMusic.currentTime = 0;
            
            // Force loading for mobile
            if (isMobile) {
                backgroundMusic.load();
            }
            
            const playPromise = backgroundMusic.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    musicPlaying = true;
                    musicBtn.classList.add('playing');
                    musicBtn.classList.remove('muted');
                    musicBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
                    console.log('Music playing successfully');
                    
                    // Vibrate on mobile for feedback
                    if (isMobile && navigator.vibrate) {
                        navigator.vibrate(50);
                    }
                }).catch(error => {
                    console.log('Error playing music:', error);
                    musicBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
                    musicBtn.classList.add('muted');
                    
                    // Show mobile-specific instruction
                    if (isMobile) {
                        alert('กรุณาเปิดเสียงในเบราว์เซอร์และลองอีกครั้ง 🎵');
                    } else {
                        alert('คลิกปุ่มเพลงอีกครั้งเพื่อเล่นเพลง 🎵');
                    }
                });
            }
        }
    }
}

// Enhanced mobile interaction
document.addEventListener('touchstart', function() {
    if (backgroundMusic && !musicPlaying && isMobile) {
        // Prepare audio for mobile
        backgroundMusic.load();
    }
}, { once: true });

// Add click event to play music on user interaction
document.addEventListener('click', function() {
    if (backgroundMusic && !musicPlaying) {
        // Try to play music after user interaction
        const playPromise = backgroundMusic.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                musicPlaying = true;
                const musicBtn = document.getElementById('musicToggle');
                if (musicBtn) {
                    musicBtn.classList.add('playing');
                    musicBtn.classList.remove('muted');
                    musicBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
                }
            }).catch(() => {
                // Silently fail - user can manually start music
            });
        }
    }
}, { once: true });

// Initialize music when page loads
document.addEventListener('DOMContentLoaded', initializeMusic);

// Add fadeOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        0% {
            opacity: 1;
            transform: translateY(0);
        }
        100% {
            opacity: 0;
            transform: translateY(-30px);
        }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);


