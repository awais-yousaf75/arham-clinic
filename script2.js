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

    // ============================================
    // SERVICES FILTER FUNCTIONALITY
    // ============================================

    const filterButtons = document.querySelectorAll('.filter-btn');
    const serviceCategories = document.querySelectorAll('.service-category');
    const allServiceCards = document.querySelectorAll('.service-card');

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            // Filter categories with animation
            serviceCategories.forEach(category => {
                category.classList.add('filtering');

                setTimeout(() => {
                    if (filterValue === 'all') {
                        category.classList.remove('hidden');
                        category.style.display = 'block';
                        // Animate cards
                        animateCards(category);
                    } else {
                        if (category.getAttribute('data-category') === filterValue) {
                            category.classList.remove('hidden');
                            category.style.display = 'block';
                            // Animate cards
                            animateCards(category);
                        } else {
                            category.classList.add('hidden');
                            setTimeout(() => {
                                category.style.display = 'none';
                            }, 400);
                        }
                    }

                    setTimeout(() => {
                        category.classList.remove('filtering');
                    }, 400);
                }, 200);
            });

            // Scroll to services section smoothly
            const servicesSection = document.getElementById('services');
            const offset = servicesSection.offsetTop - 100;
            window.scrollTo({
                top: offset,
                behavior: 'smooth'
            });
        });
    });

    // Function to animate cards when category is shown
    function animateCards(category) {
        const cards = category.querySelectorAll('.service-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';

            setTimeout(() => {
                card.style.transition = 'all 0.4s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 50);
        });
    }

    // Add hover effect to service cards based on category
    allServiceCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            const category = this.getAttribute('data-category');
            this.style.transform = 'translateY(-5px)';

            // Add category-specific glow
            if (category === 'gynae') {
                this.style.boxShadow = '0 10px 30px rgba(233, 30, 99, 0.2)';
            } else if (category === 'dental') {
                this.style.boxShadow = '0 10px 30px rgba(0, 188, 212, 0.2)';
            } else if (category === 'hospital') {
                this.style.boxShadow = '0 10px 30px rgba(76, 175, 80, 0.2)';
            }
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        });
    });

    // Mobile touch feedback
    if (window.innerWidth <= 768) {
        filterButtons.forEach(button => {
            button.addEventListener('touchstart', function () {
                this.style.transform = 'scale(0.95)';
            });

            button.addEventListener('touchend', function () {
                this.style.transform = 'scale(1)';
            });
        });
    }

    // Initialize with all services visible
    const allButton = document.querySelector('.filter-btn[data-filter="all"]');
    if (allButton) {
        allButton.click();
    }

    // ============================================
    // MAP AND CONTACT INTERACTIONS
    // ============================================

    // Make phone numbers clickable with confirmation
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            if (window.innerWidth > 768) {
                e.preventDefault();
                const phoneNumber = this.textContent;
                const confirmCall = confirm(`Do you want to call ${phoneNumber}?`);
                if (confirmCall) {
                    window.location.href = this.href;
                }
            }
        });
    });

    // Track map interactions
    const mapMarker = document.querySelector('.map-marker');
    const mapDirectionBtn = document.querySelector('.map-direction-btn');
    const viewMapLink = document.querySelector('.view-map-link');

    if (mapMarker) {
        mapMarker.addEventListener('click', function (e) {
            // Analytics or tracking can be added here
            console.log('Map marker clicked - Opening Google Maps');
        });
    }

    if (mapDirectionBtn) {
        mapDirectionBtn.addEventListener('click', function (e) {
            console.log('Get Directions clicked');
        });
    }

    if (viewMapLink) {
        viewMapLink.addEventListener('click', function (e) {
            console.log('View on Map clicked');
        });
    }

    // Copy address on double click
    const addressText = document.querySelector('.info-item p');
    if (addressText) {
        addressText.addEventListener('dblclick', function () {
            const text = this.textContent;
            navigator.clipboard.writeText(text).then(() => {
                // Show temporary notification
                const notification = document.createElement('div');
                notification.textContent = 'Address copied to clipboard!';
                notification.style.cssText = `
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background: var(--gradient-primary);
                    color: white;
                    padding: 15px 25px;
                    border-radius: 50px;
                    font-weight: 600;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                    z-index: 10000;
                    animation: slideInUp 0.3s ease;
                `;
                document.body.appendChild(notification);

                setTimeout(() => {
                    notification.style.animation = 'slideOutDown 0.3s ease';
                    setTimeout(() => notification.remove(), 300);
                }, 2000);
            });
        });
    }

    // Lazy load map iframe for better performance
    const mapIframe = document.querySelector('.map-wrapper iframe');
    if (mapIframe) {
        const loadMap = () => {
            const rect = mapIframe.getBoundingClientRect();
            if (rect.top < window.innerHeight + 200) {
                // Map is near viewport, ensure it's loaded
                if (!mapIframe.hasAttribute('data-loaded')) {
                    mapIframe.setAttribute('data-loaded', 'true');
                    console.log('Map loaded');
                }
                window.removeEventListener('scroll', loadMap);
            }
        };

        window.addEventListener('scroll', loadMap);
        loadMap(); // Check on initial load
    }
});