// Professional Jamuan Website JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Main initialization function
function initializeWebsite() {
    setupNavigationBar();
    setupScrollAnimations();
    setupNavigationCards();
    setupSmoothScrolling();
    setupScrollIndicator();
    setupMobileMenu();
}

// Navigation Bar Functionality
function setupNavigationBar() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add shadow when scrolling
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 2px 20px rgba(30, 64, 175, 0.1)';
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }

        // Hide/show navbar on scroll (optional)
        if (currentScroll > lastScroll && currentScroll > 500) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
}

// Mobile Menu Toggle
function setupMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // Animate hamburger (span transforms handled by CSS when .hamburger.active is set)
            const spans = hamburger.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
            // Toggle inner card appearance (centered white card on mobile)
            const inner = navMenu.querySelector('.nav-menu-inner');
            if (inner) inner.classList.toggle('open');
        });

        // Close menu when clicking nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                const inner = navMenu.querySelector('.nav-menu-inner');
                if (inner) inner.classList.remove('open');
            });
        });
    }
}

// Scroll Animations with Intersection Observer
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                if (element.classList.contains('section-header')) {
                    element.style.animation = 'fadeInUp 1s ease forwards';
                }
                
                if (element.classList.contains('nav-card')) {
                    const cards = document.querySelectorAll('.nav-card');
                    const index = Array.from(cards).indexOf(element);
                    const delay = index * 0.2;
                    
                    setTimeout(() => {
                        element.style.animation = 'fadeInUp 0.8s ease forwards';
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }, delay * 1000);
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const elementsToAnimate = document.querySelectorAll('.section-header, .nav-card');
    elementsToAnimate.forEach(element => observer.observe(element));
}

// Navigation Cards Click Handler
function setupNavigationCards() {
    const navCards = document.querySelectorAll('.nav-card');
    
    navCards.forEach(card => {
        card.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            handleNavigation(page);
        });

        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Handle navigation to different pages
function handleNavigation(page) {
    // Add loading animation
    showLoadingAnimation();
    
    // Create a mapping of data-page values to actual HTML files
    const pageMapping = {
        'tentatif': 'tentative.html',
        'anugerah': 'award.html',
        'maps': 'welcoming.html',
        'slideshow': 'slideshow.html',
        'tempat': 'location.html'
    };
    
    // Get the correct HTML file name
    const htmlFile = pageMapping[page];
    
    // Navigate to the page after a short delay
    setTimeout(() => {
        hideLoadingAnimation();
        if (htmlFile) {
            window.location.href = htmlFile;
        }
    }, 800);
}

// Show loading animation
function showLoadingAnimation() {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-spinner"></div>
            <p>Memuatkan...</p>
        </div>
    `;
    
    // Add loader styles
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(30, 64, 175, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(loader);
    
    // Fade in
    setTimeout(() => {
        loader.style.opacity = '1';
    }, 10);
    
    // Add spinner styles
    const style = document.createElement('style');
    style.textContent = `
        .loader-content {
            text-align: center;
            color: white;
        }
        .loader-spinner {
            width: 50px;
            height: 50px;
            border: 3px solid rgba(255,255,255,0.3);
            border-top: 3px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

// Hide loading animation
function hideLoadingAnimation() {
    const loader = document.querySelector('.page-loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 300);
    }
}

// Show page information modal
function showPageModal(page) {
    const pageInfo = {
        tentatif: {
            title: 'TENTATIF MAJLIS',
            description: 'Halaman ini akan menunjukkan jadual lengkap program majlis termasuk masa, aktiviti, dan lokasi setiap sesi.'
        },
        anugerah: {
            title: 'ANUGERAH & PENGHARGAAN',
            description: 'Senarai lengkap anugerah yang akan diberikan dan kategori pengiktirafan untuk para pengawas cemerlang.'
        },
        tempat: {
            title: 'MAKLUMAT TEMPAT',
            description: 'Butiran lokasi majlis, kemudahan yang tersedia, dan panduan untuk sampai ke venue.'
        },
        slideshow: {
            title: 'GALERI KENANGAN',
            description: 'Koleksi foto dan video sepanjang tahun yang menunjukkan aktiviti dan pencapaian pengawas.'
        },
        maps: {
            title: 'PETA & NAVIGASI',
            description: 'Peta interaktif dan panduan arah untuk membantu anda sampai ke lokasi majlis dengan mudah.'
        }
    };
    
    const info = pageInfo[page];
    const modal = document.createElement('div');
    modal.className = 'page-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>${info.title}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p>${info.description}</p>
                <div class="modal-actions">
                    <button class="btn-primary" onclick="createPage('${page}')">
                        Buat Halaman Ini
                    </button>
                    <button class="btn-secondary" onclick="closeModal()">
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(modal);
    
    // Add modal CSS
    const modalStyle = document.createElement('style');
    modalStyle.textContent = `
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(5px);
        }
        .modal-content {
            background: white;
            border-radius: 20px;
            padding: 0;
            max-width: 500px;
            width: 90%;
            max-height: 90vh;
            overflow: hidden;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            position: relative;
            transform: scale(0.8);
            transition: transform 0.3s ease;
        }
        .modal-header {
            background: var(--primary-blue);
            color: white;
            padding: 25px 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .modal-header h3 {
            font-size: 1.5rem;
            font-weight: 700;
            margin: 0;
        }
        .modal-close {
            background: none;
            border: none;
            color: white;
            font-size: 2rem;
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background-color 0.3s ease;
        }
        .modal-close:hover {
            background-color: rgba(255, 255, 255, 0.1);
        }
        .modal-body {
            padding: 30px;
        }
        .modal-body p {
            font-size: 1.1rem;
            line-height: 1.6;
            color: var(--gray);
            margin-bottom: 30px;
        }
        .modal-actions {
            display: flex;
            gap: 15px;
            flex-wrap: wrap;
        }
        .modal-actions .btn-primary,
        .modal-actions .btn-secondary {
            flex: 1;
            min-width: 150px;
            justify-content: center;
        }
    `;
    document.head.appendChild(modalStyle);
    
    // Show modal with animation
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('.modal-content').style.transform = 'scale(1)';
    }, 10);
    
    // Close modal handlers
    modal.querySelector('.modal-close').onclick = closeModal;
    modal.querySelector('.modal-overlay').onclick = closeModal;
}

// Close modal function
function closeModal() {
    const modal = document.querySelector('.page-modal');
    if (modal) {
        modal.style.opacity = '0';
        modal.querySelector('.modal-content').style.transform = 'scale(0.8)';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Create page function (placeholder)
function createPage(page) {
    closeModal();
    alert(`Sila buat fail ${page}.html untuk halaman ini.\n\nAnda perlu:\n1. Salin struktur HTML asas\n2. Tambah kandungan khusus untuk ${page.toUpperCase()}\n3. Link dengan CSS dan JS yang sama`);
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Scroll indicator functionality
function setupScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            scrollToSection('navigation');
        });
        
        // Hide scroll indicator when user scrolls
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const viewportHeight = window.innerHeight;
            
            if (scrolled > viewportHeight * 0.3) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        });
    }
}

// Add entrance animations on page load
function addEntranceAnimations() {
    const elementsWithDelay = [
        { selector: '.hero-badge', delay: 200 },
        { selector: '.hero-title', delay: 400 },
        { selector: '.hero-subtitle', delay: 600 },
        { selector: '.hero-description', delay: 800 },
        { selector: '.hero-buttons', delay: 1000 },
        { selector: '.hero-visual', delay: 1200 }
    ];
    
    elementsWithDelay.forEach(({ selector, delay }) => {
        const element = document.querySelector(selector);
        if (element) {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, delay);
        }
    });
}

// Performance optimization - Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Add CSS custom properties for dynamic theming (optional)
function initializeTheme() {
    // You can add dynamic theming functionality here
    // For example, dark mode toggle, color scheme changes, etc.
}

// Error handling for missing elements
function handleMissingElements() {
    const requiredElements = [
        '.navbar',
        '.hero-section',
        '.navigation-section'
    ];
    
    requiredElements.forEach(selector => {
        if (!document.querySelector(selector)) {
            console.warn(`Required element ${selector} not found`);
        }
    });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    handleMissingElements();
    addEntranceAnimations();
    initializeTheme();
});

// Add resize handler for responsive adjustments
window.addEventListener('resize', throttle(function() {
    // Handle responsive adjustments here if needed
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Mobile-specific adjustments
        document.body.classList.add('mobile');
    } else {
        document.body.classList.remove('mobile');
    }
}, 250));