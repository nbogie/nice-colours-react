import { IPalette } from "./../types";
export function paletteToJSON(palette: IPalette) {
    return JSON.stringify(palette, null, 2);
}
