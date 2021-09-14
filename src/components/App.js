import * as React from "react";
import "./App.css";
import Palettes from "./Palettes.js";
import { VStack, ChakraProvider, Center, Heading } from "@chakra-ui/react";
import SmallCenteredFooter from "./Footer";

function App() {
  return (
    <Center>
      <VStack>
        <Heading>Nice Colours, Quicker!</Heading>
        <Palettes />
        <SmallCenteredFooter />
      </VStack>
    </Center>
  );
}

export default App;
