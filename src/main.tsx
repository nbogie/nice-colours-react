import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";
import { themeOverride } from "./themeOverride";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ChakraProvider theme={extendTheme(themeOverride)}>
            <ToastContainer />
            <App />
        </ChakraProvider>
    </React.StrictMode>
);
