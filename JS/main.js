        // Language toggle functionality
        let currentLang = 'en';
        const languageToggle = document.getElementById('languageToggle');
        const html = document.documentElement;

        // Translation data
        const translations = {
            en: {
                toggle: 'EN | عربي'
            },
            ar: {
                toggle: 'عربي | EN'
            }
        };

        function switchLanguage() {
            currentLang = currentLang === 'en' ? 'ar' : 'en';
            
            // Update HTML attributes
            html.setAttribute('lang', currentLang);
            html.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
            
            // Update toggle button text
            languageToggle.textContent = translations[currentLang].toggle;
            
            // Update all translatable elements
            const elements = document.querySelectorAll('[data-en][data-ar]');
            elements.forEach(element => {
                const text = element.getAttribute(`data-${currentLang}`);
                if (text) {
                    element.textContent = text;
                }
            });

            // Update form placeholders
            const inputs = document.querySelectorAll('input[data-en-placeholder][data-ar-placeholder], textarea[data-en-placeholder][data-ar-placeholder]');
            inputs.forEach(input => {
                const placeholder = input.getAttribute(`data-${currentLang}-placeholder`);
                if (placeholder) {
                    input.setAttribute('placeholder', placeholder);
                }
            });

            // Store language preference
            localStorage.setItem('preferredLanguage', currentLang);
        }

        // Initialize language from localStorage
        const savedLang = localStorage.getItem('preferredLanguage');
        if (savedLang && savedLang !== currentLang) {
            switchLanguage();
        }

        languageToggle.addEventListener('click', switchLanguage);

        // Fixed Navbar scroll effect
        function handleScroll() {
            const navbar = document.getElementById('navbar');
            if (window.pageYOffset > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Add scroll event listener
        window.addEventListener('scroll', handleScroll);

        // Check scroll position on page load
        document.addEventListener('DOMContentLoaded', handleScroll);

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Form submission
        document.querySelector('.contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const message = currentLang === 'ar' 
                ? 'شكراً لاهتمامك! سنتواصل معك قريباً.' 
                : 'Thank you for your interest! We\'ll get back to you soon.';
            alert(message);
        });

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationDelay = '0s';
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, observerOptions);

        // Observe all animated elements
        document.querySelectorAll('.fade-in, .scale-in').forEach(el => {
            el.style.animationPlayState = 'paused';
            observer.observe(el);
        });