import React from 'react'
import { Header } from '../components';
import Allusers from './allusers';
import SideBarnav from '../components/sideBarnav';
import { useNavigate } from 'react-router-dom';
export default function users() {
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
    return (
        <>
            <div>
                <div className="m-2 md:m-10 mt-20 p-2 md:p-6 bg-white rounded-3xl">
                    <div className="flex items-center justify-between">
                        <Header title="Users Details" />
                    </div>
                    <div className='mt-8'>
                        <Allusers />
                    </div>
                </div>
            </div>
        </>
    )
}

