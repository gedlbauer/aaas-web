export interface Metric { 
    id: number;
    timestamp: Date;
    name: string;
    clientId: number;
    creatorId: string;
    value: number;
}