import Header from "../../components/header";
import Tablemodal from "./tablemodal"
import { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import Viewcategory from "../../components/view/ViewCategory";
import AddnewTeam from "../../components/Addnew/AddnewTeams";
import SideBarnav from "../../components/sideBarnav";
import { useNavigate } from "react-router-dom";
export default function TotalUsers() {
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
  const [isAddnewTeamsOpen, setIsAddnewTeamsOpen] = useState(false);
  const openAddnewTeams = () => {
    setIsAddnewTeamsOpen(true);
  };

  const closeAddnewTeams = () => {
    setIsAddnewTeamsOpen(false);
  };
  return (
    <>
      <div className="m-2 md:m-10 mt-20 p-2 md:p-6 bg-white rounded-3xl overflow-auto">
        <div className="flex items-center justify-between">
          <Header title="Events Category" />
        </div>
        <div className="mt-5">
          <Tablemodal />
        </div>
      </div>
      <div className="m-2 md:m-10 mt-20 p-2 md:p-6 bg-white rounded-3xl overflow-auto">
        <div className="flex items-center justify-between " >
          <Header title="Registered Teams" />
          <TooltipComponent content="Add New" position="BottomCenter" onClick={openAddnewTeams}>
            <div className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg">
              <IoIosAddCircle color="#4ade80" className='w-8 h-6' />
              <p>
                <span className="text-green-400 font-medium text-base"  >Add New Team</span>{' '}
              </p>
            </div>
          </TooltipComponent>
        </div>
        <div className="mt-5">
          <Viewcategory />
        </div>
      </div>
      <AddnewTeam open={isAddnewTeamsOpen} handleClose={closeAddnewTeams} />

    </>

  );
}
