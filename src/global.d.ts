declare module "chromotome" {
    function getAll(): ChromotomePalette[];
}

declare module "nice-color-palettes/*" {
    export type NiceColorPalette = { type: "nice"; colors: string[] };
}
