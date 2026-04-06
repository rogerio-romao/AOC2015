import { readFile } from 'fs/promises';

import { exercise8p1 } from './exercises/exercise8';

const smallFile = await readFile(
    './exercises/inputs/exercise8small.txt',
    'utf8'
);
const file = await readFile('./exercises/inputs/exercise8.txt', 'utf8');

const smallInputLines = smallFile.split('\n');
const inputLines = file.split('\n');

const part1 = exercise8p1(inputLines);
console.log('part1:', part1);
