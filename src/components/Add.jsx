import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Avatar, Alert } from '@mui/material';
import Navbar from '../components/Navbar';

function Add() {
  const [formData, setFormData] = useState({ name: '', address: '', age: '', avatar: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let formErrors = {};
  
    // Validate name: must be in full upper case and contain more than 2 words
    const nameWords = formData.name.trim().split(' ');
    if (!formData.name.trim() || nameWords.length < 2 || formData.name !== formData.name.toUpperCase()) {
      formErrors.name = 'Name must be in full upper case and contain more than 2 words';
    }
  
    if (!formData.address.trim()) {
      formErrors.address = 'Address is required';
    }
  
    if (!formData.age || formData.age <= 0) {
      formErrors.age = 'Age must be a positive number';
    }
  
    const urlPattern = new RegExp('^(https?:\\/\\/)?' +
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|(\\d{1,3}\\.){3}\\d{1,3})' +
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
      '(\\?[;&a-z\\d%_.~+=-]*)?' +
      '(\\#[-a-z\\d_]*)?$', 'i');
  
    if (!formData.avatar || !urlPattern.test(formData.avatar)) {
      formErrors.avatar = 'Please enter a valid URL for the avatar';
    }
  
    return formErrors;
  };
  

  const handleCreate = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const currentDate = new Date().toISOString();

    try {
      await fetch('https://670f0c553e715186165667a0.mockapi.io/staffManagement', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, createdAt: currentDate }),
      });
      setFormData({ name: '', address: '', age: '', avatar: '' });
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating new staff:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <Navbar />
      <Box sx={{ mt: 4, mx: 'auto', maxWidth: 'sm', px: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add New Staff
        </Typography>
        <Box component="form" onSubmit={handleCreate} noValidate sx={{ mt: 2 }}>
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            error={!!errors.address}
            helperText={errors.address}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            error={!!errors.age}
            helperText={errors.age}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Avatar URL"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            error={!!errors.avatar}
            helperText={errors.avatar}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
          >
            Create Staff
          </Button>
        </Box>
        {Object.keys(errors).length > 0 && (
          <Alert severity="error" sx={{ mt: 2 }}>
            Please fix the above errors.
          </Alert>
        )}
      </Box>
    </>
  );
}

export default Add;
