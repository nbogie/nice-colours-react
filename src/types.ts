import { ChromotomePalette } from "./chromotome";
import { NiceColorPalette } from "./niceColors";

export type IPalette = NiceColorPalette | ChromotomePalette;

export type ExportFormat = "json" | "khan" | "unity" | "cssVars";
