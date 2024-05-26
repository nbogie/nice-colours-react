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
            className="chromotomePalette"
            onClick={() => {
                handleOnClick(palette);
            }}
        >
            <div
                className="chromotomePaletteMain"
                style={{ background: palette.background ?? "white" }}
            >
                <div className="chromotomeColourBoxes">
                    {palette.colors.map((colourHex, ix) => (
                        <Colour
                            key={ix}
                            colourHex={colourHex}
                            stroke={palette.stroke}
                        />
                    ))}
                </div>
            </div>
            <div className="paletteName">{palette.name}</div>
        </div>
    );
}

interface ColourProps {
    colourHex: string;
    stroke?: string;
}
function Colour({ colourHex, stroke }: ColourProps) {
    // const rgbString = rgbToString(hexToRGB(colourHex));
    const styles = {
        background: colourHex,
        borderColor: stroke ?? undefined,
    } as React.CSSProperties;
    return (
        <div className="chromotomeColourBox" style={styles}>
            {/* <span className="hex">{colourHex}</span> <span className="rgb">{rgbString}</span> */}
        </div>
    );
}
