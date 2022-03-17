import { DragEvent, FC, useContext, useMemo } from 'react';

import { List, Paper } from '@mui/material'

import { EntryCard } from './';
import styles from './EntryList.module.css'
import { Entry, EntryStatus } from '../../interfaces';
import { UIContext } from '../../context/ui/UIContext';
import { EntriesContext } from '../../context/entries';

interface Prop {
    status: EntryStatus;
}

export const EntryList: FC<Prop> = ({ status }) => {

    const { entries, updateEntry } = useContext(EntriesContext);
    const { isDragging, setEndDragging, theme } = useContext(UIContext)

    const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status), [entries, status]);

    const allowDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }

    const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const id = event.dataTransfer.getData('text');

        const entry: Entry = entries.find(entry => entry._id === id)!;
        entry.status = status;
        updateEntry(entry);

        setEndDragging();
    }

    return (
        <div
            onDrop={onDropEntry}
            onDragOver={allowDrop}
            className={isDragging && theme === 'dark' ? styles.draggingDark : isDragging && theme === 'light' ? styles.draggingLight : ''}
        >
            <Paper
                sx={{
                    height: 'calc(100vh - 130px)',
                    overflow: 'scroll',
                    padding: '0px 10px',
                    backgroundColor: 'transparent'
                }}
                className={'entryList'}
                elevation={ 0 }
            >
                <List>
                    {
                        entriesByStatus.map(entry => <EntryCard key={entry._id} entry={entry} />)
                    }
                </List>
            </Paper>
        </div>
    )
}
