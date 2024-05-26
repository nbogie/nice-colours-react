import { IPalette } from "../types";

interface PaletteProps {
    palette: IPalette;
    handleOnClick: (pal: IPalette) => void;
}
export function Palette({ palette, handleOnClick }: PaletteProps) {
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
