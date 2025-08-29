// Debug function to log component loading
const debug = (message, data = '') => {
    console.log(`[DEBUG] ${message}`, data);
};

// Calculate years of experience
const calculateExperience = (startYear) => {
    const currentYear = new Date().getFullYear();
    const start = new Date(`January 1, ${startYear}`);
    const diff = Date.now() - start;
    const years = diff / (1000 * 60 * 60 * 24 * 365.25);
    return Math.floor(years);
};

// Load components
const loadComponents = async () => {
    console.log('[INIT] Starting to load components');
    
    try {
        // First load critical components
        console.log('[INIT] Loading critical components');
        await loadCriticalComponents();
        console.log('[INIT] Critical components loaded');
        
        // Then load other components after a short delay
        console.log('[INIT] Scheduling secondary components load');
        setTimeout(() => {
            console.log('[INIT] Loading secondary components');
            loadSecondaryComponents()
                .then(() => console.log('[INIT] All components loaded successfully'))
                .catch(err => console.error('[ERROR] Failed to load secondary components:', err));
        }, 100);
    } catch (error) {
        console.error('[ERROR] Failed to load critical components:', error);
    }
};

// Load critical components first
const loadCriticalComponents = async () => {
    const components = ['navbar', 'hero'];
    console.log(`[CRITICAL] Loading ${components.length} critical components`);
    
    for (const component of components) {
        console.log(`[CRITICAL] Starting to load: ${component}`);
        const success = await loadComponent(component);
        if (success) {
            console.log(`[CRITICAL] Successfully loaded: ${component}`);
        } else {
            console.error(`[CRITICAL] Failed to load: ${component}`);
        }
    }
    console.log('[CRITICAL] Finished loading critical components');
};

// Load secondary components
const loadSecondaryComponents = async () => {
    const components = ['about', 'projects', 'certifications', 'resume', 'blog', 'contact', 'footer'];
    console.log(`[SECONDARY] Loading ${components.length} secondary components`);
    
    for (const component of components) {
        console.log(`[SECONDARY] Starting to load: ${component}`);
        const success = await loadComponent(component);
        if (success) {
            console.log(`[SECONDARY] Successfully loaded: ${component}`);
        } else {
            console.error(`[SECONDARY] Failed to load: ${component}`);
        }
    }
    console.log('[SECONDARY] Finished loading secondary components');
    return true;
};

// Load a single component
const loadComponent = async (component) => {
    try {
        console.log(`[DEBUG] Starting to load component: ${component}`);
        const fileName = component === 'certifications' ? 'credly-certifications' : component;
        const targetId = component === 'navbar' ? 'navbar' : component;
        const targetElement = document.getElementById(targetId);
        
        if (!targetElement) {
            console.error(`[ERROR] Target element #${targetId} not found for component: ${component}`);
            return;
        }
        
        console.log(`[DEBUG] Fetching component: components/${fileName}.html`);
        const response = await fetch(`components/${fileName}.html`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const html = await response.text();
        console.log(`[DEBUG] Successfully fetched component: ${component}`);
        
        targetElement.outerHTML = html;
        console.log(`[DEBUG] Rendered component: ${component}`);
        
        // Initialize components after loading
        try {
            initializeComponents();
            console.log(`[DEBUG] Initialized components for: ${component}`);
            
            // Special handling for hero component
            if (component === 'hero' && window.initParticles) {
                console.log('[DEBUG] Initializing particles for hero component');
                // Small delay to ensure DOM is updated
                setTimeout(window.initParticles, 300);
            }
            
            // Initialize blog component
            if (component === 'blog') {
                console.log('[DEBUG] Initializing blog component');
                // Import and initialize blog module
                import('./blog.js')
                    .then(module => {
                        if (module && module.initBlog) {
                            module.initBlog();
                            console.log('[DEBUG] Blog initialized successfully');
                        } else {
                            console.error('[ERROR] Blog module or initBlog function not found');
                        }
                    })
                    .catch(error => {
                        console.error('[ERROR] Failed to load blog module:', error);
                    });
            }
        } catch (initError) {
            console.error(`[ERROR] Failed to initialize components for ${component}:`, initError);
        }
        
        // Update years of experience if this is the about component
        if (component === 'about') {
            const yearsExpElement = document.getElementById('yearsExperience');
            if (yearsExpElement) {
                const years = calculateExperience(2020);
                yearsExpElement.textContent = `${years}+ years`;
                console.log(`[DEBUG] Updated years of experience: ${years}`);
            }
        }
        
        return true;
    } catch (error) {
        console.error(`[ERROR] Failed to load component ${component}:`, error);
        return false;
    }
};

// Load Credly badges with retry logic
const loadCredlyBadges = async (retries = 3, delay = 1000) => {
    const badgesContainer = document.getElementById('credly-badges');
    
    if (!badgesContainer) {
        console.warn('Credly badges container not found');
        return;
    }
    
    // Show loading state
    badgesContainer.innerHTML = `
        <div class="text-center py-8">
            <div class="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-500"></div>
            <p class="mt-2 text-gray-400">Loading certifications...</p>
        </div>
    `;
    
    try {
        debug('Fetching Credly badges');
        const response = await fetch('https://www.credly.com/users/matthewntsiful/badges.json');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data.data || !Array.isArray(data.data) || data.data.length === 0) {
            throw new Error('No badges data received');
        }
        
        // Sort badges by issued date (newest first)
        const sortedBadges = [...data.data].sort((a, b) => 
            new Date(b.issued_at) - new Date(a.issued_at)
        );
        
        // Render badges
        badgesContainer.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${sortedBadges.map(badge => `
                    <div class="credly-badge bg-gray-800/50 hover:bg-gray-800/80 p-6 rounded-xl text-center transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/10 border border-gray-700/50 hover:border-cyan-500/30">
                        <img 
                            src="${badge.image_url}" 
                            alt="${badge.title}" 
                            class="mx-auto mb-4 w-32 h-32 object-contain"
                            loading="lazy"
                            onerror="this.onerror=null; this.src='images/credly-placeholder.png'"
                        >
                        <h3 class="text-lg font-semibold mb-1 text-white">${badge.title}</h3>
                        <p class="text-gray-400 text-sm mb-3">${badge.issuer.name}</p>
                        <p class="text-xs text-gray-500 mb-4">Issued ${new Date(badge.issued_at).toLocaleDateString()}</p>
                        <a 
                            href="${badge.url}" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            class="inline-block px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-medium rounded-full hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300"
                            aria-label="View ${badge.title} details on Credly"
                        >
                            View on Credly
                        </a>
                    </div>
                `).join('')}
            </div>
        `;
    } catch (error) {
        console.error('Error loading Credly badges:', error);
        
        // Show error state with retry button
        badgesContainer.innerHTML = `
            <div class="text-center py-8">
                <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-900/20 text-red-400 mb-4">
                    <i class="fas fa-exclamation-triangle text-2xl"></i>
                </div>
                <h3 class="text-lg font-medium text-white mb-2">Unable to load certifications</h3>
                <p class="text-gray-400 text-sm mb-4">${error.message || 'Please check your connection and try again'}</p>
                ${retries > 0 ? `
                    <button 
                        onclick="loadCredlyBadges(${retries - 1}, ${delay * 2})"
                        class="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium rounded-md transition-colors"
                    >
                        Retry (${retries} ${retries === 1 ? 'try' : 'tries'} left)
                    </button>
                ` : ''}
            </div>
        `;
        
        // If we have retries left, try again after delay
        if (retries > 0) {
            setTimeout(() => loadCredlyBadges(retries - 1, delay * 2), delay);
        }
    }
};

// Smooth scroll to section
const smoothScroll = (target) => {
    const element = document.querySelector(target);
    if (element) {
        window.scrollTo({
            top: element.offsetTop - 80, // Account for fixed header
            behavior: 'smooth'
        });
    }
};

// Initialize components
const initializeComponents = () => {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    // Toggle mobile menu
    const toggleMobileMenu = () => {
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('block');
        document.body.style.overflow = mobileMenu.classList.contains('hidden') ? 'auto' : 'hidden';
    };
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMobileMenu();
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('block');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Handle navigation links
    const setupNavLinks = (selector) => {
        document.querySelectorAll(selector).forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('href');
                
                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    toggleMobileMenu();
                }
                
                // Smooth scroll to section
                smoothScroll(target);
            });
        });
    };
    
    // Setup both desktop and mobile navigation
    setupNavLinks('nav a[href^="#"]');
    setupNavLinks('#mobile-menu a[href^="#"]');

    // Initialize particles.js when hero component is loaded
    function initParticles() {
        try {
            // Only initialize particles once
            if (window.particlesInitialized) {
                console.log('Particles already initialized');
                return true;
            }
            
            const particlesContainer = document.getElementById('particles-js');
            
            if (!particlesContainer) {
                console.warn('particles-js container not found in the DOM');
                return false;
            }
            
            if (typeof particlesJS === 'undefined') {
                console.warn('particlesJS is not defined. Make sure the script is loaded.');
                return false;
            }
            
            console.log('Initializing particles.js with container:', particlesContainer);
            
            // Mark as initialized before starting
            window.particlesInitialized = true;
            
            // Enhanced particles configuration
            const particlesConfig = {
                particles: {
                    number: {
                        value: 120,
                        density: {
                            enable: true,
                            value_area: 1000
                        }
                    },
                    color: {
                        value: ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b']
                    },
                    shape: {
                        type: ['circle', 'triangle', 'polygon'],
                        stroke: {
                            width: 0,
                            color: '#000000'
                        },
                        polygon: {
                            nb_sides: 6
                        }
                    },
                    opacity: {
                        value: 0.7,
                        random: true,
                        anim: {
                            enable: true,
                            speed: 0.8,
                            opacity_min: 0.1,
                            sync: false
                        }
                    },
                    size: {
                        value: 4,
                        random: true,
                        anim: {
                            enable: true,
                            speed: 3,
                            size_min: 0.3,
                            sync: false
                        }
                    },
                    line_linked: {
                        enable: true,
                        distance: 180,
                        color: '#3b82f6',
                        opacity: 0.3,
                        width: 1.2,
                        shadow: {
                            enable: true,
                            color: '#3b82f6',
                            blur: 5
                        }
                    },
                    move: {
                        enable: true,
                        speed: 1.5,
                        direction: 'none',
                        random: true,
                        straight: false,
                        out_mode: 'bounce',
                        bounce: true,
                        attract: {
                            enable: true,
                            rotateX: 1000,
                            rotateY: 1600
                        }
                    }
                },
                interactivity: {
                    detect_on: 'window',
                    events: {
                        onhover: {
                            enable: true,
                            mode: ['grab', 'bubble']
                        },
                        onclick: {
                            enable: true,
                            mode: 'repulse'
                        },
                        onresize: {
                            enable: true,
                            density_auto: true,
                            density_area: 800
                        }
                    },
                    modes: {
                        grab: {
                            distance: 180,
                            line_linked: {
                                opacity: 1,
                                width: 1.5
                            }
                        },
                        bubble: {
                            distance: 250,
                            size: 6,
                            duration: 0.8,
                            opacity: 0.8,
                            speed: 3
                        },
                        repulse: {
                            distance: 150,
                            duration: 0.8
                        },
                        push: {
                            particles_nb: 6
                        },
                        remove: {
                            particles_nb: 2
                        }
                    }
                },
                retina_detect: true,
                background: {
                    color: 'transparent'
                },
                fps_limit: 60,
                detectRetina: true,
                pauseOnBlur: true,
                pauseOnOutsideViewport: true
            };
            
            // Initialize particles
            try {
                console.log('Initializing particles with config:', JSON.stringify(particlesConfig, null, 2));
                particlesJS('particles-js', particlesConfig);
                console.log('Particles.js initialized successfully');
                return true;
            } catch (initError) {
                console.error('Error in particlesJS initialization:', initError);
                window.particlesInitialized = false;
                return false;
            }
            
        } catch (error) {
            console.error('Error in initParticles:', error);
            window.particlesInitialized = false; // Reset flag on error
            return false;
        }
}

// Export the function to be called when hero component is loaded
window.initParticles = initParticles;

    // Initialize typewriter effect
    if (typeof Typewriter !== 'undefined') {
        const typewriterEl = document.getElementById('typewriter');
        if (typewriterEl) {
            new Typewriter('#typewriter', {
                strings: [
                    'Automating cloud infrastructure at scale.',
                    'Reducing AWS costs by 30% through optimization.',
                    'Improving deployment speed by 60% with CI/CD.'
                ],
                autoStart: true,
                loop: true,
                delay: 50,
                deleteSpeed: 30,
            });
        }
    }

    // Intersection Observer for fade-in animations
    const fadeElems = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    fadeElems.forEach(elem => {
        observer.observe(elem);
    });
};

// Navbar scroll effect with better transparency
const handleNavbarScroll = () => {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    if (window.scrollY > 50) {
        navbar.classList.add('bg-gray-900/70', 'shadow-md');
        navbar.classList.remove('bg-transparent');
        navbar.style.backdropFilter = 'blur(4px)';
    } else {
        navbar.classList.remove('bg-gray-900/70', 'shadow-md');
        navbar.classList.add('bg-transparent');
        navbar.style.backdropFilter = 'none';
    }
};

// Expose functions to global scope
window.loadComponents = loadComponents;
window.loadCriticalComponents = loadCriticalComponents;
window.loadSecondaryComponents = loadSecondaryComponents;
window.loadComponent = loadComponent;

// Load components when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOMContentLoaded: Initializing components...');
    loadComponents();
    
    // Initial check in case page loads with scroll
    handleNavbarScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
});
