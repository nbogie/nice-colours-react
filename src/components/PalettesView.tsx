import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import io, { Socket } from "socket.io-client";

import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Heading,
    HStack,
    Input,
    Radio,
    RadioGroup,
    Stack,
    StackDivider,
    Text,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";

import useStateWithLocalStorage from "../hooks/useStateWithLocalStorage";
import { NicePaletteView } from "./NicePaletteView";

import { paletteToCSSVars } from "../exporters/paletteToCSSVars";
import { paletteToJSON } from "../exporters/paletteToJSON";
import { paletteToKhanAcademyCode } from "../exporters/paletteToKhanAcademyCode";
import { paletteToUnityCode } from "../exporters/paletteToUnityCode";
import {
    buildOpenProcessingSocketIODest,
    tryToExtractSketchNumberFromLocationHash,
} from "../openProcessing";
import { ExportFormat, IPalette } from "../types";
import { About } from "./About";
import PossibleOpenProcessingSketchLink from "./PossibleOpenProcessingSketchLink";
import { SocketIOHelpModal } from "./SocketIOHelpModal";
import { getAllNiceColourPalettes } from "../niceColors";
import { getAllChromotomePalettes } from "../chromotome";
import { ChromotomePaletteView } from "./ChromotomePaletteView";

interface PalettesViewProps {
    isSettingsOpen: boolean;
    onOpenSettings: () => void;
    onCloseSettings: () => void;
    btnRef: React.MutableRefObject<HTMLButtonElement | null>;
}

function PalettesView(props: PalettesViewProps) {
    const [palettesToShow, setPalettesToShow] = useState<IPalette[]>(
        () => getAllNiceColourPalettes()
        // () => getAllChromotomePalettes()
    );
    const [exportFormat, setExportFormat] = useStateWithLocalStorage(
        "format",
        "json"
    );
    const [socket, setSocket] = useState<Socket | null>(null);

    const [socketioDestURL, setSocketioDestURL] = useStateWithLocalStorage(
        "nice-colours-socketio-dest",
        ""
    );

    useEffect(() => {
        const sketchNumber = tryToExtractSketchNumberFromLocationHash();
        if (sketchNumber) {
            const str = buildOpenProcessingSocketIODest(sketchNumber);
            setSocketioDestURL(str);
        }
    }, [setSocketioDestURL]);

    useEffect(() => {
        if (!socketioDestURL || socketioDestURL.length <= 4) {
            return; // no cleanup fn needed on unmount.
        }
        const newSocket = io(socketioDestURL);

        //log all outgoing socket.io
        newSocket.onAnyOutgoing((...args) =>
            console.log("socketio out: ", ...args)
        );

        newSocket.on("palette_received", (data) => {
            console.log("palette received by a sketch!", data);
        });
        setSocket(newSocket);

        return () => {
            newSocket.removeAllListeners();
            newSocket.disconnect();
        };
    }, [socketioDestURL]);

    const handleShuffleClicked = () => {
        setPalettesToShow((prev) =>
            [...prev].sort(() => (Math.random() < 0.5 ? -1 : 1))
        );
    };
    function handleChooseNice() {
        setPalettesToShow(getAllNiceColourPalettes());
    }
    function handleChooseChromotome() {
        setPalettesToShow(getAllChromotomePalettes());
    }

    const handlePaletteClicked = (palette: IPalette) => {
        copyAndNotify(palette, exportFormat as ExportFormat);
        if (socket && socket.connected) {
            socket.emit("palette_chosen", palette.colors);
        }
    };
    const showingChromotomePalettes = palettesToShow[0].type === "chromotome";
    const socketIOHelpDisclosure = useDisclosure();

    return (
        <div>
            <SocketIOHelpModal disclosure={socketIOHelpDisclosure} />

            <VStack align="flex-start">
                <About />
                <Text>
                    Click any palette to copy it to clipboard (and optionally{" "}
                    <Button variant="link" onClick={props.onOpenSettings}>
                        send it elsewhere with socket.io!
                    </Button>
                    )
                </Text>
                <HStack>
                    <Button onClick={handleShuffleClicked} variant="solid">
                        Shuffle!
                    </Button>
                    <Button
                        onClick={handleChooseNice}
                        variant="solid"
                        isActive={!showingChromotomePalettes}
                    >
                        ColorLovers
                    </Button>
                    <Button
                        onClick={handleChooseChromotome}
                        variant="solid"
                        isActive={showingChromotomePalettes}
                    >
                        Chromotome
                    </Button>
                </HStack>
                <div className="palettes">
                    {palettesToShow.map((p: IPalette, ix: number) =>
                        p.type === "chromotome" ? (
                            <ChromotomePaletteView
                                key={ix}
                                palette={p}
                                handleOnClick={handlePaletteClicked}
                            />
                        ) : (
                            <NicePaletteView
                                key={ix}
                                palette={p}
                                handleOnClick={handlePaletteClicked}
                            />
                        )
                    )}
                </div>
            </VStack>
            <Drawer
                isOpen={props.isSettingsOpen}
                placement="bottom"
                onClose={props.onCloseSettings}
                finalFocusRef={props.btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Settings</DrawerHeader>

                    <DrawerBody>
                        <VStack
                            align={"flex-start"}
                            spacing={6}
                            divider={<StackDivider borderColor="gray.200" />}
                        >
                            <Box>
                                <Heading size="md">
                                    {" "}
                                    Copy to clipboard as:
                                </Heading>

                                <RadioGroup
                                    onChange={setExportFormat}
                                    value={exportFormat}
                                >
                                    <Stack direction="row">
                                        <Radio value={"json"}>
                                            Array of Hex Codes (JS)
                                        </Radio>
                                        <Radio value={"khan"}>
                                            Array of color(r,g,b) (JS)
                                        </Radio>
                                        <Radio value={"cssVars"}>
                                            CSS variables
                                        </Radio>
                                        <Radio value={"unity"}>
                                            Array of color(r,g,b) (Unity)
                                        </Radio>
                                    </Stack>
                                </RadioGroup>
                            </Box>
                            <Box>
                                <Heading size="md">
                                    Socket.io destination address:
                                </Heading>
                                <HStack>
                                    <Input
                                        type="text"
                                        variant="outline"
                                        w={500}
                                        value={socketioDestURL}
                                        onChange={(ev) =>
                                            setSocketioDestURL(ev.target.value)
                                        }
                                        placeholder="socket.io dest addr"
                                    />
                                    <PossibleOpenProcessingSketchLink
                                        socketioDestURL={socketioDestURL}
                                    />
                                    <Button
                                        onClick={socketIOHelpDisclosure.onOpen}
                                    >
                                        socket.io help
                                    </Button>
                                </HStack>
                            </Box>
                        </VStack>
                    </DrawerBody>

                    <DrawerFooter></DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    );
}

function copyPaletteToClipboard(palette: IPalette, format: ExportFormat) {
    let text;
    switch (format) {
        case "json":
            text = paletteToJSON(palette);
            break;
        case "khan":
            text = paletteToKhanAcademyCode(palette);
            break;
        case "unity":
            text = paletteToUnityCode(palette);
            break;
        case "cssVars":
            text = paletteToCSSVars(palette);
            break;
        default:
            throw new Error("unrecognised export format: " + format);
    }

    navigator.clipboard.writeText(text);
}

// eslint-disable-next-line react-refresh/only-export-components
export function copyAndNotify(palette: IPalette, exportFormat: ExportFormat) {
    copyPaletteToClipboard(palette, exportFormat);

    //https://fkhadra.github.io/react-toastify/api/toast
    toast("Copied palette to clipboard!", {
        position: "bottom-left",
        autoClose: 2000,
        hideProgressBar: true,
        pauseOnHover: true,
        style: toastStyleForPalette(palette),
    });
}

// function rgbToString({ r, g, b }) {
//   return `(${r}, ${g}, ${b})`;
// }

function toastStyleForPalette(palette: IPalette) {
    return {
        backgroundImage: `linear-gradient(to right,${paletteToHardGradient(
            palette
        )})`,
    };
}

function paletteToHardGradient(palette: IPalette) {
    const stepSize = 100 / palette.colors.length;
    return palette.colors
        .map((hex: string, i: number) => [
            `${hex} ${(i + 0) * stepSize}%`,
            `${hex} ${(i + 1) * stepSize}%`,
        ])
        .flat()
        .join(", ");
}

export default PalettesView;
