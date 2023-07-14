// HTML Elements
let screens = document.getElementsByClassName("screen");
let strtBtn = document.getElementsByClassName("strt-btn")[0];
let canvas = document.getElementsByTagName("canvas")[0];

let ctx = canvas.getContext("2d");
let a, plankInfo, aspectRatio;

function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
}

resize();
window.addEventListener('resize', resize);

// removing intro screen
setTimeout(() => screenTransition(screens[0], screens[1]), /*3000*/1);

function screenTransition(screenR, screenE) {
      console.log(screenR, screenE);
      screenR.style.opacity = 0;
      screenE.classList.remove("hidden");
      screenE.style.opacity = 1;
      setTimeout(() => {
            screenR.classList.add("hidden");
            screenR.classList.remove("top");
            screenE.classList.add("top");
      }, 750);
}

strtBtn.addEventListener("click", () => screenTransition(screens[1], screens[2]));

let woodPlank = new Image();
woodPlank.src = './wood-plank-light.png';

function drawDecorations() {
      ctx.fillStyle = "#03A9F4";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#de993a";
      ctx.fillRect(canvas.width * 0.2, 0, canvas.width * 0.6, canvas.height);
      drawBridge();
}

function drawBridge() {
      aspectRatio = woodPlank.naturalWidth / woodPlank.naturalHeight;
      plankInfo = {
            height: canvas.height / 25,
            width: null,
            planksY: 25,
            planksX: [],
            ttlPlanks: null
      };
      plankInfo.width = aspectRatio * plankInfo.height;
      plankInfo.planksX[0] = Math.floor((canvas.width * 0.6) / plankInfo.width);
      plankInfo.planksX[1] = (((canvas.width * 0.6) / plankInfo.width) - Math.floor((canvas.width * 0.6) / plankInfo.width)) * plankInfo.width;
      plankInfo.ttlPlanks = (plankInfo.planksX[1] == 0 ? plankInfo.planksX[0] : plankInfo.planksX[0] + 1);
      for (let i = 0; i < plankInfo.planksY; i++) {
            for (let j = 0; j < plankInfo.ttlPlanks; j++) {
                  if (j == plankInfo.ttlPlanks - 1) {
                        ctx.drawImage(woodPlank,
                              0, 0, plankInfo.planksX[1] / plankInfo.width * woodPlank.naturalWidth, woodPlank.naturalHeight,
                              j * plankInfo.width + canvas.width * 0.2, i * plankInfo.height,
                              plankInfo.planksX[1], plankInfo.height);
                  } else {
                        ctx.drawImage(woodPlank, j * plankInfo.width + canvas.width * 0.2, i * plankInfo.height, plankInfo.width, plankInfo.height);
                  }
            }
      }
      ctx.fillStyle = "#282828";
      ctx.fillRect(canvas.width * 0.2, 0, 1, canvas.height);
      ctx.fillRect(canvas.width * 0.8, 0, 1, canvas.height);
}

function frameGenerator() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawDecorations();
      a = requestAnimationFrame(frameGenerator);
}

frameGenerator();