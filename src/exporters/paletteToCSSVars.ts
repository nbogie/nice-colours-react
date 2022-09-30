import { IPalette } from "./../types";
export function paletteToCSSVars(palette: IPalette) {
    function hexCodeToCSSVar(hexCode: string, ix: number): string {
        return `--pal-${ix + 1}: ${hexCode};`;
    }

    const lines = palette
        .map((hexCode, ix) => hexCodeToCSSVar(hexCode, ix))
        .join("\n");
    return `:root {\n${lines}\n}\n`;
}
