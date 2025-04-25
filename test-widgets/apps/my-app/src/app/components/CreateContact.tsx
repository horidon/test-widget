import React, { useState } from 'react';
import axios from 'axios';
import { Box, Typography, TextField, MenuItem, Button } from '@mui/material';
import { IContact } from '../types';

const apiUrl = import.meta.env.VITE_API_URL;

interface ContactCreateProps {
  onContactAdded: () => void;
}

const ContactCreate: React.FC<ContactCreateProps> = ({ onContactAdded }) => {
  const [newContact, setNewContact] = useState<Partial<IContact>>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    type: undefined,
    address: {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
    },
    dateOfBirth: '',
  });

  const handleChange = (field: string, value: string) => {
    if (field.startsWith('address.')) {
      const addressField = field.split('.')[1];
      setNewContact({
        ...newContact,
        address: {
          ...newContact.address,
          [addressField]: value,
        },
      });
    } else {
      setNewContact({
        ...newContact,
        [field]: value,
      });
    }
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...newContact,
        address:
          newContact.address?.street || newContact.address?.city
            ? {
                street: newContact.address.street,
                city: newContact.address.city,
                state: newContact.address.state || undefined,
                postalCode: newContact.address.postalCode || undefined,
                country: newContact.address.country || undefined,
              }
            : undefined,
        dateOfBirth: newContact.dateOfBirth || undefined,
        type: newContact.type || undefined,
      };

      await axios.post(`${apiUrl}/contacts`, payload);
      setNewContact({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        type: undefined,
        address: {
          street: '',
          city: '',
          state: '',
          postalCode: '',
          country: '',
        },
        dateOfBirth: '',
      });
      onContactAdded();
    } catch (error) {
      console.error('Error creating contact:', error);
    }
  };

  return (
    <Box
      sx={{ padding: 2, height: '100vh', overflow: 'auto', bgcolor: '#f5f5f5' }}
    >
      <Typography variant="h5" gutterBottom>
        Contact Create Widget
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="First Name"
          value={newContact.firstName}
          onChange={(e) => handleChange('firstName', e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Last Name"
          value={newContact.lastName}
          onChange={(e) => handleChange('lastName', e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Phone Number"
          value={newContact.phoneNumber}
          onChange={(e) => handleChange('phoneNumber', e.target.value)}
          fullWidth
          required
        />
        <TextField
          select
          label="Type"
          value={newContact.type || ''}
          onChange={(e) => handleChange('type', e.target.value)}
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
          value={newContact.address?.street || ''}
          onChange={(e) => handleChange('address.street', e.target.value)}
          fullWidth
        />
        <TextField
          label="City"
          value={newContact.address?.city || ''}
          onChange={(e) => handleChange('address.city', e.target.value)}
          fullWidth
        />
        <TextField
          label="State"
          value={newContact.address?.state || ''}
          onChange={(e) => handleChange('address.state', e.target.value)}
          fullWidth
        />
        <TextField
          label="Postal Code"
          value={newContact.address?.postalCode || ''}
          onChange={(e) => handleChange('address.postalCode', e.target.value)}
          fullWidth
        />
        <TextField
          label="Country"
          value={newContact.address?.country || ''}
          onChange={(e) => handleChange('address.country', e.target.value)}
          fullWidth
        />
        <TextField
          label="Date of Birth"
          type="date"
          value={newContact.dateOfBirth || ''}
          onChange={(e) => handleChange('dateOfBirth', e.target.value)}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Create Contact
        </Button>
      </Box>
    </Box>
  );
};

export default ContactCreate;
