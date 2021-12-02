const PX_TO_REM = 16;
const SCROLL_ICON_END_REM = 36; // position of scrollDownIconBottom in rem

const scrollDownIconTop = document.querySelector("[data-scroll-down-icon-top]");
const scrollDownIconBottom = document.querySelector("[data-scroll-down-icon-bottom]");
const scrollDownText = document.querySelector("[data-scroll-down-text]");

window.addEventListener("scroll", (e) => {
  let scrollOffset = window.pageYOffset;
  scrollDownIconTop.style.transform = `translateY(${scrollOffset / PX_TO_REM}rem)`;
  scrollDownText.style.opacity = -scrollOffset / 75 + 1;

  if (scrollOffset >= SCROLL_ICON_END_REM * PX_TO_REM) {
    scrollDownIconTop.classList.add("scroll-down-img-invisible");
    scrollDownIconBottom.classList.remove("scroll-down-img-invisible");
  } else {
    scrollDownIconTop.classList.remove("scroll-down-img-invisible");
    scrollDownIconBottom.classList.add("scroll-down-img-invisible");
  }
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
