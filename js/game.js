let canvas = document.getElementsByTagName("canvas")[0];

let ctx = canvas.getContext("2d");
let pauseAnimation, plankInfo, levelMap;

function resize(event = true) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (event) {
            console.log("event");
      }
};

resize(false);
window.addEventListener('resize', resize);

// decoration and game
let woodPlank = new Image();
woodPlank.src = './imgs/wood-plank-light.png';

let tree = new Image();
tree.src = "./imgs/trees.png";

function drawDecorations() {
      ctx.fillStyle = "#2E7D32";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drawTrees();
      drawBridge();
};

function drawTrees() {
      let treeInfo = {
            aspectRatio: tree.naturalHeight / tree.naturalWidth,
            width: 400,
            height: null,
            treeX: null,
            treeY: null
      };
      treeInfo.height = treeInfo.width * treeInfo.aspectRatio;
      treeInfo.treeX = Math.ceil(canvas.width / treeInfo.width);
      treeInfo.treeY = Math.ceil(canvas.height / treeInfo.height);
      for (let i = 0; i < treeInfo.treeY; i++) {
            for (let j = 0; j < treeInfo.treeX; j++) ctx.drawImage(tree, treeInfo.width * j, treeInfo.height * i, treeInfo.width, treeInfo.height);
      }
};

function drawBridge() {
      if (canvas.width >= canvas.height) {
            plankInfo = {
                  aspectRatio: woodPlank.naturalWidth / woodPlank.naturalHeight,
                  height: canvas.height / 25,
                  width: null,
                  planksY: 25,
                  planksX: [],
                  ttlPlanks: null,
                  fullWidth: canvas.width * 0.6,
                  fullHeight: canvas.height
            };
            plankInfo.width = plankInfo.aspectRatio * plankInfo.height;
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
            ctx.fillRect(canvas.width * 0.2, 0, 2, canvas.height);
            ctx.fillRect(canvas.width * 0.8, 0, 2, canvas.height);
      } else {
            plankInfo = {
                  aspectRatio: woodPlank.naturalHeight / woodPlank.naturalWidth,
                  height: null,
                  width: canvas.width / 5,
                  planksY: [],
                  planksX: 5,
                  ttlPlanks: null,
                  fullWidth: canvas.width,
                  fullHeight: canvas.height * 0.8
            };
            plankInfo.height = plankInfo.aspectRatio * plankInfo.width;
            plankInfo.planksY[0] = Math.floor((canvas.height * 0.8) / plankInfo.height);
            plankInfo.planksY[1] = (((canvas.height * 0.8) / plankInfo.height) - Math.floor((canvas.height * 0.8) / plankInfo.height)) * plankInfo.height;
            plankInfo.ttlPlanks = (plankInfo.planksY[1] == 0 ? plankInfo.planksY[0] : plankInfo.planksY[0] + 1);
            for (let i = 0; i < plankInfo.ttlPlanks; i++) {
                  for (let j = 0; j < plankInfo.planksX; j++) {
                        if (i == plankInfo.ttlPlanks - 1) {
                              ctx.drawImage(woodPlank,
                                    0, 0, woodPlank.naturalWidth, plankInfo.planksY[1] / plankInfo.height * woodPlank.naturalHeight,
                                    j * plankInfo.width, i * plankInfo.height + canvas.height * 0.1,
                                    plankInfo.width, plankInfo.planksY[1]);
                        } else {
                              ctx.drawImage(woodPlank, j * plankInfo.width, i * plankInfo.height + canvas.height * 0.1, plankInfo.width, plankInfo.height);
                        }
                  }
            }
            ctx.fillStyle = "#282828";
            ctx.fillRect(0, canvas.height * 0.1, canvas.width, 2);
            ctx.fillRect(0, canvas.height * 0.9, canvas.width, 2);
      }
};

let refrenceImg = [
      {
            name: "air",
            path: null
      },
      {
            name: "log",
            path: "wood-log"
      },
      {
            name: "spawn",
            path: null
      },
      {
            name: "finish",
            path: null
      }
];

for (let i = 0; i < refrenceImg.length; i++) {
      if (refrenceImg[i].path != null) {
            refrenceImg[i].img = new Image();
            refrenceImg[i].img.src = `imgs/${refrenceImg[i].path}.png`;
      }
}

class Map {
      constructor(map) {
            this.map = map.map;
            this.size = null;
            this.calcAdd = [0, 0];
      }

      sizeCalculator() {
            let widthRatio = plankInfo.fullWidth / this.map[0].length;
            let heightRatio = plankInfo.fullHeight / this.map.length;
            widthRatio < heightRatio ? this.size = widthRatio : this.size = heightRatio;
            if (plankInfo.fullWidth > plankInfo.fullHeight) {
                  this.calcAdd[1] = canvas.height * 0.1;
                  this.calcAdd[1] += (canvas.height * 0.8 - this.size * this.map.length) / 2;
                  this.calcAdd[0] = (canvas.width - this.size * this.map[0].length) / 2;
            } else {
                  this.calcAdd[0] = canvas.width * 0.2;
                  this.calcAdd[0] += (canvas.width * 0.6 - this.size * this.map[0].length) / 2;
                  this.calcAdd[1] = (canvas.height - this.size * this.map.length) / 2;
            }
      }

      drawLog(i, j) {
            let aspectRatio = refrenceImg[this.map[i][j]].img.naturalHeight / refrenceImg[this.map[i][j]].img.naturalWidth;
            ctx.drawImage(refrenceImg[this.map[i][j]].img, j * this.size + this.calcAdd[0], i * this.size + this.calcAdd[1], this.size, this.size * aspectRatio);
      }

      drawMap() {
            this.sizeCalculator();
            for (let i = 0; i < this.map.length; i++) {
                  for (let j = 0; j < this.map[0].length; j++) {
                        if (refrenceImg[this.map[i][j]].path != null) {
                              this.drawLog(i, j);
                        }
                  }
            }
      }
};

class Player {
      constructor(x, y, map) {
            this.x = x;
            this.y = y;
            this.map = map;
      }
}

function frameGenerator() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawDecorations();
      levelMap.drawMap();
      pauseAnimation = requestAnimationFrame(frameGenerator);
};

function startGame() {
      lvlURL = "./levels/level";
      if (level <= 10) {
            lvlURL += "1-10.js";
      }

      let lvlNum = level % 10 - 1;
      lvlNum < 0 ? lvlNum = 9 : null;
      import(lvlURL).then(({ default: MapsSeries }) => {
            let mapSeries = new MapsSeries();
            levelMap = new Map(mapSeries.maps[lvlNum]);
            frameGenerator();
      });
}