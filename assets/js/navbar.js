// Navbar functionality
(function() {
    'use strict';

    // Get current page from URL
    function getCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop() || 'index.html';
        
        // Map filenames to page identifiers
        const pageMap = {
            'index.html': 'home',
            'catalog.html': 'catalog',
            'about.html': 'about',
            'services.html': 'services',
            'contact.html': 'contact'
        };
        
        return pageMap[filename] || 'home';
    }

    // Set active navigation link
    function setActiveNavLink() {
        const currentPage = getCurrentPage();
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            // Remove all active classes first
            link.classList.remove('active');
            
            // Add active class to current page link
            if (link.getAttribute('data-page') === currentPage) {
                link.classList.add('active');
            }
        });
    }

    // Initialize navbar
    function initNavbar() {
        setActiveNavLink();
        
        // Add click event listeners for smooth navigation
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                
                // Add active class to clicked link
                this.classList.add('active');
            });
        });
    }

    // Mobile menu functionality
    function initMobileMenu() {
        const mobileBtn = document.querySelector('.mobile-menu-btn');
        const navMenu = document.querySelector('.nav-menu');
        
        if (mobileBtn && navMenu) {
            mobileBtn.addEventListener('click', () => {
                const visible = getComputedStyle(navMenu).display !== 'none';
                
                if (visible) {
                    // Hide menu
                    navMenu.style.transform = 'translateY(-20px)';
                    navMenu.style.opacity = '0';
                    setTimeout(() => {
                        navMenu.style.display = 'none';
                    }, 300);
                    mobileBtn.classList.remove('active');
                } else {
                    // Show menu
                    navMenu.style.display = 'flex';
                    navMenu.style.flexDirection = 'column';
                    navMenu.style.gap = '18px';
                    navMenu.style.background = '#fff';
                    navMenu.style.position = 'absolute';
                    navMenu.style.top = '64px';
                    navMenu.style.left = '0';
                    navMenu.style.right = '0';
                    navMenu.style.padding = '14px 20px 20px';
                    navMenu.style.borderBottom = '1px solid #e6e6e6';
                    navMenu.style.transform = 'translateY(-20px)';
                    navMenu.style.opacity = '0';
                    navMenu.style.transition = 'all 0.3s ease';
                    
                    requestAnimationFrame(() => {
                        navMenu.style.transform = 'translateY(0)';
                        navMenu.style.opacity = '1';
                    });
                    mobileBtn.classList.add('active');
                }
            });
        }
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initNavbar();
            initMobileMenu();
        });
    } else {
        initNavbar();
        initMobileMenu();
    }

})();
