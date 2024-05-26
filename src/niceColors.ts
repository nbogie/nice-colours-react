import type { NiceColorPalette } from "nice-color-palettes/200";
import palettes from "nice-color-palettes/200";
export function getAllNiceColourPalettes() {
    return (palettes as string[][]).map((v) => ({
        type: "nice",
        colors: v,
    })) as NiceColorPalette[];
}

export { NiceColorPalette };
