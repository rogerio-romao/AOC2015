import { readFile } from 'fs/promises';

const input = await readFile('./exercises/inputs/exercise7.txt', 'utf8');

const lines = input.split('\n');

type Operand = { kind: 'num'; value: number } | { kind: 'wire'; name: string };
type Assign = { op: 'ASSIGN'; src: Operand; dst: string };
type Not = { op: 'NOT'; src: Operand; dst: string };
type BinOp = {
    op: 'AND' | 'OR' | 'LSHIFT' | 'RSHIFT';
    left: Operand;
    right: Operand;
    dst: string;
};
type Instruction = Assign | Not | BinOp;

// pure evaluation helpers
const mask16 = (n: number): number => n & 0xffff;
const evalNot = (v: number) => mask16(~v);
const evalAnd = (l: number, r: number) => mask16(l & r);
const evalOr = (l: number, r: number) => mask16(l | r);
const evalLShift = (l: number, r: number) => mask16(l << r);
const evalRShift = (l: number, r: number) => mask16(l >> r);

function parseOperand(token: string): Operand {
    const num = Number(token);
    if (!Number.isNaN(num)) return { kind: 'num', value: mask16(num) };
    return { kind: 'wire', name: token };
}

function parseInstructions(lines: string[]): Instruction[] {
    const program: Instruction[] = [];
    for (const line of lines) {
        if (!line.trim()) continue;
        const [logic, dst] = line.split(' -> ');
        const parts = logic.split(' ');
        if (parts.length === 1) {
            program.push({ op: 'ASSIGN', src: parseOperand(parts[0]), dst });
        } else if (parts.length === 2) {
            program.push({ op: 'NOT', src: parseOperand(parts[1]), dst });
        } else {
            const [left, op, right] = parts;
            program.push({
                op: op as BinOp['op'],
                left: parseOperand(left),
                right: parseOperand(right),
                dst,
            });
        }
    }
    return program;
}

export function exercise7p1() {
    const program = parseInstructions(lines);
    const index = new Map<string, Instruction>();
    for (const instr of program) index.set(instr.dst, instr);

    const memo = new Map<string, number>();
    const visiting = new Set<string>();

    const valueOf = (op: Operand): number =>
        op.kind === 'num' ? op.value : compute(op.name);

    function compute(wire: string): number {
        if (memo.has(wire)) return memo.get(wire)!;
        if (visiting.has(wire)) {
            throw new Error(`Circular dependency detected on wire: ${wire}`);
        }
        visiting.add(wire);
        const instr = index.get(wire);
        if (!instr) {
            // Unknown wire: treat as 0 or throw; AoC inputs define all dsts
            visiting.delete(wire);
            throw new Error(`Unknown wire: ${wire}`);
        }

        let result: number;
        switch (instr.op) {
            case 'ASSIGN': {
                result = mask16(valueOf(instr.src));
                break;
            }
            case 'NOT': {
                result = evalNot(valueOf(instr.src));
                break;
            }
            case 'AND': {
                result = evalAnd(valueOf(instr.left), valueOf(instr.right));
                break;
            }
            case 'OR': {
                result = evalOr(valueOf(instr.left), valueOf(instr.right));
                break;
            }
            case 'LSHIFT': {
                result = evalLShift(valueOf(instr.left), valueOf(instr.right));
                break;
            }
            case 'RSHIFT': {
                result = evalRShift(valueOf(instr.left), valueOf(instr.right));
                break;
            }
            default:
                result = 0;
        }

        visiting.delete(wire);
        memo.set(wire, result);
        return result;
    }

    return compute('a');
}

export function exercise7p2(prevA: number) {
    const program = parseInstructions(lines);
    const index = new Map<string, Instruction>();
    for (const instr of program) index.set(instr.dst, instr);

    // Override wire b with previous a
    index.set('b', {
        op: 'ASSIGN',
        src: { kind: 'num', value: mask16(prevA) },
        dst: 'b',
    });

    const memo = new Map<string, number>();
    const visiting = new Set<string>();

    const valueOf = (op: Operand): number =>
        op.kind === 'num' ? op.value : compute(op.name);

    function compute(wire: string): number {
        if (memo.has(wire)) return memo.get(wire)!;
        if (visiting.has(wire)) {
            throw new Error(`Circular dependency detected on wire: ${wire}`);
        }
        visiting.add(wire);
        const instr = index.get(wire);
        if (!instr) {
            visiting.delete(wire);
            throw new Error(`Unknown wire: ${wire}`);
        }

        let result: number;
        switch (instr.op) {
            case 'ASSIGN': {
                result = mask16(valueOf(instr.src));
                break;
            }
            case 'NOT': {
                result = evalNot(valueOf(instr.src));
                break;
            }
            case 'AND': {
                result = evalAnd(valueOf(instr.left), valueOf(instr.right));
                break;
            }
            case 'OR': {
                result = evalOr(valueOf(instr.left), valueOf(instr.right));
                break;
            }
            case 'LSHIFT': {
                result = evalLShift(valueOf(instr.left), valueOf(instr.right));
                break;
            }
            case 'RSHIFT': {
                result = evalRShift(valueOf(instr.left), valueOf(instr.right));
                break;
            }
            default:
                result = 0;
        }

        visiting.delete(wire);
        memo.set(wire, result);
        return result;
    }

    return compute('a');
}
