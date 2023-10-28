//ONly for admin access 

import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1400,
    maxHeight: '80%',  // Set a maximum height
    overflowY: 'auto',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const Year = [
    {
        value: 'Year',
        label: 'Year',
    },
    {
        value: 'I Year',
        label: 'I Year',
    },
    {
        value: 'II Year',
        label: 'II Year',
    },
    {
        value: 'III Year',
        label: 'III Year',
    },
    {
        value: 'IV Year',
        label: 'IV Year',
    },
];
const Teamsize = [
    {
        value: '1',
        label: '1',
    },
    {
        value: '2',
        label: '2',
    },
    {
        value: '3',
        label: '3',
    },
    {
        value: '4',
        label: '4',
    },
    {
        value: '5',
        label: '5',
    },
    {
        value: '6',
        label: '6',
    },
];
const SpecialLab = [
    {
        value: 'BlockChain Technology',
        label: 'BlockChain Technology',
    },
    {
        value: 'Industrial Mobile And Web App Development',
        label: 'Industrial Mobile And Web App Development',
    },
    {
        value: 'AI Lab',
        label: 'AI Lab',
    },

];


const AddnewTeams = ({ open, handleClose }) => {

    const navigate = useNavigate();
    var id = sessionStorage.getItem("user_id")
    if (id === null || id === undefined) {
      navigate('/login');
    }
    const navigateToEvents = () => {
        navigate('/Events');

    };

    const [teamSize, setTeamSize] = React.useState('1');
    const handleTeamSizeChange = (event) => {
        setTeamSize(event.target.value);
    };
    const renderTeamFields = () => {
        let fields = [];
        for (let i = 0; i < teamSize; i++) {
            fields.push(
                <div key={i} className='mt-5'>
                    <TextField
                        required
                        id={`team-member-${i + 1}`}
                        label={`Team Member ${i + 1}`}
                        defaultValue="Name"
                    />
                    <TextField
                        required
                        id={`phone-${i + 1}`}
                        label={`Phone no ${i + 1}`}
                        type="mobile"
                        defaultValue={`+91xxxxxxxxxx${i + 1}`}
                        autoComplete="off"
                    />
                    <TextField
                        id={`year-${i + 1}`}
                        select
                        label={`Select Special Lab ${i + 1}`}
                        defaultValue="AI Lab"
                        helperText="Select Your Special Lab"
                    >
                        {SpecialLab.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        id={`year-${i + 1}`}
                        select
                        label={`Select Year ${i + 1}`}
                        defaultValue="Year"
                        helperText="Select Your Academic Year"
                    >
                        {Year.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
            );
        }
        return fields;
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
                                id="outlined"
                                select
                                label="Select Team Size"
                                value={teamSize}
                                onChange={handleTeamSizeChange}
                                helperText="Select Team Size"
                            >
                                {Teamsize.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                        {renderTeamFields()}
                    </Box>
                    <Stack spacing={2} direction="row" className='flex justify-center'>
                        <Button variant="contained" onClick={navigateToEvents}>Submit</Button>
                    </Stack>
                </Box>
            </Fade>
        </Modal>
    );
}

export default AddnewTeams;
