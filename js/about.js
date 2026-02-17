// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add active state to navigation links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-links a');

    let current = '';
    const navbarHeight = document.querySelector('.navbar').offsetHeight;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight - 100;
        const sectionHeight = section.offsetHeight;

        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Handle missing profile image gracefully
window.addEventListener('DOMContentLoaded', () => {
    const profileImage = document.querySelector('.profile-image');

    profileImage.addEventListener('error', function() {
        // Create a placeholder with initials if image fails to load
        const placeholder = document.createElement('div');
        placeholder.className = 'profile-placeholder';
        placeholder.textContent = 'SOS';
        placeholder.style.cssText = `
            width: 200px;
            height: 200px;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 3rem;
            font-weight: bold;
            border: 4px solid white;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        `;

        this.parentNode.replaceChild(placeholder, this);
    });
});

// Contact form — opens mailto with form contents
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('contact-name').value.trim();
        const email = document.getElementById('contact-email').value.trim();
        const affiliation = document.getElementById('contact-affiliation').value.trim();
        const message = document.getElementById('contact-message').value.trim();

        const subject = encodeURIComponent('Saving of Swedovia — Message from ' + name);
        const body = encodeURIComponent(
            'Name: ' + name + '\n' +
            'Email: ' + email + '\n' +
            (affiliation ? 'Affiliation: ' + affiliation + '\n' : '') +
            '\n' + message
        );

        window.location.href = 'mailto:joel.martinsson@lnu.se?subject=' + subject + '&body=' + body;

        // Show success message
        const success = document.createElement('div');
        success.className = 'form-success';
        success.textContent = 'Your email client should open now. If it does not, please email joel.martinsson@lnu.se directly.';
        form.parentNode.insertBefore(success, form.nextSibling);
    });
});
