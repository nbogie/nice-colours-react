import { Link } from "@chakra-ui/react";
import {
  parseOpenProcessingSocketIOLinkForSketchNumber,
  buildOpenProcessingSketchURL,
} from "../openProcessing";

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
