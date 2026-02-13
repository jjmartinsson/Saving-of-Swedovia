/* ========================================
   SAVING OF SWEDOVIA — Main JavaScript
   ======================================== */

(function () {
    'use strict';

    // ---- Language System ----
    let currentLang = 'en';

    function setLanguage(lang) {
        currentLang = lang;
        document.documentElement.lang = lang;

        // Update all translatable elements
        document.querySelectorAll('[data-en]').forEach(el => {
            const text = el.getAttribute(`data-${lang}`);
            if (text) {
                // Preserve HTML for elements that contain links
                if (text.includes('<a ') || text.includes('<br')) {
                    el.innerHTML = text;
                } else {
                    el.textContent = text;
                }
            }
        });

        // Update select option texts
        document.querySelectorAll('select option[data-en]').forEach(opt => {
            const text = opt.getAttribute(`data-${lang}`);
            if (text) opt.textContent = text;
        });

        // Update lang toggle active state
        document.querySelectorAll('.lang-option').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        // Update form placeholders
        updatePlaceholders(lang);

        // Store preference
        try {
            localStorage.setItem('swedovia-lang', lang);
        } catch (e) {
            // localStorage not available
        }
    }

    function updatePlaceholders(lang) {
        const placeholders = {
            en: {
                'updates-profession': 'e.g. Crisis Manager, Firefighter...',
                'updates-organization': 'e.g. Municipality of...',
            },
            sv: {
                'updates-profession': 't.ex. Krishanterare, Brandman...',
                'updates-organization': 't.ex. Kommun...',
            }
        };

        const p = placeholders[lang] || placeholders.en;
        Object.entries(p).forEach(([id, text]) => {
            const el = document.getElementById(id);
            if (el) el.placeholder = text;
        });
    }

    // ---- Navigation ----
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    // Scroll handling — navbar background
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
        updateActiveNavLink();
    }

    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 120;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-menu a[href="#${id}"]`);

            if (link) {
                if (scrollPos >= top && scrollPos < top + height) {
                    document.querySelectorAll('.nav-menu a').forEach(a => a.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    }

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu on link click
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // ---- Language Toggle ----
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const newLang = currentLang === 'en' ? 'sv' : 'en';
            setLanguage(newLang);
        });
    }

    // ---- Hero Particles ----
    function createParticles() {
        const container = document.getElementById('heroParticles');
        if (!container) return;

        const count = 20;
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (8 + Math.random() * 12) + 's';
            particle.style.animationDelay = (Math.random() * 10) + 's';
            particle.style.width = (2 + Math.random() * 3) + 'px';
            particle.style.height = particle.style.width;
            container.appendChild(particle);
        }
    }

    // ---- Scroll Reveal ----
    function initScrollReveal() {
        const revealElements = document.querySelectorAll(
            '.section-header, .about-text, .about-visual, .timeline-item, ' +
            '.team-card, .participation-card, .collab-content, .collab-visual, ' +
            '.position-card, .media-placeholder'
        );

        revealElements.forEach(el => el.classList.add('reveal'));

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => observer.observe(el));
    }

    // ---- Form Handling ----
    const formModal = document.getElementById('formModal');
    const modalClose = document.getElementById('modalClose');
    const modalBtn = document.getElementById('modalBtn');

    function showModal() {
        formModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function hideModal() {
        formModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (modalClose) modalClose.addEventListener('click', hideModal);
    if (modalBtn) modalBtn.addEventListener('click', hideModal);

    if (formModal) {
        formModal.addEventListener('click', (e) => {
            if (e.target === formModal) hideModal();
        });
    }

    // Updates form
    const updatesForm = document.getElementById('updatesForm');
    if (updatesForm) {
        updatesForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Collect form data
            const formData = new FormData(updatesForm);
            const data = Object.fromEntries(formData.entries());
            console.log('Updates signup:', data);

            // In production, this would POST to a backend/API
            // For now, show success modal
            const title = document.getElementById('modalTitle');
            const msg = document.getElementById('modalMessage');
            if (title) {
                title.setAttribute('data-en', 'Thank You!');
                title.setAttribute('data-sv', 'Tack!');
                title.textContent = currentLang === 'sv' ? 'Tack!' : 'Thank You!';
            }
            if (msg) {
                const enMsg = 'You have been added to our mailing list. We will keep you updated on the progress of Saving of Swedovia.';
                const svMsg = 'Du har lagts till på vår e-postlista. Vi håller dig uppdaterad om utvecklingen av Saving of Swedovia.';
                msg.setAttribute('data-en', enMsg);
                msg.setAttribute('data-sv', svMsg);
                msg.textContent = currentLang === 'sv' ? svMsg : enMsg;
            }

            showModal();
            updatesForm.reset();
        });
    }

    // Interview form
    const interviewForm = document.getElementById('interviewForm');
    if (interviewForm) {
        interviewForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(interviewForm);
            const data = Object.fromEntries(formData.entries());
            console.log('Interview signup:', data);

            const title = document.getElementById('modalTitle');
            const msg = document.getElementById('modalMessage');
            if (title) {
                title.setAttribute('data-en', 'Thank You for Your Interest!');
                title.setAttribute('data-sv', 'Tack för ditt intresse!');
                title.textContent = currentLang === 'sv' ? 'Tack för ditt intresse!' : 'Thank You for Your Interest!';
            }
            if (msg) {
                const enMsg = 'We have received your interview sign-up. A member of our team will reach out to you soon to schedule a conversation.';
                const svMsg = 'Vi har mottagit din anmälan till intervju. En medlem i vårt team kontaktar dig snart för att boka ett samtal.';
                msg.setAttribute('data-en', enMsg);
                msg.setAttribute('data-sv', svMsg);
                msg.textContent = currentLang === 'sv' ? svMsg : enMsg;
            }

            showModal();
            interviewForm.reset();
        });
    }

    // ---- Smooth scroll for anchor links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ---- Initialize ----
    function init() {
        // Check stored language preference
        try {
            const stored = localStorage.getItem('swedovia-lang');
            if (stored && (stored === 'en' || stored === 'sv')) {
                setLanguage(stored);
            } else {
                // Try to detect from browser
                const browserLang = navigator.language || navigator.userLanguage;
                if (browserLang && browserLang.startsWith('sv')) {
                    setLanguage('sv');
                } else {
                    setLanguage('en');
                }
            }
        } catch (e) {
            setLanguage('en');
        }

        handleScroll();
        createParticles();
        initScrollReveal();

        window.addEventListener('scroll', handleScroll, { passive: true });
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
