// ==========================
// App Hover Info and Name Update
// ==========================



document.addEventListener("DOMContentLoaded", () => {
    const appName = document.getElementById("appName");
    const appDesc = document.getElementById("appDescription");
    const appInfo = document.querySelector(".app-info");

    appInfo.classList.remove("hidden");

    document.querySelectorAll(".app").forEach(app => {
        app.addEventListener("mouseenter", () => {
            const name = app.dataset.name;
            const desc = app.dataset.description;

            if (appName.textContent !== name) {
                appName.classList.add("fade-out");
                appDesc.classList.add("fade-out");

                setTimeout(() => {
                    appName.textContent = name;
                    appDesc.textContent = desc;

                    appName.classList.replace("fade-out", "fade-in");
                    appDesc.classList.replace("fade-out", "fade-in");

                    setTimeout(() => {
                        appName.classList.remove("fade-in");
                        appDesc.classList.remove("fade-in");
                    }, 300);
                }, 300);
            }
        });
    });
});



// ==========================
// Navbar Hover Indicator and Active Tracker Hover
// ==========================



document.addEventListener("DOMContentLoaded", () => {
    const hoverIndicator = document.querySelector(".hover-indicator");
    const navLinks = document.querySelectorAll(".nav-link");
    const navbar = document.querySelector(".navbar-container");

    let activeLink = document.querySelector('.nav-link[href="#header"]');

    function moveIndicatorTo(link) {
        const linkRect = link.getBoundingClientRect();
        const navbarRect = navbar.getBoundingClientRect();
        const left = linkRect.left - navbarRect.left;
        const width = linkRect.width;

        hoverIndicator.style.left = `${left}px`;
        hoverIndicator.style.width = `${width}px`;

        navLinks.forEach(nav => nav.classList.remove("active-indicated"));
        link.classList.add("active-indicated");
    }

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            activeLink = link;
            moveIndicatorTo(link);
        });

        link.addEventListener("mouseenter", () => {
            moveIndicatorTo(link);
        });
    });

    moveIndicatorTo(activeLink);
});



// ==========================
// 3D Tilt Card Effect
// ==========================



const tiltCard = document.getElementById("tiltCard");
const image = tiltCard.querySelector(".about-image");
const info = tiltCard.querySelector(".profile-info");

tiltCard.addEventListener("mousemove", (e) => {
    const rect = tiltCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (centerY - y) / 8;
    const rotateY = (x - centerX) / 8;

    image.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    info.style.transform = `translateX(-50%) translateZ(40px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});
tiltCard.addEventListener("mouseleave", () => {
    image.style.transform = `rotateX(0deg) rotateY(0deg)`;
    info.style.transform = `translateX(-50%) translateZ(40px) rotateX(0deg) rotateY(0deg)`;
});



// ==========================
// FADE-IN ANIMATION ON SCROLL 
// ==========================



const elementsToFade = document.querySelectorAll(".fade-in-on-scroll");
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const target = entry.target;

        if (entry.isIntersecting) {
            if (target.classList.contains("about-info")) {
                target.classList.add("about-info--visible");
            } else if (target.classList.contains("image-tilt-wrapper")) {
                target.classList.add("image-tilt-wrapper--visible");
            }
        } else {
            if (target.classList.contains("about-info")) {
                target.classList.remove("about-info--visible");
            } else if (target.classList.contains("image-tilt-wrapper")) {
                target.classList.remove("image-tilt-wrapper--visible");
            }
        }
    });
}, {
    threshold: 0,
    rootMargin: "-50% 0px -50% 0px"
});

elementsToFade.forEach(el => {
    observer.observe(el);
});



// ==========================
// BLURRY TEXT ANIMATION
// ==========================



document.querySelectorAll('.blurry-text').forEach(h1 => {
    const text = h1.textContent.trim();
    h1.innerHTML = '';

    [...text].forEach((char, index) => {
        const span = document.createElement('span');
        span.innerHTML = char === ' ' ? '&nbsp;' : char;
        span.style.animation = 'blurryFadeDown 0.6s ease-out forwards';
        span.style.animationDelay = `${0.4 + index * 0.1}s`;
        h1.appendChild(span);
    });
});

const blurtext = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const intro = entry.target;
            const h2 = intro.querySelector('h2');
            const p = intro.querySelector('p');

            const h1Spans = intro.querySelectorAll('h1 span');
            h1Spans.forEach((span, index) => {
                span.style.animation = 'none';
                void span.offsetWidth;
                span.style.animation = 'blurryFadeDown 0.6s ease-out forwards';
                span.style.animationDelay = `${0.4 + index * 0.1}s`;
            });

            const h1TotalDelay = 0.4 + h1Spans.length * 0.1;

            h2.style.animation = 'none';
            void h2.offsetWidth;
            h2.style.animation = 'fadeUp 0.6s ease-out forwards';
            h2.style.animationDelay = `${h1TotalDelay + 0.2}s`;

            const h2TotalDelay = h1TotalDelay + 0.2 + 0.6;
            p.style.animation = 'none';
            void p.offsetWidth;
            p.style.animation = 'fadeUp 0.6s ease-out forwards';
            p.style.animationDelay = `${h2TotalDelay + 0.2}s`;
        }
    });
}, {
    threshold: 0.05
});

document.querySelectorAll('.intro-text').forEach(section => {
    blurtext.observe(section);
});



// ==========================
// CURSOR HALO
// ==========================



document.addEventListener("DOMContentLoaded", () => {
    const halo = document.querySelector('.cursor-halo');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollArrow = document.querySelector('.scroll-down-arrow');

    navLinks.forEach((link, index) => {
        link.style.animationDelay = `${0.5 + index * 0.1}s`;
    });

    document.addEventListener('mousemove', (e) => {
        halo.style.left = `${e.clientX}px`;
        halo.style.top = `${e.clientY}px`;
    });

    document.addEventListener('mouseenter', () => {
        halo.style.transform = 'translate(-50%, -50%) scale(1)';
    });

    document.addEventListener('mouseleave', () => {
        halo.style.transform = 'translate(-50%, -50%) scale(0)';
    });

    navbar.addEventListener('mouseenter', () => {
        halo.style.transform = 'translate(-50%, -50%) scale(0)';
    });

    navbar.addEventListener('mouseleave', () => {
        halo.style.transform = 'translate(-50%, -50%) scale(1)';
    });

    scrollArrow.addEventListener('mouseenter', () => {
        halo.style.transform = 'translate(-50%, -50%) scale(0)';
    });

    scrollArrow.addEventListener('mouseleave', () => {
        halo.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});



// ==========================
// FADE UP ANIMATON FOR APPS
// ==========================



document.addEventListener("DOMContentLoaded", () => {
    const appElements = document.querySelectorAll('.app-fade-up');

    appElements.forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.1}s`;
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const el = entry.target;

            if (entry.isIntersecting) {
                el.classList.add('visible');
            } else {
                el.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.05,
    });

    appElements.forEach(el => observer.observe(el));
});



// ==========================
// NAVIGATION BAR ICON HOVER EFFECT
// ==========================



document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".nav-link");
    let activeLink = null;

    const defaultActiveLink = document.querySelector('.nav-link[href="#header"]');
    if (defaultActiveLink) {
        const icon = defaultActiveLink.querySelector("img");
        const darkSrc = defaultActiveLink.getAttribute("data-dark");
        icon.src = darkSrc;
        activeLink = defaultActiveLink;
    }

    navLinks.forEach(link => {
        const icon = link.querySelector("img");
        const whiteSrc = link.getAttribute("data-white");
        const darkSrc = link.getAttribute("data-dark");

        link.addEventListener("mouseenter", () => {
            if (activeLink && activeLink !== link) {
                const prevIcon = activeLink.querySelector("img");
                const prevWhiteSrc = activeLink.getAttribute("data-white");
                prevIcon.src = prevWhiteSrc;
            }

            icon.src = darkSrc;
            activeLink = link;
        });
    });
});



// ==========================
// FLOATING GRADIENT BALL ANIMATION
// ==========================



document.addEventListener("DOMContentLoaded", () => {
    const ball = document.querySelector(".floating-gradient-ball");
    const header = document.getElementById("header");

    const headerRect = header.getBoundingClientRect();
    const maxX = headerRect.width - 200;
    const maxY = headerRect.height - 200;

    let pos = {
        x: Math.random() * maxX,
        y: Math.random() * maxY
    };

    let velocity = {
        x: 2.5,
        y: 1.5
    };

    function animate() {
        pos.x += velocity.x;
        pos.y += velocity.y;

        if (pos.x <= 0 || pos.x >= maxX) velocity.x *= -1;
        if (pos.y <= 0 || pos.y >= maxY) velocity.y *= -1;

        ball.style.left = `${pos.x}px`;
        ball.style.top = `${pos.y}px`;

        requestAnimationFrame(animate);
    }

    ball.style.left = `${pos.x}px`;
    ball.style.top = `${pos.y}px`;

    animate();
});




