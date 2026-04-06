import { input } from './ex3input.js';

const moves = input.split('');

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gridSize = 10;

ctx.strokeStyle = 'white';
const santaColor = 'rgba(255, 0, 0, 0.5)';
const roboColor = 'rgba(255, 25, 200, 0.5)';
const housesWithPresentsColor = 'rgba(255, 255, 255, 0.75)';

let santaPos = { x: 0, y: 0 };
let roboPos = { x: 0, y: 0 };

function drawGrid() {
    for (let i = 0; i < canvas.width; i += gridSize) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
        ctx.closePath();
    }

    for (let i = 0; i < canvas.height; i += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
        ctx.closePath();
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw() {
    clearCanvas();
    drawGrid();
    requestAnimationFrame(draw);
}

draw();

export function exercise3vis() {
    let xPositionSanta = 0;
    let yPositionSanta = 0;
    let santaDrawPosX =
        xPositionSanta * gridSize + canvas.width / 2 - gridSize / 2;
    let santaDrawPosY =
        yPositionSanta * gridSize + canvas.height / 2 - gridSize / 2;
    ctx.fillStyle = santaColor;
    ctx.fillRect(santaDrawPosX, santaDrawPosY, gridSize, gridSize);
    let xPositionRobo = 0;
    let yPositionRobo = 0;
    let roboDrawPosX =
        xPositionRobo * gridSize + canvas.width / 2 - gridSize / 2;
    let roboDrawPosY =
        yPositionRobo * gridSize + canvas.height / 2 - gridSize / 2;
    ctx.fillStyle = roboColor;
    ctx.fillRect(roboDrawPosX, roboDrawPosY, gridSize, gridSize);

    let housesWithPresents = new Set();
    housesWithPresents.add(`${xPositionSanta}${yPositionSanta}`);

    for (const house of housesWithPresents) {
        let housePosX =
            Number(house[0]) * gridSize + canvas.width / 2 - gridSize / 2;
        let housePosY =
            Number(house[1]) * gridSize + canvas.height / 2 - gridSize / 2;
        ctx.fillStyle = housesWithPresentsColor;
        ctx.fillRect(housePosX, housePosY, gridSize, gridSize);
    }

    for (let i = 1; i < moves.length; i += 2) {
        switch (moves[i]) {
            case '^':
                yPositionSanta += 1;
                break;
            case 'v':
                yPositionSanta -= 1;
                break;
            case '<':
                xPositionSanta -= 1;
                break;
            case '>':
                xPositionSanta += 1;
                break;
            default:
                throw new Error("We shouldn't be here");
        }

        housesWithPresents.add(`${xPositionSanta}${yPositionSanta}`);

        for (const house of housesWithPresents) {
            let housePosX =
                Number(house[0]) * gridSize + canvas.width / 2 - gridSize / 2;
            let housePosY =
                Number(house[1]) * gridSize + canvas.height / 2 - gridSize / 2;
            ctx.fillStyle = housesWithPresentsColor;
            ctx.fillRect(housePosX, housePosY, gridSize, gridSize);
        }

        santaDrawPosX =
            xPositionSanta * gridSize + canvas.width / 2 - gridSize / 2;
        santaDrawPosY =
            yPositionSanta * gridSize + canvas.height / 2 - gridSize / 2;
        ctx.fillStyle = santaColor;
        ctx.fillRect(santaDrawPosX, santaDrawPosY, gridSize, gridSize);
    }

    for (let i = 2; i < moves.length; i += 2) {
        switch (moves[i]) {
            case '^':
                yPositionRobo += 1;
                break;
            case 'v':
                yPositionRobo -= 1;
                break;
            case '<':
                xPositionRobo -= 1;
                break;
            case '>':
                xPositionRobo += 1;
                break;
            default:
                throw new Error("We shouldn't be here");
        }

        housesWithPresents.add(`${xPositionRobo}${yPositionRobo}`);

        for (const house of housesWithPresents) {
            let housePosX =
                Number(house[0]) * gridSize + canvas.width / 2 - gridSize / 2;
            let housePosY =
                Number(house[1]) * gridSize + canvas.height / 2 - gridSize / 2;
            ctx.fillStyle = housesWithPresentsColor;
            ctx.fillRect(housePosX, housePosY, gridSize, gridSize);
        }

        roboDrawPosX =
            xPositionRobo * gridSize + canvas.width / 2 - gridSize / 2;
        roboDrawPosY =
            yPositionRobo * gridSize + canvas.height / 2 - gridSize / 2;
        ctx.fillStyle = roboColor;
        ctx.fillRect(roboDrawPosX, roboDrawPosY, gridSize, gridSize);
    }

    return housesWithPresents.size;
}

exercise3vis();
