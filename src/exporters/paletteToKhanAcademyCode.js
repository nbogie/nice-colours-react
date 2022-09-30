import { hexToRGB } from "./hexToRGB";

export function paletteToKhanAcademyCode(palette) {
    function hexCodeToRGBColorCall(hex) {
        const { r, g, b } = hexToRGB(hex);
        return `color(${r}, ${g}, ${b})`;
    }
    return (
        "var palette = [ \n" +
        palette.map(hexCodeToRGBColorCall).join(",\n") +
        "\n ];"
    );
}
