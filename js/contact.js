 document.addEventListener('DOMContentLoaded', function() {
      const form = document.getElementById('contactForm');
      const formMessage = document.getElementById('formMessage');
      
      if (form) {
        form.addEventListener('submit', async function(e) {
          e.preventDefault();
          
          // Get form data
          const firstName = document.getElementById('firstName').value;
          const lastName = document.getElementById('lastName').value;
          const email = document.getElementById('email').value;
          const phone = document.getElementById('phone').value;
          const service = document.getElementById('service').value;
          const message = document.getElementById('message').value;
          
          // Basic validation
          if (!firstName || !lastName || !email || !phone || !service) {
            formMessage.textContent = 'Please fill in all required fields.';
            formMessage.className = 'form-message error';
            formMessage.style.display = 'block';
            return;
          }
          
          // Email validation
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
            formMessage.textContent = 'Please enter a valid email address.';
            formMessage.className = 'form-message error';
            formMessage.style.display = 'block';
            return;
          }
          
          // Phone validation (basic)
          const phoneRegex = /^[\d\s\-\(\)\+]+$/;
          if (!phoneRegex.test(phone)) {
            formMessage.textContent = 'Please enter a valid phone number.';
            formMessage.className = 'form-message error';
            formMessage.style.display = 'block';
            return;
          }
          
          // Show loading message
          formMessage.textContent = 'Sending message...';
          formMessage.className = 'form-message info';
          formMessage.style.display = 'block';
          
          // Prepare form data for submission
          const formData = new FormData();
          formData.append('firstName', firstName);
          formData.append('lastName', lastName);
          formData.append('email', email);
          formData.append('phone', phone);
          formData.append('service', service);
          formData.append('message', message);
          
          try {
            // Replace with your actual form submission endpoint
            // For now, we'll simulate a successful submission
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Success - you can replace this with actual fetch/axios call
            // const response = await fetch('submit_form.php', {
            //   method: 'POST',
            //   body: formData
            // });
            
            formMessage.textContent = 'Thank you! We\'ll get back to you within 24 hours.';
            formMessage.className = 'form-message success';
            form.reset();
          } catch (error) {
            formMessage.textContent = 'Something went wrong. Please try again or call us directly.';
            formMessage.className = 'form-message error';
          }
          
          // Hide message after 5 seconds
          setTimeout(() => {
            formMessage.style.display = 'none';
          }, 5000);
        });
      }
    });