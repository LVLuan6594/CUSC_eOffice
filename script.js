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
const typingText = document.getElementById('typing-text');
function type() {
    if (charIndex < texts[index].length) {
        typingText.textContent = texts[index].slice(0, ++charIndex);
        setTimeout(type, 100);
    } else {
        setTimeout(() => {
            charIndex = 0;
            index = (index + 1) % texts.length;
            typingText.textContent = '';
            type();
        }, 2000);
    }
}
type();

// Dark Mode Toggle
const toggleButton = document.getElementById('theme-toggle');
toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});
if (localStorage.getItem('theme') === 'dark') document.body.classList.add('dark');

// Header scroll effect
// window.addEventListener('scroll', function() {
//   const header = document.querySelector('header');
//   if (window.scrollY > 10) {
//     header.classList.add('scrolled');
//   } else {
//     header.classList.remove('scrolled');
//   }
// });

// Add this to your existing script.js file

// Active navigation on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
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


// Features Carousel
document.addEventListener('DOMContentLoaded', function() {
    const featuresDots = document.querySelectorAll('.features-dot');
    const featuresTrack = document.querySelector('.features-track');
    const featureCards = document.querySelectorAll('.feature-card');
    let currentSlide = 0;
    
    // Calculate how many cards to show and scroll based on screen size
    function getCardsConfig() {
        if (window.innerWidth >= 1024) { // lg breakpoint
            return { show: 4, scroll: 2 }; // Show 4 at a time, scroll 2 at a time
        } else if (window.innerWidth >= 640) { // sm breakpoint
            return { show: 2, scroll: 2 }; // Show 2 at a time, scroll 2 at a time
        } else {
            return { show: 1, scroll: 1 }; // Show 1 at a time, scroll 1 at a time
        }
    }
    
    // Update carousel position
    function updateCarousel() {
        const config = getCardsConfig();
        const cardWidth = 100 / config.show; // Width as percentage
        
        // Set width of each card based on how many to show
        featureCards.forEach(card => {
            card.style.width = `${cardWidth}%`;
        });
        
        // Calculate translation amount
        // For the second slide, we want to show the last 2 cards from first slide + 2 new cards
        const translateX = currentSlide === 0 ? 0 : -(cardWidth * 2); // Slide by 2 cards
        
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
    
    // Update on window resize
    window.addEventListener('resize', updateCarousel);
});






document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));

            // Add active class to the clicked button and corresponding panel
            const tabId = button.getAttribute('data-tab');
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
});


// Tab Navigation System
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    // Set initial state - activate first tab
    tabButtons[0].classList.add('active');
    tabPanels[0].classList.add('active');
    
    // Calculate content height based on active panel
    function updateContentHeight() {
        const activePanel = document.querySelector('.tab-panel.active');
        if (activePanel) {
            const tabContent = document.querySelector('.tab-content');
            tabContent.style.height = `${activePanel.offsetHeight}px`;
        }
    }
    
    // Initial height calculation
    setTimeout(updateContentHeight, 100);
    
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
                    targetPanel.classList.add('active');
                    
                    // Start fade in of the new panel
                    setTimeout(() => {
                        targetPanel.style.opacity = '1';
                        updateContentHeight();
                    }, 50);
                }, 300); // Match this to the CSS transition duration
            }
        });
    });
    
    // Update height on window resize
    window.addEventListener('resize', updateContentHeight);
});
