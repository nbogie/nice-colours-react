import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Input,
  Text,
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
} from "@chakra-ui/react";

import { Palette } from "./Palette";
import useStateWithLocalStorage from "../hooks/useStateWithLocalStorage.js";

import { About } from "./About";
import PossibleOpenProcessingSketchLink from "../PossibleOpenProcessingSketchLink";
import {
  buildOpenProcessingSocketIODest,
  tryToExtractSketchNumberFromLocationHash,
} from "../openProcessing";

const palettes = require("nice-color-palettes/200");
let socket; // keep it over multiple renders.  TODO: why not state variable?

toast.configure();

function Palettes(props) {
  const [shouldExportAsHexCodes, setShouldExportAsHexCodes] = useState(true);
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

  const handlePaletteClicked = (palette) => {
    copyAndNotify(palette, shouldExportAsHexCodes);
    if (socket && socket.connected) {
      socket.emit("palette_chosen", palette);
    }
  };

  return (
    <div>
      <About />
      <Text>Click any palette to copy it to clipboard.</Text>
      <div className="palettes">
        {palettes.map((p, ix) => (
          <Palette key={ix} palette={p} handleOnClick={handlePaletteClicked} />
        ))}
      </div>
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

                <RadioGroup
                  onChange={(v) => {
                    setShouldExportAsHexCodes(v === "true");
                  }}
                  value={shouldExportAsHexCodes}
                >
                  <Stack direction="row">
                    <Radio value={true}>Hex Codes</Radio>
                    <Radio value={false}>color(r,g,b) array</Radio>
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

function copyPaletteToClipboardAsJSON(palette, shouldExportAsHexCodes) {
  const text = shouldExportAsHexCodes
    ? JSON.stringify(palette, null, 2)
    : paletteToKhanAcademyCode(palette);
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

export function copyAndNotify(palette, shouldExportAsHexCodes) {
  copyPaletteToClipboardAsJSON(palette, shouldExportAsHexCodes);

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
