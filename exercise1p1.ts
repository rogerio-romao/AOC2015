import { readFile } from 'fs/promises';

export async function exercise1p1() {
    const input = await readFile('./exerciseInputs/exercise1.txt', 'utf8');
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
    const input = await readFile('./exerciseInputs/exercise1.txt', 'utf8');

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
