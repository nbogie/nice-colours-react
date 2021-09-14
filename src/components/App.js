import * as React from "react";
import "./App.css";
import Palettes from "./Palettes.js";
import { VStack, Center, Heading, Container } from "@chakra-ui/react";
import SmallCenteredFooter from "./Footer";

function App() {
  return (
    <Container maxW={1000}>
      <Center>
        <VStack>
          <Heading>Nice Colours, Quicker!</Heading>
          <Palettes />
          <SmallCenteredFooter />
        </VStack>
      </Center>
    </Container>
  );
}

export default App;
