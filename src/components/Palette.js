import React from "react";

export function Palette({ palette, handleOnClick }) {
  return (
    <div
      className="palette"
      onClick={() => {
        handleOnClick(palette);
      }}
    >
      {palette.map((colourHex, ix) => (
        <Colour key={ix} colourHex={colourHex} />
      ))}
    </div>
  );
}

function Colour({ colourHex }) {
  // const rgbString = rgbToString(hexToRGB(colourHex));
  return (
    <div className="colour" style={{ background: colourHex }}>
      {/* <span className="hex">{colourHex}</span> <span className="rgb">{rgbString}</span> */}
    </div>
  );
}
