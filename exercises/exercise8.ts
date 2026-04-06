export function exercise8p1(input: string[]) {
    const inputLength = input.reduce((acc, str) => acc + str.length, 0);
    const escapedInput: string[] = [];

    for (const str of input) {
        const noEscapedQuotes = str.replaceAll(/(?<!\\)"/g, '');
        const noHex = noEscapedQuotes.replaceAll(/\\x[0-9a-fA-F]{2}/g, 'b');
        const noEscapedBackslash = noHex.replaceAll('\\\\', '\\');
        const noQuotes = noEscapedBackslash.replaceAll('\\"', '"');
        escapedInput.push(noQuotes);
    }

    const escapedInputLength = escapedInput.reduce(
        (acc, str) => acc + str.length,
        0
    );

    console.log(escapedInput);
    return inputLength - escapedInputLength;
}
