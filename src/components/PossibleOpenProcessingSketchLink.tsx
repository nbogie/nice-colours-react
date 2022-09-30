import { Link } from "@chakra-ui/react";
import {
    buildOpenProcessingSketchURL,
    parseOpenProcessingSocketIOLinkForSketchNumber,
} from "../openProcessing";

/** Given a possible socketioDestURL string, make a Link to the corresponding openprocessing sketch, if it is an openprocessing destination.  Else, null.
 *
 * @param props socketioDestURL: string
 * @returns Link | null
 */
interface PossibleOpenProcessingSketchLinkProps {
    socketioDestURL: string;
}
export default function PossibleOpenProcessingSketchLink({
    socketioDestURL,
}: PossibleOpenProcessingSketchLinkProps) {
    const sketchNum =
        parseOpenProcessingSocketIOLinkForSketchNumber(socketioDestURL);

    if (sketchNum) {
        const url = buildOpenProcessingSketchURL(sketchNum);
        return (
            <Link href={url} isExternal>
                Open sketch
            </Link>
        );
    } else {
        return null;
    }
}
