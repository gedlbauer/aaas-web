import { Action } from "./action.type";
import { DetectorType } from "./detectorType.type";

export interface Detector { 
    id: number;
    action?: Action;
    telemetryName: string;
    checkInterval: number;
    isRunning: boolean;
    typeName?: DetectorType;
}
