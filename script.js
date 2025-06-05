// Initialize AOS
AOS.init({ duration: 800, once: true });

// Initialize Swiper
const swiper = new Swiper('.swiper-container', {
    loop: true,
    autoplay: { delay: 5000 },
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
});

// Smooth Scroll
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// Typing Animation
const texts = ['e-Office: Chuyển đổi số', 'e-Office: Văn phòng thông minh', 'e-Office: Hiệu quả vượt trội'];
let index = 0, charIndex = 0;

// First slide typing
const typingText = document.getElementById('typing-text');
function type() {
    if (typingText && charIndex < texts[index].length) {
        typingText.textContent = texts[index].slice(0, ++charIndex);
        setTimeout(type, 100);
    } else if (typingText) {
        setTimeout(() => {
            charIndex = 0;
            index = (index + 1) % texts.length;
            typingText.textContent = '';
            type();
        }, 2000);
    }
}
if (typingText) type();

// Second slide typing
const texts2 = ['Văn phòng thông minh', 'Quản lý hiệu quả', 'Tương lai số hóa'];
let index2 = 0, charIndex2 = 0;
const typingText2 = document.getElementById('typing-text-2');

function type2() {
    if (typingText2 && charIndex2 < texts2[index2].length) {
        typingText2.textContent = texts2[index2].slice(0, ++charIndex2);
        setTimeout(type2, 100);
    } else if (typingText2) {
        setTimeout(() => {
            charIndex2 = 0;
            index2 = (index2 + 1) % texts2.length;
            typingText2.textContent = '';
            type2();
        }, 2000);
    }
}
if (typingText2) type2();
// Toggle menu on hamburger button click
// Dark Mode Toggle
const toggleButton = document.getElementById('theme-toggle');
toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});
if (localStorage.getItem('theme') === 'dark') document.body.classList.add('dark');
// Active navigation on scroll - No highlight at footer
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    
    // If near bottom of page (footer area), don't highlight anything
    if (scrollTop + windowHeight >= documentHeight - 100) {
        // Clear all active states
        navLinks.forEach(link => link.classList.remove('active'));
        return;
    }
    
    // Normal section detection
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href').substring(1);
        
        if (href === current) {
            link.classList.add('active');
        }
    });
});

// Features Carousel - Enhanced Responsive
document.addEventListener('DOMContentLoaded', function() {
    const featuresDots = document.querySelectorAll('.features-dot');
    const featuresTrack = document.querySelector('.features-track');
    const featureCards = document.querySelectorAll('.feature-card');
    let currentSlide = 0;
    
    // Calculate how many cards to show and scroll based on screen size
    function getCardsConfig() {
        const width = window.innerWidth;
        if (width >= 1024) { // lg breakpoint
            return { show: 4, scroll: 2 }; // Show 4 at a time, scroll 2 at a time
        } else if (width >= 768) { // md breakpoint
            return { show: 3, scroll: 2 }; // Show 3 at a time, scroll 2 at a time
        } else if (width >= 640) { // sm breakpoint
            return { show: 2, scroll: 2 }; // Show 2 at a time, scroll 2 at a time
        } else {
            return { show: 1, scroll: 1 }; // Show 1 at a time, scroll 1 at a time
        }
    }
    
    // Update carousel position
    function updateCarousel() {
        const config = getCardsConfig();
        const cardWidth = 100 / config.show; // Width as percentage
        
        // For mobile, show all cards vertically
        if (window.innerWidth < 640) {
            featuresTrack.style.flexDirection = 'column';
            featuresTrack.style.transform = 'none';
            featureCards.forEach(card => {
                card.style.width = '100%';
                card.style.marginBottom = '1rem';
            });
            // Hide dots on mobile
            featuresDots.forEach(dot => dot.style.display = 'none');
            return;
        }
        
        // Reset for larger screens
        featuresTrack.style.flexDirection = 'row';
        featuresDots.forEach(dot => dot.style.display = 'block');
        
        // Set width of each card based on how many to show
        featureCards.forEach(card => {
            card.style.width = `${cardWidth}%`;
            card.style.marginBottom = '0';
        });
        
        // Calculate translation amount
        const translateX = currentSlide === 0 ? 0 : -(cardWidth * config.scroll);
        
        // Apply smooth transition
        featuresTrack.style.transform = `translateX(${translateX}%)`;
        
        // Update active dot
        featuresDots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active', 'bg-blue-600');
                dot.classList.remove('bg-gray-300');
            } else {
                dot.classList.remove('active', 'bg-blue-600');
                dot.classList.add('bg-gray-300');
            }
        });
    }
    
    // Initialize carousel
    updateCarousel();
    
    // Handle dot clicks
    featuresDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateCarousel();
        });
    });
    
    // Update on window resize with debounce
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateCarousel, 250);
    });
});

// Tab Navigation System - Enhanced
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    // Set initial state - activate first tab
    if (tabButtons.length > 0 && tabPanels.length > 0) {
        tabButtons[0].classList.add('active');
        tabPanels[0].classList.add('active');
    }
    
    // Calculate content height based on active panel
    function updateContentHeight() {
        const activePanel = document.querySelector('.tab-panel.active');
        if (activePanel) {
            const tabContent = document.querySelector('.tab-content');
            const img = activePanel.querySelector('img');
            
            if (img) {
                // Wait for image to load
                if (img.complete) {
                    tabContent.style.height = `${activePanel.offsetHeight}px`;
                } else {
                    img.onload = () => {
                        tabContent.style.height = `${activePanel.offsetHeight}px`;
                    };
                }
            } else {
                tabContent.style.height = `${activePanel.offsetHeight}px`;
            }
        }
    }
    
    // Initial height calculation with delay for images
    setTimeout(updateContentHeight, 300);
    
    // Handle tab switching
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // First, start the fade out of the current panel
            const currentPanel = document.querySelector('.tab-panel.active');
            if (currentPanel) {
                currentPanel.style.opacity = '0';
                
                // After fade out completes, switch panels
                setTimeout(() => {
                    tabPanels.forEach(panel => {
                        panel.classList.remove('active');
                    });
                    
                    // Activate the selected button and panel
                    this.classList.add('active');
                    const targetPanel = document.getElementById(tabId);
                    if (targetPanel) {
                        targetPanel.classList.add('active');
                        
                        // Start fade in of the new panel
                        setTimeout(() => {
                            targetPanel.style.opacity = '1';
                            updateContentHeight();
                        }, 50);
                    }
                }, 300); // Match this to the CSS transition duration
            }
        });
    });

    // Update height on window resize with debounce
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateContentHeight, 250);
    });
});

// Back to Top Button - Enhanced
window.addEventListener('load', function() {
    const btn = document.getElementById('backToTop');
    
    if (btn) {
        // Show/hide on scroll with throttle
        let ticking = false;
        
        function updateBackToTop() {
            if (window.scrollY > 200) {
                btn.style.display = 'flex';
                btn.style.opacity = '1';
            } else {
                btn.style.opacity = '0';
                setTimeout(() => {
                    if (window.scrollY <= 200) {
                        btn.style.display = 'none';
                    }
                }, 300);
            }
            ticking = false;
        }
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateBackToTop);
                ticking = true;
            }
        });
        
        // Click to scroll with smooth animation
        btn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Add keyboard support
        btn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    }
});

// Responsive Navigation Menu - Mobile Optimization
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add touch support for mobile navigation
    navLinks.forEach(link => {
        link.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        link.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Handle orientation change
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            // Recalculate heights and positions after orientation change
            const event = new Event('resize');
            window.dispatchEvent(event);
        }, 100);
    });
});

// Performance Optimization - Lazy Loading for Images
document.addEventListener('DOMContentLoaded', function() {
    // Add intersection observer for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        // Observe all images with data-src attribute
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// Touch and Gesture Support
document.addEventListener('DOMContentLoaded', function() {
    // Add touch support for cards
    const cards = document.querySelectorAll('.card, .group');
    
    cards.forEach(card => {
        let touchStartY = 0;
        
        card.addEventListener('touchstart', function(e) {
            touchStartY = e.touches[0].clientY;
            this.style.transition = 'transform 0.1s ease';
            this.style.transform = 'scale(0.98)';
        });
        
        card.addEventListener('touchmove', function(e) {
            const touchY = e.touches[0].clientY;
            const deltaY = touchStartY - touchY;
            
            // Prevent default scroll if moving vertically on card
            if (Math.abs(deltaY) > 10) {
                e.preventDefault();
            }
        });
        
        card.addEventListener('touchend', function() {
            this.style.transition = 'transform 0.3s ease';
            this.style.transform = 'scale(1)';
        });
    });
});

// Error Handling and Fallbacks
window.addEventListener('error', function(e) {
    console.warn('Script error caught:', e.error);
    
    // Fallback for critical functionality
    if (e.error && e.error.message.includes('Swiper')) {
        console.warn('Swiper failed to load, implementing fallback');
        // Simple fallback for hero slider
        const slides = document.querySelectorAll('.swiper-slide');
        if (slides.length > 0) {
            slides[0].style.display = 'block';
        }
    }
});

// Accessibility Improvements
document.addEventListener('DOMContentLoaded', function() {
    // Add ARIA labels and roles where needed
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach((link, index) => {
        link.setAttribute('role', 'menuitem');
        link.setAttribute('tabindex', '0');
    });
    
    // Add keyboard navigation for tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach((button, index) => {
        button.setAttribute('role', 'tab');
        button.setAttribute('tabindex', index === 0 ? '0' : '-1');
        
        button.addEventListener('keydown', function(e) {
            let targetIndex = index;
            
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                targetIndex = (index + 1) % tabButtons.length;
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                targetIndex = (index - 1 + tabButtons.length) % tabButtons.length;
            } else if (e.key === 'Home') {
                e.preventDefault();
                targetIndex = 0;
            } else if (e.key === 'End') {
                e.preventDefault();
                targetIndex = tabButtons.length - 1;
            }
            
            if (targetIndex !== index) {
                tabButtons[targetIndex].focus();
                tabButtons[targetIndex].click();
            }
        });
    });
    
        // Add focus indicators
    const focusableElements = document.querySelectorAll('button, a, input, [tabindex]');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #f97316';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
});

// Smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const smoothScrollPolyfill = function(target) {
        const startPosition = window.pageYOffset;
        const targetPosition = target.offsetTop;
        const distance = targetPosition - startPosition;
        const duration = 1000;
        let start = null;
        
        function animation(currentTime) {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }
        
        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }
        
        requestAnimationFrame(animation);
    };
    
    // Override smooth scroll for nav links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                smoothScrollPolyfill(targetSection);
            }
        });
    });
}

// Final initialization check
document.addEventListener('DOMContentLoaded', function() {
    console.log('Website fully loaded and responsive optimized');
    
    // Check if all critical elements are present
    const criticalElements = [
        '.navbar-glass',
        '#hero-slider',
        '.features-carousel-container',
        '.tab-content',
        '#backToTop'
    ];
    
    criticalElements.forEach(selector => {
        const element = document.querySelector(selector);
        if (!element) {
            console.warn(`Critical element missing: ${selector}`);
        }
    });
});

// Thêm vào cuối file script.js hiện tại

// ===== MOBILE HAMBURGER MENU FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle') || document.getElementById('mobile-menu-toggle-fixed');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');    
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const body = document.body;
    
    let isMenuOpen = false;
    
    // Function to open mobile menu
    function openMobileMenu() {
        isMenuOpen = true;
        mobileMenuToggle.classList.add('active');
        mobileMenu.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        body.classList.add('menu-open');
        
        // Add staggered animation to menu items
        mobileNavLinks.forEach((link, index) => {
            link.style.animationDelay = `${0.1 + (index * 0.05)}s`;
        });
                
        // Focus management for accessibility
        mobileMenuToggle.focus();

        
        // Prevent scroll on background
        const scrollY = window.scrollY;
        body.style.position = 'fixed';
        body.style.top = `-${scrollY}px`;
        body.style.width = '100%';
    }
    
    // Function to close mobile menu
    function closeMobileMenu() {
        isMenuOpen = false;
        mobileMenuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        body.classList.remove('menu-open');
        
        // Restore scroll position
        const scrollY = body.style.top;
        body.style.position = '';
        body.style.top = '';
        body.style.width = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
        
        // Return focus to toggle button
        mobileMenuToggle.focus();
    }
    
    // Toggle menu on hamburger button click
    mobileMenuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (isMenuOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });
    
    // Close menu on overlay click
    mobileMenuOverlay.addEventListener('click', function(e) {
        if (e.target === mobileMenuOverlay) {
            closeMobileMenu();
        }
    });
    
    // Close menu when clicking on navigation links
// Close menu when clicking on navigation links
mobileNavLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault(); // Ngăn hành vi mặc định
        
        // Lấy target section
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            // Đóng menu trước
            closeMobileMenu();
            
            // Delay một chút rồi scroll
            setTimeout(() => {
                const headerHeight = document.querySelector('header').offsetHeight || 80;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }, 400);
        } else {
            // Nếu không tìm thấy section, vẫn đóng menu
            closeMobileMenu();
        }
    });
});



    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (isMenuOpen) {
            // Close menu on Escape key
            if (e.key === 'Escape') {
                e.preventDefault();
                closeMobileMenu();
            }
            
            // Tab trapping within mobile menu
            if (e.key === 'Tab') {
                const focusableElements = mobileMenu.querySelectorAll(
                    'button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];
                
                if (e.shiftKey) {
                    // Shift + Tab
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    // Tab
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        }
    });
    
    // Close menu on window resize to desktop size
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768 && isMenuOpen) {
            closeMobileMenu();
        }
    });
    
    // Handle orientation change
    window.addEventListener('orientationchange', function() {
        if (isMenuOpen) {
            // Small delay to allow orientation change to complete
            setTimeout(() => {
                if (window.innerWidth >= 768) {
                    closeMobileMenu();
                }
            }, 100);
        }
    });
    
    // Active state management for mobile nav links
    function updateMobileNavActiveState() {
        const sections = document.querySelectorAll('section[id]');
        let current = '';
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY;
        
        // Don't highlight anything if near footer
        if (scrollTop + windowHeight >= documentHeight - 100) {
            mobileNavLinks.forEach(link => link.classList.remove('active'));
            return;
        }
        
        // Find current section
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        // Update active states
        mobileNavLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').substring(1);
            
            if (href === current) {
                link.classList.add('active');
            }
        });
    }
    
    // Update active states on scroll (throttled)
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                updateMobileNavActiveState();
                scrollTimeout = null;
            }, 100);
        }
    });
    
    // Initial active state check
    updateMobileNavActiveState();
    
    // Touch gesture support for mobile menu
    let touchStartX = 0;
    let touchStartY = 0;
    
    // Swipe to close menu
    mobileMenu.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    });
    
    mobileMenu.addEventListener('touchmove', function(e) {
        if (!isMenuOpen) return;
        
        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;
        const deltaX = touchX - touchStartX;
        const deltaY = touchY - touchStartY;
        
        // Swipe right to close (only if horizontal swipe is dominant)
        if (deltaX < -50 && Math.abs(deltaX) > Math.abs(deltaY)) {
            closeMobileMenu();
        }
    });
    
    // Prevent menu from closing when scrolling within menu
    mobileMenu.addEventListener('touchmove', function(e) {
        e.stopPropagation();
    });
    
    // Performance optimization: Use passive listeners where possible
    const passiveOptions = { passive: true };
    
    mobileMenu.addEventListener('scroll', function() {
        // Handle menu scroll if needed
    }, passiveOptions);
    
    // Debug logging (remove in production)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('Mobile hamburger menu initialized successfully');
    }
});


