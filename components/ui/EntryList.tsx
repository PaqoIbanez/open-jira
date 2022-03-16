import { List, Paper } from '@mui/material'
import { DragEvent, FC, useContext, useMemo } from 'react';
import { EntriesContext } from '../../context/entries';
import { Entry, EntryStatus } from '../../interfaces';
import { EntryCard } from './';
import { UIContext } from '../../context/ui/UIContext';
import styles from './EntryList.module.css'

interface Prop {
    status: EntryStatus;
}

export const EntryList: FC<Prop> = ({ status }) => {

    const { entries, updateEntry } = useContext(EntriesContext);
    const { isDragging, setEndDragging } = useContext(UIContext)

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
            className={isDragging ? styles.dragging : ''}
        >
            <Paper
                sx={{
                    height: 'calc(100vh - 150px)',
                    overflow: 'scroll',
                    padding: '0px 10px'
                }}
                className={'entryList'}
                elevation={1}
            >
                <List sx={{ opacity: isDragging ? 0.4 : 1, transition: 'all .3s' }}>
                    {
                        entriesByStatus.map(entry => <EntryCard key={entry._id} entry={entry} />)
                    }
                </List>
            </Paper>
        </div>
    )
}
