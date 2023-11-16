import React, { useState, useEffect } from 'react';
import { IoIosAddCircle, IoIosArrowForward } from "react-icons/io";
import { Header } from '../../components';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { useNavigate } from 'react-router-dom';
import AddnewCategory from '../../components/Addnew/AddnewCategory';
import SideBarnav from '../../components/sideBarnav';
import axios from "axios";
import Host from '../../components/api';

const Category = () => {
  const navigate = useNavigate()
  var id = sessionStorage.getItem("user_id")
  if (id === null || id === undefined) {
    navigate('/login');
  }
  const [isAddnewCategoryOpen, setIsAddnewCategoryOpen] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [userRole, setUserRole] = useState('');
  useEffect(() => {
    const userid1 = sessionStorage.getItem('user_id');

    axios.post(`${Host}/GetUserRoleC`, { id: userid1 })
      .then((res) => {
        let data1 = res.data;
        setUserRole(data1.events.user_role);
        // console.log(data1.events.user_role);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios({
      url: `${Host}/category/getAll`,
      method: "GET"
    })
      .then((res1) => {
        if (res1.data.success) {
          setCategoryData(res1.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const openAddnewCategory = () => {
    setIsAddnewCategoryOpen(true);
  };

  const closeAddnewTeams = () => {
    setIsAddnewCategoryOpen(false);
  };

  const handleCardClick = (categoryId) => {
    navigate(`/Details/${categoryId}`);
  };

  return (
    <SideBarnav body={
      <>
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
          <div className="flex items-center justify-between " >
            <Header category="Page" title="Category" />

            {userRole === '1' && ( // Check if userRole is 'admin'
              <TooltipComponent content="Add New" position="BottomCenter" onClick={openAddnewCategory}>
                <div className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg">
                  <IoIosAddCircle color="#4ade80" className='w-8 h-6' />
                  <p>
                    <span className="text-green-400 font-medium text-base" >Add New</span>{' '}
                  </p>
                </div>
              </TooltipComponent>
            )}

          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 dark:text-gray-200 dark:bg-secondary-dark-bg'>
            {categoryData && categoryData.map((item) => (
              <div key={item.id} className="bg-gray-50 p-5 rounded-2xl max-h-max-content relative">
                <div className="flex justify-end absolute top-2 right-2">
                  <TooltipComponent content="View" position="Topright" >
                    <div className="flex items-center hover:drop-shadow-xl  gap-0 cursor-pointer p-1 bg-green-300 hover:bg-green-400 rounded-full" onClick={() => handleCardClick(item.id)}>
                      <IoIosArrowForward color="white" className='w-8 h-6' />
                    </div>
                  </TooltipComponent>
                </div>
                <div className="px-1 py-4 bg-gray-50">
                  <div className="flex items-center">
                    <div className="font-bold text-base items-start ml-0 mb-1 text-gray-600">Topic:</div>
                    <p className='ml-2 text-lg font-bold  text-green-500 '>{item.name}</p>
                  </div>
                  <p className="text-gray-700 mt-2 text-base text-justify">Description: {item.description}</p>
                  <p className="text-gray-700 mt-2 text-base">Incharge: {item.incharge}</p>
                  <p className="text-gray-700 mt-2 text-base">Max Teams: {item.max_team}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <AddnewCategory open={isAddnewCategoryOpen} handleClose={closeAddnewTeams} />
      </>
    } />
  );
};

export default Category;
