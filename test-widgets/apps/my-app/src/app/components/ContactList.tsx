import React, { useState } from 'react';
import axios from 'axios';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, MenuItem, Typography, Box
} from '@mui/material';
import { IContact } from '../types';

const apiUrl = import.meta.env.VITE_API_URL;

interface ContactListProps {
    onContactAdded: () => void;
    contacts: IContact[];
    setContacts: React.Dispatch<React.SetStateAction<IContact[]>>;
}

const ContactList: React.FC<ContactListProps> = ({ onContactAdded, contacts, setContacts }) => {
    const [viewContact, setViewContact] = useState<IContact | null>(null);
    const [editContact, setEditContact] = useState<IContact | null>(null);
    const [viewDialogOpen, setViewDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);

    const handleViewContact = (contact: IContact) => {
        setViewContact(contact);
        setViewDialogOpen(true);
    };

    const handleEditContact = (contact: IContact) => {
        setEditContact({ ...contact });
        setEditDialogOpen(true);
    };

    const handleEditChange = (field: string, value: string) => {
        if (!editContact) return;

        if (field.startsWith('address.')) {
            const addressField = field.split('.')[1];
            setEditContact({
                ...editContact,
                address: {
                    ...editContact.address,
                    [addressField]: value,
                },
            });
        } else {
            setEditContact({
                ...editContact,
                [field]: value,
            });
        }
    };

    const handleSaveEdit = async () => {
        if (!editContact) return;

        try {
            const response = await axios.put(`${apiUrl}/contacts/${editContact.id}`, editContact);
            setContacts(contacts.map(c => (c.id === editContact.id ? response.data : c)));
            setEditDialogOpen(false);
            setEditContact(null);
        } catch (error) {
            console.error('Error updating contact:', error);
        }
    };

    return (
        <Box sx={{ padding: 2, height: '100vh', overflow: 'auto', bgcolor: '#f5f5f5' }}>
            <Typography variant="h5" gutterBottom>
                Contact List Widget
            </Typography>

            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Phone Number</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {contacts.map(contact => (
                            <TableRow key={contact.id}>
                                <TableCell>{contact.firstName}</TableCell>
                                <TableCell>{contact.lastName}</TableCell>
                                <TableCell>{contact.phoneNumber}</TableCell>
                                <TableCell>{contact.type || '-'}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        size="small"
                                        onClick={() => handleViewContact(contact)}
                                        sx={{ mr: 1 }}
                                    >
                                        View
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        size="small"
                                        onClick={() => handleEditContact(contact)}
                                    >
                                        Edit
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={viewDialogOpen} onClose={() => setViewDialogOpen(false)}>
                <DialogTitle>View Contact</DialogTitle>
                <DialogContent>
                    {viewContact && (
                        <Box>
                            <Typography><strong>First Name:</strong> {viewContact.firstName}</Typography>
                            <Typography><strong>Last Name:</strong> {viewContact.lastName}</Typography>
                            <Typography><strong>Phone Number:</strong> {viewContact.phoneNumber}</Typography>
                            <Typography><strong>Type:</strong> {viewContact.type || '-'}</Typography>
                            {viewContact.address && (
                                <Box sx={{ mt: 1 }}>
                                    <Typography><strong>Address:</strong></Typography>
                                    <Typography>Street: {viewContact.address.street}</Typography>
                                    <Typography>City: {viewContact.address.city}</Typography>
                                    <Typography>State: {viewContact.address.state || '-'}</Typography>
                                    <Typography>Postal Code: {viewContact.address.postalCode || '-'}</Typography>
                                    <Typography>Country: {viewContact.address.country || '-'}</Typography>
                                </Box>
                            )}
                            <Typography><strong>Date of Birth:</strong> {viewContact.dateOfBirth || '-'}</Typography>
                            <Typography><strong>Created At:</strong> {viewContact.createdAt || '-'}</Typography>
                            <Typography><strong>Updated At:</strong> {viewContact.updatedAt || '-'}</Typography>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setViewDialogOpen(false)} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
                <DialogTitle>Edit Contact</DialogTitle>
                <DialogContent>
                    {editContact && (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                            <TextField
                                label="First Name"
                                value={editContact.firstName}
                                onChange={(e) => handleEditChange('firstName', e.target.value)}
                                fullWidth
                                required
                            />
                            <TextField
                                label="Last Name"
                                value={editContact.lastName}
                                onChange={(e) => handleEditChange('lastName', e.target.value)}
                                fullWidth
                                required
                            />
                            <TextField
                                label="Phone Number"
                                value={editContact.phoneNumber}
                                onChange={(e) => handleEditChange('phoneNumber', e.target.value)}
                                fullWidth
                                required
                            />
                            <TextField
                                select
                                label="Type"
                                value={editContact.type || ''}
                                onChange={(e) => handleEditChange('type', e.target.value)}
                                fullWidth
                            >
                                <MenuItem value="">None</MenuItem>
                                <MenuItem value="personal">Personal</MenuItem>
                                <MenuItem value="business">Business</MenuItem>
                                <MenuItem value="family">Family</MenuItem>
                            </TextField>
                            <Typography variant="subtitle1">Address</Typography>
                            <TextField
                                label="Street"
                                value={editContact.address?.street || ''}
                                onChange={(e) => handleEditChange('address.street', e.target.value)}
                                fullWidth
                            />
                            <TextField
                                label="City"
                                value={editContact.address?.city || ''}
                                onChange={(e) => handleEditChange('address.city', e.target.value)}
                                fullWidth
                            />
                            <TextField
                                label="State"
                                value={editContact.address?.state || ''}
                                onChange={(e) => handleEditChange('address.state', e.target.value)}
                                fullWidth
                            />
                            <TextField
                                label="Postal Code"
                                value={editContact.address?.postalCode || ''}
                                onChange={(e) => handleEditChange('address.postalCode', e.target.value)}
                                fullWidth
                            />
                            <TextField
                                label="Country"
                                value={editContact.address?.country || ''}
                                onChange={(e) => handleEditChange('address.country', e.target.value)}
                                fullWidth
                            />
                            <TextField
                                label="Date of Birth"
                                type="date"
                                value={editContact.dateOfBirth ? new Date(editContact.dateOfBirth).toISOString().split('T')[0] : ''}
                                onChange={(e) => handleEditChange('dateOfBirth', e.target.value)}
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                            />
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditDialogOpen(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveEdit} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ContactList;