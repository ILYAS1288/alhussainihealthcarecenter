/**
 * AlHussain Health - Main JavaScript File
 * Version: 1.0
 */

document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    // Initialize Hero Slider Auto Slide
    const heroCarousel = document.getElementById('heroCarousel');
    if (heroCarousel) {
        const carousel = new bootstrap.Carousel(heroCarousel, {
            interval: 4000, // 4 seconds
            ride: 'carousel',
            pause: false // Don't pause on hover
        });
    }

    // Initialize Gallery Filters
    function initGalleryFilters() {
        console.log("Gallery filters initialized.");
        // Add gallery filter logic here
    }

    document.addEventListener("DOMContentLoaded", function () {
        initGalleryFilters(); // Make sure this function exists before calling it
    });

    // Smooth Scrolling
    initSmoothScroll();

    // Form Validation
    initFormValidation();

    // Appointment Form Handler
    initAppointmentForm();

    // Contact Form Handler
    initContactForm();

    // Navbar active state
    highlightActiveNavLink();

    // Initialize Bootstrap tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Initialize Bootstrap popovers
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });

    // Navbar scroll behavior
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // Counter Animation
    const counters = document.querySelectorAll('.counter-number');
    const speed = 200; // The lower the slower

    function animateCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-count');
            const count = +counter.innerText;
            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target;
            }
        });
    }

    // Check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Start counter animation when counter section is in viewport
    const counterSection = document.querySelector('.counter-section');
    let counterAnimationStarted = false;

    if (counterSection) {
        window.addEventListener('scroll', function () {
            if (isInViewport(counterSection) && !counterAnimationStarted) {
                counterAnimationStarted = true;
                animateCounters();
            }
        });
    }

    // Gallery Filtering
    const galleryFilters = document.querySelector('.gallery-filters');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (galleryFilters) {
        galleryFilters.addEventListener('click', function (e) {
            if (e.target.tagName === 'BUTTON') {
                // Remove active class from all buttons
                const buttons = galleryFilters.querySelectorAll('button');
                buttons.forEach(btn => btn.classList.remove('active'));

                // Add active class to clicked button
                e.target.classList.add('active');

                // Get filter value
                const filter = e.target.getAttribute('data-filter');

                // Filter gallery items
                galleryItems.forEach(item => {
                    if (filter === 'all' || item.classList.contains(filter)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            }
        });
    }

    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');

    if (backToTopBtn) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('active');
            } else {
                backToTopBtn.classList.remove('active');
            }
        });

        backToTopBtn.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href').length > 1) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Form Validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Basic validation
            let valid = true;
            const nameInput = contactForm.querySelector('input[type="text"]');
            const emailInput = contactForm.querySelector('input[type="email"]');
            const messageInput = contactForm.querySelector('textarea');

            // Clear previous validation messages
            const errorMessages = contactForm.querySelectorAll('.text-danger');
            errorMessages.forEach(message => message.remove());

            // Validate name
            if (!nameInput.value.trim()) {
                valid = false;
                showError(nameInput, 'Please enter your name');
            }

            // Validate email
            if (!emailInput.value.trim()) {
                valid = false;
                showError(emailInput, 'Please enter your email');
            } else if (!isValidEmail(emailInput.value)) {
                valid = false;
                showError(emailInput, 'Please enter a valid email address');
            }

            // Validate message
            if (!messageInput.value.trim()) {
                valid = false;
                showError(messageInput, 'Please enter your message');
            }

            // If valid, send form or show success message
            if (valid) {
                // Here you would typically send the form data using AJAX or fetch
                // For now, we'll just show a success message
                showAlert('success', 'Your message has been sent successfully. We will contact you soon!');
                contactForm.reset();
            }
        });
    }

    // Appointment Form Validation
    const appointmentForm = document.querySelector('.appointment-form');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Basic validation - similar to contact form but with additional fields
            let valid = true;
            const nameInput = appointmentForm.querySelector('input[name="name"]');
            const emailInput = appointmentForm.querySelector('input[name="email"]');
            const phoneInput = appointmentForm.querySelector('input[name="phone"]');
            const dateInput = appointmentForm.querySelector('input[name="date"]');
            const departmentSelect = appointmentForm.querySelector('select[name="department"]');
            const doctorSelect = appointmentForm.querySelector('select[name="doctor"]');

            // Clear previous validation messages
            const errorMessages = appointmentForm.querySelectorAll('.text-danger');
            errorMessages.forEach(message => message.remove());

            // Validate name
            if (!nameInput.value.trim()) {
                valid = false;
                showError(nameInput, 'Please enter your name');
            }

            // Validate email
            if (!emailInput.value.trim()) {
                valid = false;
                showError(emailInput, 'Please enter your email');
            } else if (!isValidEmail(emailInput.value)) {
                valid = false;
                showError(emailInput, 'Please enter a valid email address');
            }

            // Validate phone
            if (!phoneInput.value.trim()) {
                valid = false;
                showError(phoneInput, 'Please enter your phone number');
            }

            // Validate date
            if (!dateInput.value) {
                valid = false;
                showError(dateInput, 'Please select a date');
            }

            // Validate department
            if (departmentSelect.value === '') {
                valid = false;
                showError(departmentSelect, 'Please select a department');
            }

            // Validate doctor
            if (doctorSelect.value === '') {
                valid = false;
                showError(doctorSelect, 'Please select a doctor');
            }

            // If valid, send form or show success message
            if (valid) {
                // Here you would typically send the form data using AJAX or fetch
                // For now, we'll just show a success message
                showAlert('success', 'Your appointment has been booked successfully. We will confirm shortly!');
                appointmentForm.reset();
            }
        });
    }

    // Function to show error message
    function showError(input, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'text-danger';
        errorDiv.textContent = message;
        input.parentNode.appendChild(errorDiv);
        input.classList.add('is-invalid');
    }

    // Function to validate email
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Function to display alert messages
    function showAlert(type, message) {
        const alertContainer = document.querySelector('.alert-container');
        if (alertContainer) {
            const alertDiv = document.createElement('div');
            alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
            alertDiv.innerHTML = `
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            `;
            alertContainer.appendChild(alertDiv);

            // Auto close after 5 seconds
            setTimeout(() => {
                alertDiv.classList.remove('show');
                setTimeout(() => {
                    alertDiv.remove();
                }, 500);
            }, 5000);
        }
    }

    // Dynamic Doctor Selection based on Department
    const departmentSelect = document.querySelector('select[name="department"]');
    const doctorSelect = document.querySelector('select[name="doctor"]');

    if (departmentSelect && doctorSelect) {
        // Sample data structure for doctors by department
        // Doctors categorized by department
        const doctorsByDepartment = {
            'orthopedics': [
                { id: 1, name: 'Dr. Fida Ali' }
            ],
            'cardiology': [
                { id: 2, name: 'Dr. Zulfiqar Ali' }
            ],
            'neurology': [
                { id: 3, name: 'Dr. Ishtiaq' }
            ],
            'medical-specialist': [
                { id: 4, name: 'Dr. Raziq Ali' }
            ],
            'urology': [
                { id: 5, name: 'Dr. Hussain Sheer Alivi' }
            ],
            'general-surgery': [
                { id: 6, name: 'Dr. Shabbar Hussain Changezi' }
            ],
            'gynecology': [
                { id: 7, name: 'Dr. Naheed Batool' }
            ],
            'resident-surgery': [
                { id: 8, name: 'Dr. Muhammad Kaleem Ibad' },
                { id: 9, name: 'Dr. Saba' }
            ],
            'sonology': [
                { id: 10, name: 'Dr. Ejaz' }
            ],
            
        };

        departmentSelect.addEventListener('change', function () {
            const department = this.value;

            // Clear current options
            doctorSelect.innerHTML = '<option value="">Select Doctor</option>';

            // Populate doctors based on department
            if (department && doctorsByDepartment[department]) {
                doctorsByDepartment[department].forEach(doctor => {
                    const option = document.createElement('option');
                    option.value = doctor.id;
                    option.textContent = doctor.name;
                    doctorSelect.appendChild(option);
                });

                // Enable the doctor select
                doctorSelect.disabled = false;
            } else {
                doctorSelect.disabled = true;
            }
        });
    }

    // Newsletter Subscription
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const emailInput = newsletterForm.querySelector('input[type="email"]');

            // Clear previous validation messages
            const errorMessages = newsletterForm.querySelectorAll('.text-danger');
            errorMessages.forEach(message => message.remove());

            // Validate email
            if (!emailInput.value.trim()) {
                showError(emailInput, 'Please enter your email');
            } else if (!isValidEmail(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email address');
            } else {
                // Subscribe logic would go here
                showAlert('success', 'Thank you for subscribing to our newsletter!');
                newsletterForm.reset();
            }
        });
    }

    // Add animation classes to elements when they come into view
    const animatedElements = document.querySelectorAll('.animated');

    if (animatedElements.length > 0) {
        window.addEventListener('scroll', function () {
            animatedElements.forEach(element => {
                if (isInViewport(element)) {
                    element.classList.add('fadeIn');
                }
            });
        });
    }
});

/**
 * Initialize smooth scrolling for anchors
 */
function initSmoothScroll() {
    // Select all anchor links that have a hash
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;

                window.scrollTo({
                    top: targetPosition - navbarHeight,
                    behavior: 'smooth'
                });

                // Update active state in the navbar
                const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
                navLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Check if we need to scroll on page load (e.g., if URL contains a hash)
    window.addEventListener('load', function () {
        if (window.location.hash) {
            const targetElement = document.querySelector(window.location.hash);

            if (targetElement) {
                setTimeout(function () {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;

                    window.scrollTo({
                        top: targetPosition - navbarHeight,
                        behavior: 'smooth'
                    });
                }, 300); // Small delay to ensure page is fully loaded
            }
        }
    });
}

/**
 * Initialize form validation
 */
function initFormValidation() {
    const forms = document.querySelectorAll('.needs-validation');

    forms.forEach(form => {
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }

            form.classList.add('was-validated');
        }, false);
    });
}

/**
 * Initialize appointment form
 */


function initAppointmentForm() {
    const appointmentForm = document.getElementById('appointmentForm');

    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function (e) {
            e.preventDefault();

            if (this.checkValidity()) {
                // Collect form data
                const formData = new FormData(this);
                const formDataObj = {};

                formData.forEach((value, key) => {
                    formDataObj[key] = value;
                });

                // Send form data to server
                fetch('/api/appointments', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formDataObj)
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            showAlert('Your appointment has been booked successfully!', 'success');
                            appointmentForm.reset();
                            appointmentForm.classList.remove('was-validated');
                        } else {
                            showAlert('Error: ' + data.message, 'danger');
                        }
                    })
                    .catch(error => {
                        showAlert('Error submitting form. Please try again later.', 'danger');
                        console.error('Error:', error);
                    });
            } else {
                this.classList.add('was-validated');
            }
        });
    }
}

/**
 * Initialize contact form
 */
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            if (this.checkValidity()) {
                // Collect form data
                const formData = new FormData(this);
                const formDataObj = {};

                formData.forEach((value, key) => {
                    formDataObj[key] = value;
                });

                // Send form data to server
                fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formDataObj)
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            showAlert('Your message has been sent successfully!', 'success');
                            contactForm.reset();
                        } else {
                            showAlert('Error: ' + data.message, 'danger');
                        }
                    })
                    .catch(error => {
                        showAlert('Error submitting form. Please try again later.', 'danger');
                        console.error('Error:', error);
                    });
            } else {
                this.classList.add('was-validated');
            }
        });
    }
}

/**
 * Highlight active navigation link based on current URL or scroll position
 */
function highlightActiveNavLink() {
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    // Set active initially based on URL
    navLinks.forEach(link => {
        link.classList.remove('active');

        const href = link.getAttribute('href');
        if (href === currentLocation) {
            link.classList.add('active');
        } else if (currentLocation === '/' && href === '/') {
            link.classList.add('active');
        }
    });

    // Update active state on scroll
    window.addEventListener('scroll', function () {
        // Don't run this on pages other than the home page
        if (currentLocation !== '/') return;

        // Find which section is currently visible in the viewport
        const scrollPosition = window.scrollY + document.querySelector('.navbar').offsetHeight + 50;

        // Get all sections that have IDs matching our navigation
        const sections = document.querySelectorAll('section[id]');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const targetId = '#' + section.getAttribute('id');

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === targetId) {
                        link.classList.add('active');
                    }
                });
            }
        });

        // If we're at the top of the page, make "Home" active
        if (scrollPosition < 100 + document.querySelector('.navbar').offsetHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '/') {
                    link.classList.add('active');
                }
            });
        }
    });
} 