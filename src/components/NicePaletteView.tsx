import { IPalette } from "../types";

interface NicePaletteViewProps {
    palette: IPalette;
    handleOnClick: (pal: IPalette) => void;
}
export function NicePaletteView({
    palette,
    handleOnClick,
}: NicePaletteViewProps) {
    return (
        <div
            className="palette"
            onClick={() => {
                handleOnClick(palette);
            }}
        >
            {palette.colors.map((colourHex, ix) => (
                <NiceColourView key={ix} colourHex={colourHex} />
            ))}
        </div>
    );
}

interface NiceColourViewProps {
    colourHex: string;
}
function NiceColourView({ colourHex }: NiceColourViewProps) {
    return <div className="colour" style={{ background: colourHex }}></div>;
}
