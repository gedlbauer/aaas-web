export const ACTION_TYPES = ['WebHookAction', 'MailAction'] as const;
type ActionTuple = typeof ACTION_TYPES; // readonly ['WebHookAction', 'MailAction']
export type ActionType = ActionTuple[number];  // 'WebHookAction' | 'MailAction';
