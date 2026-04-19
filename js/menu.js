/**
 * Mobile Menu Module
 * Handles responsive navigation menu with slide-in animation
 */

const MobileMenu = (function() {
  // DOM Elements
  let mobileToggle = null;
  let navMenu = null;
  let overlay = null;
  let dropdownBtn = null;
  let servicesDropdown = null;
  
  // State
  let isOpen = false;
  let isMobile = window.innerWidth <= 767;
  
  /**
   * Initialize mobile menu
   */
  function init() {
    cacheElements();
    if (!mobileToggle || !navMenu) return;
    
    attachEventListeners();
    handleResize();
    initDropdown();
  }
  
  /**
   * Cache DOM elements
   */
  function cacheElements() {
    mobileToggle = document.getElementById('mobileToggle');
    navMenu = document.getElementById('navMenu');
    overlay = document.getElementById('overlay');
    dropdownBtn = document.getElementById('dropdownBtn');
    servicesDropdown = document.getElementById('servicesDropdown');
  }
  
  /**
   * Attach all event listeners
   */
  function attachEventListeners() {
    if (mobileToggle) {
      mobileToggle.addEventListener('click', toggleMenu);
    }
    
    if (overlay) {
      overlay.addEventListener('click', closeMenu);
    }
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeMenu();
      }
    });
    
    // Handle window resize
    window.addEventListener('resize', handleResize);
    
    // Close menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav-links a, .dropdown-menu a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (isMobile && isOpen) {
          closeMenu();
        }
      });
    });
  }
  
  /**
   * Initialize dropdown for mobile
   */
  function initDropdown() {
    if (!dropdownBtn || !servicesDropdown) return;
    
    dropdownBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      if (isMobile) {
        servicesDropdown.classList.toggle('show');
        
        // Rotate chevron icon
        const chevron = dropdownBtn.querySelector('.fa-chevron-down');
        if (chevron) {
          chevron.style.transform = servicesDropdown.classList.contains('show') 
            ? 'rotate(180deg)' 
            : 'rotate(0deg)';
        }
      }
    });
  }
  
  /**
   * Toggle mobile menu open/close
   */
  function toggleMenu() {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }
  
  /**
   * Open mobile menu
   */
  function openMenu() {
    if (!navMenu || !overlay) return;
    
    navMenu.classList.add('open');
    overlay.classList.add('active');
    document.body.classList.add('menu-open');
    isOpen = true;
    
    // Update toggle icon
    if (mobileToggle) {
      mobileToggle.innerHTML = '<i class="fas fa-times"></i>';
    }
  }
  
  /**
   * Close mobile menu
   */
  function closeMenu() {
    if (!navMenu || !overlay) return;
    
    navMenu.classList.remove('open');
    overlay.classList.remove('active');
    document.body.classList.remove('menu-open');
    isOpen = false;
    
    // Update toggle icon
    if (mobileToggle) {
      mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
    
    // Close dropdown if open
    if (servicesDropdown && servicesDropdown.classList.contains('show')) {
      servicesDropdown.classList.remove('show');
      const chevron = dropdownBtn?.querySelector('.fa-chevron-down');
      if (chevron) {
        chevron.style.transform = 'rotate(0deg)';
      }
    }
  }
  
  /**
   * Handle window resize
   */
  function handleResize() {
    const wasMobile = isMobile;
    isMobile = window.innerWidth <= 767;
    
    // Close menu if switching from mobile to desktop
    if (wasMobile && !isMobile && isOpen) {
      closeMenu();
    }
    
    // Reset dropdown state on desktop
    if (!isMobile && servicesDropdown) {
      servicesDropdown.classList.remove('show');
      const chevron = dropdownBtn?.querySelector('.fa-chevron-down');
      if (chevron) {
        chevron.style.transform = 'rotate(0deg)';
      }
    }
  }
  
  // Public API
  return {
    init: init,
    open: openMenu,
    close: closeMenu,
    toggle: toggleMenu,
    isOpen: () => isOpen
  };
})();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => MobileMenu.init());
} else {
  MobileMenu.init();
}