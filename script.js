const PX_TO_REM = 16;
const SCROLL_ICON_END_REM = 32.5; // final top of scrollDownIcon in rem

const scrollDownIcon = document.querySelector("[data-scroll-down-icon]");
const scrollDownText = document.querySelector("[data-scroll-down-text]");

window.addEventListener("load", () => {
  console.log("loaded");
});

window.addEventListener("scroll", (e) => {
  let scrollOffset = window.pageYOffset;

  if (scrollOffset >= SCROLL_ICON_END_REM * PX_TO_REM) {
    scrollDownIcon.style.top = "0rem"; //stops movement
  } else {
    scrollDownIcon.style.transform = `translateY(${scrollOffset / PX_TO_REM}rem)`;
  }

  scrollDownText.style.opacity = -scrollOffset / 75 + 1;
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
