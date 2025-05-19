// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Close mobile menu when clicking on a link
    const mobileMenuLinks = document.querySelectorAll('#mobile-menu a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('nav');
    const navbarHeight = navbar.offsetHeight;
    
    window.addEventListener('scroll', function() {
        // Add shadow and change background opacity when scrolling
        if (window.scrollY > 20) {
            navbar.classList.add('shadow-md');
            navbar.classList.remove('bg-white/80', 'dark:bg-gray-900/80');
            navbar.classList.add('bg-white/95', 'dark:bg-gray-900/95');
        } else {
            navbar.classList.remove('shadow-md');
            navbar.classList.remove('bg-white/95', 'dark:bg-gray-900/95');
            navbar.classList.add('bg-white/80', 'dark:bg-gray-900/80');
        }
        
        // Highlight active section in navbar
        highlightActiveSection();
    });

    // Function to highlight active section in navbar
    function highlightActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + navbarHeight + 100; // Offset to trigger earlier
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            const desktopNavLink = document.querySelector(`.hidden.md\\:flex a[href="#${sectionId}"]`);
            const mobileNavLink = document.querySelector(`#mobile-menu a[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Desktop nav
                document.querySelectorAll('.hidden.md\\:flex a').forEach(link => {
                    link.classList.remove('text-indigo-600', 'dark:text-indigo-400');
                    link.classList.add('text-gray-700', 'dark:text-gray-300');
                });
                
                if (desktopNavLink) {
                    desktopNavLink.classList.remove('text-gray-700', 'dark:text-gray-300');
                    desktopNavLink.classList.add('text-indigo-600', 'dark:text-indigo-400');
                }
                
                // Mobile nav
                document.querySelectorAll('#mobile-menu a').forEach(link => {
                    link.classList.remove('bg-indigo-50', 'dark:bg-indigo-900/30', 'text-indigo-600', 'dark:text-indigo-400');
                });
                
                if (mobileNavLink) {
                    mobileNavLink.classList.add('bg-indigo-50', 'dark:bg-indigo-900/30', 'text-indigo-600', 'dark:text-indigo-400');
                }
            }
        });
    }

    // Call on page load to set initial state
    highlightActiveSection();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Skip if just '#'
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - navbarHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll reveal animations
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.reveal');
        
        reveals.forEach(reveal => {
            const windowHeight = window.innerHeight;
            const revealTop = reveal.getBoundingClientRect().top;
            const revealPoint = 150;
            
            if (revealTop < windowHeight - revealPoint) {
                reveal.classList.add('active');
            }
        });
    }

    // Add reveal classes to elements
    const addRevealClasses = () => {
        // About section elements
        document.querySelector('#about img').classList.add('reveal', 'fade-left');
        document.querySelectorAll('#about h3, #about p').forEach(el => {
            el.classList.add('reveal', 'fade-right');
        });
        
        document.querySelectorAll('#about .grid > div').forEach((el, index) => {
            el.classList.add('reveal', 'fade-bottom');
            el.style.transitionDelay = `${index * 0.1}s`;
        });
        
        document.querySelectorAll('#about .flex.flex-wrap.gap-3 > span').forEach((el, index) => {
            el.classList.add('reveal', 'fade-bottom');
            el.style.transitionDelay = `${index * 0.05}s`;
        });
        
        document.querySelectorAll('#about .flex.flex-wrap.gap-4 > a').forEach((el, index) => {
            el.classList.add('reveal', 'fade-bottom');
            el.style.transitionDelay = `${index * 0.1}s`;
        });
        
        // Skills section elements
        document.querySelectorAll('#skills .grid > div').forEach((el, index) => {
            el.classList.add('reveal', 'fade-bottom');
            el.style.transitionDelay = `${index * 0.1}s`;
        });
        
        // Projects section elements
        document.querySelectorAll('#projects .grid > div').forEach((el, index) => {
            el.classList.add('reveal', 'fade-bottom');
            el.style.transitionDelay = `${index * 0.1}s`;
        });
        
        // Contact section elements
        document.querySelectorAll('#contact .grid > div').forEach(el => {
            el.classList.add('reveal', 'fade-bottom');
        });
    };

    // Initialize reveal classes
    addRevealClasses();
    
    // Initial check and event listener for scroll
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);

    // Form validation
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');
            const privacyCheckbox = document.getElementById('privacy');
            let isValid = true;
            
            // Simple validation
            if (!nameInput.value.trim()) {
                highlightError(nameInput);
                isValid = false;
            } else {
                removeError(nameInput);
            }
            
            if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
                highlightError(emailInput);
                isValid = false;
            } else {
                removeError(emailInput);
            }
            
            if (!subjectInput.value.trim()) {
                highlightError(subjectInput);
                isValid = false;
            } else {
                removeError(subjectInput);
            }
            
            if (!messageInput.value.trim()) {
                highlightError(messageInput);
                isValid = false;
            } else {
                removeError(messageInput);
            }
            
            if (!privacyCheckbox.checked) {
                const privacyLabel = document.querySelector('label[for="privacy"]');
                privacyLabel.classList.add('text-red-500');
                isValid = false;
            } else {
                const privacyLabel = document.querySelector('label[for="privacy"]');
                privacyLabel.classList.remove('text-red-500');
            }
            
            if (isValid) {
                // Normally, you would send the form data to a server here
                // For demo purposes, just show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'mt-4 p-3 bg-green-100 text-green-700 rounded-lg';
                successMessage.textContent = 'Message envoyé avec succès !';
                
                // Remove any existing success message
                const existingMessage = contactForm.querySelector('.bg-green-100');
                if (existingMessage) {
                    existingMessage.remove();
                }
                
                contactForm.appendChild(successMessage);
                contactForm.reset();
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });
    }

    // Helper functions for form validation
    function highlightError(input) {
        const inputContainer = input.parentNode;
        input.classList.add('border-red-500');
        input.classList.add('bg-red-50');
        
        const errorMessage = document.createElement('p');
        errorMessage.className = 'text-red-500 text-sm mt-1 error-message';
        errorMessage.textContent = 'Ce champ est requis';
        
        // Only add the error message if it doesn't exist already
        if (!inputContainer.querySelector('.error-message')) {
            inputContainer.appendChild(errorMessage);
        }
    }
    
    function removeError(input) {
        const inputContainer = input.parentNode;
        input.classList.remove('border-red-500');
        input.classList.remove('bg-red-50');
        
        const errorMessage = inputContainer.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
    
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Typing effect for hero section
    const heroText = document.querySelector('#home h1');
    if (heroText) {
        const originalText = heroText.textContent;
        heroText.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                heroText.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Delay start of typing effect
        setTimeout(typeWriter, 500);
    }

    // Dark mode toggle functionality - UPDATED
    // Create toggle for desktop
    const darkModeToggle = document.createElement('div');
    darkModeToggle.className = 'dark-mode-toggle cursor-pointer';
    darkModeToggle.title = 'Activer/Désactiver le mode sombre';
    
    // Create toggle for mobile
    const mobileDarkModeToggle = document.createElement('div');
    mobileDarkModeToggle.className = 'dark-mode-toggle cursor-pointer';
    
    // Check if dark mode is already enabled (from localStorage)
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark');
        darkModeToggle.classList.add('active');
        mobileDarkModeToggle.classList.add('active');
    }
    
    // Insert the toggles
    const darkModeToggleContainer = document.getElementById('dark-mode-toggle-container');
    const mobileDarkModeToggleContainer = document.getElementById('mobile-dark-mode-toggle');
    
    if (darkModeToggleContainer) {
        darkModeToggleContainer.appendChild(darkModeToggle);
    }
    
    if (mobileDarkModeToggleContainer) {
        mobileDarkModeToggleContainer.appendChild(mobileDarkModeToggle);
    }
    
    // Toggle dark mode on click - desktop
    darkModeToggle.addEventListener('click', function() {
        toggleDarkMode();
    });
    
    // Toggle dark mode on click - mobile
    mobileDarkModeToggle.addEventListener('click', function() {
        toggleDarkMode();
    });
    
    // Common function to toggle dark mode
    function toggleDarkMode() {
        document.body.classList.toggle('dark');
        darkModeToggle.classList.toggle('active');
        mobileDarkModeToggle.classList.toggle('active');
        
        // Save preference to localStorage
        if (document.body.classList.contains('dark')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', 'disabled');
        }
    }

    // Add skill card class to all skill cards for hover effect
    document.querySelectorAll('#skills .grid > div').forEach(card => {
        card.classList.add('skill-card');
    });

    // Add project card class to all project cards for hover effect
    document.querySelectorAll('#projects .grid > div').forEach(card => {
        card.classList.add('project-card');
        
        // Create and add project overlay
        const overlay = document.createElement('div');
        overlay.className = 'project-overlay absolute inset-0 flex items-end';
        
        // Get the image container
        const imgContainer = card.querySelector('img').parentNode;
        imgContainer.style.position = 'relative';
        imgContainer.appendChild(overlay);
    });

    // Add form-input class to all form inputs for focus animation
    document.querySelectorAll('#contact input, #contact textarea').forEach(input => {
        input.classList.add('form-input');
    });

    // Add btn-primary class to all primary buttons for hover animation
    document.querySelectorAll('a[href="#contact"], button[type="submit"]').forEach(btn => {
        btn.classList.add('btn-primary');
    });

    // Initialize counter animations when they come into view
    const initCounterAnimations = () => {
        const counters = document.querySelectorAll('.counter');
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.textContent);
                    animateCounter(entry.target, target);
                    observer.unobserve(entry.target);
                }
            });
        }, options);
        
        counters.forEach(counter => {
            observer.observe(counter);
        });
    };
    
    // Call the counter animation initialization
    initCounterAnimations();
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const heroSection = document.querySelector('#home');
    if (heroSection) {
        const scrollPosition = window.scrollY;
        heroSection.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
    }
});

// Counter animation for skills
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16); // 60fps
    
    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.round(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}; 