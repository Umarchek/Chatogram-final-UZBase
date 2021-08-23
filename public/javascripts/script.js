const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
const navOverlay = document.querySelector(".nav-overlay");
const closeNav = document.querySelector(".close");

navToggle.addEventListener("click", () => {
    navShow();
})
closeNav.addEventListener("click", () => {
    hideNav();  
})

// hide nav after clicked outside of nav
navOverlay.addEventListener("click", (e) => {
    hideNav();
})

function navShow() {
    navOverlay.style.transition = "all 0.5s ease";
    navOverlay.classList.add("open");
    nav.style.transition = "all 0.3s ease 0.5s";
    nav.classList.add("open");
}

function hideNav() {
    nav.style.transition = "all 0.3s ease";
    nav.classList.remove("open");
    navOverlay.style.transition = "all 0.5s ease 0.3s";
    navOverlay.classList.remove("open");
}