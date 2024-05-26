import { IPalette } from "./../types";
import { hexToRGB } from "./hexToRGB";

export function paletteToKhanAcademyCode(palette: IPalette) {
    function hexCodeToRGBColorCall(hex: string) {
        const rgbObj = hexToRGB(hex);
        if (!rgbObj) {
            return null;
        }
        const { r, g, b } = rgbObj;
        return `color(${r}, ${g}, ${b})`;
    }
    return (
        "var palette = [ \n" +
        palette.colors.map(hexCodeToRGBColorCall).join(",\n") +
        "\n ];"
    );
}
