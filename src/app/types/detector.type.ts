import { Action } from "./action.type";
import { Client } from "./client.type";
import { DetectorType } from "./detectorType.type";

export interface Detector { 
    id: number;
    client: Client;
    action: Action;
    telemetryName: string;
    checkInterval: number;
    isRunning: boolean;
    typeName: DetectorType;
}
