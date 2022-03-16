import { capitalize, Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material'
import { FC, DragEvent, useContext } from 'react';
import { UIContext } from '../../context/ui';
import { Entry } from '../../interfaces';
import { useRouter } from 'next/router';
import { formatDistanceToNowStrict } from "date-fns";
import es from "date-fns/locale/es";
interface Props {
    entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {

    const { setStartDragging, setEndDragging } = useContext(UIContext);
    const router = useRouter();

    const onDragStart = (event: DragEvent<HTMLDivElement>) => {
        // event.preventDefault();
        event.dataTransfer.setData('text', entry._id);
        setStartDragging();
        //todo: modificar para hacer el Drag
    }

    const onDragEnd = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        //todo: Cancelar el Drag
        setEndDragging();
    }

    const onClickRedirect = () => {
        router.push(`/entries/${entry._id}`)
    }

    return (
        <Card
            sx={{ marginBottom: '10px' }}
            // Eventos de Drag
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            elevation={4}
            onClick={onClickRedirect}
        >
            <CardActionArea>
                <CardContent>
                    <Typography sx={{ whiteSpace: 'pre-line' }} variant='subtitle1'>{entry.description}</Typography>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
                    <Typography variant='subtitle2'>
                        {
                            capitalize(formatDistanceToNowStrict(entry.createdAt, {
                                locale: es,
                                addSuffix: true
                            }))
                        }
                    </Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    )
}
