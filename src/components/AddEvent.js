import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
// import { useNavigate } from 'react-router-dom';
const Incharge = [
    {
        value: 'Sathish',
        label: 'Sathish',
    },
    {
        value: 'Rishvanth',
        label: 'Rishvanth',
    },
    {
        value: 'Poovarasan',
        label: 'Poovarasan',
    },
]
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

const AddEvent = ({ open, handleClose,navigate }) => {
    var id = sessionStorage.getItem("user_id")
    if (id === null || id === undefined) {
      navigate('/login');
    }
    const navigateToEvents = () => {
        navigate('/Events');
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

                            />
                            <TextField
                                required
                                id="outlined-multiline-flexible"
                                label="Description"
                                multiline
                                maxRows={8}
                            />
                            <TextField
                                id="outlined-required"
                                select
                                label="Select Incharge"
                                defaultValue="Select"
                                helperText="Please select Incharge"
                            >
                                {Incharge.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer dateAdapter={AdapterDayjs} components={['DatePicker']}>
                                    <DatePicker
                                        label={'Event Date'}
                                        views={['year', 'month', 'day']}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                            <TextField
                                id="outlined-number"
                                label="Max Teams"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <Stack spacing={2} className="flex justify-center" direction="row">
                                <Button variant="contained" onClick={navigateToEvents}>Submit</Button>
                            </Stack>
                        </div>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
}

export default AddEvent;
