const PX_TO_REM = 16;
const SCROLL_ICON_END_REM = 24; // final top of scrollDownIcon in rem

const scrollDownIcon = document.querySelector("[data-scroll-down-icon]");
const scrollDownText = document.querySelector("[data-scroll-down-text]");

window.addEventListener("scroll", (e) => {
  let scrollOffset = window.pageYOffset;

  if (scrollOffset >= SCROLL_ICON_END_REM * PX_TO_REM) {
    scrollDownIcon.style.top = "0rem"; //stops movement
  } else {
    scrollDownIcon.style.transform = `translateY(${scrollOffset / PX_TO_REM}rem)`;
  }

  scrollDownText.style.opacity = -scrollOffset / 75 + 1;
});
