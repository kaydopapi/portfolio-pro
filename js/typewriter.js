/* ============================================
   TYPEWRITER - Text Animation Effect
   ============================================ */

class Typewriter {
    constructor(element, options = {}) {
        this.element = element;
        this.words = options.words || ['Developer', 'Designer', 'Creator'];
        this.typeSpeed = options.typeSpeed || 100;
        this.deleteSpeed = options.deleteSpeed || 50;
        this.pauseTime = options.pauseTime || 2000;
        this.loop = options.loop !== undefined ? options.loop : true;

        this.wordIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.isPaused = false;

        this.init();
    }

    init() {
        this.type();
    }

    type() {
        const currentWord = this.words[this.wordIndex];

        if (this.isDeleting) {
            // Deleting
            this.element.textContent = currentWord.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            // Typing
            this.element.textContent = currentWord.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        // Determine next action
        let typeSpeed = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

        if (!this.isDeleting && this.charIndex === currentWord.length) {
            // Word complete, pause then delete
            typeSpeed = this.pauseTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            // Word deleted, move to next word
            this.isDeleting = false;
            this.wordIndex++;

            if (this.wordIndex >= this.words.length) {
                if (this.loop) {
                    this.wordIndex = 0;
                } else {
                    return; // Stop if not looping
                }
            }

            typeSpeed = 500; // Pause before typing new word
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Counter animation
class CountUp {
    constructor(element, options = {}) {
        this.element = element;
        this.target = parseInt(element.getAttribute('data-target')) || 0;
        this.duration = options.duration || 2000;
        this.startValue = options.startValue || 0;
        this.suffix = element.getAttribute('data-suffix') || '';
        this.prefix = element.getAttribute('data-prefix') || '';

        this.startTime = null;
        this.hasRun = false;
    }

    start() {
        if (this.hasRun) return;
        this.hasRun = true;
        this.startTime = performance.now();
        this.animate();
    }

    animate() {
        const currentTime = performance.now();
        const elapsed = currentTime - this.startTime;
        const progress = Math.min(elapsed / this.duration, 1);

        // Easing function (ease-out-expo)
        const easeOutExpo = 1 - Math.pow(2, -10 * progress);
        const currentValue = Math.floor(this.startValue + (this.target - this.startValue) * easeOutExpo);

        this.element.textContent = this.prefix + currentValue + this.suffix;

        if (progress < 1) {
            requestAnimationFrame(() => this.animate());
        } else {
            this.element.textContent = this.prefix + this.target + this.suffix;
        }
    }

    reset() {
        this.hasRun = false;
        this.element.textContent = this.prefix + this.startValue + this.suffix;
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    // Typewriter
    const typewriterElement = document.querySelector('.typewriter');
    if (typewriterElement) {
        new Typewriter(typewriterElement, {
            words: [
                'Frontend-разработчик',
                'UI/UX Дизайнер',
                'Творческий кодер',
                'Верстальщик сайтов'
            ],
            typeSpeed: 80,
            deleteSpeed: 40,
            pauseTime: 2500
        });
    }

    // Counter animations with Intersection Observer
    const counters = document.querySelectorAll('[data-target]');
    const counterInstances = [];

    counters.forEach(counter => {
        counterInstances.push(new CountUp(counter));
    });

    const observerOptions = {
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(counters).indexOf(entry.target);
                if (index !== -1) {
                    counterInstances[index].start();
                }
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
});
