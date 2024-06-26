import { HamburgerIcon } from "@chakra-ui/icons";
import {
    Container,
    Flex,
    Heading,
    IconButton,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";
import React from "react";
import "./App.css";
import SmallCenteredFooter from "./Footer";
import PalettesView from "./PalettesView";

function App() {
    //This is just for focus when the drawer closes.
    const btnRef = React.useRef<HTMLButtonElement | null>(null);
    const { isOpen, onClose, onOpen, onToggle } = useDisclosure();

    return (
        <Container marginTop={2} maxW={1000}>
            {/* Title Bar with settings hamburger icon */}
            <Flex flexDirection={"row"} w={"100%"}>
                <Heading width={"100%"} alignItems={"center"}>
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
                <PalettesView
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
