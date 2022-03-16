import { FC, useReducer, useEffect } from 'react';
import { Entry } from '../../interfaces';
import { EntriesContext, entriesReducer } from './';
import { entriesApi } from '../../api'
import { useSnackbar } from 'notistack';

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


    const updateEntry = async (entry: Entry, showSnackBar = false) => {
        try {
            await entriesApi.put<Entry>(`/entries/${entry._id}`, entry)
                .then(data => {
                    dispatch({ type: '[Entries] - Update Status', payload: data.data });
                    if (data.data.status === entry.status) {

                    }
                });
            if (showSnackBar) {
                enqueueSnackbar('La entrada se actualizo correctamente', {
                    variant: 'success',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        horizontal: 'right',
                        vertical: 'bottom'
                    }
                });
            }
        } catch (error: any) {
            console.log({ error });
        }
    }

    const refreshEntries = async () => {
        const { data } = await entriesApi.get<Entry[]>('/entries');
        dispatch({ type: '[Entries] - Refresh Entries', payload: data });
    }

    const deleteEntry = async (id: string) => {
        await entriesApi.delete<Entry>(`/entries/${id}`).then(data => {
            if (data) {
                dispatch({ type: '[Entries] - Delete Entry', payload: id })
                enqueueSnackbar('La entrada seleccionada se borro correctamente', {
                    variant: 'success',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        horizontal: 'right',
                        vertical: 'bottom'
                    }
                });
            }
        });
    }

    useEffect(() => {
        refreshEntries();
    }, []);

    return (
        <EntriesContext.Provider value={{
            ...state,
            addNewEntry,
            updateEntry,
            refreshEntries,
            deleteEntry
        }}>
            {children}
        </EntriesContext.Provider>
    )
}