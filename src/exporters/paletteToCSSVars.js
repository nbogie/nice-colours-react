export function paletteToCSSVars(palette) {
    function hexCodeToCSSVar(hexCode, ix) {
        return `--pal-${ix + 1}: ${hexCode};`;
    }

    const lines = palette
        .map((hexCode, ix) => hexCodeToCSSVar(hexCode, ix))
        .join("\n");
    return `:root {\n${lines}\n}\n`;
}
