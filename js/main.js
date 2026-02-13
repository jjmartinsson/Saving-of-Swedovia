/* =============================================
   SAVING OF SWEDOVIA — Main JS
   ============================================= */
(function () {
    'use strict';

    // ---- State ----
    let lang = 'en';

    // ---- DOM refs ----
    const $ = (s, p) => (p || document).querySelector(s);
    const $$ = (s, p) => [...(p || document).querySelectorAll(s)];

    const navbar    = $('#navbar');
    const navLinks  = $('#navLinks');
    const toggle    = $('#mobileToggle');
    const langBtn   = $('#langSwitch');
    const modal     = $('#modal');
    const modalX    = $('#modalX');
    const modalOk   = $('#modalOk');
    const modalT    = $('#modalTitle');
    const modalM    = $('#modalMsg');

    // ---- Language ----
    function setLang(l) {
        lang = l;
        document.documentElement.lang = l;

        $$('[data-en]').forEach(el => {
            const val = el.getAttribute('data-' + l);
            if (!val) return;
            if (val.includes('<a ') || val.includes('<br')) {
                el.innerHTML = val;
            } else {
                el.textContent = val;
            }
        });

        // Options inside selects
        $$('select option[data-en]').forEach(opt => {
            const val = opt.getAttribute('data-' + l);
            if (val) opt.textContent = val;
        });

        // Toggle button highlight
        $$('.lang-switch span').forEach(s => {
            s.classList.toggle('active',
                (l === 'en' && s.classList.contains('lang-en')) ||
                (l === 'sv' && s.classList.contains('lang-sv'))
            );
        });

        try { localStorage.setItem('sos-lang', l); } catch (_) {}
    }

    // ---- Navigation ----
    function onScroll() {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
        highlightNav();
    }

    function highlightNav() {
        const scrollY = window.scrollY + 100;
        $$('section[id], header[id]').forEach(sec => {
            const link = $(`.nav-links a[href="#${sec.id}"]`);
            if (!link) return;
            const top = sec.offsetTop;
            const bot = top + sec.offsetHeight;
            link.classList.toggle('active', scrollY >= top && scrollY < bot);
        });
    }

    // Mobile menu
    if (toggle) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('open');
            navLinks.classList.toggle('open');
        });
    }

    $$('.nav-links a').forEach(a => {
        a.addEventListener('click', () => {
            toggle.classList.remove('open');
            navLinks.classList.remove('open');
        });
    });

    // ---- Language switch ----
    if (langBtn) {
        langBtn.addEventListener('click', () => {
            setLang(lang === 'en' ? 'sv' : 'en');
        });
    }

    // ---- Fire Canvas (subtle ember particles) ----
    function initFireCanvas() {
        const canvas = $('#fireCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let w, h, particles = [];
        const COUNT = 50;

        function resize() {
            w = canvas.width  = canvas.offsetWidth;
            h = canvas.height = canvas.offsetHeight;
        }

        function spawn() {
            return {
                x: Math.random() * w,
                y: h + Math.random() * 20,
                r: 1 + Math.random() * 2.5,
                vx: (Math.random() - 0.5) * 0.4,
                vy: -(0.3 + Math.random() * 0.8),
                life: 0,
                maxLife: 120 + Math.random() * 200,
                hue: 20 + Math.random() * 25,
            };
        }

        function init() {
            resize();
            for (let i = 0; i < COUNT; i++) {
                const p = spawn();
                p.y = Math.random() * h;
                p.life = Math.random() * p.maxLife;
                particles.push(p);
            }
        }

        function draw() {
            ctx.clearRect(0, 0, w, h);
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.life++;
                const progress = p.life / p.maxLife;
                const alpha = progress < 0.1 ? progress * 10 : (1 - progress);
                if (p.life >= p.maxLife || p.y < -10) {
                    particles[i] = spawn();
                    continue;
                }
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r * (1 - progress * 0.5), 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${p.hue}, 80%, 55%, ${alpha * 0.6})`;
                ctx.fill();
            }
            requestAnimationFrame(draw);
        }

        window.addEventListener('resize', resize);
        init();
        draw();
    }

    // ---- Scroll reveal ----
    function initReveal() {
        const els = $$(
            '.section-eyebrow, .section-heading, .section-intro, ' +
            '.about-main, .about-aside, .phase, .member, ' +
            '.form-panel, .collab-block, .positions-block, .media-empty'
        );
        els.forEach(el => el.classList.add('reveal'));

        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    obs.unobserve(e.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        els.forEach(el => obs.observe(el));
    }

    // ---- Modal ----
    function openModal(title, msg) {
        modalT.textContent = title;
        modalM.textContent = msg;
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }
    function closeModal() {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
    if (modalX) modalX.addEventListener('click', closeModal);
    if (modalOk) modalOk.addEventListener('click', closeModal);
    if (modal) modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

    // ---- Forms ----
    const updatesForm = $('#updatesForm');
    const interviewForm = $('#interviewForm');

    if (updatesForm) {
        updatesForm.addEventListener('submit', e => {
            e.preventDefault();
            const data = Object.fromEntries(new FormData(updatesForm));
            console.log('Updates signup:', data);
            const t = lang === 'sv' ? 'Tack!' : 'Thank You!';
            const m = lang === 'sv'
                ? 'Du har lagts till på vår lista. Vi håller dig uppdaterad om Saving of Swedovia.'
                : 'You have been added to our mailing list. We will keep you updated on the progress of Saving of Swedovia.';
            openModal(t, m);
            updatesForm.reset();
        });
    }

    if (interviewForm) {
        interviewForm.addEventListener('submit', e => {
            e.preventDefault();
            const data = Object.fromEntries(new FormData(interviewForm));
            console.log('Interview signup:', data);
            const t = lang === 'sv' ? 'Tack för ditt intresse!' : 'Thank You for Your Interest!';
            const m = lang === 'sv'
                ? 'Vi har mottagit din anmälan. En medlem i vårt team kontaktar dig snart för att boka en intervju.'
                : 'We have received your sign-up. A member of our team will reach out to you soon to schedule an interview.';
            openModal(t, m);
            interviewForm.reset();
        });
    }

    // ---- Smooth scroll ----
    $$('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = $(a.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ---- Init ----
    function boot() {
        // Detect language
        try {
            const stored = localStorage.getItem('sos-lang');
            if (stored === 'en' || stored === 'sv') {
                setLang(stored);
            } else {
                const bl = (navigator.language || '').toLowerCase();
                setLang(bl.startsWith('sv') ? 'sv' : 'en');
            }
        } catch (_) {
            setLang('en');
        }

        onScroll();
        initFireCanvas();
        initReveal();
        window.addEventListener('scroll', onScroll, { passive: true });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
