import { Action } from "./action.type";

export interface MailAction extends Action {
    mailAddress: string;
    mailContent: string;
}

export function isMailAction(action?: Action): boolean {
    return !!action
        && 'mailAddress' in action
        && 'mailContent' in action;
}