import React, { useState, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import axios from "axios";
import Host from '../components/api';
import MenuItem from '@mui/material/MenuItem';

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

const AddnewCategory = ({ open, handleClose }) => {
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [maxTeam, setMaxTeam] = useState('');
  const [incharge, setIncharge] = useState('');
const Created_by=sessionStorage.getItem('user_id')
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
    const requestData = {
      category_name: categoryName,
      description: description,
      max_team: parseInt(maxTeam),
      incharge: incharge,
      created_by:Created_by,
    };

    try {
      const response = await fetch(`${Host}/Insertcategory`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        console.log('Data inserted successfully');
      } else {
        console.error('Error inserting data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
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
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
                <TextField
                  required
                  id="outlined-multiline-flexible"
                  label="Description"
                  multiline
                  maxRows={8}
                  minRows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                {/* <TextField
                  required
                  label="Incharge"
                  value={Created_by}
                  onChange={(e) => setCreated_by(e.target.value)}
                /> */}
                <TextField
                  id="outlined-required"
                  select
                  label="Select Incharge"
                  defaultValue="Select"
                  helperText="Please select Incharge"
                  value={incharge}
                  onChange={(e) => setIncharge(e.target.value)}
                >
                  {inchargeOptions.map((option, index) => (
                    <MenuItem key={index} value={option.name}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="outlined-number"
                  label="Max Teams"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={maxTeam}
                  onChange={(e) => setMaxTeam(e.target.value)}
                />
                <Stack spacing={2} className="flex justify-center" direction="row">
                  <Button variant="contained" type="submit">Submit</Button>
                </Stack>
              </div>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default AddnewCategory;
