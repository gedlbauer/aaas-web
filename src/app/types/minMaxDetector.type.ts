import { Detector } from "./detector.type";

export interface MinMaxDetector extends Detector {
    min: number;
    max: number;
    maxOccurs: number;
    timeWindow: number;
}