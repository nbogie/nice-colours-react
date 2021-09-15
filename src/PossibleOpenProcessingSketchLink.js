import { Link } from "@chakra-ui/react";

/** Given a possible socketioDestURL string, make a Link to the corresponding openprocessing sketch, if it is an openprocessing destination.  Else, null.
 *
 * @param props socketioDestURL: string
 * @returns Link | null
 */
export default function PossibleOpenProcessingSketchLink({ socketioDestURL }) {
  const sketchNum =
    parseOpenProcessingSocketIOLinkForSketchNumber(socketioDestURL);

  if (sketchNum) {
    return (
      <Link
        href={buildOpenProcessingSketchURL(
          parseOpenProcessingSocketIOLinkForSketchNumber(socketioDestURL)
        )}
        isExternal
      >
        Open sketch
      </Link>
    );
  } else {
    return null;
  }
}

/*
 https://openprocessing.org:30000/?sketch=971818
 https://openprocessing.org/sketch/971818
*/

/** 
 Speculatively looks for and returns an openprocessing sketch number in what might be an openprocessing socket.io endpoint.
 e.g. 992314712 from https://openprocessing.org:30000/?sketch=992314712

 Otherwise, returns null.
*/
export function parseOpenProcessingSocketIOLinkForSketchNumber(url) {
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

export function buildOpenProcessingSketchURL(sketchNumber) {
  return "https://openprocessing.org/sketch/" + sketchNumber;
}
