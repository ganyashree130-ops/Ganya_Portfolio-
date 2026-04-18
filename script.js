// Typing Effect
const typedTextSpan = document.querySelector(".typed");
const textArray = ["Web Developer", "BCA Student", "Creative Coder", "UI/UX Enthusiast"];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

// Add cursor element dynamically
if (typedTextSpan) {
    const cursorSpan = document.createElement("span");
    cursorSpan.classList.add("cursor");
    cursorSpan.textContent = "|";
    typedTextSpan.parentNode.insertBefore(cursorSpan, typedTextSpan.nextSibling);
}

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    if (textArray.length) setTimeout(type, newTextDelay + 250);
});

// Sticky Navbar & Active Menu Highlighting
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links li a');

window.addEventListener('scroll', () => {
    // Sticky Navbar
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active Section Highlighting
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        if(navMenu.classList.contains('active')){
            hamburger.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
}

// Close mobile menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Scroll Reveal Animations
const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
const progressBars = document.querySelectorAll('.progress');

function reveal() {
    const windowHeight = window.innerHeight;
    
    // Elements Reveal
    for (let i = 0; i < revealElements.length; i++) {
        const elementTop = revealElements[i].getBoundingClientRect().top;
        const elementVisible = 100;

        if (elementTop < windowHeight - elementVisible) {
            revealElements[i].classList.add("active");
        }
    }

    // Progress Bars Animation
    for (let i = 0; i < progressBars.length; i++) {
        const elementTop = progressBars[i].getBoundingClientRect().top;
        if (elementTop < windowHeight - 50) {
            const width = progressBars[i].getAttribute('data-width');
            progressBars[i].style.width = width;
        }
    }
}

window.addEventListener('scroll', reveal);
reveal(); // Trigger on load

// Voice Assistant Functionality
const voiceBtn = document.getElementById('voiceBtn');
let isListening = false;

// Setup Speech Recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition;

if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';

    recognition.onstart = function() {
        isListening = true;
        voiceBtn.classList.add('listening');
        speak("Listening for commands");
    };

    recognition.onresult = function(event) {
        const command = event.results[0][0].transcript.toLowerCase();
        console.log("Voice Command: ", command);
        processCommand(command);
    };

    recognition.onerror = function(event) {
        console.error("Speech Recognition Error", event);
        isListening = false;
        voiceBtn.classList.remove('listening');
        speak("Sorry, I didn't catch that.");
    };

    recognition.onend = function() {
        isListening = false;
        voiceBtn.classList.remove('listening');
    };
} else {
    if(voiceBtn) voiceBtn.style.display = 'none';
    console.warn("Speech Recognition not supported in this browser.");
}

if(voiceBtn) {
    voiceBtn.addEventListener('click', () => {
        if (isListening) {
            recognition.stop();
        } else if (recognition) {
            recognition.start();
        } else {
            alert("Your browser doesn't support the Voice Assistant feature.");
        }
    });
}

function processCommand(cmd) {
    if (cmd.includes('home') || cmd.includes('top')) {
        speak("Going to home");
        window.scrollTo(0, 0);
    } else if (cmd.includes('about')) {
        speak("Navigating to About section");
        document.getElementById('about').scrollIntoView();
    } else if (cmd.includes('skill')) {
        speak("Navigating to Skills section");
        document.getElementById('skills').scrollIntoView();
    } else if (cmd.includes('project')) {
        speak("Navigating to Projects section");
        document.getElementById('projects').scrollIntoView();
    } else if (cmd.includes('education') || cmd.includes('journey')) {
        speak("Navigating to Education section");
        document.getElementById('education').scrollIntoView();
    } else if (cmd.includes('contact')) {
        speak("Navigating to Contact section");
        document.getElementById('contact').scrollIntoView();
    } else if (cmd.includes('resume')) {
        speak("Opening your resume");
        window.open('Resume_Ganyashree_S-1.pdf', '_blank');
    } else {
        speak("I didn't understand. Try saying go to projects, or go to contact.");
    }
}

function speak(text) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.pitch = 1;
        utterance.rate = 1;
        window.speechSynthesis.speak(utterance);
    }
}
