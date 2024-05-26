import { ChromotomePalette } from "../chromotome";
import { IPalette } from "../types";

interface PaletteViewProps {
    palette: ChromotomePalette;
    handleOnClick: (pal: IPalette) => void;
}
export function ChromotomePaletteView({
    palette,
    handleOnClick,
}: PaletteViewProps) {
    return (
        <div
            className="palette"
            onClick={() => {
                handleOnClick(palette);
            }}
        >
            {palette.colors.map((colourHex, ix) => (
                <Colour key={ix} colourHex={colourHex} />
            ))}
            <div className="paletteName">{palette.name}</div>
        </div>
    );
}

interface ColourProps {
    colourHex: string;
}
function Colour({ colourHex }: ColourProps) {
    // const rgbString = rgbToString(hexToRGB(colourHex));
    return (
        <div className="colour" style={{ background: colourHex }}>
            {/* <span className="hex">{colourHex}</span> <span className="rgb">{rgbString}</span> */}
        </div>
    );
}
