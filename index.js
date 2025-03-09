document.addEventListener('DOMContentLoaded', function() {
    // Navigation toggle for mobile
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        // Toggle active class on nav links
        navLinks.classList.toggle('active');
        
        // Animate hamburger to X
        const lines = document.querySelectorAll('.hamburger .line');
        lines.forEach(line => line.classList.toggle('active'));
        
        if (navLinks.classList.contains('active')) {
            // Transform hamburger to X
            lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            lines[1].style.opacity = '0';
            lines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            // Revert to hamburger
            lines[0].style.transform = 'none';
            lines[1].style.opacity = '1';
            lines[2].style.transform = 'none';
        }
    });
    
    // Close mobile menu when a link is clicked
    const navItems = document.querySelectorAll('.nav-links li a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            
            // Reset hamburger icon
            const lines = document.querySelectorAll('.hamburger .line');
            lines.forEach(line => line.classList.remove('active'));
            lines[0].style.transform = 'none';
            lines[1].style.opacity = '1';
            lines[2].style.transform = 'none';
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
});
