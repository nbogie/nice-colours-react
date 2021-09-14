import { Box, Container, Link, Stack, Text } from "@chakra-ui/react";
import SeeAlso from "./SeeAlso";

export default function SmallCenteredFooter() {
  return (
    <Box>
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        spacing={4}
        justify={"center"}
        align={"center"}
      >
        <Text>
          Make your own version of this app, starting at{" "}
          <Link href="https://repl.it/@NeillBogie/nice-colours" isExternal>
            the repl.it
          </Link>{" "}
          or with{" "}
          <Link href="https://github.com/nbogie/nice-colours-react" isExternal>
            the repo on github
          </Link>
          .
        </Text>
        <SeeAlso />
        {/* <Stack direction={"row"} spacing={6}>
          <Link href={"#"}>Home</Link>
          <Link href={"#"}>About</Link>
          <Link href={"#"}>Contact</Link>
        </Stack> */}
      </Container>
    </Box>
  );
}
