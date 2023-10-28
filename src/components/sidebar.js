import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { SiAkamai } from 'react-icons/si';
import { MdOutlineDangerous } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { getLinksBasedOnUserRole } from './../data/dummy';
import { useState, useEffect } from 'react';
import { useStateContext } from '../contexts/contextProvider';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import  RoleLinks  from './role';
import Host from '../components/api';

export default function Sidebar() {
  // const navigate = useNavigate();
  // var id = sessionStorage.getItem("user_id")
  // if (id === null || id === undefined) {
  //   navigate('/login');
  // }
  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black bg-light-gray m-2';
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';
  const { activeMenu, setActiveMenu, screenSize } = useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu && screenSize <= 900) {
      setActiveMenu(false)
    }
  }

  const handleLinkClick = () => {
    setActiveMenu(true);
  }
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    // const Id = sessionStorage.getItem('user_id');
    
    axios({
      url: `${Host}/GetUserRole`,
      method: "POST",
      data: { id: sessionStorage.getItem('user_id') }
    })
      .then((res) => {
        let data = res.data;
        setUserRole(data.events.user_role)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const links = getLinksBasedOnUserRole(userRole)
  // console.log(links)
  return (
    <div className='ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10'>
      {activeMenu && (<>
        <div className='flex justify-between items-center'>
          <Link to='/' onClick={() => handleCloseSideBar()} className='items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900'>
            <SiAkamai /><span>Learnathon</span>
          </Link>
          <TooltipComponent className='Menu' position='BottomCenter'>
            <button type='button' onClick={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)} className='tex-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden'>
              <MdOutlineDangerous />
            </button>
          </TooltipComponent>
        </div>
        <div className='mt-10'>
          {links.map((item) => (
            <div key={item.title}>
              <p className='text-gray-400 m-3 mt-4 uppercase'>{item.title}</p>
              {item.links.map((Link) => (
                <NavLink
                  to={`/${Link.name}`}
                  key={Link.name}
                  // activeClassName="active"
                  onClick={handleLinkClick}
                  className={({ isActive }) => isActive ? activeLink : normalLink}
                >
                  {Link.icon}
                  <span className='capitalize'>
                    {Link.name}</span>
                </NavLink>
              ))}
            </div>
          ))}
        </div>
      </>)}
    </div>
  )
}

