import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { useState, useEffect } from 'react';
import Host from '../api';
import { useNavigate } from 'react-router-dom';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const ViewTeams = ({ open, handleClose, selectedTeamId }) => {
    const navigate = useNavigate();
    var id = sessionStorage.getItem("user_id")
    if (id === null || id === undefined) {
        navigate('/login');
    }
    const [teamData, setTeamData] = useState(null);
    useEffect(() => {
        if (selectedTeamId) {
            fetch(`${Host}/teamsid/${selectedTeamId}`)
                .then(response => response.json())
                .then(data => setTeamData(data));
        }
    }, [selectedTeamId]);
    // console.log(teamData)

    if (!teamData) {
        return null;
    }

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
                            '& .MuiTextField-root': { m: 2, width: '60ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div>
                            <div className="flex items-start mb-2">
                                <div className="font-bold text-lg  text-gray-600">Team ID:</div>
                                <p className='ml-4 text-lg font-medium text-justify text-green-500'>TI{teamData.id}</p>
                            </div>
                            <div className="flex items-start mb-2">
                                <div className="font-medium text-lg  text-gray-600">Category:</div>
                                <p className='ml-4 text-lg font-medium  text-justify text-green-500'>{teamData.category_name}</p>
                            </div>
                            <div className="flex items-start mb-2">
                                <div className="font-medium text-lg  text-gray-600">Team Name:</div>
                                <p className='ml-4 text-lg font-medium  text-justify text-gray-600'>{teamData.team_name}</p>
                            </div>
                            <div className="flex items-start mb-2">
                                <div className="font-medium text-lg  text-gray-600">Team Leader Name:</div>
                                <p className='ml-4 text-lg font-medium  text-justify text-gray-600'>{teamData.namet}</p>
                            </div>
                            <div className="flex items-start mb-2">
                                <div className="font-medium text-lg  text-gray-600">Team Leader Mobile:</div>
                                <p className='ml-4 text-lg font-medium  text-justify text-gray-600'>{teamData.phone}</p>
                            </div>
                            <div className="flex items-start mb-2">
                                <div className="font-medium text-lg text-gray-600">Team Member 1:</div>
                                {teamData.name3 && <p className='ml-4 text-lg font-medium text-justify text-gray-600'>{teamData.name3}</p>}
                            </div>
                            <div className="flex items-start mb-2">
                                <div className="font-medium text-lg text-gray-600">Team Member 2:</div>
                                {teamData.name2 && <p className='ml-4 text-lg font-medium text-justify text-gray-600'>{teamData.name2}</p>}
                            </div>
                            <div className="flex items-start mb-2">
                                <div className="font-medium text-lg text-gray-600">Team Member 3:</div>
                                {teamData.name1 && <p className='ml-4 text-lg font-medium text-justify text-gray-600'>{teamData.name1}</p>}
                            </div>

                        </div>
                    </Box>
                </Box>
            </Fade>
        </Modal>
    );
}

export default ViewTeams;
