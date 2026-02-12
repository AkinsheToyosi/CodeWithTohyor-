// ===== WAIT FOR DOM TO LOAD =====
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== UPDATE COPYRIGHT YEAR =====
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
    
    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.padding = '0.75rem 0';
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.05)';
        } else {
            navbar.style.padding = '1.25rem 0';
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.85)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // ===== HAMBURGER MENU =====
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navOverlay = document.querySelector('.nav-overlay');
    const body = document.body;
    
    if (hamburger && navLinks && navOverlay) {
        
        function closeMenu() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            navOverlay.classList.remove('active');
            body.classList.remove('menu-open');
        }
        
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            navOverlay.classList.toggle('active');
            body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking on overlay
        navOverlay.addEventListener('click', closeMenu);
        
        // Close menu when clicking on any nav link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                closeMenu();
            }
        });
    }
    
    // ===== SMOOTH SCROLLING =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== TYPEWRITER EFFECT =====
    const typewriterElement = document.querySelector('.typewriter-text');
    
    if (typewriterElement) {
        const phrases = [
            'attract more customers',
            'build trust online',
            'showcase your work',
            'grow your revenue',
            'stand out from competitors'
        ];
        
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isWaiting = false;
        
        function typeWriter() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }
            
            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                isWaiting = true;
                setTimeout(() => {
                    isWaiting = false;
                }, 2000);
            }
            
            if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
            }
            
            let typingSpeed = isDeleting ? 50 : 100;
            
            if (isWaiting) {
                typingSpeed = 2000;
            }
            
            setTimeout(typeWriter, typingSpeed);
        }
        
        // Start the typewriter effect
        setTimeout(typeWriter, 500);
    }
    
    // ===== FADE-IN ON SCROLL (INTERSECTION OBSERVER) =====
    const fadeElements = document.querySelectorAll(
        '.project-card, .process-card, .pricing-card, .testimonial-card, .about-content, .about-image'
    );
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeObserver.observe(element);
    });
    
    // ===== ACTIVE NAV LINK ON SCROLL =====
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            
            if (href === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // ===== PROJECT CARD HOVER EFFECT ENHANCEMENT =====
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const img = this.querySelector('.project-img img');
            if (img) {
                img.style.transform = 'scale(1.05)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const img = this.querySelector('.project-img img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });
    
    // ===== PRICING CARD POPULAR BADGE ANIMATION =====
    const popularCard = document.querySelector('.pricing-card.popular');
    
    if (popularCard) {
        popularCard.addEventListener('mouseenter', function() {
            const badge = this.querySelector('.popular-badge');
            if (badge) {
                badge.style.transform = 'translateX(-50%) scale(1.05)';
            }
        });
        
        popularCard.addEventListener('mouseleave', function() {
            const badge = this.querySelector('.popular-badge');
            if (badge) {
                badge.style.transform = 'translateX(-50%) scale(1)';
            }
        });
    }
    
    // ===== TESTIMONIAL SLIDER (AUTOMATIC ROTATION) =====
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    if (testimonialCards.length > 1) {
        let currentTestimonial = 0;
        
        function showNextTestimonial() {
            testimonialCards.forEach((card, index) => {
                if (index === currentTestimonial) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
            
            currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        }
        
        // Initialize - show first testimonial
        showNextTestimonial();
        
        // Rotate testimonials every 5 seconds
        setInterval(showNextTestimonial, 5000);
    }
    
    // ===== MOBILE DETECTION AND ADJUSTMENTS =====
    function isMobile() {
        return window.innerWidth <= 768;
    }
    
    // ===== LAZY LOAD IMAGES =====
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // ===== FORM SUBMISSION PREVENTION (FOR DEMO) =====
    const contactLinks = document.querySelectorAll('.contact-method');
    
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Don't prevent default - we want the links to work!
            // Just adding this as a placeholder for future form handling
            console.log('Contact method clicked:', this.href);
        });
    });
    
    // ===== ADD CSS ANIMATION KEYFRAMES DYNAMICALLY =====
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .nav-links a.active {
            color: var(--teal) !important;
        }
        
        .nav-links a.active::after {
            width: 100% !important;
        }
    `;
    document.head.appendChild(styleSheet);
    
    // ===== CONSOLE WELCOME MESSAGE =====
    console.log('%c🚀 CodeWithTohyor Portfolio Loaded!', 'font-size: 16px; color: #2A5C5A; font-weight: bold;');
    console.log('%c👋 Ready to impress some clients!', 'font-size: 14px; color: #E6B17E;');
    
    // ===== INITIALIZE ANY TOOLTIPS OR POPOVERS =====
    // Placeholder for future enhancements
    
}); // END OF DOMContentLoaded

// ===== PRELOAD CRITICAL ASSETS =====
window.addEventListener('load', function() {
    console.log('🎯 Page fully loaded - all assets ready!');
    
    // Remove any loading states if we had them
    document.body.classList.remove('loading');
});

// ===== HANDLE PAGE VISIBILITY CHANGES =====
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('👋 See you later!');
    } else {
        console.log('👋 Welcome back!');
        
        // Refresh any dynamic content if needed
        const typewriterElement = document.querySelector('.typewriter-text');
        if (typewriterElement && typewriterElement.textContent === '') {
            // Trigger typewriter restart if needed
            location.reload(); // Simple solution - remove if you want smoother
        }
    }
});

// ===== SERVICE WORKER REGISTRATION (FOR FUTURE PWA) =====
// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', function() {
//         navigator.serviceWorker.register('/sw.js').then(function(registration) {
//             console.log('ServiceWorker registered successfully');
//         }).catch(function(err) {
//             console.log('ServiceWorker registration failed: ', err);
//         });
//     });
// }

// ===== EXPOSE DEBUG TOOLS IN CONSOLE (DEVELOPMENT ONLY) =====
window.debugPortfolio = {
    toggleMenu: function() {
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        const navOverlay = document.querySelector('.nav-overlay');
        
        if (hamburger && navLinks && navOverlay) {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            navOverlay.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            console.log('Menu toggled!');
        }
    },
    
    showActiveSection: function() {
        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => {
            console.log(section.id, section.offsetTop);
        });
    },
    
    getColors: function() {
        const styles = getComputedStyle(document.documentElement);
        return {
            teal: styles.getPropertyValue('--teal'),
            peach: styles.getPropertyValue('--peach'),
            cream: styles.getPropertyValue('--cream')
        };
    }
};

console.log('%c💡 Type "debugPortfolio" in console for tools!', 'color: #5C6B6E; font-style: italic;');

// ===== MAKE PROJECT CARDS CLICKABLE =====
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Find the link inside each card
        const link = card.querySelector('.project-link');
        
        if (link && !link.classList.contains('disabled')) {
            // Make the entire card clickable
            card.addEventListener('click', function(e) {
                // Don't trigger if clicking on the link itself
                if (e.target.closest('.project-link')) {
                    return;
                }
                
                // Get the href from the link and navigate
                const href = link.getAttribute('href');
                if (href && href !== '#') {
                    window.open(href, '_blank');
                }
            });
            
            // Visual feedback - shows it's clickable
            card.style.cursor = 'pointer';
        }
    });
});