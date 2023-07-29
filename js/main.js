// HTML Elements
let screens = document.getElementsByClassName("screen");
let strtBtn = document.getElementsByClassName("strt-btn")[0];
let level = 1, lvlURL;

// removing intro screen
setTimeout(() => screenTransition(screens[0], screens[1]), /*3000*/1);

function screenTransition(screenR, screenE) {
      screenR.style.opacity = 0;
      screenE.classList.remove("hidden");
      screenE.style.opacity = 1;
      setTimeout(() => {
            screenR.classList.add("hidden");
            screenR.classList.remove("top");
            screenE.classList.add("top");
      }, 750);
}

strtBtn.addEventListener("click", () => {
      screenTransition(screens[1], screens[2]);
      startGame();
});