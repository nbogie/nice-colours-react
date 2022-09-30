import { Link } from "@chakra-ui/react";
import * as React from "react";

export default function MadeWith() {
    return (
        <div>
            Made with{" "}
            <div>
                <Link href="https://www.mattdesl.com/" isExternal>
                    Matt Deslauriers'
                </Link>{" "}
                <Link
                    href="https://github.com/Jam3/nice-color-palettes"
                    isExternal
                >
                    nice-color-palettes
                </Link>
            </div>
            <div>
                <Link href="https://chakra-ui.com/" isExternal>
                    chakra-ui
                </Link>
            </div>
            <div>
                <Link href="https://socket.io/" isExternal>
                    socket.IO
                </Link>
            </div>
            <div>
                <Link
                    href="https://fkhadra.github.io/react-toastify/"
                    isExternal
                >
                    react-toastify
                </Link>
            </div>
        </div>
    );
}
