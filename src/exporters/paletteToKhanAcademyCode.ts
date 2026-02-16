import { IPalette } from "./../types";
import { hexToRGB } from "./hexToRGB";

/**
 @example output (both versions):
 
 var palette = [ 
     color(105, 210, 231),
     color(167, 219, 216),
     color(224, 228, 204),
     color(243, 134, 48),
     color(250, 105, 0)
 ];
 
*/
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
