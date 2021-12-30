import { Detector } from "./detector.type";

export interface SlidingWindowDetector extends Detector {
    timeWindow?: number;
    useGreater?: boolean;
    threshold?: number;
}

