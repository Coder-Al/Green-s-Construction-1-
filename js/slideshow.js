/**
 * Simple Slideshow Module
 * No dependencies, just pure JavaScript
 */

(function() {
  // Wait for the DOM to be fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    
    // Get all slides
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    const dotsContainer = document.getElementById('slideDots');
    
    // If no slides found, exit
    if (!slides.length) {
      console.log('No slides found');
      return;
    }
    
    let currentIndex = 0;
    let autoPlayInterval;
    const autoPlayDelay = 5000; // 5 seconds
    
    // Function to show a specific slide
    function showSlide(index) {
      // Handle wrap-around
      if (index >= slides.length) {
        index = 0;
      }
      if (index < 0) {
        index = slides.length - 1;
      }
      
      // Hide all slides
      slides.forEach(slide => {
        slide.classList.remove('active');
      });
      
      // Show current slide
      slides[index].classList.add('active');
      currentIndex = index;
      
      // Update dots
      updateDots();
    }
    
    // Function to go to next slide
    function nextSlide() {
      showSlide(currentIndex + 1);
      resetAutoPlay();
    }
    
    // Function to go to previous slide
    function prevSlide() {
      showSlide(currentIndex - 1);
      resetAutoPlay();
    }
    
    // Create dots if container exists
    if (dotsContainer && slides.length > 1) {
      for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.addEventListener('click', function() {
          showSlide(i);
          resetAutoPlay();
        });
        dotsContainer.appendChild(dot);
      }
    }
    
    // Update active dot
    function updateDots() {
      const dots = document.querySelectorAll('.dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }
    
    // Auto-play functions
    function startAutoPlay() {
      if (slides.length > 1) {
        autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
      }
    }
    
    function stopAutoPlay() {
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
      }
    }
    
    function resetAutoPlay() {
      stopAutoPlay();
      startAutoPlay();
    }
    
    // Attach event listeners to buttons
    if (prevBtn) {
      prevBtn.addEventListener('click', prevSlide);
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', nextSlide);
    }
    
    // Pause auto-play on hover
    const container = document.querySelector('.slideshow-container');
    if (container) {
      container.addEventListener('mouseenter', stopAutoPlay);
      container.addEventListener('mouseleave', startAutoPlay);
    }
    
    // Start the slideshow
    showSlide(0);
    startAutoPlay();
    
    console.log('Slideshow initialized with', slides.length, 'slides');
  });
})();