// APP HOVER INFO AND APP NAME CHANGE APPS SECTION




document.addEventListener("DOMContentLoaded", () => {
    const appName = document.getElementById("appName"),
        appDesc = document.getElementById("appDescription"),
        appInfo = document.querySelector(".app-info");

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
});




// NAVBAR HOVER EFFECT HEADER




document.addEventListener("DOMContentLoaded", () => {
    const hoverIndicator = document.querySelector(".hover-indicator");
    const navLinks = document.querySelectorAll(".nav-link");
    const navbar = document.querySelector(".navbar-container");
    const sections = document.querySelectorAll("section");

    let activeLink = document.querySelector('.nav-link[href="#header"]');
    let isHovering = false;
    let hoveredLink = null;

    function moveIndicatorTo(link) {
        const { left, width } = link.getBoundingClientRect();
        const navbarLeft = navbar.getBoundingClientRect().left;

        hoverIndicator.style.left = `${left - navbarLeft}px`;
        hoverIndicator.style.width = `${width}px`;
    }

    // Hover effects
    navLinks.forEach(link => {
        link.addEventListener("mouseenter", () => {
            isHovering = true;
            hoveredLink = link;
            moveIndicatorTo(link);
        });

        link.addEventListener("mouseleave", () => {
            isHovering = false;
            hoveredLink = null;
            moveIndicatorTo(activeLink);
        });

        link.addEventListener("click", (e) => {
            e.preventDefault();
            activeLink.classList.remove("active-indicated");
            link.classList.add("active-indicated");
            activeLink = link;
            moveIndicatorTo(link);

            const targetSection = document.querySelector(link.getAttribute("href"));
            targetSection.scrollIntoView({ behavior: "smooth" });
        });
    });

    window.addEventListener("scroll", () => {
        if (isHovering) return;

        let currentSection = sections[0];
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop <= window.innerHeight / 2) {
                currentSection = section;
            }
        });

        const newActiveLink = document.querySelector(`.nav-link[href="#${currentSection.id}"]`);
        if (newActiveLink !== activeLink) {
            activeLink.classList.remove("active-indicated");
            newActiveLink.classList.add("active-indicated");
            activeLink = newActiveLink;
            moveIndicatorTo(activeLink);
        }
    });

    activeLink.classList.add("active-indicated");
    moveIndicatorTo(activeLink);
});





// 3D TILT CARD EFFECT ABOUT SECTION




const tiltCard = document.getElementById("tiltCard");
if (tiltCard) {
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
        info.style.transform = `translateX(-50%) scale(1.05) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    tiltCard.addEventListener("mouseleave", () => {
        image.style.transform = `scale(1) rotateX(0) rotateY(0)`;
        info.style.transform = `translateX(-50%) scale(1) rotateX(0) rotateY(0)`;
    });
}




// FADE-IN ANIMATION ON SCROLL ABOUT SECTION




const aboutSection = document.querySelector("#about");
const aboutTitle = document.querySelector(".about-title");
const aboutUnderline = document.querySelector(".about-underline");
const aboutText = document.querySelector(".about-text");
const imageTiltWrapper = document.querySelector(".image-tilt-wrapper");
const skillPills = document.querySelectorAll(".skill-pill");

const isMobile = () => window.innerWidth <= 1024;

let lastscrollTop = 0;
let hasAnimateds = false;
let underlineTimeout;
let textTimeout;
let skillTimeouts = [];

const resetAbout = () => {
    clearTimeout(underlineTimeout);
    clearTimeout(textTimeout);
    skillTimeouts.forEach(t => clearTimeout(t));
    skillTimeouts = [];

    imageTiltWrapper.classList.remove("image-tilt-wrapper--visible");
    aboutTitle.classList.remove("about-title--visible");
    aboutUnderline.classList.remove("about-underline--visible");
    aboutText.classList.remove("about-text--visible");
    skillPills.forEach(el => el.classList.remove("fade-up--visible"));
};

const runAboutAnimation = () => {
    imageTiltWrapper.classList.add("image-tilt-wrapper--visible");
    aboutTitle.classList.add("about-title--visible");

    underlineTimeout = setTimeout(() => {
        aboutUnderline.classList.add("about-underline--visible");
    }, 300);

    textTimeout = setTimeout(() => {
        aboutText.classList.add("about-text--visible");
    }, 500);

    skillPills.forEach((el, i) => {
        const timeout = setTimeout(() => {
            el.classList.add("fade-up--visible");
        }, 800 + i * 150);
        skillTimeouts.push(timeout);
    });
};

const animateAbout = () => {
    const rect = aboutSection.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollingDown = scrollTop > lastscrollTop;

    if (!hasAnimateds && rect.top < window.innerHeight * 0.8 && scrollingDown) {
        if (isMobile()) {
            document.querySelectorAll(".image-tilt-wrapper, .about-info, .about-title, .about-underline, .about-text, .skill-pill")
                .forEach(el => el.classList.add("fade-up--visible"));
        } else {
            resetAbout();
            runAboutAnimation();
        }
        hasAnimateds = true;
    }

    // Reset only if fully exits viewport from above while scrolling up
    if (hasAnimateds && rect.top > window.innerHeight && !scrollingDown) {
        resetAbout();
        hasAnimateds = false;
    }

    lastscrollTop = scrollTop <= 0 ? 0 : scrollTop;
};

window.addEventListener("scroll", animateAbout);
window.addEventListener("load", animateAbout);





// BLURRY TEXT ANIMATION




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




// SERVICES SECTION FADE IN ANIMATION




const servicesSection = document.querySelector("#services");
const serviceItems = document.querySelectorAll(".service-item");
let hasPlayed = false;

function animateServicesAll() {
    serviceItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add("show");
        }, index * 200);
    });
}

function resetServices() {
    serviceItems.forEach(item => item.classList.remove("show"));
}

if (window.innerWidth > 768) {
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasPlayed) {
                animateServicesAll();
                hasPlayed = true;
            } else if (!entry.isIntersecting && entry.boundingClientRect.top > 0) {
                resetServices();
                hasPlayed = false;
            }
        });
    }, { threshold: 0.3 });

    sectionObserver.observe(servicesSection);

} else {
    const itemObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            } else if (entry.boundingClientRect.top > 0) {
                entry.target.classList.remove("show");
            }
        });
    }, { threshold: 0.3 });

    serviceItems.forEach(item => itemObserver.observe(item));
}




// APPS SECTION FADE IN ANIMATION




document.addEventListener("DOMContentLoaded", () => {
    const apps = document.querySelectorAll('.app-wrapper');
    const appsSection = document.getElementById('apps-section');

    let lastScrollTop = 0;
    let hasAnimated = false;

    const threshold = 0.4; 

    const animateApps = () => {
        const rect = appsSection.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollingDown = scrollTop > lastScrollTop;

        if (!hasAnimated && rect.top < window.innerHeight * threshold && scrollingDown) {
            apps.forEach((app, index) => {
                app.style.transitionDelay = `${index * 0.15}s`;
                app.classList.add('visible');
            });
            hasAnimated = true;
        }

        if (hasAnimated && rect.top > window.innerHeight && !scrollingDown) {
            apps.forEach(app => {
                app.style.transitionDelay = '0s';
                app.classList.remove('visible');
            });
            hasAnimated = false;
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener('scroll', animateApps);
    window.addEventListener('load', animateApps);
});




// FADE IN ANIMATION FOR SERVICES HEADER




const header = document.querySelector('.services-header h2');
const underline = document.querySelector('.services-underline');

let lastScrollTops = 0;

function checkScroll() {
    const triggerPoint = window.innerHeight * 1;
    const headerTop = header.getBoundingClientRect().top;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (headerTop < triggerPoint && scrollTop > lastScrollTops) {
        header.classList.add('active');
        underline.classList.add('active');
    } else if (headerTop > triggerPoint) {
        header.classList.remove('active');
        underline.classList.remove('active');
    }

    lastScrollTops = scrollTop <= 0 ? 0 : scrollTop;
}

window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll);




// TOGGLE BUTTON AND ON-SCROLL FOR VIDEOS AND IMAGES




const toggleOptions = document.querySelectorAll(".toggle-option");
const toggleIndicator = document.querySelector(".toggle-indicator");
const galleries = {
    images: document.getElementById("images-gallery"),
    videos: document.getElementById("videos-gallery"),
    uiux: document.getElementById("uiux-gallery")
};
const galleryWrapper = document.querySelector(".gallery-wrapper");

function waitForImages(gallery, callback) {
    const images = gallery.querySelectorAll("img");
    let loadedCount = 0;
    if (images.length === 0) return callback();
    images.forEach(img => {
        if (img.complete) {
            loadedCount++;
        } else {
            img.addEventListener("load", () => {
                loadedCount++;
                if (loadedCount === images.length) callback();
            });
        }
    });
    if (loadedCount === images.length) callback();
}

function adjustWrapperHeight(gallery, instant = false) {
    const height = gallery.scrollHeight + "px";
    if (instant) {
        galleryWrapper.style.transition = "none";
        galleryWrapper.style.height = height;
        requestAnimationFrame(() => {
            galleryWrapper.style.transition = "height 0.6s ease";
        });
    } else {
        galleryWrapper.style.height = height;
    }
}

window.addEventListener("load", () => {
    const gallery = galleries.images;
    gallery.classList.add("gallery-active");
    applyDiagonalAnimation(gallery, true);
    waitForImages(gallery, () => {
        adjustWrapperHeight(gallery, true);
    });
});

window.addEventListener("resize", () => {
    const activeGallery = document.querySelector(".gallery-active");
    if (activeGallery) {
        waitForImages(activeGallery, () => {
            adjustWrapperHeight(activeGallery, true);
        });
    }
});

function switchGallery(target) {
    const newGallery = galleries[target];
    const oldGallery = document.querySelector(".gallery-active");
    if (oldGallery === newGallery) return;

    const index = target === "images" ? 0 : target === "videos" ? 1 : 2;
    toggleIndicator.style.transform = `translateX(${index * 100}%)`;

    toggleOptions.forEach(opt =>
        opt.classList.toggle("active", opt.dataset.target === target)
    );

    resetDiagonalAnimation(newGallery);

    newGallery.classList.add("gallery-active");
    newGallery.style.opacity = "0";

    void newGallery.offsetWidth;
    newGallery.style.opacity = "1";

    oldGallery.classList.remove("gallery-active");
    oldGallery.classList.add("fading-out");
    oldGallery.addEventListener("transitionend", () => {
        oldGallery.classList.remove("fading-out");
        oldGallery.style.opacity = "";
    }, { once: true });

    waitForImages(newGallery, () => {
        adjustWrapperHeight(newGallery);

        const items = newGallery.querySelectorAll(".gallery-item, .uiux-card");
        items.forEach(item => observer.observe(item));
    });
}

toggleOptions.forEach(option =>
    option.addEventListener("click", () => switchGallery(option.dataset.target))
);

document.addEventListener("DOMContentLoaded", () => {
    const galleriesList = document.querySelectorAll(".image-gallery");

    galleriesList.forEach(gallery => {
        applyDiagonalAnimation(gallery, true);

        const items = gallery.querySelectorAll(".gallery-item, .uiux-card");

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                } else {
                    if (entry.boundingClientRect.top > 0) {
                        entry.target.classList.remove("show");
                    }
                }
            });
        }, { threshold: 0.2 });

        items.forEach(item => observer.observe(item));
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const animatedTitles = document.querySelectorAll(".apps-title, .hire-title, .hire-text, .hire-btn");

    let lastScrollY = window.scrollY;

    const titleObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const scrollingDown = window.scrollY > lastScrollY;
            lastScrollY = window.scrollY;

            if (entry.isIntersecting && scrollingDown) {
                entry.target.classList.remove("animate");
                void entry.target.offsetWidth;
                entry.target.classList.add("animate");
            }

            if (!entry.isIntersecting && !scrollingDown && entry.boundingClientRect.top > 0) {
                entry.target.classList.remove("animate");
            }
        });
    }, { threshold: 0.3 });

    animatedTitles.forEach(title => titleObserver.observe(title));

    animatedTitles.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.remove("animate");
            void el.offsetWidth;
            el.classList.add("animate");
        }
    });
});

function applyDiagonalAnimation(gallery, initial = false) {
    const items = gallery.querySelectorAll(".gallery-item, .uiux-card");
    const columns = getColumnCount();

    items.forEach((item, index) => {
        const column = index % columns;
        item.classList.remove("fade-left", "fade-center", "fade-right");

        if (columns === 1) {
            item.classList.add("fade-center");
        } else if (columns === 2) {
            if (column === 0) item.classList.add("fade-left");
            else item.classList.add("fade-right");
        } else {
            if (column === 0) item.classList.add("fade-left");
            else if (column === 1) item.classList.add("fade-center");
            else item.classList.add("fade-right");
        }

        if (!initial) {
            item.classList.remove("show");
        }
    });
}

function resetDiagonalAnimation(gallery) {
    const items = gallery.querySelectorAll(".gallery-item, .uiux-card");
    const columns = getColumnCount();

    items.forEach((item, index) => {
        const column = index % columns;
        item.classList.remove("fade-left", "fade-center", "fade-right", "show");

        if (columns === 1) {
            item.classList.add("fade-center");
        } else if (columns === 2) {
            if (column === 0) item.classList.add("fade-left");
            else item.classList.add("fade-right");
        } else {
            if (column === 0) item.classList.add("fade-left");
            else if (column === 1) item.classList.add("fade-center");
            else item.classList.add("fade-right");
        }
    });
}

function getColumnCount() {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 900) return 2;
    return 3;
}




// BOUNCING BALL ANIMATION




const speedMultiplier = 3;
let animations = [];

function createBouncingBall(ball, dx, dy) {
    let x = Math.random() * (window.innerWidth - 200);
    let y = Math.random() * (window.innerHeight - 200);

    dx *= speedMultiplier;
    dy *= speedMultiplier;

    function animate() {
        if (window.innerWidth <= 768) return;

        x += dx;
        y += dy;

        if (x <= 0 || x >= window.innerWidth - 200) dx *= -1;
        if (y <= 0 || y >= window.innerHeight - 200) dy *= -1;

        ball.style.transform = `translate(${x}px, ${y}px)`;

        requestAnimationFrame(animate);
    }
    animate();
}

function startAnimations() {
    if (window.innerWidth > 768 && animations.length === 0) {
        animations.push(createBouncingBall(document.getElementById("ball1"), 0.7, 0.5));
        animations.push(createBouncingBall(document.getElementById("ball2"), -0.5, 0.6));
    }
}

function stopAnimations() {
    if (window.innerWidth <= 768) {
        animations = [];
        const ball1 = document.getElementById("ball1");
        const ball2 = document.getElementById("ball2");
        ball1.style.transform = "none";
        ball2.style.transform = "none";
    }
}

if (window.innerWidth > 768) {
    startAnimations();
} else {
    stopAnimations();
}

window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
        startAnimations();
    } else {
        stopAnimations();
    }
});




// CONTACT SECTION FADE UP




document.addEventListener("DOMContentLoaded", () => {
    const fadeElements = document.querySelectorAll(".fade-ups");
    let lastScrollY = window.scrollY;

    const observer = new IntersectionObserver(entries => {
        entries.forEach((entry, index) => {
            const scrollingDown = window.scrollY > lastScrollY;

            if (entry.isIntersecting && scrollingDown) {
                setTimeout(() => {
                    entry.target.classList.add("animate");
                }, index * 150);
            }

            if (!entry.isIntersecting && !scrollingDown) {
                entry.target.classList.remove("animate");
            }
        });

        lastScrollY = window.scrollY;
    }, { threshold: 0.4 });

    fadeElements.forEach(el => observer.observe(el));

    fadeElements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            setTimeout(() => {
                el.classList.add("animate");
            }, index * 150);
        }
    });
});




// PORTFOLIO HEADER POP UP




const portfolioHeader = document.querySelector('.portfolio-header h2');
const portfolioUnderline = document.querySelector('.portfolio-underline');
const segmentedToggle = document.querySelector('.segmented-toggle');

let lastScrollTop = 0;
let hasAnimated = false;

function animatePortfolioHeader() {
    const headerRect = portfolioHeader.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollingDown = scrollTop > lastScrollTop;

    if (!hasAnimated && headerRect.top < window.innerHeight * 0.8 && scrollingDown) {
        portfolioHeader.classList.add('active');
        portfolioUnderline.classList.add('active');
        segmentedToggle.classList.add('active');
        hasAnimated = true;
    }

    if (hasAnimated && headerRect.top > window.innerHeight && !scrollingDown) {
        portfolioHeader.classList.remove('active');
        portfolioUnderline.classList.remove('active');
        segmentedToggle.classList.remove('active');
        hasAnimated = false;
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}

window.addEventListener('scroll', animatePortfolioHeader);
window.addEventListener('load', animatePortfolioHeader);


