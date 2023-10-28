import React from 'react';
import { Header } from '../components';
import SideBarnav from '../components/sideBarnav';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import axios from 'axios'
import Host from '../components/api';
import { useNavigate } from 'react-router-dom';
export default function myEventDetails() {
    return (
        <SideBarnav body={<Body />} />
    );
};

function Body() {
    const navigate = useNavigate()
    var id = sessionStorage.getItem("user_id")
    if (id === null || id === undefined) {
      navigate('/login');
    }
    //    const navigatetoHome = () => {
    //     Navigate("/HomePage");
    //   };
    const [MyeventsDetails, setMyEventsDetails] = useState([]);
    useEffect(() => {
        axios({
            url: `${Host}/GetMyEvents`,
            method: "POST",
            data: { user_id: sessionStorage.getItem('user_id') }
        })
            .then((res1) => {
                setMyEventsDetails([res1.data]);
                // console.log(res1.data)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    const navigatetoHome = () => {
        navigate('/My Events');
    };
    // console.log(MyeventsDetails)
    return <>
        <div className="m-2 md:m-10 mt-20 p-2 md:p-6 bg-white rounded-3xl">
            <div className="flex items-center justify-between">
                <Header title="Problem Statement Details" />
            </div>
            {MyeventsDetails.map((item, index) => (
                <div key={index} className='mt-3'>

                    <div className="flex items-start mb-2">
                        <div className="font-bold text-lg  text-gray-600">Topic:</div>
                        <p className='ml-4 text-lg font-bold items-start text-justify text-green-500'>{item.events.category_name}</p>
                    </div>
                    <div className="flex items-start mb-2">
                        <div className="font-bold text-lg text-gray-600">Incharge:</div>
                        <p className='ml-4 text-lg font-bold  text-justify text-green-500'>{item.events.cincharge}</p>
                    </div>
                    <div className="flex items-start mb-2">
                        <div className="font-bold text-lg text-gray-600">Description:</div>
                        <p className='ml-4 text-base font-semibold  text-justify text-gray-600'>{item.events.cdescription}</p>
                    </div>
                    <div className='mt-10'>
                        <div className="flex items-start mb-2 text-center">
                            <div className="font-bold text-lg text-center text-gray-600">Team Details</div>
                        </div>
                        <div className="flex items-start mt-5 mb-2">
                            <div className="font-bold text-lg text-gray-600">Team Name:</div>
                            <p className='ml-4 text-base font-semibold items-start text-justify text-gray-600'>{item.events.team_name}</p>
                        </div>
                        <div className="flex items-start mt-5 mb-2">
                            <div className="font-bold text-lg text-gray-600">Team Leader :</div>
                            <p className='ml-4 text-base font-semibold text-justify text-gray-600'>{item.events.user_1_name}</p>
                        </div>
                        <div className="flex items-start mt-5 mb-2">
                            <div className="font-bold text-lg text-gray-600">Team Member 1 :</div>
                            <p className='ml-4 text-base font-semibold text-justify text-gray-600'>{item.events.user_1_name}</p>
                        </div>
                        <div className="flex items-start mt-5 mb-2">
                            <div className="font-bold text-lg text-gray-600">Team Member 2 :</div>
                            <p className='ml-4 text-base font-semibold text-justify text-gray-600'>{item.events.user_2_name}</p>
                        </div>
                        <div className="flex items-start mt-5 mb-2">
                            <div className="font-bold text-lg text-gray-600">Team Member 3 :</div>
                            <p className='ml-4 text-base font-semibold text-justify text-gray-600'>{item.events.user_3_name}</p>
                        </div>
                    </div>
                </div>
            ))}
            <Stack spacing={2} direction="row" className='flex justify-center'>
                <Button variant="contained" onClick={navigatetoHome} >Back</Button>
            </Stack>
        </div>
    </>
}


// import React from 'react'
// import { Header } from '../components';
// import { useNavigate } from 'react-router-dom';
// import SideBarnav from '../components/sideBarnav';
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// export default function myEventDetails() {

//     return (
//         <SideBarnav body={<Body />} />
//     );

// }
// function Body() {
//     const navigate = useNavigate();
//     const navigateToMyDetails = () => {
//         navigate('/myeventDetails');
//     };
//     const [MyeventsData, setMyEventsData] = useState([]);

//     useEffect(() => {
//         axios({
//             url: "http://localhost:8080/GetMyEvents",
//             method: "POST",
//             data: { user_id: sessionStorage.getItem('user_id') }
//         })
//             .then((res1) => {
//                 setMyEventsData([res1.data]);
//                 console.log(res1.data)
//             })
//             .catch((err) => {
//                 console.log(err);
//             });
//     }, []);
//     console.log(MyeventsData)
//     return (
//         <>
//             <div className="m-2 md:m-10 mt-20 p-2 md:p-6 bg-white rounded-3xl">
//                 <div className="flex items-center justify-between">
//                     <Header title="My Events Details" />
//                 </div>
//                 <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 dark:text-gray-200 dark:bg-secondary-dark-bg'>
//                     {MyeventsData.map((item) => (
//                         <div key={item.title} className="bg-gray-50 p-5 rounded-2xl max-h-max-content relative cursor-pointer" onClick={navigateToMyDetails} >
//                             <div className="px-1 py-4 bg-gray-50">
//                                 <div className="flex items-start mb-2">
//                                     <div className="font-bold text-lg  text-gray-600">Event Name:</div>
//                                     <p className='ml-4 text-lg font-bold  text-justify text-green-500'>{item.events.event_name}</p>
//                                 </div>
//                                 <p className="text-gray-700 mt-2 text-base">Description: {item.events.description}</p>
//                                 <p className="text-gray-700 mt-2 text-base">Incharge: {item.events.eincharge}</p>
//                                 <p className="text-gray-700 mt-2 text-base">Events Date: {item.events.event_date}</p>
//                                 <p className="text-gray-700 mt-2 text-base">Max Teams: 100</p>
//                             </div>
//                         </div>
//                     ))}

//                 </div>

//             </div>
//         </>
//     )
// }

