import { IPalette } from "./../types";
export function paletteToJSON(palette: IPalette) {
    return JSON.stringify(
        palette.type === "nice" ? palette.colors : palette,
        null,
        2
    );
}
