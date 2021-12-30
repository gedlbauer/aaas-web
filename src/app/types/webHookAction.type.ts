import { Action } from "./action.type";

export interface WebHookAction extends Action {
    requestUrl: string;
}
