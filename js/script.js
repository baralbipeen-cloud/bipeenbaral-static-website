document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close Mobile Menu when a link is clicked
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Navbar Scrolled State & Active Link Highlighting
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Scrolled State
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active Link Highlighting
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });

    // Form Handling Simulation
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simple validation simulation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (name && email && message) {
                // Change button text temporarily
                const btn = contactForm.querySelector('button');
                const originalText = btn.textContent;
                btn.textContent = 'Sending...';
                btn.disabled = true;

                // Simulate network request
                setTimeout(() => {
                    formStatus.textContent = 'Thank you! Your message has been sent successfully.';
                    formStatus.className = 'form-status success';
                    contactForm.reset();
                    
                    btn.textContent = originalText;
                    btn.disabled = false;

                    // Clear message after 5 seconds
                    setTimeout(() => {
                        formStatus.textContent = '';
                    }, 5000);
                }, 1500);
            }
        });
    }

    // Optional: Add basic intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add classes to items we want to animate in
    const animateElements = document.querySelectorAll('.glass-card, .about-text');
    animateElements.forEach(el => {
        // Optional init state for css transition
        // el.style.opacity = '0';
        // el.style.transform = 'translateY(20px)';
        // el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
});
