import {
    Button,
    Code,
    Heading,
    Link,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";
interface SocketIOHelpModalProps {
    disclosure: ReturnType<typeof useDisclosure>;
}
export function SocketIOHelpModal(props: SocketIOHelpModalProps) {
    const { disclosure } = props;
    return (
        <Modal isOpen={disclosure.isOpen} onClose={disclosure.onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Sending chosen palette via socket.io</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack spacing={6} align="flex-start">
                        <Text>
                            If a socket.io destination has been specified in
                            settings, whenever a palette is clicked a message
                            will be sent to the destination describing the
                            chosen palette.
                        </Text>
                        <Text>
                            One common destination is openprocessing's echo
                            server:
                            <Code>
                                https://echo.openprocessing.org:30000/?sketch=nnnnnn
                            </Code>
                        </Text>

                        <Text>
                            The code that runs when a palette is clicked is
                            simple:
                        </Text>
                        <Code
                            children={`socket.emit("palette_chosen", paletteArray);
`}
                        ></Code>
                        <Text>
                            That is, a message will be sent to the destination
                            starting with the term `palette_chosen` and having
                            just one argument: the palette as an array of
                            strings (each one a colour hex code). Example:
                        </Text>
                        <Code>
                            ["#3fb8af", "#7fc7af", "#dad8a7", "#ff9e9d",
                            "#ff3d7f"]
                        </Code>
                        <Heading size="md">Example receiver (p5.js)</Heading>

                        <Text>
                            Here is{" "}
                            <Link
                                href="https://openprocessing.org/sketch/1263990"
                                isExternal
                            >
                                an example receiver p5.js sketch on
                                OpenProcessing
                            </Link>
                            .
                        </Text>
                        <Text>
                            The core is effectively as follows. It is assumed
                            'socket' is established and 'palette' is a global
                            variable used by draw():
                            <Code
                                display="block"
                                whiteSpace="pre"
                                children={`
function setup(){
    socket.on('palette_chosen', 
        handlePaletteChanged);
}

function handlePaletteChanged(newPalette) {
    palette = newPalette;
    redraw();
}
`}
                            ></Code>
                        </Text>
                    </VStack>
                </ModalBody>

                <ModalFooter>
                    <Button
                        colorScheme="blue"
                        mr={3}
                        onClick={disclosure.onClose}
                    >
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
