import React, { useState } from 'react';
import { Rules } from '../data/dummy';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Files from "../rules/Rules.pdf";
import SideBarnav from '../components/sideBarnav';
import axios from 'axios';
import { FcBullish } from 'react-icons/fc';
import { MdOutlineSupervisorAccount } from 'react-icons/md';
import { MdCategory } from 'react-icons/md';
import { useEffect } from 'react';
import Host from '../components/api';
import { useNavigate } from 'react-router-dom';
export default function Dashboard() {
  return (
    <SideBarnav body={<Body />} />
  )
}

function Body() {

  const navigate = useNavigate()
  var id = sessionStorage.getItem("user_id")
  if (id === null || id === undefined) {
    navigate('/login');
  }

  const [Categorycount, setCategorycount] = useState();
  const [Registercount, setRegistercount] = useState();
  useEffect(() => {
    axios({
      url: `${Host}/GetCcount`,
      method: "GET"
    })
      .then((res) => {
        setCategorycount(res.data[0].total_category_count);
      });
  }, []);
  useEffect(() => {
    axios({
      url: `${Host}/GetRcount`,
      method: "GET"
    })
      .then((res) => {
        setRegistercount(res.data[0].registercount);
      });
  }, []);
  // console.log(Registercount)
  const HomePageData = [
    {
      icon: <MdOutlineSupervisorAccount />,
      amount: "150",
      percentage: '-4%',
      title: 'Max Teams',
      iconColor: '#03C9D7',
      iconBg: '#E5FAFB',
      pcColor: 'red-600',
    },
    {
      icon: <MdCategory />,
      amount: Categorycount,
      percentage: '+23%',
      title: 'Total Categories',
      iconColor: 'rgb(255, 244, 229)',
      iconBg: 'rgb(254, 201, 15)',
      pcColor: 'green-600',
    },
    {
      icon: <FcBullish />,
      amount: Registercount,
      percentage: '+38%',
      title: 'Registered Count',
      iconColor: 'rgb(228, 106, 118)',
      iconBg: 'rgb(255, 244, 229)',
      pcColor: 'green-600',
    }
  ];

  return <>
    <div className='mt-10'>
      <div className="flex flex-wrap  lg:flex-nowrap justify-center">

        <div className="flex m-3 flex-wrap justify-center gap-6 items-center">
          {HomePageData.map((item) => (
            <div key={item.title} className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 p-4 pt-9 rounded-2xl'>
              <button type='button' style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className='text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl'>
                {item.icon}
              </button>
              <p className='mt-3'>
                <span className='text-lg font-semibold'>
                  {item.amount}
                </span>
              </p>
              <p className='text-sm text-gray-400 mt-1'>
                {item.title}
              </p>
            </div>
          ))}

        </div>
      </div>
      <div className="flex gap-2  flex-wrap justify-center">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-2 p-5 rounded-2xl md:w-7/12">
          <div className='flex justify-between'>
            <p className='font-semibold text-xl mt-2'>Rules and Regulations</p>
          </div>
          <div className='mt-1 flex gap-10 flex-wrap justify-center'>
            <div className=' m-4 pr-10'>
              {Rules.map((item) => (
                <div>
                  <p className="flex items-start text-justify gap-2 text-gray-500 mt-1">
                    <span className='text-gray-700'>{item.icon}</span>
                    <span>{item.rule}</span>
                  </p>
                  <p className="flex items-start gap-2 text-justify text-gray-500 mt-1">
                    <span>{item.Description}</span>
                  </p>
                </div>

              ))}

            </div>

          </div>
          <Stack direction="row" spacing={2} className='ml-10 mt-5'>
            <Button variant="contained" href={Files}>
              Download Rules
            </Button>
          </Stack>
        </div>
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg m-2 p-5 rounded-2xl md:w-3/12 h-fit">
          <div className="px-6 py-4 bg-white">
            <div className="font-bold text-xl ml-0 mb-1">Learnathon 2023</div>
            <p className="text-gray-700 mt-2 text-base">
              A Learnathon is an intense, time-bound event where individuals or teams collaborate to Learn innovative technology, typically in the fields, software development, or hardware engineering.
            </p>
          </div>
        </div>

      </div>
    </div>
  </>

}
