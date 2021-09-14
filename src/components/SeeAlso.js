import { Link } from "@chakra-ui/react";
import * as React from "react";

export default function SeeAlso() {
  return (
    <div>
      See also{" "}
      <Link href="https://chromotome-quicker.netlify.app/" isExternal>
        chromotome-quicker.netlify.app
      </Link>{" "}
      for KGolid's fantastic palettes.
    </div>
  );
}
