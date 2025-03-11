// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Initialize custom cursor
    initCustomCursor()
  
    // Initialize navigation menu toggle
    initMenuToggle()
  
    // Initialize scroll effects
    initScrollEffects()
  
    // Initialize portfolio filter
    initPortfolioFilter()
  
    // Initialize testimonial slider
    initTestimonialSlider()
  
    // Initialize counter animation
    initCounterAnimation()
  
    // Initialize form validation
    initFormValidation()
  
    // Initialize back to top button
    initBackToTop()
  })
  
  // Custom cursor functionality
  function initCustomCursor() {
    const cursor = document.querySelector(".cursor-follower")
  
    if (!cursor) return
  
    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX + "px"
      cursor.style.top = e.clientY + "px"
    })
  
    // Expand cursor on hoverable elements
    const hoverables = document.querySelectorAll("a, button, .service-card, .portfolio-item, .team-member")
  
    hoverables.forEach((hoverable) => {
      hoverable.addEventListener("mouseenter", () => {
        cursor.style.width = "50px"
        cursor.style.height = "50px"
        cursor.style.backgroundColor = "rgba(108, 99, 255, 0.1)"
      })
  
      hoverable.addEventListener("mouseleave", () => {
        cursor.style.width = "30px"
        cursor.style.height = "30px"
        cursor.style.backgroundColor = "rgba(108, 99, 255, 0.2)"
      })
    })
  }
  
  // Mobile menu toggle
  function initMenuToggle() {
    const menuToggle = document.getElementById("menu-toggle")
    const navLinks = document.getElementById("nav-links")
  
    if (!menuToggle || !navLinks) return
  
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active")
      navLinks.classList.toggle("active")
    })
  
    // Close menu when clicking on a link
    const links = navLinks.querySelectorAll("a")
  
    links.forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("active")
        navLinks.classList.remove("active")
      })
    })
  }
  
  // Scroll effects
  function initScrollEffects() {
    const header = document.querySelector("header")
    const sections = document.querySelectorAll("section")
    const navLinks = document.querySelectorAll(".nav-link")
  
    // Header scroll effect
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled")
      } else {
        header.classList.remove("scrolled")
      }
  
      // Update active nav link based on scroll position
      let current = ""
  
      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.clientHeight
  
        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute("id")
        }
      })
  
      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active")
        }
      })
    })
  
    // Reveal animations on scroll
    const revealElements = document.querySelectorAll("[data-aos]")
  
    const revealOnScroll = () => {
      const windowHeight = window.innerHeight
  
      revealElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top
        const elementVisible = 150
  
        if (elementTop < windowHeight - elementVisible) {
          element.classList.add("aos-animate")
        }
      })
    }
  
    window.addEventListener("scroll", revealOnScroll)
    revealOnScroll()
  }
  
  // Portfolio filter
  function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll(".filter-btn")
    const portfolioItems = document.querySelectorAll(".portfolio-item")
  
    if (filterButtons.length === 0 || portfolioItems.length === 0) return
  
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Update active button
        filterButtons.forEach((btn) => btn.classList.remove("active"))
        button.classList.add("active")
  
        const filterValue = button.getAttribute("data-filter")
  
        // Filter items
        portfolioItems.forEach((item) => {
          if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
            item.style.display = "block"
            setTimeout(() => {
              item.style.opacity = "1"
              item.style.transform = "scale(1)"
            }, 200)
          } else {
            item.style.opacity = "0"
            item.style.transform = "scale(0.8)"
            setTimeout(() => {
              item.style.display = "none"
            }, 500)
          }
        })
      })
    })
  }
  
  // Testimonial slider
  function initTestimonialSlider() {
    const slider = document.getElementById("testimonial-slider")
    const slides = slider ? slider.querySelectorAll(".testimonial-slide") : []
    const dots = document.getElementById("testimonial-dots")
    const prevBtn = document.getElementById("prev-testimonial")
    const nextBtn = document.getElementById("next-testimonial")
  
    if (slides.length === 0) return
  
    let currentSlide = 0
  
    // Create dots if they don't exist
    if (dots) {
      dots.innerHTML = ""
      slides.forEach((_, index) => {
        const dot = document.createElement("span")
        dot.classList.add("dot")
        if (index === 0) dot.classList.add("active")
        dot.addEventListener("click", () => goToSlide(index))
        dots.appendChild(dot)
      })
    }
  
    // Show slide
    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.style.transform = `translateX(${100 * (i - index)}%)`
      })
  
      // Update dots
      if (dots) {
        const dotElements = dots.querySelectorAll(".dot")
        dotElements.forEach((dot, i) => {
          dot.classList.toggle("active", i === index)
        })
      }
    }
  
    // Go to specific slide
    function goToSlide(index) {
      currentSlide = index
      showSlide(currentSlide)
    }
  
    // Next slide
    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length
      showSlide(currentSlide)
    }
  
    // Previous slide
    function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length
      showSlide(currentSlide)
    }
  
    // Event listeners
    if (prevBtn) prevBtn.addEventListener("click", prevSlide)
    if (nextBtn) nextBtn.addEventListener("click", nextSlide)
  
    // Auto slide
    let slideInterval = setInterval(nextSlide, 5000)
  
    // Pause on hover
    if (slider) {
      slider.addEventListener("mouseenter", () => {
        clearInterval(slideInterval)
      })
  
      slider.addEventListener("mouseleave", () => {
        slideInterval = setInterval(nextSlide, 5000)
      })
    }
  
    // Initialize first slide
    showSlide(currentSlide)
  }
  
  // Counter animation
  function initCounterAnimation() {
    const counters = document.querySelectorAll(".stat-number")
  
    if (counters.length === 0) return
  
    const animateCounter = (counter, target) => {
      let count = 0
      const speed = 2000 / target // Adjust animation speed based on target value
  
      const updateCount = () => {
        if (count < target) {
          count++
          counter.textContent = count
          requestAnimationFrame(updateCount)
        } else {
          counter.textContent = target
        }
      }
  
      updateCount()
    }
  
    const handleIntersect = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target
          const target = Number.parseInt(counter.getAttribute("data-count"))
          animateCounter(counter, target)
          observer.unobserve(counter)
        }
      })
    }
  
    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.5,
    })
  
    counters.forEach((counter) => {
      observer.observe(counter)
    })
  }
  
  // Form validation
  function initFormValidation() {
    const contactForm = document.getElementById("contact-form")
  
    if (!contactForm) return
  
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()
  
      // Simple validation
      let valid = true
      const inputs = contactForm.querySelectorAll("input, textarea")
  
      inputs.forEach((input) => {
        if (input.hasAttribute("required") && !input.value.trim()) {
          valid = false
          input.classList.add("error")
        } else {
          input.classList.remove("error")
        }
  
        // Email validation
        if (input.type === "email" && input.value.trim()) {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailPattern.test(input.value)) {
            valid = false
            input.classList.add("error")
          }
        }
      })
  
      if (valid) {
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]')
        const originalText = submitBtn.textContent
  
        submitBtn.disabled = true
        submitBtn.textContent = "Sending..."
  
        setTimeout(() => {
          // Show success message
          contactForm.innerHTML = `
                      <div class="success-message">
                          <svg viewBox="0 0 24 24" width="64" height="64">
                              <path fill="var(--success-color)" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                          </svg>
                          <h3>Message Sent!</h3>
                          <p>Thank you for contacting us. We'll get back to you shortly.</p>
                      </div>
                  `
        }, 2000)
      }
    })
  
    // Real-time validation feedback
    const inputs = contactForm.querySelectorAll("input, textarea")
  
    inputs.forEach((input) => {
      input.addEventListener("blur", () => {
        if (input.hasAttribute("required") && !input.value.trim()) {
          input.classList.add("error")
        } else {
          input.classList.remove("error")
        }
  
        // Email validation
        if (input.type === "email" && input.value.trim()) {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailPattern.test(input.value)) {
            input.classList.add("error")
          }
        }
      })
    })
  }
  
  // Back to top button
  function initBackToTop() {
    const backToTopBtn = document.getElementById("back-to-top")
  
    if (!backToTopBtn) return
  
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add("visible")
      } else {
        backToTopBtn.classList.remove("visible")
      }
    })
  
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }
  
  // Add missing CSS for the back-to-top button
  const style = document.createElement("style")
  style.textContent = `
      .back-to-top {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 50px;
          height: 50px;
          background-color: var(--primary-color);
          color: var(--light-color);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: var(--shadow-medium);
          opacity: 0;
          visibility: hidden;
          transform: translateY(20px);
          transition: all var(--transition-medium);
          z-index: var(--z-fixed);
      }
      
      .back-to-top.visible {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
      }
      
      .back-to-top svg {
          fill: var(--light-color);
      }
      
      .back-to-top:hover {
          background-color: var(--primary-dark);
          transform: translateY(-5px);
      }
      
      /* Form error styles */
      .error {
          border-color: var(--danger-color) !important;
          box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.25) !important;
      }
      
      .success-message {
          text-align: center;
          padding: 40px 20px;
      }
      
      .success-message svg {
          margin: 0 auto 20px;
      }
      
      /* Complete the about section styles */
      .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 50px;
          align-items: center;
      }
      
      .about-image {
          position: relative;
      }
      
      .image-container {
          position: relative;
          border-radius: var(--border-radius-medium);
          overflow: hidden;
          box-shadow: var(--shadow-large);
      }
      
      .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(108, 99, 255, 0.2), rgba(255, 101, 132, 0.2));
      }
      
      .about-values {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-top: 30px;
      }
      
      .value-item {
          background-color: var(--light-color);
          padding: 20px;
          border-radius: var(--border-radius-small);
          box-shadow: var(--shadow-small);
      }
      
      .value-item h4 {
          color: var(--primary-color);
          margin-bottom: 10px;
      }
      
      .team-section {
          margin-top: 80px;
      }
      
      .team-section h3 {
          text-align: center;
          margin-bottom: 40px;
      }
      
      .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 30px;
      }
      
      .team-member {
          text-align: center;
      }
      
      .member-image {
          position: relative;
          border-radius: var(--border-radius-medium);
          overflow: hidden;
          margin-bottom: 15px;
      }
      
      .member-image img {
          width: 100%;
          height: 300px;
          object-fit: cover;
          transition: transform var(--transition-medium);
      }
      
      .member-social {
          position: absolute;
          bottom: -50px;
          left: 0;
          width: 100%;
          display: flex;
          justify-content: center;
          gap: 10px;
          padding: 15px 0;
          background-color: rgba(108, 99, 255, 0.9);
          transition: bottom var(--transition-medium);
      }
      
      .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          transition: background-color var(--transition-fast);
      }
      
      .social-link svg {
          fill: var(--light-color);
          width: 18px;
          height: 18px;
      }
      
      .social-link:hover {
          background-color: rgba(255, 255, 255, 0.4);
      }
      
      .team-member:hover .member-image img {
          transform: scale(1.05);
      }
      
      .team-member:hover .member-social {
          bottom: 0;
      }
      
      .team-member h4 {
          margin-bottom: 5px;
      }
      
      .team-member p {
          color: var(--gray-dark);
      }
      
      /* Contact section styles */
      .contact {
          padding: 100px 0;
      }
      
      .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 50px;
      }
      
      .contact-details {
          margin: 30px 0;
      }
      
      .contact-item {
          display: flex;
          align-items: flex-start;
          margin-bottom: 20px;
      }
      
      .contact-icon {
          margin-right: 15px;
          color: var(--primary-color);
      }
      
      .contact-icon svg {
          fill: currentColor;
      }
      
      .contact-text h4 {
          margin-bottom: 5px;
      }
      
      .contact-text p {
          color: var(--gray-dark);
      }
      
      .social-links {
          display: flex;
          gap: 15px;
      }
      
      .contact-form-container {
          background-color: var(--light-color);
          border-radius: var(--border-radius-medium);
          padding: 40px;
          box-shadow: var(--shadow-large);
      }
      
      .contact-form {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
      }
      
      .form-group {
          margin-bottom: 0;
      }
      
      .full-width {
          grid-column: span 2;
      }
      
      .contact-form label {
          display: block;
          margin-bottom: 8px;
          font-weight: 500;
      }
      
      .contact-form input,
      .contact-form textarea {
          width: 100%;
          padding: 12px 15px;
          border: 1px solid var(--gray-medium);
          border-radius: var(--border-radius-small);
          transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
      }
      
      .contact-form input:focus,
      .contact-form textarea:focus {
          border-color: var(--primary-color);
          box-shadow: 0 0 0 2px rgba(108, 99, 255, 0.25);
          outline: none;
      }
      
      .contact-form button {
          grid-column: span 2;
          margin-top: 10px;
      }
      
      /* Footer styles */
      .footer {
          background-color: var(--dark-color);
          color: var(--light-color);
          padding: 80px 0 30px;
      }
      
      .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 40px;
          margin-bottom: 50px;
      }
      
      .footer-logo {
          margin-bottom: 20px;
      }
      
      .footer-info p {
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 20px;
      }
      
      .footer-social {
          display: flex;
          gap: 15px;
      }
      
      .footer h3 {
          color: var(--light-color);
          margin-bottom: 20px;
          font-size: 1.25rem;
      }
      
      .footer-links ul {
          display: flex;
          flex-direction: column;
          gap: 10px;
      }
      
      .footer-links a {
          color: rgba(255, 255, 255, 0.7);
          transition: color var(--transition-fast);
      }
      
      .footer-links a:hover {
          color: var(--primary-color);
      }
      
      .footer-newsletter p {
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 20px;
      }
      
      .newsletter-form {
          display: flex;
          gap: 10px;
      }
      
      .newsletter-form input {
          flex: 1;
          padding: 10px 15px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: var(--border-radius-small);
          color: var(--light-color);
      }
      
      .newsletter-form input:focus {
          outline: none;
          border-color: var(--primary-color);
      }
      
      .newsletter-form button {
          padding: 10px 15px;
      }
      
      .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 30px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
      }
      
      .footer-bottom p {
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 0;
      }
      
      .footer-legal {
          display: flex;
          gap: 20px;
      }
      
      .footer-legal a {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.875rem;
      }
      
      .footer-legal a:hover {
          color: var(--primary-color);
      }
      
      /* Responsive styles */
      @media (max-width: 992px) {
          h1 {
              font-size: 2.5rem;
          }
          
          h2 {
              font-size: 2rem;
          }
          
          .hero {
              padding: 150px 0 80px;
          }
          
          .hero-visual {
              opacity: 0.3;
              width: 100%;
          }
          
          .hero-content {
              max-width: 100%;
              text-align: center;
          }
          
          .cta-buttons {
              justify-content: center;
          }
          
          .about-grid,
          .contact-grid {
              grid-template-columns: 1fr;
          }
      }
      
      @media (max-width: 768px) {
          .services-grid,
          .portfolio-grid,
          .team-grid {
              grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          }
          
          .stats-container {
              grid-template-columns: repeat(2, 1fr);
          }
          
          .contact-form {
              grid-template-columns: 1fr;
          }
          
          .full-width {
              grid-column: span 1;
          }
          
          .footer-bottom {
              flex-direction: column;
              gap: 15px;
              text-align: center;
          }
      }
      
      @media (max-width: 576px) {
          h1 {
              font-size: 2rem;
          }
          
          h2 {
              font-size: 1.75rem;
          }
          
          .stats-container {
              grid-template-columns: 1fr;
          }
          
          .newsletter-form {
              flex-direction: column;
          }
      }
  `
  
  document.head.appendChild(style)
  
  