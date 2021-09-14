import React from "react";
import { Link } from "@chakra-ui/react";

export function About() {
  return (
    <p>
      Top palettes from{" "}
      <Link href="https://www.colourlovers.com/palettes" isExternal>
        ColourLovers
      </Link>
      , via Matt Deslauriers'{" "}
      <Link href="https://github.com/Jam3/nice-color-palettes" isExternal>
        nice-color-palettes npm package.
      </Link>
    </p>
  );
}
