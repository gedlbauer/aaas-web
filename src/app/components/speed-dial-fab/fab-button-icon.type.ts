import { ActionType } from "src/app/types/actionType.type";
import { DetectorType } from "src/app/types/detectorType.type";

export interface FabButtonIcon {
    title: string;
    url: ActionType | DetectorType;
}