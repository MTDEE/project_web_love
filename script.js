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


