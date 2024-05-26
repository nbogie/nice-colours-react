declare module "chromotome" {
    // Function definitions
    function myFunction(arg1: string): number;

    interface ChromotomePalette {
        name: string;
        colors: string[];
        size: number;
        stroke?: string;
        background?: string;
    }
    function getAll(): ChromotomePalette[];
    // ... define other exports of the library
}

declare module "nice-color-palettes/*" {
    export type NiceColorPalette = string[][];
}
