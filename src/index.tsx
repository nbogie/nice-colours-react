import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import React from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import App from "./components/App";
import { themeOverride } from "./themeOverride";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <ChakraProvider theme={extendTheme(themeOverride)}>
            <ToastContainer />
            <App />
        </ChakraProvider>
    </React.StrictMode>
);
