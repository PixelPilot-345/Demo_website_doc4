export function initUI() {
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

    // Custom lerp factor for smoothness
    const speed = 0.2;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        // Lerping
        cursorX += (mouseX - cursorX) * speed;
        cursorY += (mouseY - cursorY) * speed;

        cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
        requestAnimationFrame(animateCursor);
    }

    animateCursor();

    // Hover states for links and interactive elements
    const interactables = document.querySelectorAll('a, button, .interactive');

    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
    });
}

function splitTextForReveal() {
    const textElements = document.querySelectorAll('.char-reveal-text');

    textElements.forEach(el => {
        const text = el.textContent;
        el.textContent = '';

        // Make wrapper
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
        // Move class up to trigger via intersection observer on parent or wrapper itself
        wrapper.classList.add('reveal-on-scroll');
    });
}
