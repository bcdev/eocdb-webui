import { MessageLogState, newMessageLogState } from '../states/messageLogState';

import { HIDE_MESSAGE, MessageLogAction, POST_MESSAGE } from "../actions/messageLogActions";

const initialState = newMessageLogState();

export function messageLogReducer(state: MessageLogState, action: MessageLogAction): MessageLogState  {
    if (typeof state === 'undefined') {
        state = initialState;
    }
    switch (action.type) {
        case POST_MESSAGE: {
            const messageLogEntry = {
                id: state.newEntries.length + state.oldEntries.length,
                type: action.messageType,
                text: action.messageText,
            };
            return {...state, newEntries: [messageLogEntry, ...state.newEntries]}
        }
        case HIDE_MESSAGE: {
            const i = state.newEntries.findIndex(e => e.id == action.messageId);
            if (i >= 0) {
                const hiddenEntry = state.newEntries[i];
                const newEntries = [...state.newEntries];
                newEntries.splice(i, 1);
                const oldEntries = [hiddenEntry, ...state.oldEntries];
                return {...state, newEntries, oldEntries}
            }
        }
    }
    return state;
}
