/* ============================================
   CUSTOM CURSOR - Trailing Effect
   ============================================ */

class CustomCursor {
    constructor() {
        this.cursor = null;
        this.cursorDot = null;
        this.cursorX = 0;
        this.cursorY = 0;
        this.dotX = 0;
        this.dotY = 0;

        this.init();
    }

    init() {
        // Create cursor elements
        this.cursor = document.createElement('div');
        this.cursor.className = 'cursor';
        document.body.appendChild(this.cursor);

        this.cursorDot = document.createElement('div');
        this.cursorDot.className = 'cursor-dot';
        document.body.appendChild(this.cursorDot);

        // Event listeners
        document.addEventListener('mousemove', (e) => this.onMouseMove(e));
        document.addEventListener('mouseenter', () => this.show());
        document.addEventListener('mouseleave', () => this.hide());

        // Hover effects for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .btn, input, textarea, .project-card, .skill-item, .glass-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => this.onHover());
            el.addEventListener('mouseleave', () => this.onLeave());
        });

        // Start animation loop
        this.animate();
    }

    onMouseMove(e) {
        this.cursorX = e.clientX;
        this.cursorY = e.clientY;
    }

    animate() {
        // Smooth trailing effect for main cursor
        this.dotX += (this.cursorX - this.dotX) * 0.15;
        this.dotY += (this.cursorY - this.dotY) * 0.15;

        // Position cursor dot (follows mouse exactly)
        this.cursorDot.style.left = `${this.cursorX}px`;
        this.cursorDot.style.top = `${this.cursorY}px`;
        this.cursorDot.style.transform = 'translate(-50%, -50%)';

        // Position main cursor (trails behind)
        this.cursor.style.left = `${this.dotX}px`;
        this.cursor.style.top = `${this.dotY}px`;
        this.cursor.style.transform = 'translate(-50%, -50%)';

        requestAnimationFrame(() => this.animate());
    }

    onHover() {
        this.cursor.classList.add('hover');
        this.cursorDot.style.opacity = '0';
    }

    onLeave() {
        this.cursor.classList.remove('hover');
        this.cursorDot.style.opacity = '1';
    }

    show() {
        this.cursor.style.opacity = '1';
        this.cursorDot.style.opacity = '1';
    }

    hide() {
        this.cursor.style.opacity = '0';
        this.cursorDot.style.opacity = '0';
    }
}

// Initialize cursor on DOM load
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize on non-touch devices
    if (window.matchMedia('(pointer: fine)').matches) {
        new CustomCursor();
    }
});
