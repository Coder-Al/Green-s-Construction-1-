/**
 * Main Application Entry Point
 * Initializes all modules and handles global functionality
 */

// Smooth scrolling for anchor links
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      // Skip empty or just "#"
      if (targetId === '#' || targetId === '') return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Lazy loading images
function initLazyLoading() {
  if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }
}

// Add active state to current nav link based on scroll position
function initActiveNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  
  if (sections.length === 0 || navLinks.length === 0) return;
  
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
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
}

// Add CSS for active nav link
function addActiveNavStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .nav-links a.active {
      color: var(--color-accent);
      border-bottom: 2px solid var(--color-accent);
    }
  `;
  document.head.appendChild(style);
}

// Handle contact form if it exists
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());
    
    // Basic validation
    if (!data.name || !data.email || !data.message) {
      showFormMessage('Please fill in all required fields.', 'error');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      showFormMessage('Please enter a valid email address.', 'error');
      return;
    }
    
    // Simulate form submission (replace with actual API call)
    try {
      showFormMessage('Sending message...', 'info');
      
      // Replace with your actual form submission endpoint
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // });
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      showFormMessage('Message sent successfully! We\'ll get back to you soon.', 'success');
      contactForm.reset();
    } catch (error) {
      showFormMessage('Something went wrong. Please try again later.', 'error');
    }
  });
}

function showFormMessage(message, type) {
  const existingMessage = document.querySelector('.form-message');
  if (existingMessage) existingMessage.remove();
  
  const messageDiv = document.createElement('div');
  messageDiv.className = `form-message form-message-${type}`;
  messageDiv.textContent = message;
  messageDiv.style.cssText = `
    margin-top: 1rem;
    padding: 0.75rem;
    border-radius: 8px;
    text-align: center;
    background: ${type === 'success' ? '#d4edda' : type === 'error' ? '#f8d7da' : '#cce5ff'};
    color: ${type === 'success' ? '#155724' : type === 'error' ? '#721c24' : '#004085'};
  `;
  
  const contactForm = document.getElementById('contactForm');
  contactForm.appendChild(messageDiv);
  
  setTimeout(() => messageDiv.remove(), 5000);
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initSmoothScroll();
  initLazyLoading();
  initActiveNavHighlight();
  addActiveNavStyles();
  initContactForm();
  
  console.log('Green\'s Construction — Ready');
});