// Main JavaScript for EcoEnzyme Pro Portfolio Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initSmoothScrolling();
    initFormHandling();
    initVideoPlayers();
    initAnimations();
    initCertificateViewer();
    initProductFilters();
    initContactForm();
    initScrollEffects();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Animate menu items
            if (!mobileMenu.classList.contains('hidden')) {
                const menuItems = mobileMenu.querySelectorAll('a');
                menuItems.forEach((item, index) => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(-10px)';
                    setTimeout(() => {
                        item.style.transition = 'all 0.3s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuBtn.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed header
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form Handling
function initFormHandling() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this);
        });
    });
}

function handleFormSubmission(form) {
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        showNotification('Thank you! Your inquiry has been submitted successfully. We will contact you within 24 hours.', 'success');
        form.reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Video Player Functionality
function initVideoPlayers() {
    const videoThumbnails = document.querySelectorAll('[onclick^="playVideo"]');
    
    videoThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const videoId = this.getAttribute('onclick').match(/playVideo\('(.+)'\)/)[1];
            openVideoModal(videoId);
        });
    });
}

function playVideo(videoId) {
    openVideoModal(videoId);
}

function openVideoModal(videoId) {
    // Create modal for video playback
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="relative max-w-4xl w-full mx-4">
            <button class="absolute -top-10 right-0 text-white text-2xl hover:text-gray-300" onclick="closeVideoModal(this)">
                ✕
            </button>
            <div class="bg-gray-900 rounded-lg overflow-hidden">
                <div class="aspect-video bg-gray-800 flex items-center justify-center">
                    <div class="text-center text-white">
                        <div class="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd"></path>
                            </svg>
                        </div>
                        <h3 class="text-xl font-semibold mb-2">Video: ${getVideoTitle(videoId)}</h3>
                        <p class="text-gray-300">Video player would be embedded here</p>
                        <p class="text-sm text-gray-400 mt-2">In a real implementation, this would show the actual video content</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

function closeVideoModal(button) {
    const modal = button.closest('.fixed');
    modal.remove();
    document.body.style.overflow = 'auto';
}

function getVideoTitle(videoId) {
    const titles = {
        'company-overview': 'Company Overview & Introduction',
        'ecogrow-demo': 'EcoGrow Pro - Complete Product Demo',
        'ecoclean-demo': 'EcoClean Plus - Environmental Solution',
        'agriculture-app': 'Agricultural Applications Guide',
        'water-treatment-app': 'Water Treatment Application',
        'composting-app': 'Composting Acceleration Process',
        'manufacturing-process': 'Complete Manufacturing Process',
        'quality-control': 'Quality Control & Testing'
    };
    return titles[videoId] || 'Product Video';
}

// Animations on Scroll
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.hover-lift, .card-eco, .bg-gray-50, .bg-white');
    animateElements.forEach(el => observer.observe(el));
}

// Certificate Viewer
function initCertificateViewer() {
    const certButtons = document.querySelectorAll('button[class*="bg-"][class*="text-white"]');
    
    certButtons.forEach(button => {
        if (button.textContent.includes('Download') || button.textContent.includes('View')) {
            button.addEventListener('click', function() {
                const certType = this.closest('.bg-gray-50, .bg-white').querySelector('h3').textContent;
                showCertificateModal(certType);
            });
        }
    });
}

function showCertificateModal(certType) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-lg p-8 max-w-2xl w-full mx-4">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-2xl font-bold text-gray-900">${certType}</h3>
                <button class="text-gray-400 hover:text-gray-600" onclick="this.closest('.fixed').remove()">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            <div class="bg-gray-100 rounded-lg p-8 text-center">
                <div class="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                </div>
                <h4 class="text-lg font-semibold mb-2">Certificate Preview</h4>
                <p class="text-gray-600 mb-4">This would display the actual certificate document</p>
                <div class="flex justify-center space-x-4">
                    <button class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
                        Download PDF
                    </button>
                    <button class="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition">
                        Print
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Product Filters (for videos page)
function initProductFilters() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => {
                btn.classList.remove('bg-eco-green', 'text-white');
                btn.classList.add('bg-white', 'text-gray-700');
            });
            
            // Add active class to clicked button
            this.classList.remove('bg-white', 'text-gray-700');
            this.classList.add('bg-eco-green', 'text-white');
            
            const category = this.getAttribute('data-category');
            filterContent(category);
        });
    });
}

function filterContent(category) {
    // This would filter video content based on category
    // For demo purposes, we'll just show a notification
    showNotification(`Filtering content by: ${category}`, 'info');
}

// Contact Form Specific Handling
function initContactForm() {
    const exportForm = document.getElementById('export-inquiry-form');
    
    if (exportForm) {
        // Add real-time validation
        const requiredFields = exportForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            field.addEventListener('blur', function() {
                validateField(this);
            });
        });
        
        // Handle form submission
        exportForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                handleExportInquiry(this);
            }
        });
    }
}

function validateField(field) {
    const value = field.value.trim();
    const fieldContainer = field.closest('div');
    
    // Remove existing error messages
    const existingError = fieldContainer.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    if (field.type === 'email' && value && !isValidEmail(value)) {
        showFieldError(field, 'Please enter a valid email address');
        return false;
    }
    
    // Remove error styling if validation passes
    field.classList.remove('border-red-500');
    return true;
}

function showFieldError(field, message) {
    field.classList.add('border-red-500');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message text-red-500 text-sm mt-1';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function handleExportInquiry(form) {
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Show loading state
    submitBtn.innerHTML = `
        <div class="flex items-center justify-center">
            <div class="loading-spinner mr-2"></div>
            Submitting Inquiry...
        </div>
    `;
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showNotification('Export inquiry submitted successfully! Our team will contact you within 24 hours with detailed information and pricing.', 'success');
        form.reset();
        
        // Reset button
        submitBtn.innerHTML = 'Submit Export Inquiry';
        submitBtn.disabled = false;
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 3000);
}

// Scroll Effects
function initScrollEffects() {
    let lastScrollTop = 0;
    const navbar = document.querySelector('nav');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
        
        // Add shadow to navbar when scrolled
        if (scrollTop > 10) {
            navbar.classList.add('shadow-lg');
        } else {
            navbar.classList.remove('shadow-lg');
        }
    });
}

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transform transition-all duration-300 translate-x-full`;
    
    // Set colors based on type
    switch (type) {
        case 'success':
            notification.classList.add('bg-green-500', 'text-white');
            break;
        case 'error':
            notification.classList.add('bg-red-500', 'text-white');
            break;
        case 'warning':
            notification.classList.add('bg-yellow-500', 'text-white');
            break;
        default:
            notification.classList.add('bg-blue-500', 'text-white');
    }
    
    notification.innerHTML = `
        <div class="flex items-center justify-between">
            <p class="pr-4">${message}</p>
            <button class="text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Loading Screen
function showLoadingScreen() {
    const loading = document.createElement('div');
    loading.id = 'loading-screen';
    loading.className = 'fixed inset-0 bg-white flex items-center justify-center z-50';
    loading.innerHTML = `
        <div class="text-center">
            <div class="loading-spinner mx-auto mb-4"></div>
            <h3 class="text-xl font-semibold text-gray-700">Loading...</h3>
        </div>
    `;
    
    document.body.appendChild(loading);
}

function hideLoadingScreen() {
    const loading = document.getElementById('loading-screen');
    if (loading) {
        loading.remove();
    }
}

// Export functions for global access
window.playVideo = playVideo;
window.closeVideoModal = closeVideoModal;
window.showNotification = showNotification;
window.showLoadingScreen = showLoadingScreen;
window.hideLoadingScreen = hideLoadingScreen;

// Initialize page-specific functionality
function initPageSpecific() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch (currentPage) {
        case 'index.html':
            initHomePage();
            break;
        case 'products.html':
            initProductsPage();
            break;
        case 'videos.html':
            initVideosPage();
            break;
        case 'contact.html':
            initContactPage();
            break;
    }
}

function initHomePage() {
    // Add any home page specific functionality
    console.log('Home page initialized');
}

function initProductsPage() {
    // Add product page specific functionality
    const productCards = document.querySelectorAll('.hover\\:shadow-xl');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

function initVideosPage() {
    // Add video page specific functionality
    console.log('Videos page initialized');
}

function initContactPage() {
    // Add contact page specific functionality
    console.log('Contact page initialized');
}

// Initialize page-specific functionality after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initPageSpecific();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Page is hidden
        console.log('Page hidden');
    } else {
        // Page is visible
        console.log('Page visible');
    }
});

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
});
