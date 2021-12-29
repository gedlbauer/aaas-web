import { Action } from "./action.type";
import { Client } from "./client.type";

export interface Detector { 
    id: number;
    client: Client;
    action: Action;
    telemetryName: string;
    checkInterval: number;
    isRunning: boolean;
}
