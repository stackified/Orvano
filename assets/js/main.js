(function () {
    const $ = (sel, root = document) => root.querySelector(sel);
    const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

    // Navbar functionality is now handled by navbar.js

    // Search modal
    const searchBtn = $('.search-btn');
    const searchModal = $('#searchModal');
    const closeSearch = $('#closeSearch');
    if (searchBtn && searchModal) {
        searchBtn.addEventListener('click', () => {
            searchModal.classList.add('open');
            const input = $('.search-input', searchModal);
            if (input) setTimeout(() => input.focus(), 0);
        });
    }
    if (closeSearch && searchModal) {
        closeSearch.addEventListener('click', () => searchModal.classList.remove('open'));
        searchModal.addEventListener('click', (e) => {
            if (e.target === searchModal) searchModal.classList.remove('open');
        });
    }

    // Carousel indicators demo (no real carousel; this toggles indicators for demo)
    const indicators = $$('.carousel-indicators .indicator');
    if (indicators.length) {
        let active = 0;
        setInterval(() => {
            indicators[active].classList.remove('active');
            active = (active + 1) % indicators.length;
            indicators[active].classList.add('active');
        }, 3000);
    }

    // Enhanced contact form handling with animations
    const contactForm = $('#contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const payload = Object.fromEntries(formData.entries());
            console.log('Contact form submitted', payload);
            
            // Animate submit button
            const submitBtn = contactForm.querySelector('.submit-button');
            submitBtn.style.transform = 'scale(0.95)';
            submitBtn.textContent = 'Sending...';
            
            setTimeout(() => {
                submitBtn.style.transform = 'scale(1)';
                submitBtn.textContent = 'Message Sent!';
                submitBtn.style.background = '#28a745';
                
                setTimeout(() => {
                    submitBtn.textContent = 'Send Message';
                    submitBtn.style.background = '#111';
                    contactForm.reset();
                }, 2000);
            }, 1000);
        });
    }

    // Scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add fade-in-on-scroll class to elements
    const sections = $$('section');
    sections.forEach((section, index) => {
        if (index > 0) { // Skip hero section
            section.classList.add('fade-in-on-scroll');
            observer.observe(section);
        }
    });

    // Parallax effect for hero background
    let ticking = false;
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const hero = $('.hero-bg');
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);

    // Smooth scroll for navigation links
    $$('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = $(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading animation to images
    $$('img').forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '0';
            this.style.transition = 'opacity 0.5s ease';
            requestAnimationFrame(() => {
                this.style.opacity = '1';
            });
        });
    });

    // Simple hero animation trigger
    const heroBg = $('.hero-bg');
    if (heroBg) {
        // Ensure animations start properly
        heroBg.style.animationPlayState = 'running';
    }

})();
