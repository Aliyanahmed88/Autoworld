// ========================================
// AUTOWORLD - Main JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all functions
  initNavbar();
  initScrollAnimations();
  initSmoothScroll();
  initVideoPlayers();
  initFormValidation();
  initScrollToTop();
});

// ========================================
// NAVBAR FUNCTIONALITY
// ========================================
function initNavbar() {
  const navbar = document.querySelector('.navbar-main');
  const navbarToggle = document.querySelector('.navbar-toggle');
  const navbarMenu = document.querySelector('.navbar-menu');
  const navbarLinks = document.querySelectorAll('.nav-link');
  
  // Scroll effect for navbar
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Mobile menu toggle
  if (navbarToggle) {
    navbarToggle.addEventListener('click', function() {
      navbarToggle.classList.toggle('active');
      navbarMenu.classList.toggle('active');
      
      // Prevent body scroll when menu is open
      document.body.style.overflow = navbarMenu.classList.contains('active') ? 'hidden' : '';
    });
  }
  
  // Close menu when clicking on a link
  navbarLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 992) {
        navbarToggle.classList.remove('active');
        navbarMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (window.innerWidth <= 992 && 
        navbarMenu && 
        navbarMenu.classList.contains('active') &&
        !navbarMenu.contains(e.target) && 
        !navbarToggle.contains(e.target)) {
      navbarToggle.classList.remove('active');
      navbarMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

// ========================================
// SCROLL ANIMATIONS
// ========================================
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  
  if (revealElements.length === 0) return;
  
  const revealOnScroll = function() {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;
    
    revealElements.forEach(function(element) {
      const elementTop = element.getBoundingClientRect().top;
      
      if (elementTop < windowHeight - elementVisible) {
        element.classList.add('active');
      }
    });
  };
  
  // Initial check
  revealOnScroll();
  
  // Listen for scroll
  window.addEventListener('scroll', revealOnScroll);
}

// ========================================
// SMOOTH SCROLL
// ========================================
function initSmoothScroll() {
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
  
  smoothScrollLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href === '#') return;
      
      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ========================================
// VIDEO PLAYERS
// ========================================
function initVideoPlayers() {
  const playButtons = document.querySelectorAll('[id^="playButton"]');
  
  playButtons.forEach(function(button) {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Find the parent container
      const container = this.closest('[class*="carousel"]');
      if (!container) return;
      
      // Find the image and video elements
      const image = container.querySelector('img[class*="mainboximage"]');
      const video = container.querySelector('video');
      
      if (image && video) {
        image.style.display = 'none';
        this.style.display = 'none';
        video.style.display = 'block';
        video.play();
      }
    });
  });
}

// ========================================
// FORM VALIDATION & SUBMISSION
// ========================================
function initFormValidation() {
  // Alert functions from original explore.js
  window.pop = function() {
    alert('Thank you! Your submission has been received.');
  };
  
  window.other = function() {
    alert('All Pakistan dialing Faraz: 03432834042');
  };
  
  window.buttom = function() {
    alert('Coming Soon - Wait for Update');
  };
  
  // Form validation
  const forms = document.querySelectorAll('form');
  
  forms.forEach(function(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      const inputs = form.querySelectorAll('input[required], select[required]');
      
      inputs.forEach(function(input) {
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = 'red';
        } else {
          input.style.borderColor = '';
        }
      });
      
      if (isValid) {
        window.pop();
        form.reset();
      }
    });
  });
  
  // Reset border color on input
  const inputs = document.querySelectorAll('input, select');
  inputs.forEach(function(input) {
    input.addEventListener('input', function() {
      this.style.borderColor = '';
    });
  });
}

// ========================================
// IMAGE GALLERY (For Explore Pages)
// ========================================
window.changeImage = function(imageId, newSrc) {
  const image = document.getElementById(imageId);
  if (image) {
    image.style.opacity = '0.5';
    setTimeout(function() {
      image.src = newSrc;
      image.style.opacity = '1';
    }, 200);
  }
};

// ========================================
// SCROLL TO TOP BUTTON
// ========================================
function initScrollToTop() {
  // Create scroll to top button
  const scrollBtn = document.createElement('button');
  scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollBtn.className = 'scroll-to-top';
  scrollBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #dc2626;
    color: white;
    border: none;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 9999;
    box-shadow: 0 4px 15px rgba(220, 38, 38, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
  `;
  
  document.body.appendChild(scrollBtn);
  
  // Show/hide button based on scroll
  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      scrollBtn.style.opacity = '1';
      scrollBtn.style.visibility = 'visible';
    } else {
      scrollBtn.style.opacity = '0';
      scrollBtn.style.visibility = 'hidden';
    }
  });
  
  // Scroll to top on click
  scrollBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Hover effects
  scrollBtn.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px)';
    this.style.boxShadow = '0 6px 20px rgba(220, 38, 38, 0.5)';
  });
  
  scrollBtn.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
    this.style.boxShadow = '0 4px 15px rgba(220, 38, 38, 0.4)';
  });
}
