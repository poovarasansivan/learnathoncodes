import React from 'react'
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { useStateContext } from '../contexts/contextProvider';
import Navbar from './navbar';
import Sidebar from './sidebar';
// import { useNavigate } from 'react-router-dom';
export default function SideBarnav(props) {
    // const navigate = useNavigate();
    // var id = sessionStorage.getItem("user_id")
    // if (id === null || id === undefined) {
    //   navigate('/login');
    // }
    const { activeMenu } = useStateContext();
    return (
        <div className="flex relative dark:bg-main-dark-bg">
            <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
                <TooltipComponent content="Settings" position="Top">
                    <button className="text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white" style={{ background: '#3b82f6', borderRadius: '50%' }}>
                        <FiSettings />
                    </button>
                </TooltipComponent>
            </div>
            {activeMenu ? (
                <div className='w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white'>
                    <Sidebar />
                </div>
            ) : (
                <div className="w-0 dark:bg-secondary-dark-bg"> <Sidebar /> </div>
            )}
            <div className={`dark:bg-main-bg bg-main-bg min-h-screen w-full ${activeMenu ?
                'md:ml-72'
                : ' flex-2 '}`}>
                <div className={'fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full'}>
                    <Navbar />
                </div>
                {
                    props.body
                }
                <div>
                </div>
            </div>
        </div>

    )
}
