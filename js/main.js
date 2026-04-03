document.addEventListener('DOMContentLoaded', () => {
    // Initialize Custom Cursor & Text Split
    initUI();

    // Initialize Scroll animations & Intersection Observers
    initScroll();

    // Initialize Parallax
    initParallax();

    // Basic smooth page transition prep (fade in on load)
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.6s ease';

    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });
});

/* --- SCROLL LOGIC --- */
function initScroll() {
    const scrollElements = document.querySelectorAll(
        '.reveal-up, .reveal-up-stagger, .reveal-scale, .clip-reveal, .char-reveal, .img-mask'
    );

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.1
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    scrollElements.forEach(el => scrollObserver.observe(el));

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }, { passive: true });
    }
}

function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    if (!parallaxElements.length) return;

    function updateParallax() {
        const scrollY = window.scrollY;
        parallaxElements.forEach(el => {
            const speed = parseFloat(el.getAttribute('data-parallax')) || 0.2;
            const yPos = -(scrollY * speed);
            // Rough viewport check
            const rect = el.getBoundingClientRect();
            if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                el.style.transform = `translate3d(0, ${yPos}px, 0)`;
            }
        });
    }

    window.addEventListener('scroll', () => {
        window.requestAnimationFrame(updateParallax);
    }, { passive: true });
}

/* --- UI LOGIC --- */
function initUI() {
    initCustomCursor();
    splitTextForReveal();
}

function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    const speed = 0.2;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * speed;
        cursorY += (mouseY - cursorY) * speed;
        cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    const interactables = document.querySelectorAll('a, button, .interactive');
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

function splitTextForReveal() {
    const textElements = document.querySelectorAll('.char-reveal-text');

    textElements.forEach(el => {
        const text = el.textContent;
        el.textContent = '';
        const wrapper = document.createElement('span');
        wrapper.classList.add('char-reveal');

        [...text].forEach((char, i) => {
            if (char === ' ') {
                wrapper.appendChild(document.createTextNode(' '));
            } else {
                const span = document.createElement('span');
                span.textContent = char;
                span.classList.add('char');
                span.style.transitionDelay = `${i * 0.03}s`;
                wrapper.appendChild(span);
            }
        });

        el.appendChild(wrapper);
        wrapper.classList.add('reveal-on-scroll');

        // Add it directly to visible if we want it to trigger on load, or let intersection observer catch it if the parent is observed.
        // We observe the wrapper here to fix cases where it doesn't get picked up.
        wrapper.classList.add('reveal-up');
    });
}
