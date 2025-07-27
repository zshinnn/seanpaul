// ==========================
// App Hover Info and Name Update
// ==========================

const appName = document.getElementById("appName");
const appDesc = document.getElementById("appDescription");

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



// ==========================
// Navbar Hover Indicator and Active Tracker Hover
// ==========================



document.addEventListener("DOMContentLoaded", () => {
    const hoverIndicator = document.querySelector(".hover-indicator");
    const navLinks = document.querySelectorAll(".nav-link");
    const navbar = document.querySelector(".navbar-container");

    let activeLink = document.querySelector('.nav-link[href="#header"]'); // default to Home

    function moveIndicatorTo(link) {
        const linkRect = link.getBoundingClientRect();
        const navbarRect = navbar.getBoundingClientRect();
        const left = linkRect.left - navbarRect.left;
        const width = linkRect.width;

        hoverIndicator.style.left = `${left}px`;
        hoverIndicator.style.width = `${width}px`;
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

    navbar.addEventListener("mouseleave", () => {
        if (activeLink) moveIndicatorTo(activeLink);
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



const h1 = document.querySelector('.blurry-text');
const text = h1.textContent;
h1.innerHTML = text
    .split('')
    .map(char => `<span>${char}</span>`)
    .join('');

document.querySelectorAll('.blurry-text').forEach(h1 => {
    const text = h1.textContent;
    h1.innerHTML = text
        .split('')
        .map(char => `<span>${char === ' ' ? '&nbsp;' : char}</span>`)
        .join('');
});

const blurtext = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const intro = entry.target;
            const h2 = intro.querySelector('h2');
            const h1Spans = intro.querySelectorAll('h1 span');
            const p = intro.querySelector('p');

            h1Spans.forEach((span, index) => {
                span.style.animation = 'none';
                void span.offsetWidth;
                span.style.animation = `blurryFadeDown 0.6s ease-out forwards`;
                span.style.animationDelay = `${0.4 + index * 0.1}s`;
            });

            const h1TotalDelay = 0.4 + h1Spans.length * 0.1;
            h2.style.animation = 'none';
            void h2.offsetWidth;
            h2.style.animation = 'fadeUp 0.6s ease-out forwards';
            h2.style.animationDelay = `${h1TotalDelay + 0.2}s`;

            // Wait for h2 to finish before p
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
