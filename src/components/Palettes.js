import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Input,
  Text,
  Button,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
  VStack,
  HStack,
  StackDivider,
  useDisclosure,
} from "@chakra-ui/react";

import { Palette } from "./Palette";
import useStateWithLocalStorage from "../hooks/useStateWithLocalStorage.js";

import { About } from "./About";
import PossibleOpenProcessingSketchLink from "./PossibleOpenProcessingSketchLink";
import {
  buildOpenProcessingSocketIODest,
  tryToExtractSketchNumberFromLocationHash,
} from "../openProcessing";
import { SocketIOHelpModal } from "./SocketIOHelpModal";

const palettes = require("nice-color-palettes/200");
let socket; // keep it over multiple renders.  TODO: why not state variable?

toast.configure();

function Palettes(props) {
  const [palettesToShow, setPalettesToShow] = useState(palettes);
  const [exportFormat, setExportFormat] = useStateWithLocalStorage(
    "format",
    "json"
  );
  const [socketioDestURL, setSocketioDestURL] = useStateWithLocalStorage(
    "nice-colours-socketio-dest"
  );

  useEffect(() => {
    const sketchNumber = tryToExtractSketchNumberFromLocationHash();
    if (sketchNumber) {
      setSocketioDestURL(buildOpenProcessingSocketIODest(sketchNumber));
    }
  }, [setSocketioDestURL]);

  useEffect(() => {
    if (!socketioDestURL || socketioDestURL.length <= 4) {
      return; // no cleanup fn needed on unmount.
    }
    socket = io.connect(socketioDestURL);

    socket.on("palette_received", (data) => {
      console.log("palette received by sketch!", data);
    });

    return () => {
      //unregister listeners
      for (let eventName of ["palette_received"]) {
        socket.off(eventName);
      }
      socket.disconnect();
    };
  }, [socketioDestURL]);

  const handleShuffleClicked = () => {
    setPalettesToShow(
      [...palettes].sort((a, b) => (Math.random() < 0.5 ? -1 : 1))
    );
  };

  const handlePaletteClicked = (palette) => {
    copyAndNotify(palette, exportFormat);
    if (socket && socket.connected) {
      socket.emit("palette_chosen", palette);
    }
  };

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
        <Button onClick={handleShuffleClicked} variant="solid">
          Shuffle!
        </Button>
        <div className="palettes">
          {palettesToShow.map((p, ix) => (
            <Palette
              key={ix}
              palette={p}
              handleOnClick={handlePaletteClicked}
            />
          ))}
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
                <Heading size="md"> Copy to clipboard as:</Heading>

                <RadioGroup onChange={setExportFormat} value={exportFormat}>
                  <Stack direction="row">
                    <Radio value={"json"}>Array of Hex Codes (JS)</Radio>
                    <Radio value={"khan"}>Array of color(r,g,b) (JS)</Radio>
                    <Radio value={"cssVars"}>CSS variables</Radio>
                    <Radio value={"unity"}>Array of color(r,g,b) (Unity)</Radio>
                  </Stack>
                </RadioGroup>
              </Box>
              <Box>
                <Heading size="md">Socket.io destination address:</Heading>
                <HStack>
                  <Input
                    type="text"
                    variant="outline"
                    w={500}
                    value={socketioDestURL}
                    onChange={(ev) => setSocketioDestURL(ev.target.value)}
                    placeholder="socket.io dest addr"
                  />
                  <PossibleOpenProcessingSketchLink
                    socketioDestURL={socketioDestURL}
                  />
                  <Button onClick={socketIOHelpDisclosure.onOpen}>
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

function copyPaletteToClipboard(palette, format) {
  let text;
  switch (format) {
    case "json":
      text = JSON.stringify(palette, null, 2);
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

function paletteToKhanAcademyCode(palette) {
  function hexCodeToRGBColorCall(hex) {
    const { r, g, b } = hexToRGB(hex);
    return `color(${r}, ${g}, ${b})`;
  }
  return (
    "var palette = [ \n" +
    palette.map(hexCodeToRGBColorCall).join(",\n") +
    "\n ];"
  );
}
function paletteToUnityCode(palette) {
  function hexCodeToRGBColorCall(hex) {
    const { r: r255, g: g255, b: b255 } = hexToRGB(hex);
    const [r, g, b] = [r255, g255, b255].map((v) => (v / 255).toFixed(3));
    return `new Color(${r}f, ${g}f, ${b}f)`;
  }
  return (
    "Color[] palette = new Color[] { \n" +
    palette.map(hexCodeToRGBColorCall).join(",\n") +
    "\n };"
  );
}
function paletteToCSSVars(palette) {
  function hexCodeToCSSVar(hexCode, ix){
    return `--pal-${ix+1}: ${hexCode};`;
  }

  const lines = palette.map((hexCode, ix) => hexCodeToCSSVar(hexCode, ix)).join("\n");
  return `:root {\n${lines}\n}\n`;
}

export function copyAndNotify(palette, exportFormat) {
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

function hexToRGB(hex) {
  //https://stackoverflow.com/a/5624139/669686
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

// function rgbToString({ r, g, b }) {
//   return `(${r}, ${g}, ${b})`;
// }

function toastStyleForPalette(palette) {
  return {
    backgroundImage: `linear-gradient(to right,${paletteToHardGradient(
      palette
    )})`,
  };
}

function paletteToHardGradient(palette) {
  const stepSize = 100 / palette.length;
  return palette
    .map((hex, i) => [
      `${hex} ${(i + 0) * stepSize}%`,
      `${hex} ${(i + 1) * stepSize}%`,
    ])
    .flat()
    .join(", ");
}

export default Palettes;
