import { IPalette } from "../types";
import { hexToRGB } from "./hexToRGB";

/**
 @example output (both versions):
 
 Color[] palette = new Color[] { 
    new Color(0.412f, 0.824f, 0.906f),
    new Color(0.655f, 0.859f, 0.847f),
    new Color(0.878f, 0.894f, 0.800f),
    new Color(0.953f, 0.525f, 0.188f),
    new Color(0.980f, 0.412f, 0.000f)
 };
 
*/
export function paletteToUnityCode(palette: IPalette) {
    function hexCodeToRGBColorCall(hex: string): string | null {
        const objMaybe = hexToRGB(hex);
        if (!objMaybe) {
            return null;
        }
        const { r: r255, g: g255, b: b255 } = objMaybe;
        const [r, g, b] = [r255, g255, b255].map((v) => (v / 255).toFixed(3));
        return `new Color(${r}f, ${g}f, ${b}f)`;
    }
    return (
        "Color[] palette = new Color[] { \n" +
        palette.colors.map(hexCodeToRGBColorCall).join(",\n") +
        "\n };"
    );
}
