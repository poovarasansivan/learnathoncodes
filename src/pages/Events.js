import React, { useState } from 'react';  // Added useState import
import { Header } from '../components';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import AddEvent from '../components/AddEvent';  // Import AddEvent component
import SideBarnav from '../components/sideBarnav';
import Host from '../components/api';

export default function Events() {
    return (
        <SideBarnav body={<Body />} />
    );
}

function Body() {
    const navigate = useNavigate()
    var id = sessionStorage.getItem("user_id")
    if (id === null || id === undefined) {
      navigate('/login');
    }

    const navigateToDetails = () => {
        navigate('/TotalUsers');
    };
    const [isAddEventOpen, setIsAddEventOpen] = useState(false); // Added state for modal

    const handleAddEventClick = () => {
        setIsAddEventOpen(true);
    }

    const handleCloseAddEvent = () => {
        setIsAddEventOpen(false);
    }
    const [EventsData, setEventsData] = useState([]);
    useEffect(() => {
        axios({
            url: `${Host}/category/GetEvents`,
            method: "GET"
        })
            .then((res1) => {
                if (res1.data.success) {
                    setEventsData(res1.data.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return <>
        <div className="m-2 md:m-10 mt-20 p-2 md:p-6 bg-white rounded-3xl">
            <div className="flex items-center justify-between">
                <Header title="Events" />
            </div>
            <div className='mt-3'>
                <Stack spacing={2} direction="row">
                    <Button variant='outlined' color="success" onClick={handleAddEventClick}>+ Add Events</Button>
                </Stack>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 dark:text-gray-200 dark:bg-secondary-dark-bg'>
                {EventsData.map((item) => (
                    <div key={item.title} className="bg-gray-50 p-5 rounded-2xl max-h-max-content relative cursor-pointer" onClick={navigateToDetails}>
                        <div className="px-1 py-4 bg-gray-50">
                            <div className="flex items-start mb-2">
                                <div className="font-bold text-lg  text-gray-600">Event Name:</div>
                                <p className='ml-4 text-lg font-bold  text-justify text-green-500'>{item.event_name}</p>
                            </div>
                            <p className="text-gray-700 mt-2 text-base">Description: {item.description}</p>
                            <p className="text-gray-700 mt-2 text-base">Incharge: {item.name}</p>
                            <p className="text-gray-700 mt-2 text-base">EventsDate: {item.event_date}</p>
                            <p className="text-gray-700 mt-2 text-base">DeadLine: {item.registration_due}</p>

                        </div>
                    </div>
                ))}
            </div>

        </div>

<AddEvent open={isAddEventOpen} handleClose={handleCloseAddEvent} navigate={navigate} />
    </>
}

