
import { ChangeEvent, FC, useState, useContext, useMemo } from 'react'
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { CardHeader, Grid, Card, CardContent, TextField, CardActions, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, capitalize, IconButton, ThemeProvider, CssBaseline } from '@mui/material';
import { DeleteOutline, SaveOutlined } from '@mui/icons-material';
import { formatDistanceToNowStrict } from 'date-fns';
import es from "date-fns/locale/es";

import { UIContext } from '../../context/ui';
import { dbEntries } from "../../database";
import { Layout } from '../../components/layouts';
import { EntryStatus } from '../../interfaces/entry';
import { darkTheme, lightTheme } from '../../themes';
import { Entry as EntryType } from "../../interfaces/entry"
import { EntriesContext } from '../../context/entries/EntriesContext';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished']

interface Props {
    entry: EntryType
}

export const EntryPage: FC<Props> = ({ entry }) => {

    const router = useRouter();

    const { theme } = useContext(UIContext);
    const { updateEntry, deleteEntry } = useContext(EntriesContext);

    const [touched, setTouched] = useState(false);
    const [status, setStatus] = useState<EntryStatus>(entry.status);
    const [inputValue, setInputValue] = useState(entry.description);

    const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched])

    const onTextFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event?.target.value);
    }

    const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
        const { value: status } = event.target;
        setStatus(status as EntryStatus);
    }

    const saveEntry = async () => {

        if (inputValue.trim().length <= 0) return;

        const updatedEntry: EntryType = {
            ...entry,
            status,
            description: inputValue
        }

        await updateEntry(updatedEntry, true);
        router.push('/');
    }

    const onDeleteEntry = async () => {
        await deleteEntry(entry._id);
        router.push('/');
    }

    return (
        <ThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme}>
            <CssBaseline />
            <Layout title='Editar entrada'>

                <Grid
                    container
                    justifyContent='center'
                    sx={{ marginTop: 2 }}
                >
                    <Grid
                        item
                        xs={12}
                        sm={10}
                        md={6}
                    >
                        <Card>
                            <CardHeader
                                title='Entradas'
                                subheader={capitalize(formatDistanceToNowStrict(entry.createdAt, {
                                    locale: es,
                                    addSuffix: true
                                }))}
                            />
                            <CardContent>
                                <TextField
                                    sx={{ marginTop: -1, marginBottom: 1 }}
                                    fullWidth
                                    placeholder='Nueva entrada'
                                    autoFocus
                                    multiline
                                    label='Nueva entrada'
                                    value={inputValue}
                                    onBlur={() => setTouched(true)}
                                    onChange={onTextFieldChange}
                                    error={isNotValid}
                                    helperText={isNotValid && 'Ingrese un valor'}
                                />
                                <FormControl>
                                    <FormLabel>Estado:</FormLabel>
                                    <RadioGroup
                                        row
                                        value={status}
                                        onChange={onStatusChanged}
                                    >
                                        {
                                            validStatus.map(option => (
                                                <FormControlLabel
                                                    key={option}
                                                    value={option}
                                                    control={<Radio />}
                                                    label={capitalize(option)}
                                                />
                                            ))
                                        }
                                    </RadioGroup>
                                </FormControl>
                            </CardContent>
                            <CardActions>
                                <Button
                                    startIcon={<SaveOutlined />}
                                    variant='contained'
                                    fullWidth
                                    color='info'
                                    onClick={saveEntry}
                                    disabled={inputValue.length <= 0}
                                >
                                    Guardar
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Grid>

                <IconButton
                    onClick={onDeleteEntry}
                    sx={{
                        position: 'fixed',
                        bottom: 30,
                        right: 30,
                        backgroundColor: '#BF616A',
                        color: 'white'
                    }}>

                    <DeleteOutline />
                </IconButton>

            </Layout>
        </ThemeProvider>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { id } = params as { id: string };

    const entry = await dbEntries.getEntryById(id);

    if (!entry) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    return {
        props: {
            entry
        }
    }
}

export default EntryPage;
