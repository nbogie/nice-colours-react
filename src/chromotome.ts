import * as tome from "chromotome";
export function getAllChromotomePalettes() {
    return tome.getAll();
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
