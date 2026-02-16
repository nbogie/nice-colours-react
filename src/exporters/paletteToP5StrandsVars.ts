import { IPalette } from "../types";
import { hexToRGB } from "./hexToRGB";

/**
@example output (both versions):

let colour1 = [ 0.906, 0.424, 0.290, 1.0 ]; //#e76c4a
let colour2 = [ 0.941, 0.851, 0.404, 1.0 ]; //#f0d967
let colour3 = [ 0.498, 0.549, 0.714, 1.0 ]; //#7f8cb6
let colour4 = [ 0.114, 0.682, 0.694, 1.0 ]; //#1daeb1
let colour5 = [ 0.937, 0.588, 0.251, 1.0 ]; //#ef9640

*/
export function paletteToP5StrandsVars(palette: IPalette) {
    function hexCodeToP5StrandsVariableDecl(hex: string, ix: number) {
        return `let colour${ix + 1} = ${hexCodeToNormalisedArray(hex)}; //${hex}`;
    }

    return (
        palette.colors
            .map((color, ix) => hexCodeToP5StrandsVariableDecl(color, ix))
            .join("\n") + "\n"
    );
}

function hexCodeToNormalisedArray(hex: string): string | null {
    const objMaybe = hexToRGB(hex);
    if (!objMaybe) {
        return null;
    }
    const { r, g, b } = objMaybe;
    const normalisedRGB = [r, g, b].map((v) => (v / 255).toFixed(3));
    return "[ " + [...normalisedRGB, "1.0"].join(", ") + " ]";
}
