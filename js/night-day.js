/**
 * Theme Management Module
 * Handles dark/light mode toggle and persistence
 */

const ThemeManager = (function() {
  // DOM Elements
  let themeToggle = null;
  let themeIcon = null;
  
  // Constants
  const STORAGE_KEY = 'theme';
  const DARK_CLASS = 'dark-mode';
  const DARK_ICON = 'fa-sun';
  const LIGHT_ICON = 'fa-moon';
  
  /**
   * Initialize theme manager
   */
  function init() {
    themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    themeIcon = themeToggle.querySelector('i');
    loadTheme();
    attachEventListeners();
  }
  
  /**
   * Load saved theme from localStorage
   */
  function loadTheme() {
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    const isDark = savedTheme === 'dark';
    
    if (isDark) {
      document.body.classList.add(DARK_CLASS);
      updateIcon(true);
    } else {
      document.body.classList.remove(DARK_CLASS);
      updateIcon(false);
    }
  }
  
  /**
   * Toggle theme between dark and light
   */
  function toggleTheme() {
    const isDark = document.body.classList.contains(DARK_CLASS);
    
    if (isDark) {
      document.body.classList.remove(DARK_CLASS);
      localStorage.setItem(STORAGE_KEY, 'light');
      updateIcon(false);
    } else {
      document.body.classList.add(DARK_CLASS);
      localStorage.setItem(STORAGE_KEY, 'dark');
      updateIcon(true);
    }
  }
  
  /**
   * Update the toggle button icon
   * @param {boolean} isDark - Current dark mode state
   */
  function updateIcon(isDark) {
    if (!themeIcon) return;
    
    if (isDark) {
      themeIcon.classList.remove(LIGHT_ICON);
      themeIcon.classList.add(DARK_ICON);
    } else {
      themeIcon.classList.remove(DARK_ICON);
      themeIcon.classList.add(LIGHT_ICON);
    }
  }
  
  /**
   * Attach event listeners
   */
  function attachEventListeners() {
    themeToggle.addEventListener('click', toggleTheme);
  }
  
  // Public API
  return {
    init: init,
    toggle: toggleTheme,
    getCurrentTheme: () => document.body.classList.contains(DARK_CLASS) ? 'dark' : 'light'
  };
})();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => ThemeManager.init());
} else {
  ThemeManager.init();
}