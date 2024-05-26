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
                style={{ background: palette.background ?? undefined }}
            >
                <div className="chromotomeColourBoxes">
                    {palette.colors.map((colourHex, ix) => (
                        <ChromotomeColourView
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

interface ChromotomeColourViewProps {
    colourHex: string;
    stroke?: string;
}
function ChromotomeColourView({
    colourHex,
    stroke,
}: ChromotomeColourViewProps) {
    const styles = {
        background: colourHex,
        borderColor: stroke ?? undefined,
    } as React.CSSProperties;
    return <div className="chromotomeColourBox" style={styles}></div>;
}
