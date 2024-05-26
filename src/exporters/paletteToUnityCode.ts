import { IPalette } from "../types";
import { hexToRGB } from "./hexToRGB";

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
