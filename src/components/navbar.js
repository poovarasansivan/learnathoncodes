import React, { useEffect, useState } from 'react'
import { AiOutlineMenu } from 'react-icons/ai';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { useStateContext } from '../contexts/contextProvider';
import Useprofile from './useProfile';

const NavButton = ({ title, customFunc, icon, color, dotcolor }) => (
  <TooltipComponent content={title} position='BottomCenter'>
    <button type='button' onClick={customFunc} style={{ color }} className='relative text-xl rounded-full p-3 hover:bg-light-gray'>
      <span
        style={{ background: dotcolor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

export default function Navbar() {
  const [isuseProfileopen, setIsuseProfileopen] = useState(false);

  const closeuseProfile = () => {
    setIsuseProfileopen(false);
  };

  const { isClicked, screenSize, setScreenSize, setActiveMenu } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [setScreenSize]);

  useEffect(() => {
    if (screenSize < 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize, setActiveMenu]);

  return (
    <>
      <div className='flex justify-between p-2 md:mx-6 relative'>
        <NavButton
          title="Menu"
          customFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
          color="blue"
          icon={<AiOutlineMenu />}
        />
        <div className='flex'>
          {isClicked.Useprofile}
        </div>
        <Useprofile open={isuseProfileopen} handleClose={closeuseProfile} />
      </div>
    </>
  );
};
