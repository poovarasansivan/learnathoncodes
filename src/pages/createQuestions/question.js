import React from 'react'
import { useNavigate } from 'react-router-dom';
import SideBarnav from '../../components/sideBarnav';
import { Header } from '../../components';
import { useEffect, useState } from 'react';
import axios from 'axios'
import Host from '../../components/api';

export default function question() {
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

    const navigatetoquestion = (categoryId) => {
        navigate(`/Text Editor/${categoryId}`);
    };

    return (
        <>
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  ">
                <div className="flex items-center justify-between mb-6">
                    <Header title="Take Question" />
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 dark:text-gray-200 dark:bg-secondary-dark-bg'  >
                    {MyeventsDetails.length > 0 ? (
                        MyeventsDetails.map((item) => (
                            <div key={item.title} className="bg-gray-50 p-4 rounded-2xl max-h-max-content relative cursor-pointer" onClick={() => navigatetoquestion(item.events.event_category_id)} >
                                <div className="px-1 py-4 bg-gray-50">
                                    <div className="flex items-start mb-2">
                                        <div className="font-bold text-lg  text-gray-600">CategoryName: </div>
                                        <p className='ml-4 text-lg font-bold   text-green-500'>{item.events.cname}</p>
                                    </div>
                                    <p className="text-gray-700 mt-2 text-justify text-base">Description: {item.events.cdescription}</p>
                                    <p className="text-gray-700 mt-2 text-base">Incharge: {item.events.cincharge}</p>
                                    <p className="text-gray-700 mt-2 text-base">Events Date: {item.events.event_date}</p>
                                    <p className="text-gray-700 mt-2 text-base">Max Teams: 100</p>
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
    );
}
