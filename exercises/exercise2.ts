import { readFile } from 'node:fs/promises';

const input = await readFile('./exercises/inputs/exercise2.txt', 'utf-8');

const presents = input.split('\n');

export function exercise2p1() {
    let totalSquareFeet = 0;

    for (const present of presents) {
        const [length, width, height] = present.split('x').map(Number);

        const minSide = Math.min(
            length * width,
            width * height,
            height * length
        );

        const presentSquareFeet =
            2 * length * width +
            2 * width * height +
            2 * height * length +
            minSide;

        totalSquareFeet += presentSquareFeet;
    }

    return totalSquareFeet;
}

export function exercise2p2() {
    let totalRibbon = 0;

    for (const present of presents) {
        const [length, width, height] = present.split('x').map(Number);

        const bowRibbon = length * width * height;
        totalRibbon += bowRibbon;

        const sortedMeasurements = [length, width, height].sort(
            (a, b) => a - b
        );
        const [shortest, short] = sortedMeasurements;

        const wrapRibbon = 2 * shortest + 2 * short;
        totalRibbon += wrapRibbon;
    }

    return totalRibbon;
}
