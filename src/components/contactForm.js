import React, { useState } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you would typically send the data to your server or a third-party service
    // For this example, we'll simply log it to the console
    // console.log('Form data submitted:', formData);
    // Clear the form
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: '500px',
        margin: '0 auto',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="h5" gutterBottom>
        Contact Us
      </Typography>
      <TextField
        fullWidth
        margin="normal"
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        variant="outlined"
      />
      <TextField
        fullWidth
        margin="normal"
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        variant="outlined"
      />
      <TextField
        fullWidth
        margin="normal"
        label="Message"
        name="message"
        multiline
        rows={4}
        value={formData.message}
        onChange={handleChange}
        variant="outlined"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
      >
        Submit
      </Button>
    </Box>
  );
};

export default ContactForm;