import { readFile } from 'fs/promises';

const input = await readFile('./exercises/inputs/exercise1.txt', 'utf8');

export async function exercise1p1() {
    let currentFloor = 0;

    for (const letter of input) {
        if (letter === '(') {
            currentFloor += 1;
        } else {
            currentFloor -= 1;
        }
    }

    return currentFloor;
}

export async function exercise1p2() {
    let currentFloor = 0;
    let pos = 0;

    for (const letter of input) {
        pos += 1;

        if (letter === '(') {
            currentFloor += 1;
        } else {
            currentFloor -= 1;
        }

        if (currentFloor < 0) {
            break;
        }
    }

    return pos;
}
