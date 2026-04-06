import { readFile } from 'node:fs/promises';

const input = await readFile('./exercises/inputs/exercise3.txt', 'utf-8');

const moves = input.split('');

export function exercise3p1() {
    let xPosition = 0;
    let yPosition = 0;

    let housesWithPresents = new Set();
    housesWithPresents.add(`${xPosition}${yPosition}`);

    for (const move of moves) {
        switch (move) {
            case '^':
                yPosition += 1;
                break;
            case 'v':
                yPosition -= 1;
                break;
            case '<':
                xPosition -= 1;
                break;
            case '>':
                xPosition += 1;
                break;
            default:
                throw new Error("We shouldn't be here");
        }

        housesWithPresents.add(`${xPosition}${yPosition}`);
    }

    return housesWithPresents.size;
}

export function exercise3p2() {
    let xPositionSanta = 0;
    let yPositionSanta = 0;
    let xPositionRobo = 0;
    let yPositionRobo = 0;

    let housesWithPresents = new Set();
    housesWithPresents.add(`${xPositionSanta}${yPositionSanta}`);

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
    }

    return housesWithPresents.size;
}
