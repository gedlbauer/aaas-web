import { Action } from "./action.type";

export interface WebHookAction extends Action {
    requestUrl: string;
}

export function isWebHookAction(action?: Action) {
    return !!action
        && 'requestUrl' in action;
}