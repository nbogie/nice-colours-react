import { hexToRGB } from "./hexToRGB";

export function paletteToUnityCode(palette) {
    function hexCodeToRGBColorCall(hex) {
        const { r: r255, g: g255, b: b255 } = hexToRGB(hex);
        const [r, g, b] = [r255, g255, b255].map((v) => (v / 255).toFixed(3));
        return `new Color(${r}f, ${g}f, ${b}f)`;
    }
    return (
        "Color[] palette = new Color[] { \n" +
        palette.map(hexCodeToRGBColorCall).join(",\n") +
        "\n };"
    );
}
