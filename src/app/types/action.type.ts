import { ActionType } from "./actionType.type";

export interface Action { 
    id: number;
    name: string;
    typeName?: ActionType;
}