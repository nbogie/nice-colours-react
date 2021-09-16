import * as React from "react";
import "./App.css";
import Palettes from "./Palettes.js";
import {
  Flex,
  VStack,
  Heading,
  Container,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import SmallCenteredFooter from "./Footer";

function App() {
  //This is just for focus when the drawer closes.
  const btnRef = React.useRef();
  const { isOpen, onClose, onOpen, onToggle } = useDisclosure();

  return (
    <Container marginTop={2} maxW={1000}>
      {/* Title Bar with settings hamburger icon */}
      <Flex flexDirection={"row"} w={"100%"}>
        <Heading align={"center"} width={"100%"}>
          Nice colours, quicker!
        </Heading>
        <IconButton
          onClick={onToggle}
          ref={btnRef}
          icon={<HamburgerIcon w={7} h={7} />}
          variant={"ghost"}
          aria-label={"Toggle Settings"}
        />
      </Flex>
      <VStack>
        <Palettes
          btnRef={btnRef}
          isSettingsOpen={isOpen}
          onOpenSettings={onOpen}
          onCloseSettings={onClose}
        />
        <SmallCenteredFooter />
      </VStack>
    </Container>
  );
}

export default App;
