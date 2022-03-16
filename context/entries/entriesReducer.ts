import { Entry } from '../../interfaces';
import { EntriesState } from './';

type EntriesActionType =
    | { type: '[Entries] - Add New Entry', payload: Entry }
    | { type: '[Entries] - Update Entry', payload: Entry }
    | { type: '[Entries] - Refresh Entries', payload: Entry[] }
    | { type: '[Entries] - Delete Entry', payload: string }

export const entriesReducer = (state: EntriesState, action: EntriesActionType): EntriesState => {

    switch (action.type) {
        case '[Entries] - Add New Entry':
            return {
                ...state,
                entries: [...state.entries, action.payload]
            }

        case '[Entries] - Update Entry':
            const { _id, description, status } = action.payload;
            return {
                ...state,
                entries: state.entries.map(entry => {
                    if (entry._id === _id) {
                        entry.description = description;
                        entry.status = status;
                    }
                    return entry;
                })
            }
        // return {
        //     ...state,
        //     entries: state.entries.map(entry => entry._id === id ? { ...entry, status: status } : entry)
        // }

        case '[Entries] - Refresh Entries':
            return {
                ...state,
                entries: [...action.payload]
            }

        case '[Entries] - Delete Entry':
            return {
                ...state,
                entries:  state.entries.filter( entry => entry._id !== action.payload )
            }

        default:
            return state;
    }

}