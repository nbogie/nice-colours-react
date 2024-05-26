interface RGB {
    r: number;
    g: number;
    b: number;
}
export function hexToRGB(hex: string): RGB | null {
    //https://stackoverflow.com/a/5624139/669686
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
          }
        : null;
}
