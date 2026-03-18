const canvas = document.getElementById("gameCanvas");

const ctx = canvas.getContext("2d");

const tileSize = 50;
const sidebarWidth = 150;
const infoWidth = 250; //högere sidogrej 


canvas.width=1920
canvas.height=1000

const rows = canvas.height / tileSize;
const cols = canvas.width / tileSize;

const img = document.getElementById('gameImage');
const w1 = document.getElementById('w1');
const w2 = document.getElementById('w2');
const w3 = document.getElementById('w3');
const w4 = document.getElementById('w4');
const enemyImg = document.getElementById('enemyImg');

const defaultRounds = {
  "rounds": [
    {
      "enemies": [
        { "speed": 0.015, "health": 10, "cashValue": 10, "count": 5 },
        { "speed": 0.02, "health": 15, "cashValue": 15, "count": 3 }
      ]
    },
    {
      "enemies": [
        { "speed": 0.02, "health": 20, "cashValue": 20, "count": 4 },
        { "speed": 0.01, "health": 5, "cashValue": 5, "count": 10 }
      ]
    },
    {
      "enemies": [
        { "speed": 0.025, "health": 30, "cashValue": 30, "count": 6 },
        { "speed": 0.015, "health": 12, "cashValue": 12, "count": 8 }
      ]
    },
    {
      "enemies": [
        { "speed": 0.03, "health": 40, "cashValue": 40, "count": 5 },
        { "speed": 0.02, "health": 20, "cashValue": 20, "count": 10 }
      ]
    },
    {
      "enemies": [
        { "speed": 0.035, "health": 50, "cashValue": 50, "count": 7 },
        { "speed": 0.025, "health": 25, "cashValue": 25, "count": 12 }
      ]
    },
    {
      "enemies": [
        { "speed": 0.04, "health": 80, "cashValue": 80, "count": 10 },
        { "speed": 0.03, "health": 60, "cashValue": 60, "count": 15 }
      ]
    },
    {
      "enemies": [
        { "speed": 0.1, "health": 10, "cashValue": 80, "count": 3 },
        { "speed": 0.2, "health": 40, "cashValue": 60, "count": 5 }
      ]
    }
  ]
}

const attackIndicators = [];
const enemies = [];
const grid = [
    ['d','d','d','d',  'd','rdc','g','g' ,'g' ,'g',  'g','g',  'g','g',  'g','g',  'g','g','g','g','g','g','g','g'],
    ['p','p','p','p',  'p','r',  'g','w4','w3','g',  'g','g',  'x','x',  'g','g',  'g','g','g','g','g','g','g','g'],
    ['u','u','u','luc','p','ruc','d','w2','w1','d',  'd','rdc','x','x',  'g','g',  'g','g','g','g','g','g','g','g'],
    ['g','g','g','l',  'p','p',  'p','p' ,'p' ,'p',  'p','r',  'g','g',  'g','g',  'g','g','g','g','g','g','g','g'],
    ['g','g','g','ldc','u','u',  'u','u' ,'u' ,'luc','p','r',  'g','g',  'g','g',  'g','g','g','g','g','g','g','g'],
    ['g','g','g','g',  'g','g',  'g','g' ,'g' ,'l',  'p','ruc','d','d',  'd','rdc','g','g','g','g','g','g','g','g'],
    ['g','g','g','g',  'g','g',  'g','g' ,'g' ,'l',  'p','p',  'p','p',  'p','r',  'g','g','g','g','g','g','g','g'],
    ['g','g','g','g',  'g','g',  'g','g' ,'g' ,'ldc','u','u',  'u','luc','p','r',  'g','g','g','g','g','g','g','g'],
    ['g','g','g','g',  'g','g',  'g','g' ,'g' ,'g',  'g','g',  'g','l',  'p','r',  'g','g','g','g','g','g','g','g'],
    ['g','g','g','g',  'g','g',  'g','g' ,'g' ,'g',  'g','g',  'g','l',  'p','ruc','d','d','d','d','d','d','d','d'],
    ['g','g','g','g',  'g','g',  'g','g' ,'g' ,'g',  'g','g',  'g','l',  'p','p',  'p','p','p','p','p','p','p','p'],
    ['g','g','g','g',  'g','g',  'g','g' ,'g' ,'g',  'g','g',  'g','ldc','u','u',  'u','u','u','u','u','u','u','u'],
    ['g','g','g','g',  'g','g',  'g','g' ,'g' ,'g',  'g','g',  'g','g',  'g','g',  'g','g','g','g','g','g','g','g'],
    ['g','g','g','g',  'g','g',  'g','g' ,'g' ,'g',  'g','g',  'g','g',  'g','g',  'g','g','g','g','g','g','g','g']
];

//liten for i in range för att fienderna ska veta vart dom ska
const pathTiles = [];
for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
        if (grid[r][c] === 'p') pathTiles.push({x: c, y: r});
    }
}
function drawMapImmage(img,x,y,c,r) {
    ctx.drawImage(img, x, y, 16, 16, c*tileSize + sidebarWidth, r*tileSize, tileSize, tileSize);
}


function drawGrid(){
    for(let r=0;r<grid.length;r++){
        for(let c=0;c<grid[r].length;c++){
            const tile = grid[r][c];
            if(tile === 'p') {
                drawMapImmage(img,80,0, c, r)
            } else if (tile === 'g') {
                drawMapImmage(img,192,32, c, r)
            } else if (tile === 'u') {
                drawMapImmage(img,128,16, c, r)
            } else if (tile === 'l') {
                drawMapImmage(img,112,32, c, r)
            } else if (tile === 'luc') {
                drawMapImmage(img,32,0, c, r)
            } else if (tile === 'ldc') {
                drawMapImmage(img,48,32, c, r)
            } else if (tile === 'd') {
                drawMapImmage(img,144, 32, c, r)
            } else if (tile === 'rdc') {
                drawMapImmage(img,144, 16, c, r)
            } else if (tile === 'ruc') {
                drawMapImmage(img,0, 32, c, r)
            } else if (tile === 'r') {
                drawMapImmage(img,160, 16, c, r)
            } else if (tile === 'w1') {
                drawMapImmage(w1,0, 0, c, r)
            } else if (tile === 'w2') {
                drawMapImmage(w2,0, 0, c, r)
            } else if (tile === 'w3') {
                drawMapImmage(w3,0, 0, c, r)
            } else if (tile === 'w4') {
                drawMapImmage(w4,0, 0, c, r)
            } else if (tile === 'x') {
                drawMapImmage(img,192,32, c, r)
                drawMapImmage(img,160,0, c, r)
            }
        }
    }
}

class Enemy {
    constructor(speed = 0.01, health = 10, cashValue = 10) {
        this.x = pathTiles[0].x;
        this.y = pathTiles[0].y;
        this.size = tileSize / 2;
        this.speed = speed;
        this.pathIndex = 0;
        this.health = health;
        this.maxHealth = health;
        this.cashValue = cashValue;
        //special efekter 
        this.freezeEnd = 0;
        this.slowEnd = 0;
        this.slowFactor = 1;
        //lite för animation
        this.animationFrame = 0;
        this.animationCounter = 0;
        this.resetAnimationCounter = false
        this.deathAnimation = false
    }

    getDirection() {
    if (this.pathIndex >= pathTiles.length - 1) return null; //om fienden är vid slutet
    const target = pathTiles[this.pathIndex + 1];
    const dx = target.x - this.x;
    const dy = target.y - this.y;
    
    if (dy == 0) {
        return 'right'
    }else if (dx == 0) {
        return 'down'
    }
    }

    update() {
        const now = Date.now();
        //skippar rörelse om frusen
        if (now < this.freezeEnd) return;
        const target = pathTiles[this.pathIndex + 1];
        const dx = target.x - this.x;
        const dy = target.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let moveSpeed = this.speed;
        if (now < this.slowEnd) {
            moveSpeed *= this.slowFactor
        }
        //så att fiender inte fassnar 
        if (dist < moveSpeed) {
            this.x = target.x;
            this.y = target.y;
            this.pathIndex++;
        } else {
            this.x += (dx / dist) * moveSpeed;
            this.y += (dy / dist) * moveSpeed;
        }
    }
    draw(ctx, direction) {
        if (Date.now() < this.freezeEnd) {
            ctx.fillStyle = 'cyan';
        }
        let animationSpeed = 0

        if (this.health <= 0) {
            animationSpeed = 20
        } else {
            animationSpeed = 10/this.slowFactor;
        }

        const imgFrames = 4;
        const destX = this.x * tileSize + sidebarWidth;
        const destY = this.y * tileSize;

        const now = Date.now();

        if (now >= this.freezeEnd|| this.freezeEnd == 0) {
            this.animationCounter++;
            if (this.animationCounter >= animationSpeed) {
                if (this.health <= 0) {
                    if (this.animationFrame < 4) {
                        this.animationFrame++;
                    }
                } else {
                    this.animationFrame = (this.animationFrame + 1) % imgFrames;
                }
                this.animationCounter = 0;
            }
        }        

        let Y = 0;

        if (this.health <= 0) {
            if (this.resetAnimationCounter == false) {
                this.animationFrame = 0
            }
            
            this.resetAnimationCounter = true
            ctx.drawImage(enemyImg, 640 + 32 * this.animationFrame, 32*this.animationFrame, 32, 32, destX, destY, tileSize, tileSize);
            if (this.animationFrame == 4) {
                this.deathAnimation = true
            }

            
        }else {
            //if (direction === 'left' ) srcY = 192;  
            if (direction === 'right') Y = 64;
            //else if (direction === 'up' ) srcY = 128;  
            else if (direction === 'down') Y = 0;

            ctx.drawImage(enemyImg, 32 * this.animationFrame, Y, 32, 32, destX, destY, tileSize, tileSize);
        }

        // health bar
        if (this.health > 0) {
            const barWidth = tileSize;
            const barHeight = 5;
            const barX = this.x * tileSize + sidebarWidth;
            const barY = this.y * tileSize - 10;
            ctx.fillStyle = 'green';
            ctx.fillRect(barX, barY, barWidth * (this.health / this.maxHealth), barHeight);
        }
    }
}

class Tower {
    constructor(name, x, y, range, singleTarget, color, damage, attackSpeed, effect=null){
        this.name = name;
        this.x = x;
        this.y = y;
        this.range = range;
        this.singleTarget = singleTarget;
        this.color = color;
        this.damage = damage;
        this.attackSpeed = attackSpeed;
        this.effect = effect;
        this.lastAttack = 0;
        if (effect === 'freeze') {
            this.freezeDuration = 200; //tiden i ms som fienderna fryer i
        }
        if (effect === 'time') {
            this.slowFactor = 0.5; 
        }
        this.upgrade1Level = 0;
        this.upgrade2Level = 0;
        this.upgrade1FlashTime = 0;
        this.upgrade2FlashTime = 0;
    }
    draw(ctx, selected=false){
        
        //hittade inte gubbar till karaktererna :(
        //if (this.name === 'Time Slow') {
        //}

        ctx.fillStyle = this.color;
        ctx.fillRect(this.x*tileSize + sidebarWidth + 10, this.y*tileSize + 10, tileSize-20, tileSize-20);
        if(selected){
            ctx.strokeStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x*tileSize + sidebarWidth + tileSize/2, this.y*tileSize + tileSize/2, this.range*tileSize, 0, Math.PI*2);
            ctx.stroke();
        }
    }
}


        
function alphaDecay(alpha, timer, maxTimer) {
    if (maxTimer <= 0) {
        return 0
    }
    return alpha * (timer / maxTimer);
}


class AttackIndicator {
    constructor(x, y, radius, color, alpha) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.alpha = alpha;
        this.timer = 50;
        this.maxTimer = 50;
    }
    update() {
        this.timer--;
        if (this.timer <= 0) {
            attackIndicators.splice(attackIndicators.indexOf(this), 1);
        }
    }
    draw(ctx, fill) {

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

        if (fill) {
            ctx.globalAlpha = alphaDecay(0.1, this.timer, this.maxTimer);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        ctx.globalAlpha = alphaDecay(this.alpha, this.timer, this.maxTimer);
        ctx.strokeStyle = this.color;
        ctx.stroke();

        ctx.globalAlpha = 1;
    }
}



const placeSound = new Audio('audio/sound_place.wav');
placeSound.volume = 0.5;

document.addEventListener('DOMContentLoaded', function() {
    //ljud engiene
    var audio = new Audio('audio/background_music.mp3');
    audio.loop = true;
    audio.volume = 0.5;

    //spela ljud knapp
    var playButton = document.getElementById('myButton');
    if (playButton) {
        playButton.addEventListener('click', function() {
            audio.play();
        });
    }

    //volym slider
    var volumeSlider = document.getElementById('volumeSlider');
    if (volumeSlider) {
        volumeSlider.addEventListener('input', function() {
            audio.volume = this.value; //updaterar ljud 
        });
    }
});

//sidobar gubbar
const sidebarTowers = [
    {name:'Sniper', color:'yellow', range:24, damage:7, attackSpeed:1, single:true, cost:100},
    {name:'Music Man', color:'purple', range:4, damage:3, attackSpeed:2, single:false, cost:50},
    {name:'Lunch Lady', color:'orange', range:2, damage:1, attackSpeed:3, single:true, cost:10},
    {name:'Freeze Tower', color:'lightblue', range:2, damage:1, attackSpeed:1, single:false, cost:120, effect:'freeze'},
    {name:'Time Slow', color:'cyan', range:2.5, damage:0, attackSpeed:0.5, single:false, cost:130, effect:'time'},
];

//svårighetsgrad
const difficulties = [
    {name:'Sandbox', lives:9999, costMultiplier:0},
    {name:'Easy', lives:150, costMultiplier:0.8},
    {name:'Normal', lives:100, costMultiplier:1},
    {name:'Hard', lives:50, costMultiplier:1.2},
    {name:'Super Hard', lives:1, costMultiplier:1.4},
];

const towers = [];
let draggingTower = null;
let dragOffsetX = 0;
let dragOffsetY = 0;
let selectedTower = null;
let lastMouseX = 0;
let lastMouseY = 0;

function upgradeCost(amt) {
    return Math.floor(Math.ceil(amt * costMultiplier) / 5) * 5;
}

function applyUpgrade1(tower) {
    const cost = upgradeCost(50);
    if (tower.upgrade1Level < 5 && cash >= cost) {
        cash -= cost;
        tower.upgrade1Level++;
        tower.upgrade1FlashTime = Date.now();
        if (tower.name === 'Freeze Tower') {
            tower.freezeDuration += 20;
        } else if (tower.name === 'Time Slow') {
            tower.range += 0.5;
        } else {
            tower.damage += 1;
        }
    }
}
function applyUpgrade2(tower) {
    const cost = upgradeCost(50);
    if (tower.upgrade2Level < 5 && cash >= cost) {
        cash -= cost;
        tower.upgrade2Level++;
        tower.upgrade2FlashTime = Date.now();
        if (tower.name === 'Freeze Tower') {
            tower.attackSpeed = Math.round((tower.attackSpeed + 0.2) * 100) / 100;
        } else if (tower.name === 'Time Slow') {
            tower.slowFactor = Math.max(0.1, tower.slowFactor - 0.05);
        } else {
            tower.attackSpeed = Math.round((tower.attackSpeed + 0.2) * 100) / 100;
        }
    }
}

//kollar om kordinat är okej för att placera 
function isValidPlacement(gx, gy, tower) {
    if (gx < 0 || gx >= grid[0].length || gy < 0 || gy >= grid.length) {
        return false
    }
    
    if (towers.some(t => t.x === gx && t.y === gy)) return false;
    const tile = grid[gy][gx];
    return (tower.name === 'Freeze Tower' && tile === 'w1' || tile === 'w2' || tile === 'w3' || tile === 'w4') ||
           (tower.name === 'Sniper' && tile === 'x') ||
           (tower.name !== 'Freeze Tower' && (tile === 'g' || tile === 'u' || tile === 'l' || tile === 'luc' || tile === 'ldc' || tile === 'd' || tile === 'rdc' || tile === 'ruc' || tile === 'r' ));
}

//konverterar musposition till sant/falskt
function canPlaceAtPixel(px, py) {
    const gx = Math.floor((px - sidebarWidth) / tileSize);
    const gy = Math.floor(py / tileSize);
    return isValidPlacement(gx, gy, draggingTower);
}

let gameState = 'menu';
let selectedDifficulty = null;
let costMultiplier = 1.0;
let lives = 20;
let cash = 200;

canvas.addEventListener('mousedown', e => {
    const mx = e.offsetX;
    const my = e.offsetY;


    if (gameState === 'menu') {
        difficulties.forEach((diff, idx) => {
            const buttonX = canvas.width / 2 - 150;
            const buttonY = 300 + idx * 80;
            const buttonWidth = 300;
            const buttonHeight = 60;
            if (mx >= buttonX && mx <= buttonX + buttonWidth && my >= buttonY && my <= buttonY + buttonHeight) {
                startGame(idx);
            }
        });
        return;
    }
    
    if (gameState === 'gameOver' || gameState === 'gameWon') {
        gameState = 'menu';
        return;
    }

    //drar in torn
    if (mx < sidebarWidth) {
        const index = Math.floor(my / 100);
        if (sidebarTowers[index]) {
            //gör kostnad till närmaste 5 
            const cost = Math.floor(Math.ceil(sidebarTowers[index].cost * costMultiplier) / 5) * 5;
            if (cash >= cost) {
                draggingTower = {...sidebarTowers[index], cost: cost};
                dragOffsetX = 25;
                dragOffsetY = 25;
                draggingTower.pixelX = mx - dragOffsetX;
                draggingTower.pixelY = my - dragOffsetY;
            }
        }
        return;
    }

    //för att selecta eller avselecta torn
    if (mx >= sidebarWidth && mx <= canvas.width - infoWidth) {
        const gx = Math.floor((mx - sidebarWidth) / tileSize);
        const gy = Math.floor(my / tileSize);
        selectedTower = towers.find(t => t.x === gx && t.y === gy) || null;
        return;
    }

    if (selectedTower) {
        //upgradering nr 1
        if (my >= 180 && my <= 200) {
            applyUpgrade1(selectedTower);
            return;
        }
        //upgradering nr 2
        if (my >= 200 && my <= 230) {
            applyUpgrade2(selectedTower);
            return;
        }
    }
});

canvas.addEventListener('mousemove', e => {
    lastMouseX = e.offsetX;
    lastMouseY = e.offsetY;
    if (draggingTower) {
        draggingTower.pixelX = e.offsetX - dragOffsetX;
        draggingTower.pixelY = e.offsetY - dragOffsetY;
    }
});

canvas.addEventListener('mouseup', e => {
    if (draggingTower) {
        const gx = Math.floor((e.offsetX - sidebarWidth) / tileSize);
        const gy = Math.floor(e.offsetY / tileSize);
        if (isValidPlacement(gx, gy, draggingTower)) {
            towers.push(new Tower(
                draggingTower.name,
                gx,
                gy,
                draggingTower.range,
                draggingTower.single,
                draggingTower.color,
                draggingTower.damage,
                draggingTower.attackSpeed,
                draggingTower.effect
            ));
            cash -= draggingTower.cost;

            placeSound.currentTime = 0; 
            placeSound.play();
        }
        draggingTower = null;
    }
});

function drawSidebar(){
    ctx.fillStyle = '#333';
    ctx.fillRect(0,0,sidebarWidth,canvas.height);
    ctx.textAlign = 'center';
    sidebarTowers.forEach((t,i)=>{
        const cost = Math.floor(Math.ceil(t.cost * costMultiplier) / 5) * 5;
        //för varje tower väljer färg och index för att radda upp dom
        ctx.fillStyle = t.color;
        const iconX = sidebarWidth / 2 - 25;
        ctx.fillRect(iconX, i*100 + 10, 50, 50);
        ctx.fillStyle = '#fff';
        ctx.font = '16px Arial';
        ctx.fillText(t.name, sidebarWidth / 2, i*100 + 80);
        ctx.font = '12px Arial';
        ctx.fillText(`$${cost}`, sidebarWidth / 2, i*100 + 90);
        ctx.font = '16px Arial';
    });
    //annars så kommer all annan text vara i mitten
    ctx.textAlign = 'left';
}

function upgradeName(upgrade1, upgrade2, cost, color1, color2){
    let txt1 = `+ ${upgrade1} (${selectedTower.upgrade1Level>=5?'MAX':`$${cost}`})`;
    let txt2 = `+ ${upgrade2} (${selectedTower.upgrade2Level>=5?'MAX':`$${cost}`})`;
    ctx.fillStyle = color1;
    ctx.fillText(txt1, canvas.width - infoWidth + 20, 195);
    ctx.fillStyle = color2;
    ctx.fillText(txt2, canvas.width - infoWidth + 20, 215);
}

function drawInfoSidebar(){
    ctx.fillStyle='#222';
    ctx.fillRect(canvas.width - infoWidth, 0, infoWidth, canvas.height);
    ctx.fillStyle='#fff';
    ctx.fillText(`Round: ${currentRound + 1}/${rounds.length}`, canvas.width - infoWidth + 20, 35);
    ctx.fillText(`Lives: ${lives}`, canvas.width - infoWidth + 20, 60);
    ctx.fillText(`Cash: $${cash}`, canvas.width - infoWidth + 20, 90);
    if (waitingForNextRound) {
        ctx.fillStyle = '#ff0';
        ctx.fillText('PAUSED', canvas.width - infoWidth + 20, 120);
        ctx.fillText('space to continue', canvas.width - infoWidth + 20, 135);
        ctx.fillStyle = '#fff';
    }
    if(selectedTower){
        ctx.fillText('Press DEL to remove', canvas.width - infoWidth + 20, 300);
        ctx.fillText('Upgrades:', canvas.width - infoWidth + 20, 175);
        const cost = upgradeCost(50);
        const canAfford = cash >= cost;
        const now = Date.now();
        const getColor = (level, flashTime) => {
            if (level >= 5) return '#555'; //grå när max lvl
            if (flashTime && now - flashTime < 150) return 'gold';
            if (canAfford) return 'green';
            return '#fff';
        };
                
        if (selectedTower.name === 'Time Slow') {
            upgradeName('Big Sight', 'Slower enemies', cost, getColor(selectedTower.upgrade1Level, selectedTower.upgrade1FlashTime), getColor(selectedTower.upgrade2Level, selectedTower.upgrade2FlashTime))
        } 

        else if (selectedTower.name === 'Freeze Tower') {
            upgradeName('Longer Freeze', 'Attack Speed', cost, getColor(selectedTower.upgrade1Level, selectedTower.upgrade1FlashTime), getColor(selectedTower.upgrade2Level, selectedTower.upgrade2FlashTime))
        } 

        else {
            upgradeName('Attack Speed', 'Damage', cost, getColor(selectedTower.upgrade1Level, selectedTower.upgrade1FlashTime), getColor(selectedTower.upgrade2Level, selectedTower.upgrade2FlashTime))
        }

        ctx.fillStyle = '#fff';
    }
}
 


function drawEnemy(){
    enemies.forEach(enemy => enemy.draw(ctx, enemy.getDirection()));
}

function updateEnemy(){
    enemies.forEach((enemy, index) => {
        enemy.update();
        if (enemy.pathIndex >= pathTiles.length - 1) {
            lives--;
            //tar bort fiende från listan 
            enemies.splice(index, 1);
        }
        //spelar animation och sen ger pengar
        if (enemy.health <= 0) {
            if (enemy.deathAnimation) {
                cash += enemy.cashValue;
                enemies.splice(index, 1);
            }

        }
    });
}

function drawTowers(){
    towers.forEach(t=>t.draw(ctx, t===selectedTower));
    if(draggingTower){
        const valid = canPlaceAtPixel(draggingTower.pixelX + dragOffsetX, draggingTower.pixelY + dragOffsetY);
        ctx.fillStyle = valid ? draggingTower.color : 'red';
        ctx.globalAlpha = 0.7;

        const centerX = draggingTower.pixelX + dragOffsetX - 10;
        const centerY = draggingTower.pixelY + dragOffsetY - 10;

        ctx.beginPath();
        ctx.strokeStyle = ctx.fillStyle;
        ctx.lineWidth = 2;
        ctx.arc(centerX, centerY, draggingTower.range * tileSize, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillRect(draggingTower.pixelX , draggingTower.pixelY, tileSize-20, tileSize-20);
        ctx.globalAlpha = 1.0;
    }
}

function updateTowers() {
    towers.forEach(tower => {
        //attackspeed är attak per sec medans resten är i ms så man måste konvertera det
        if (Date.now() - tower.lastAttack > 1000 / tower.attackSpeed) {
            const px = tower.x * tileSize + sidebarWidth + tileSize / 2;
            const py = tower.y * tileSize + tileSize / 2;

            const targets = [];
            let singleTarget = null;
            let furthestAlongPath = -1;

            enemies.forEach(enemy => {
                const ex = enemy.x * tileSize + sidebarWidth + tileSize / 2;
                const ey = enemy.y * tileSize + tileSize / 2;
                const dist = Math.sqrt((ex - px) ** 2 + (ey - py) ** 2);
                //kollar om fiende är i tornets range
                if (dist <= tower.range * tileSize && enemy.health > 0) {
                    targets.push(enemy);
                    if (tower.singleTarget) {
                        //uppdaterar furthestalingpath för varje enemy i range, den längstbort är vlir targeten
                        if (enemy.pathIndex > furthestAlongPath) {
                            singleTarget = enemy;
                            furthestAlongPath = enemy.pathIndex;
                        }
                    }
                }
            });

            //lägger på efekter
            if (tower.effect === 'freeze' && targets.length) {
                targets.forEach(e => e.freezeEnd = Date.now() + tower.freezeDuration);
            }
            if (tower.effect === 'time' && targets.length) {
                targets.forEach(e => {
                    e.slowEnd = Date.now() + 2000;
                    e.slowFactor = tower.slowFactor;
                });
            }

            //koden som "gör" skada
            if (!tower.effect) {
                if (tower.singleTarget && singleTarget) {
                    singleTarget.health -= tower.damage;
                } else if (!tower.singleTarget && targets.length) {
                    targets.forEach(e => e.health -= tower.damage);
                }
            }
            if (targets.length && !tower.singleTarget) {
                let indicatorColor = tower.color;
                attackIndicators.push(
                    new AttackIndicator(px, py, tower.range * tileSize, indicatorColor, 0.2)
                );
            }

            if (singleTarget || targets.length) {
                tower.lastAttack = Date.now();
            }
        }
    });
}

function updateAttackIndicators() {
    attackIndicators.forEach(a => a.update());
}

function drawAttackIndicators() {
    attackIndicators.forEach(a => a.draw(ctx, true));
}

let waveTimer = 0;
let waveDelay = 60; //frames mellan spawns
let waitingForNextRound = false; //paus mellan rundor

let rounds = defaultRounds.rounds;
let currentRound = 0;
let roundSpawns = [];
let spawnIndex = 0;

function loadRounds() {
    rounds = defaultRounds.rounds ;
    if (gameState === 'playing' && rounds.length) {
        setupRound(0);
    }
    return rounds;
}
function setupRound(idx) {
    currentRound = idx;
    roundSpawns = [];
    spawnIndex = 0;
    const sheet = rounds[idx];
    sheet.enemies.forEach(e => {
        for (let i = 0; i < e.count; i++) {
            roundSpawns.push({speed: e.speed, health: e.health, cashValue: e.cashValue});
        }
    });
}

function spawnEnemy() {
    if (spawnIndex < roundSpawns.length) {
        const e = roundSpawns[spawnIndex];
        enemies.push(new Enemy(e.speed, e.health, e.cashValue));
    }
}

function startGame(difficultyIndex) {
    selectedDifficulty = difficulties[difficultyIndex];
    costMultiplier = selectedDifficulty.costMultiplier;
    lives = selectedDifficulty.lives;
    gameState = 'playing';
    towers.length = 0;
    enemies.length = 0;
    attackIndicators.length = 0;
    selectedTower = null;
    draggingTower = null;
    //så att rundan inte startar op e
    waitingForNextRound = true;
    loadRounds();

}

function drawMenu() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#fff';
    ctx.font = '48px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('SELECT DIFFICULTY', canvas.width / 2, 100);
    
    ctx.font = '32px Arial';
    difficulties.forEach((diff, i) => {
        const buttonX = canvas.width / 2 - 150;
        const buttonY = 300 + i * 80;
        const buttonWidth = 300;
        const buttonHeight = 60;
        
        ctx.fillStyle = '#444';
        ctx.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.strokeRect(buttonX, buttonY, buttonWidth, buttonHeight);
        
        ctx.fillStyle = '#fff';
        ctx.fillText(diff.name, canvas.width / 2, buttonY + 42);
    });
    ctx.textAlign = 'left';
}

function gameLoop(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    if (gameState === 'menu') {
        drawMenu();
        requestAnimationFrame(gameLoop);
        return;
    }
    
    if (gameState === 'gameOver' || gameState === 'gameWon') {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#fff';
        ctx.font = '48px Arial';
        ctx.textAlign = 'center';
        if (gameState === 'gameOver') {
            ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);
        } else {
            ctx.fillText('YOU WIN!', canvas.width / 2, canvas.height / 2);
        }
        ctx.fillText('Click to Return to Menu', canvas.width / 2, canvas.height / 2 + 100);
        ctx.textAlign = 'left';
        requestAnimationFrame(gameLoop);
        return;
    }

    drawGrid();
    
    //spawnar nästa runda
    if (!waitingForNextRound) {
        waveTimer++;
        if (waveTimer >= waveDelay) {
            if (spawnIndex < roundSpawns.length) {
                spawnEnemy();
                spawnIndex++;
            }
            waveTimer = 0;
        }
    }
    


    updateEnemy();
    if (!waitingForNextRound && spawnIndex >= roundSpawns.length && enemies.length === 0) {
        if (currentRound < rounds.length - 1) {
            waitingForNextRound = true;
        } else {
            gameState = 'gameWon';
        }
    }
    updateTowers();
    updateAttackIndicators();
    drawEnemy();
    drawTowers();
    drawAttackIndicators();
    drawInfoSidebar();
    drawSidebar();

    if (lives <= 0) {
        gameState = 'gameOver';
    }
    
    requestAnimationFrame(gameLoop);
}

const klirr = new Audio('audio/klirr.mp3');
klirr.volume = 0.5;

function sellTower(price) {
    cash += Math.floor(price*0.5*costMultiplier);
}

document.addEventListener('keydown', e => {
    if (e.code === 'Space' && waitingForNextRound) {
        waitingForNextRound = false;
        setupRound(currentRound + 1);
    }
    if ((e.code === 'Delete') && selectedTower) {
        klirr.play();
        const index = towers.indexOf(selectedTower);
        if (index !== -1) {
            if (towers[index].name === 'Sniper') {
                sellTower(100);
            } else if (towers[index].name === 'Freeze Tower') {
                sellTower(120);
            } else if (towers[index].name === 'Time Slow') {
                sellTower(130);
            } else if (towers[index].name === 'Lunch Lady') {
                sellTower(10);
            } else if (towers[index].name === 'Music Man') {
                sellTower(50);
            }


            towers.splice(index, 1)
            selectedTower = null
        }
    }
});

gameLoop();