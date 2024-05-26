import * as tome from "chromotome";

export interface ChromotomePalette {
    type: "chromotome";
    name: string;
    colors: string[];
    size: number;
    stroke?: string;
    background?: string;
}

export function getAllChromotomePalettes() {
    return tome.getAll().map((v) => ({ ...v, type: "chromotome" }));
}
// function displayColor(color, stroke, pos, width, ctx) {
//     ctx.fillStyle = color;
//     ctx.fillRect(pos, padding, width, size);
//     if (stroke) {
//         ctx.strokeStyle = stroke;
//         ctx.lineWidth = 4;
//         ctx.strokeRect(pos, padding, width, size);
//     }
// }
