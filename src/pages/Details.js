import React, { useEffect, useState } from 'react';
import { Header } from '../components';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SideBarnav from '../components/sideBarnav';
import axios from 'axios';
import Host from '../components/api';

export default function Details() {
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
    const { categoryId } = useParams();
    console.log(categoryId)
    const [categoryDetails, setCategoryDetails] = useState([]);
    // const [categoryCount, setcategoryCount] = useState([]);
    const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false);
    const [isMaxCountReached, setisMaxCountReached] = useState([]);
    const navigateToRegister = (categoryId) => {
        navigate(`/Register/${categoryId}`);
    };

    useEffect(() => {
        // Fetch category details
        axios.post(`${Host}/category/getDetails`, { id: parseInt(categoryId) })
            .then((res) => {
                let data = res.data;
                // console.log(data)
                if (data.success) {
                    setCategoryDetails([data.data]);
                }
            })
            .catch((err) => {
                console.log(err);
            });
        axios.post(`${Host}/CheckTeam`, {
            user_id: sessionStorage.getItem('user_id')
        })
            .then((res) => {
                setIsAlreadyRegistered(res.data.isRegistered);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [categoryId]);
    useEffect(() => {
        axios.post(`${Host}/GetCategoryC`, { id: parseInt(categoryId) })
            .then((res) => {
                let data = res.data;
                if (data.success) {
                    const categoryCount = data.data[0].category_count;
                    setisMaxCountReached(categoryCount);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [categoryId]);



    return (
        <>
            <div className="m-2 md:m-10 mt-20 p-2 md:p-6 bg-white rounded-3xl">
                <div className="flex items-center justify-between">
                    <Header title="Problem Statement Details" />
                </div>
                {categoryDetails.map((item, index) => (
                    <div key={index} className='mt-3'>
                        <div className="flex items-start mb-2">
                            <div className="font-bold text-lg  text-gray-600">Topic:</div>
                            <p className='ml-4 text-lg font-bold  text-justify text-green-500'>{item.name}</p>
                        </div>
                        <div className="flex items-start mb-2">
                            <div className="font-bold text-lg text-gray-600">Incharge:</div>
                            <p className='ml-4 text-lg font-bold  text-justify text-green-500'>{item.incharge}</p>
                        </div>
                        <div className="flex items-start mb-2">
                            <div className="font-bold text-lg text-gray-600">Description:</div>
                            <p className='ml-4 text-base font-semibold text-justify text-gray-600'>{item.description}</p>
                        </div>

                        <div className="flex items-start mb-2">
                            <div className="font-bold text-lg text-gray-600">MaxTeams:</div>
                            <p className='ml-4 text-lg font-bold text-green-500'>{item.max_team}</p>
                        </div>
                        {/* <div className="flex items-start mb-2">
                            <div className="font-bold text-lg text-gray-600">MinTeams:</div>
                            <p className='ml-4 text-lg font-bold text-green-500'>10</p>
                        </div> */}
                        {/* <div className="flex items-start mb-2">
                            <div className="font-bold text-lg text-gray-600">RegisteredTeamsCount:</div>
                            <p className='ml-4 text-lg font-bold text-green-500'>{item.RegisteredTeamsCount}</p>
                        </div> */}
                        <div className="flex items-start mb-2">
                            <div className="font-bold text-lg text-gray-600">PerTeam:</div>
                            <p className='ml-4 text-lg font-bold text-green-500'>3</p>
                        </div>
                    </div>
                ))}
                <Stack spacing={2} direction="row" className='flex justify-center'>
                    {
                        // console.log(categoryDetails)
                        (categoryDetails.length !== 0 && categoryDetails[0].registration === 1) && (!isAlreadyRegistered || (isMaxCountReached > 50)) ? (
                            <Button variant="contained" onClick={() => navigateToRegister(categoryId)}>Register Now</Button>
                        ) : (
                            <p className="text-red-500 font-medium">* Already Registered Or Maximum Count Reached or Registration Closed</p>
                        )
                    }
                </Stack>
            </div>
        </>
    );
}
