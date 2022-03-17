import { FC, useReducer, useEffect } from 'react';

import { useSnackbar } from 'notistack';

import { entriesApi } from '../../api'
import { Entry } from '../../interfaces';
import { EntriesContext, entriesReducer } from './';

export interface EntriesState {
    entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: [],
}

export const EntriesProvider: FC = ({ children }) => {

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);
    const { enqueueSnackbar } = useSnackbar();

    const addNewEntry = async (description: string) => {
        try {
            await entriesApi.post<Entry>('/entries', { description })
                .then(data => dispatch({ type: '[Entries] - Add New Entry', payload: data.data }));
        } catch (error) {
            console.log(error);
        }
    }


    const updateEntry = async ({ _id, description, status }: Entry, showSnackBar = false) => {
        try {
            const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, { description, status });
            dispatch({ type: '[Entries] - Update Entry', payload: data });

            if (showSnackBar) {
                enqueueSnackbar('La entrada se actualizo correctamente', {
                    variant: 'success',
                    autoHideDuration: 2500,
                    anchorOrigin: {
                        horizontal: 'right',
                        vertical: 'bottom'
                    }
                });
            }

        } catch (error) {
            console.log({ error });
        }
    }

    const deleteEntry = async (id: string) => {
        const data = await entriesApi.delete<Entry>(`/entries/${id}`);
        if (data) {
            dispatch({ type: '[Entries] - Delete Entry', payload: id })
            enqueueSnackbar('La entrada seleccionada se borro correctamente', {
                variant: 'success',
                autoHideDuration: 2500,
                anchorOrigin: {
                    horizontal: 'right',
                    vertical: 'bottom'
                }
            });
        }
    }


    const refreshEntries = async () => {
        const { data } = await entriesApi.get<Entry[]>('/entries');
        dispatch({ type: '[Entries] - Refresh Entries', payload: data });
    }

    useEffect(() => {
        refreshEntries();
    }, []);

    return (
        <EntriesContext.Provider value={{
            ...state,

            // Methods
            addNewEntry,
            updateEntry,
            deleteEntry
        }}>
            {children}
        </EntriesContext.Provider>
    )
}