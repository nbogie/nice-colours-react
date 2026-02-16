import { IPalette } from "./../types";
/**
@example output if nice-colors:

[
  "#69d2e7",
  "#a7dbd8",
  "#e0e4cc",
  "#f38630",
  "#fa6900"
]

@example output if chromotome: 

 {
   "name": "sprague",
   "colors": [
     "#ec2f28",
     "#f8cd28",
     "#1e95bb",
     "#fbaab3",
     "#fcefdf"
   ],
   "stroke": "#221e1f",
   "background": "#fcefdf",
   "size": 5,
   "type": "chromotome"
 }

*/
export function paletteToJSON(palette: IPalette) {
    return JSON.stringify(
        palette.type === "nice" ? palette.colors : palette,
        null,
        2
    );
}
