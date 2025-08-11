// ==========================
// App Hover Info and Name Update
// ==========================



document.addEventListener("DOMContentLoaded", () => {
    const appName = document.getElementById("appName"),
        appDesc = document.getElementById("appDescription"),
        appInfo = document.querySelector(".app-info"),
        appsSection = document.getElementById("apps-section"),
        appWrappers = document.querySelectorAll(".app-wrapper.app-fade-up");
    let lastScrollY = window.scrollY;

    appInfo.classList.remove("hidden");

    document.querySelectorAll(".app").forEach(app => {
        app.addEventListener("mouseenter", () => {
            if (appName.textContent === app.dataset.name) return;
            [appName, appDesc].forEach(el => el.classList.add("fade-out"));
            setTimeout(() => {
                appName.textContent = app.dataset.name;
                appDesc.textContent = app.dataset.description;
                [appName, appDesc].forEach(el => {
                    el.classList.replace("fade-out", "fade-in");
                    setTimeout(() => el.classList.remove("fade-in"), 300);
                });
            }, 300);
        });
    });

    const resetApps = () => appWrappers.forEach(app => {
        Object.assign(app.style, { transition: 'none', opacity: '0', transform: 'translateY(40px)' });
        app.classList.remove("animate");
    });

    new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const scrollingDown = window.scrollY > lastScrollY;
            if (entry.intersectionRatio >= 0.4 && scrollingDown) {
                appWrappers.forEach((app, i) => {
                    app.style.transition = '';
                    app.style.animationDelay = `${i * 0.15}s`;
                    app.classList.add("animate");
                });
            } else if (!scrollingDown && entry.boundingClientRect.top > 350) {
                resetApps();
            }
            lastScrollY = window.scrollY;
        });
    }, { threshold: [0, 0.4, 1] }).observe(appsSection);

    resetApps();
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

    image.style.transform = `scale(1.1) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    info.style.transform = `translateX(-48%) translateZ(40px) scale(1.1) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

tiltCard.addEventListener("mouseleave", () => {
    image.style.transform = `scale(1) rotateX(0deg) rotateY(0deg)`;
    info.style.transform = `translateX(-50%) translateZ(40px) scale(1) rotateX(0deg) rotateY(0deg)`;
});




// ==========================
// FADE-IN ANIMATION ON SCROLL 
// ==========================



const aboutSection = document.querySelector("#about");
const isMobile = () => window.innerWidth <= 1024;
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (isMobile()) {
                document.querySelectorAll(".image-tilt-wrapper, .about-info")
                    .forEach(el => el.classList.add("fade-up--visible"));
            } else {
                document.querySelector(".image-tilt-wrapper").classList.add("image-tilt-wrapper--visible");
                document.querySelector(".about-info").classList.add("about-info--visible");
            }
        } else {
            if (isMobile()) {
                document.querySelectorAll(".image-tilt-wrapper, .about-info")
                    .forEach(el => el.classList.remove("fade-up--visible"));
            } else {
                document.querySelector(".image-tilt-wrapper").classList.remove("image-tilt-wrapper--visible");
                document.querySelector(".about-info").classList.remove("about-info--visible");
            }
        }
    });
}, {
    threshold: 0.3
});
aboutObserver.observe(aboutSection);

const skillsContainer = document.querySelector(".skills-container");
const pillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelectorAll(".skill-pill").forEach((pill, index) => {
                setTimeout(() => {
                    pill.classList.remove("skill-pill--hidden");
                    pill.classList.add("skill-pill--visible");
                }, index * 100);
            });
        } else {
            document.querySelectorAll(".skill-pill").forEach((pill, index) => {
                setTimeout(() => {
                    pill.classList.remove("skill-pill--visible");
                    pill.classList.add("skill-pill--hidden");
                }, index * 100);
            });
        }
    });
}, {
    threshold: 0.20,
    rootMargin: "-10% 0px -10% 0px"
});
pillsObserver.observe(skillsContainer);



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
    const logo = document.querySelector('.logo');
    const socials = document.querySelector('.social-links');

    let haloLocked = false;

    halo.style.transform = 'translate(-50%, -50%) scale(0)';

    navLinks.forEach((link, index) => {
        link.style.animationDelay = `${0.5 + index * 0.1}s`;
    });

    document.addEventListener('mousemove', (e) => {
        halo.style.left = `${e.clientX}px`;
        halo.style.top = `${e.clientY}px`;

        if (!haloLocked) {
            if (window.innerWidth - e.clientX <= 16) {
                halo.style.transform = 'translate(-50%, -50%) scale(0)';
            } else {
                halo.style.transform = 'translate(-50%, -50%) scale(1)';
            }
        }
    });

    document.addEventListener('mouseenter', () => {
        if (!haloLocked) halo.style.transform = 'translate(-50%, -50%) scale(1)';
    });

    document.addEventListener('mouseleave', () => {
        halo.style.transform = 'translate(-50%, -50%) scale(0)';
    });

    document.addEventListener('mouseenter', () => {
        if (!haloLocked) {
            halo.style.opacity = '1';
            halo.style.transform = 'translate(-50%, -50%) scale(1)';
        }
    });

    document.addEventListener('mouseleave', () => {
        halo.style.opacity = '0';
        halo.style.transform = 'translate(-50%, -50%) scale(0)';
    });

    const lockHideHalo = () => {
        haloLocked = true;
        halo.style.transform = 'translate(-50%, -50%) scale(0)';
    };

    const unlockShowHalo = () => {
        haloLocked = false;
        halo.style.transform = 'translate(-50%, -50%) scale(1)';
    };

    [navbar, scrollArrow, logo, socials].forEach(el => {
        el.addEventListener('mouseenter', lockHideHalo);
        el.addEventListener('mouseleave', unlockShowHalo);
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
        x: 1.5,
        y: 1
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




