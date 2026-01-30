//vars
const variables = {
    links: {
        instagram: "https://www.instagram.com/solomid1s/",
        github: "https://github.com/GeorgeS377",
    },
    texts: {
        copyright: "©Σολωμίδης Γιώργος 2025-2026",
    }
};

const instagram = document.getElementById("instagram")
const github = document.getElementById("github")
const copyright = document.getElementById("copyright")
const license = document.getElementById("license")

if (instagram) instagram.href = variables.links.instagram;
if (github) github.href = variables.links.github;
if (copyright) copyright.textContent = variables.texts.copyright;


//mobile navbar 2.0
const navBarToggle = document.querySelector(".nav-toggle");
const navbarMenu = document.querySelector(".nav-links");

function handleOutsideClose(e) {
    if (!navbarMenu.classList.contains("active")) return;
    if (navbarMenu.contains(e.target) || navBarToggle.contains(e.target)) return;

    navBarToggle.classList.remove("active");
    navbarMenu.classList.remove("active");
}

navBarToggle.addEventListener("click", () => {
    navBarToggle.classList.toggle("active");
    navbarMenu.classList.toggle("active");
});

document.addEventListener("click", handleOutsideClose, true);
document.addEventListener("pointerdown", handleOutsideClose, true);


//navbar
const nav = document.querySelector("nav");

function updateNavbar() {
    if (window.scrollY > 10) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }
}

updateNavbar();

window.addEventListener("scroll", updateNavbar);


//game text
const hoverText = document.getElementById("game-text");

if (hoverText) {
    const idleTexts = [
        "free, fovever",
        "SOLOMIDIS.GR"
    ];

    let isHovering = false;
    let lastIdleIndex = -1;
    let idleTimer = null;

    function pickRandomIdleText() {
        if (idleTexts.length === 0) return "";

        if (idleTexts.length === 1) return idleTexts[0];

        let i;
        do {
            i = Math.floor(Math.random() * idleTexts.length);
        } while (i === lastIdleIndex);

        lastIdleIndex = i;
        return idleTexts[i];
    }

    function startIdleLoop() {
        hoverText.textContent = pickRandomIdleText();

        idleTimer = setInterval(() => {
            if (isHovering) return;
            hoverText.textContent = pickRandomIdleText();
        }, 3000); //change every x000 seconds
    }

    document.querySelectorAll(".ngen-btn").forEach(btn => {
        const img = btn.querySelector("img[alt]");
        if (!img) return;

        btn.addEventListener("mouseenter", () => {
            isHovering = true;
            hoverText.textContent = img.alt;
        });

        btn.addEventListener("mouseleave", () => {
            isHovering = false;
            hoverText.textContent = pickRandomIdleText();
        });
    });

    startIdleLoop();
}