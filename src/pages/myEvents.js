import React from 'react'
import { Header } from '../components';
import { useNavigate } from 'react-router-dom';
import SideBarnav from '../components/sideBarnav';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Host from '../components/api';
export default function MyEvents() {

    return (
        <SideBarnav body={<Body />} />
    );

}
function Body() {
    const navigate = useNavigate();
    var id = sessionStorage.getItem("user_id")
    if (id === null || id === undefined) {
        navigate('/login');
    }
    const navigateToMyDetails = () => {
        navigate('/myeventDetails');
    };
    const [MyeventsData, setMyEventsData] = useState([]);

    useEffect(() => {
        axios({
            url: `${Host}/GetMyEvents`,
            method: "POST",
            data: { user_id: sessionStorage.getItem('user_id') }
        })
            .then((res1) => {
                setMyEventsData([res1.data]);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <div className="m-2 md:m-10 mt-20 p-2 md:p-6 bg-white rounded-3xl">
                <div className="flex items-center justify-between">
                    <Header title="My Events" />
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 dark:text-gray-200 dark:bg-secondary-dark-bg'>
                    {MyeventsData.length > 0 ? (
                        MyeventsData.map((item) => (
                            <div key={item.title} className="bg-gray-50 p-5 rounded-2xl max-h-max-content relative cursor-pointer" onClick={navigateToMyDetails} >
                                <div className="px-1 py-4 bg-gray-50">
                                    <div className="flex items-start mb-2">
                                        <div className="font-bold text-lg  text-gray-600">Event Name:</div>
                                        <p className='ml-4 text-lg font-bold  text-justify text-green-500'>{item.events.event_name}</p>
                                    </div>
                                    <p className="text-gray-700 mt-2 text-base">Description: {item.events.edescription}</p>
                                    <p className="text-gray-700 mt-2 text-base">Incharge: {item.events.eincharge}</p>
                                    <p className="text-gray-700 mt-2 text-base">Events Date: {item.events.event_date}</p>
                                    <p className="text-gray-700 mt-2 text-base">Max Teams: 150</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-700 mt-5">
                            <p className="text-red-500 font-medium">* No events registered.</p>
                        </div>
                    )}

                </div>

            </div>
        </>
    )
}



