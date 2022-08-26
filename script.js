const PX_TO_REM = 16;
const SCROLL_ICON_END_REM = 36; // position of scrollDownIconBottom in rem

const scrollDownIconTop = document.querySelector("[data-scroll-down-icon-top]");
const scrollDownIconBottom = document.querySelector("[data-scroll-down-icon-bottom]");
const scrollDownText = document.querySelector("[data-scroll-down-text]");

// TWO DIFFERENT METHODS FOR ANIMATING THE CAPSULE ON SCROLL
// 1) requestAnimationFrame
function scrollCapsule() {
  let scrollOffset = window.pageYOffset;
  scrollDownIconTop.style.transform = `translateY(${scrollOffset / PX_TO_REM}rem)`;
  scrollDownText.style.opacity = -scrollOffset / 75 + 1;

  if (scrollOffset >= SCROLL_ICON_END_REM * PX_TO_REM) {
    scrollDownIconTop.classList.add("visibility-hidden");
    scrollDownIconBottom.classList.remove("visibility-hidden");
  } else {
    scrollDownIconTop.classList.remove("visibility-hidden");
    scrollDownIconBottom.classList.add("visibility-hidden");
  }
  window.requestAnimationFrame(scrollCapsule);
}
window.requestAnimationFrame(scrollCapsule);

const backToTopIcons = [...document.querySelectorAll("[data-back-to-top-icon]")];
backToTopIcons.forEach((icon) => {
  icon.addEventListener("click", (e) => {
    window.scroll({ top: 0, behavior: "smooth" });
  });
});

// backToTopIcon.addEventListener("click", (e) => {
//   window.scroll({ top: 0, behavior: "smooth" });
// });

// 2) scroll addEventListener
// window.addEventListener("scroll", (e) => {
//   let scrollOffset = window.pageYOffset;
//   scrollDownIconTop.style.transform = `translateY(${scrollOffset / PX_TO_REM}rem)`;
//   scrollDownText.style.opacity = -scrollOffset / 75 + 1;

//   if (scrollOffset >= SCROLL_ICON_END_REM * PX_TO_REM) {
//     scrollDownIconTop.classList.add("visibility-hidden");
//     scrollDownIconBottom.classList.remove("visibility-hidden");
//   } else {
//     scrollDownIconTop.classList.remove("visibility-hidden");
//     scrollDownIconBottom.classList.add("visibility-hidden");
//   }
// });

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
