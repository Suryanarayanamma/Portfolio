// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Enhanced Navbar Functionality
const navbar = document.querySelector('.navbar');
const navItems = document.querySelectorAll('.nav-links a');

// Handle hamburger menu click
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navLinks.classList.contains('active')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Handle nav item clicks
navItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remove active class from all items
        navItems.forEach(link => link.classList.remove('active'));
        // Add active class to clicked item
        item.classList.add('active');
        // Close mobile menu
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Update active nav item on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.pageYOffset + window.innerHeight / 3;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    // Special case for home section when at the top
    if (window.pageYOffset < window.innerHeight / 2) {
        current = 'home';
    }

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });

    // Navbar scroll effect
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
const formGroups = document.querySelectorAll('.form-group');

// Add animation classes to form elements
formGroups.forEach((group, index) => {
    group.style.opacity = '0';
    group.style.transform = 'translateY(20px)';
    setTimeout(() => {
        group.style.transition = 'all 0.5s ease';
        group.style.opacity = '1';
        group.style.transform = 'translateY(0)';
    }, 200 * index);
});

// Handle form labels
formGroups.forEach(group => {
    const input = group.querySelector('input, textarea');
    const label = group.querySelector('label');

    if (input && label) {
        // Check initial state
        if (input.value) {
            label.classList.add('active');
        }

        // Handle focus events
        input.addEventListener('focus', () => {
            label.classList.add('active');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                label.classList.remove('active');
            }
        });
    }
});

// Form submission handling
contactForm.addEventListener('submit', sendEmail);

function sendEmail(event) {
    event.preventDefault();

    const submitBtn = document.querySelector('.submit-btn');
    const defaultButtonHtml = 'Send Message <i class="fas fa-paper-plane"></i>';
    const loadingButtonHtml = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    // Validate form
    const form = document.getElementById('contact-form');
    if (!form.checkValidity()) {
        form.reportValidity();
        return false;
    }

    // Get form values
    const params = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    // Show loading state
    submitBtn.innerHTML = loadingButtonHtml;
    submitBtn.disabled = true;

    // Send email using EmailJS
    emailjs.send("service_p1h7xc1", "template_8zqiwrm", params)
        .then(function(response) {
            console.log("SUCCESS!", response.status, response.text);
            // Show success message
            alert('Message sent successfully!');
            // Reset form
            form.reset();
        })
        .catch(function(error) {
            console.error("FAILED...", error);
            // Show error message
            alert('Failed to send message. Please try again.');
        })
        .finally(function() {
            // Always restore button to default state
            submitBtn.innerHTML = defaultButtonHtml;
            submitBtn.disabled = false;
        });

    return false;
}

// Intersection Observer for contact cards animation
const observeElements = document.querySelectorAll('.contact-card, .social-links');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

observeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.5s ease';
    observer.observe(element);
});

// Add scroll reveal animations
window.addEventListener('scroll', reveal);

function reveal() {
    const reveals = document.querySelectorAll('.project-card, .about-content, .contact-content');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Loading Animation
window.addEventListener('load', () => {
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.style.opacity = '0';
        setTimeout(() => {
            loading.style.display = 'none';
        }, 500);
    }
});

// Scroll Animations
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    // Reveal sections on scroll
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            section.classList.add('visible');
        }
    });
});

// Typing animation for hero section
const text = "Full Stack Developer";
const tagline = document.querySelector('.tagline');
let index = 0;
let isDeleting = false;
let currentText = '';

function typeWriter() {
    const speed = isDeleting ? 50 : 100;
    
    if (!isDeleting && currentText.length < text.length) {
        currentText = text.substring(0, currentText.length + 1);
    } else if (isDeleting && currentText.length > 0) {
        currentText = text.substring(0, currentText.length - 1);
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
            setTimeout(typeWriter, 1000);
            return;
        }
    }
    
    tagline.textContent = currentText + (isDeleting ? '' : '|');
    setTimeout(typeWriter, speed);
}

// Start animations when page loads
window.addEventListener('load', () => {
    typeWriter();
    sections.forEach(section => {
        if (section.getBoundingClientRect().top < window.innerHeight * 0.75) {
            section.classList.add('visible');
        }
    });
});

// Theme Switcher
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// About section animations
const aboutSection = document.querySelector('.about');
const aboutElements = aboutSection.querySelectorAll('.about-image, .about-bio, .detail-group, .about-cta');

const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.2
});

aboutElements.forEach((element, index) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = `all 0.5s ease ${index * 0.2}s`;
    aboutObserver.observe(element);
});

// Tech stack animation
const techStack = document.querySelector('.tech-stack');
const techItems = techStack.querySelectorAll('span');

techItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'scale(0.8)';
    item.style.transition = `all 0.3s ease ${index * 0.1}s`;
});

const techStackObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            techItems.forEach(item => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            });
        }
    });
}, {
    threshold: 0.5
});

techStackObserver.observe(techStack);

// Morphing background animation for image shape
const imageShape = document.querySelector('.image-shape');
let morphing = false;

function morphShape() {
    if (!morphing) {
        morphing = true;
        const randomRadius = () => Math.random() * 70 + 30;
        
        imageShape.style.borderRadius = `${randomRadius()}% ${randomRadius()}% ${randomRadius()}% ${randomRadius()}% / ${randomRadius()}% ${randomRadius()}% ${randomRadius()}% ${randomRadius()}%`;
        
        setTimeout(() => {
            morphing = false;
            requestAnimationFrame(morphShape);
        }, 3000);
    }
}

requestAnimationFrame(morphShape);

// Education Timeline Animations
const timelineItems = document.querySelectorAll('.timeline-item');
const educationSection = document.querySelector('.education-section');

// Animate timeline line drawing
const timelineLine = document.querySelector('.education-timeline::before');
if (timelineLine) {
    timelineLine.style.height = '0';
    timelineLine.style.transition = 'height 1.5s ease';
}

const educationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate timeline line
            if (timelineLine) {
                timelineLine.style.height = '100%';
            }

            // Animate timeline items
            timelineItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, 200 * index);
            });
        }
    });
}, {
    threshold: 0.2
});

// Set initial states
timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = 'all 0.5s ease';
});

educationObserver.observe(educationSection);

// Highlight tags animation
const highlightTags = document.querySelectorAll('.highlight-tag');

highlightTags.forEach((tag, index) => {
    tag.style.opacity = '0';
    tag.style.transform = 'translateY(10px)';
    tag.style.transition = `all 0.3s ease ${index * 0.1}s`;
});

const tagsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const tags = entry.target.querySelectorAll('.highlight-tag');
            tags.forEach(tag => {
                tag.style.opacity = '1';
                tag.style.transform = 'translateY(0)';
            });
        }
    });
}, {
    threshold: 0.5
});

document.querySelectorAll('.timeline-details').forEach(details => {
    tagsObserver.observe(details);
});

// Add hover effect for timeline icons
timelineItems.forEach(item => {
    const icon = item.querySelector('.timeline-icon');
    if (icon) {
        icon.addEventListener('mouseover', () => {
            icon.style.transform = 'scale(1.1) rotate(360deg)';
        });
        icon.addEventListener('mouseout', () => {
            icon.style.transform = 'scale(1) rotate(0)';
        });
    }
});