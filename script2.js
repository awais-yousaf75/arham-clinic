document.addEventListener('DOMContentLoaded', () => {
    // Loading Screen
    // const loadingScreen = document.createElement('div');
    // loadingScreen.className = 'loading-screen';
    // loadingScreen.innerHTML = '<div class="loader"></div>';
    // document.body.appendChild(loadingScreen);

    // window.addEventListener('load', () => {
    //     setTimeout(() => {
    //         loadingScreen.classList.add('hidden');
    //         setTimeout(() => loadingScreen.remove(), 500);
    //     }, 1000);
    // });

    // Mobile Menu Toggle with Animation
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        body.classList.toggle('menu-open');

        const icon = mobileBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            mobileBtn.style.transform = 'rotate(90deg)';
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            mobileBtn.style.transform = 'rotate(0deg)';
        }
    });

    // Smooth Scrolling with Progress Indicator
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            navLinks.classList.remove('active');
            body.classList.remove('menu-open');

            const icon = mobileBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            mobileBtn.style.transform = 'rotate(0deg)';

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Enhanced Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/Show navbar on scroll
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;
    });

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Stagger animation for service cards
                if (entry.target.classList.contains('service-card')) {
                    const cards = document.querySelectorAll('.service-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, index * 100);
                    });
                }
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    document.querySelectorAll('.section-title').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    document.querySelectorAll('.doctor-card').forEach((el, index) => {
        el.classList.add(index % 2 === 0 ? 'slide-left' : 'slide-right');
        observer.observe(el);
    });

    document.querySelectorAll('.service-card').forEach(el => {
        el.classList.add('scale-up');
        observer.observe(el);
    });

    document.querySelectorAll('.info-item').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Parallax Effect for Hero
    const hero = document.querySelector('.hero');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = -scrolled * 0.5;
        hero.style.backgroundPositionY = parallax + 'px';
    });

    // Counter Animation for Stats (if you want to add stats)
    const animateCount = (element, target, duration = 2000) => {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    };

    // Mouse Move Effect for Cards
    document.querySelectorAll('.doctor-card, .service-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });

    // Ripple Effect for Buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            ripple.className = 'ripple';

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add Page Progress Bar
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #D32F2F, #F44336);
        z-index: 10000;
        transition: width 0.2s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });

    // Add Cursor Trail Effect (optional - comment out if not needed)
    // const coords = { x: 0, y: 0 };
    // const circles = document.querySelectorAll('.circle');

    // if (window.innerWidth > 768) {
    //     for (let i = 0; i < 20; i++) {
    //         const circle = document.createElement('div');
    //         circle.className = 'circle';
    //         circle.style.cssText = `
    //             position: fixed;
    //             width: 24px;
    //             height: 24px;
    //             border-radius: 50%;
    //             background: rgba(211, 47, 47, 0.05);
    //             pointer-events: none;
    //             z-index: 9999;
    //             transform: translate(-50%, -50%);
    //             transition: transform 0.1s;
    //         `;
    //         document.body.appendChild(circle);
    //     }

    //     document.addEventListener('mousemove', (e) => {
    //         coords.x = e.clientX;
    //         coords.y = e.clientY;
    //     });

    //     function animateCircles() {
    //         let x = coords.x;
    //         let y = coords.y;

    //         document.querySelectorAll('.circle').forEach((circle, index) => {
    //             circle.style.left = x - 12 + 'px';
    //             circle.style.top = y - 12 + 'px';
    //             circle.style.scale = (20 - index) / 20;

    //             const nextCircle = document.querySelectorAll('.circle')[index + 1] || document.querySelectorAll('.circle')[0];
    //             x += (nextCircle.offsetLeft - x) * 0.3;
    //             y += (nextCircle.offsetTop - y) * 0.3;
    //         });

    //         requestAnimationFrame(animateCircles);
    //     }

    //     animateCircles();
    // }
});