import React, { useState, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import Host from '../components/api';
import dayjs from 'dayjs';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const AddEvent = ({ open, handleClose, navigate }) => {
  const [formData, setFormData] = useState({
    event_name: '',
    description: '',
    incharge: '',
    maxTeams: '',
    event_date: null, // Assuming event date is a Date object
  });

  var id = sessionStorage.getItem('user_id');
  if (id === null || id === undefined) {
    navigate('/login');
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      event_date: date,
    });
  };
  const [inchargeOptions, setInchargeOptions] = useState([]);

  useEffect(() => {
    axios.post(`${Host}/GetUserAdd`, { id: sessionStorage.getItem('user_id') })
        .then((res) => {
            setInchargeOptions(res.data.events);
        })
        .catch((err) => {
            console.log(err);
        });
  }, []);

  const handleFormSubmit = async () => {
    try {
      const formattedDate = dayjs(formData.event_date).format('YYYY-MM-DD');
  
      const response = await axios.post(`${Host}/AddEvents`, {
        event_name: formData.event_name,
        description: formData.description,
        incharge: formData.incharge,
        maxTeams: formData.maxTeams,
        event_date: formattedDate,
      });
  
      if (response.data.error) {
        console.error('Error inserting data:', response.data.error);
      } else {
        console.log('Data inserted successfully');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Box
            component="form"
            onSubmit={handleFormSubmit}
            sx={{
              '& .MuiTextField-root': { m: 1, width: '32ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                required
                id="outlined-required"
                label="Title"
                name="event_name"
                value={formData.event_name}
                onChange={handleInputChange}
              />
              <TextField
                required
                id="outlined-multiline-flexible"
                label="Description"
                multiline
                maxRows={8}
                minRows={2}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
              <TextField
                id="outlined-required"
                select
                label="Select Incharge"
                defaultValue="Select"
                helperText="Please select Incharge"
                name="incharge"
                value={formData.incharge}
                onChange={handleInputChange}
              >
                {inchargeOptions.map((option, index) => (
                  <MenuItem key={index} value={option.name}>
                    {option.name}
                  </MenuItem>
                ))}
              </TextField>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={'Event Date'}
                  views={['year', 'month', 'day']}
                  value={formData.event_date}
                  onChange={handleDateChange}
                />
              </LocalizationProvider>
              <TextField
                id="outlined-number"
                label="Max Teams"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                name="maxTeams"
                value={formData.maxTeams}
                onChange={handleInputChange}
              />
              <Stack spacing={2} className="flex justify-center" direction="row">
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              </Stack>
            </div>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default AddEvent;
