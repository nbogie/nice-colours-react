/*
 https://openprocessing.org:30000/?sketch=971818
 https://openprocessing.org/sketch/971818
*/
/**
 Speculatively looks for and returns an openprocessing sketch number in what might be an openprocessing socket.io endpoint.
 e.g. 992314712 from https://openprocessing.org:30000/?sketch=992314712

 Otherwise, returns null.
*/

export function parseOpenProcessingSocketIOLinkForSketchNumber(
    url: string | null
): string | null {
    if (!url || typeof url !== "string") {
        return null;
    }
    //example input: "https://openprocessing.org:30000/?sketch=971818"
    const regex = /^.*openprocessing.org.*sketch=([0-9]+)$/;
    const matches = url.match(regex);
    if (matches && matches.length === 2) {
        const sketchNumber = matches[1];
        return sketchNumber;
    } else {
        return null;
    }
}

export function buildOpenProcessingSketchURL(sketchNumber: string): string {
    return "https://openprocessing.org/sketch/" + sketchNumber;
}

export function buildOpenProcessingSocketIODest(sketchNumber: number): string {
    return "https://openprocessing.org:30000/?sketch=" + sketchNumber;
}

export function tryToExtractSketchNumberFromLocationHash(): number | null {
    const h = window.location.hash;
    if (h && h.length > 0) {
        const referralSketchNumber = parseInt(h.slice(1));
        if (referralSketchNumber) {
            return referralSketchNumber;
        }
    }
    return null;
}
