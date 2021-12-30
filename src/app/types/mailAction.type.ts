import { Action } from "./action.type";

export interface MailAction extends Action {
    mailAddress: string;
    mailContent: string;
}
