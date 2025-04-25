import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import axios from 'axios';
import ContactList from './components/ContactList';
import CreateContact from './components/CreateContact';
import { IContact } from './types';

const apiUrl = import.meta.env.VITE_API_URL;

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#d32f2f',
        },
    },
});

const App: React.FC = () => {
    const [contacts, setContacts] = useState<IContact[]>([]);

    const fetchContacts = async () => {
        try {
            const response = await axios.get(`${apiUrl}/contacts`);
            setContacts(response.data);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex', width: '100%', height: '100vh' }}>
                <Box sx={{ width: '50%', borderRight: '1px solid #ddd' }}>
                    <ContactList onContactAdded={fetchContacts} contacts={contacts} setContacts={setContacts} />
                </Box>
                <Box sx={{ width: '50%' }}>
                    <CreateContact onContactAdded={fetchContacts} />
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default App;