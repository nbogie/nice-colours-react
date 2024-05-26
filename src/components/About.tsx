import { Link } from "@chakra-ui/react";

export function About() {
    return (
        <>
            <p>
                Top palettes from{" "}
                <Link href="https://www.colourlovers.com/palettes" isExternal>
                    ColourLovers
                </Link>
                , via{" "}
                <Link href="https://www.mattdesl.com/" isExternal>
                    Matt Deslauriers'
                </Link>{" "}
                <Link
                    href="https://github.com/Jam3/nice-color-palettes"
                    isExternal
                >
                    nice-color-palettes npm package.
                </Link>
            </p>
            <p>
                Kjetil Golid's{" "}
                <Link href="https://github.com/kgolid/chromotome" isExternal>
                    Chromotome palettes
                </Link>
                .
            </p>
        </>
    );
}
