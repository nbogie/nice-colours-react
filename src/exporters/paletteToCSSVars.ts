import { IPalette } from "./../types";
/**
 @example output (both versions):
 
 :root {
     --pal-1: #69d2e7;
     --pal-2: #a7dbd8;
     --pal-3: #e0e4cc;
     --pal-4: #f38630;
     --pal-5: #fa6900;
 }     

*/
export function paletteToCSSVars(palette: IPalette) {
    function hexCodeToCSSVar(hexCode: string, ix: number): string {
        return `--pal-${ix + 1}: ${hexCode};`;
    }

    const lines = palette.colors
        .map((hexCode, ix) => hexCodeToCSSVar(hexCode, ix))
        .join("\n");
    return `:root {\n${lines}\n}\n`;
}
