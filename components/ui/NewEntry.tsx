import { useState, ChangeEvent, useContext } from 'react';

import { Button, Box, TextField } from '@mui/material';
import { SaveOutlined, AddCircleOutlineOutlined } from "@mui/icons-material";

import { EntriesContext } from '../../context/entries/EntriesContext';
import { UIContext } from '../../context/ui';

export const NewEntry = () => {

    const { addNewEntry } = useContext(EntriesContext);
    const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);

    const [touched, setTouched] = useState(false);
    const [inputValue, setInputValue] = useState('');


    const onTextFieldChanges = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputValue(event.target.value);
    }

    const onSave = () => {
        if (inputValue.length === 0) return;

        addNewEntry(inputValue);

        setIsAddingEntry(false);
        setTouched(false);
        setInputValue('');
    }

    return (
        <Box sx={{ marginBottom: 2, paddingX: 1 }}>

            {
                isAddingEntry ? (
                    <>
                        <TextField
                            fullWidth
                            sx={{ marginTop: 2, marginBottom: 1 }}
                            placeholder='Nueva entrada'
                            autoFocus
                            multiline
                            error={inputValue.length <= 0 && touched}
                            label='Nueva entrada'
                            helperText={inputValue.length <= 0 && touched && 'Ingrese un valor'}
                            value={inputValue}
                            onChange={onTextFieldChanges}
                            onBlur={() => setTouched(true)}
                        />
                        <Box
                            display='flex'
                            justifyContent='space-between'
                        >
                            <Button variant='text' onClick={() => setIsAddingEntry(false)}>
                                Cancelar
                            </Button>
                            <Button variant='contained' onClick={onSave} color='info' endIcon={<SaveOutlined />} >
                                Guardar
                            </Button>
                        </Box>
                    </>
                ) : (
                    <Button
                        startIcon={<AddCircleOutlineOutlined />}
                        fullWidth
                        variant='outlined'
                        onClick={() => setIsAddingEntry(true)}
                    />
                )
            }
        </Box>
    )
}
