const scrollDownIconTop = document.querySelector("[data-scroll-down-icon-top]");
const scrollDownIconBottom = document.querySelector("[data-scroll-down-icon-bottom]");
const scrollDownText = document.querySelector("[data-scroll-down-text]");

let aboutTitleElement = document.querySelector("[data-about-title]");
let aboutTitleDistanceToTop = window.pageYOffset + aboutTitleElement.getBoundingClientRect().top;

let scrollTextElement = document.querySelector(".scroll-text");
let scrollTextDistanceToTop = window.pageYOffset + scrollTextElement.getBoundingClientRect().top;
let pxToScroll = aboutTitleDistanceToTop - scrollTextDistanceToTop;

window.addEventListener("resize", (e) => {
  aboutTitleDistanceToTop = window.pageYOffset + aboutTitleElement.getBoundingClientRect().top;
  scrollTextDistanceToTop = window.pageYOffset + scrollTextElement.getBoundingClientRect().top;
  pxToScroll = aboutTitleDistanceToTop - scrollTextDistanceToTop;
});

// TWO DIFFERENT METHODS FOR ANIMATING THE CAPSULE ON SCROLL

// 1) requestAnimationFrame
// function scrollCapsule() {
//   let scrollOffset = window.pageYOffset;
//   scrollDownIconTop.style.transform = `translateY(${scrollOffset}px) rotate(-45deg)`;
//   scrollDownText.style.opacity = -scrollOffset / 75 + 1;

//   if (scrollOffset >= pxToScroll) {
//     scrollDownIconTop.classList.add("visibility-hidden");
//     scrollDownIconBottom.classList.remove("visibility-hidden");
//   } else {
//     scrollDownIconTop.classList.remove("visibility-hidden");
//     scrollDownIconBottom.classList.add("visibility-hidden");
//   }
//   window.requestAnimationFrame(scrollCapsule);
// }
// window.requestAnimationFrame(scrollCapsule);

// 2) scroll addEventListener
window.addEventListener("scroll", (e) => {
  let scrollOffset = window.pageYOffset;
  scrollDownIconTop.style.transform = `translateY(${scrollOffset}px) rotate(-45deg)`;
  scrollDownText.style.opacity = -scrollOffset / 75 + 1;

  if (scrollOffset >= pxToScroll) {
    scrollDownIconTop.classList.add("visibility-hidden");
    scrollDownIconBottom.classList.remove("visibility-hidden");
  } else {
    scrollDownIconTop.classList.remove("visibility-hidden");
    scrollDownIconBottom.classList.add("visibility-hidden");
  }
});

const backToTopIcons = [...document.querySelectorAll("[data-back-to-top-icon]")];
backToTopIcons.forEach((icon) => {
  icon.addEventListener("click", (e) => {
    window.scroll({ top: 0, behavior: "smooth" });
  });
});

const projects = document.querySelectorAll(".project-container");
const sectionTitles = document.querySelectorAll(".section-title");
const contactForm = document.querySelector(".contact-form");

const observerOptions = {
  threshold: 0.1,
};

const infiniteObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    entry.target.classList.toggle("show", entry.isIntersecting);
  });
}, observerOptions);

[...sectionTitles].forEach((title) => {
  infiniteObserver.observe(title);
});

// [...projects].forEach((project) => {
//   infiniteObserver.observe(project);
// });

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    entry.target.classList.toggle("show", entry.isIntersecting);
    if (entry.isIntersecting) observer.unobserve(entry.target);
  });
}, observerOptions);

observer.observe(contactForm);
[...projects].forEach((project) => {
  observer.observe(project);
});

const copyEmailElement = document.querySelector("[data-copy-email]");

copyEmailElement.addEventListener("click", (e) => {
  e.preventDefault();
  copyEmailToClipboard();
  changeTooltipColor();
});

copyEmailElement.addEventListener("mouseover", (e) => {
  copyEmailElement.dataset.tooltip = "click to copy email address";
});

function copyEmailToClipboard() {
  const emailAddress = "nmfretz@gmail.com";
  navigator.clipboard.writeText(emailAddress);
  copyEmailElement.dataset.tooltip = `'${emailAddress}' copied to clipboard`;
}

function changeTooltipColor() {
  const rootElement = document.querySelector(":root");
  rootElement.style.setProperty("--tooltip-color", "#999");
  setTimeout(() => {
    rootElement.style.setProperty("--tooltip-color", "#333");
  }, 150);
}
