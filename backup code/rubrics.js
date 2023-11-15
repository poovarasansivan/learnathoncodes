import React, { useState, useEffect } from 'react';
import axios from "axios";
import Host from "./api";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const RubricsTable = () => {
  const [rubricData, setRubricData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedData, setSelectedData] = useState([]);
  const [saveButtonActive, setSaveButtonActive] = useState(true);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  var user_id = sessionStorage.getItem("user_id")
  if (user_id === null || user_id === undefined) {
    navigate('/login');
  }

  useEffect(() => {
    axios({
      url: `${Host}/GetMyassignQuestions`,
      method: "POST",
      data: {
        user_1: sessionStorage.getItem('user_id'),
      }
    })
      .then((res1) => {
        setRubricData(res1.data.events || []); // Ensure rubricData is an empty array if response is null or undefined
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const fetchButtonStatus = () => {
      axios.get(`${Host}/ButtonStatus`)
        .then((res) => {
          let data = res.data;
          const buttonStatus = data.events[0]?.save_rubrics === 1; // Added a null check here
          setSaveButtonActive(buttonStatus);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchButtonStatus();

    const interval = setInterval(() => {
      fetchButtonStatus();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const rowsPerPage = 10;

  const handleCheckboxChange = (id, rubric, value) => {
    setRubricData(prevData => {
      return prevData.map(item => {
        if (item.id === id) {
          item[rubric] = value;
          setSelectedData(prevSelected => {
            const updatedSelectedData = prevSelected.filter(selected => selected.id !== id || selected.rubric !== rubric);
            if (value) {
              updatedSelectedData.push({ id, rubric });
            }
            return updatedSelectedData;
          });
        }
        return item;
      });
    });
  };

  const getSelectedRowData = (id) => {
    const selectedRow = rubricData.find(item => item.id === id);
    if (selectedRow) {
      return {
        question1: selectedRow.question_1,
        question2: selectedRow.question_2,
        isAvailableOnline: selectedRow.isAvailableOnline === "Yes" ? "yes" : "no",
        plagiarism: selectedRow.plagiarism === "Yes" ? "yes" : "no"
      };
    }
    return null;
  };

  const handleSaveRubrics = () => {
    const dataToSave = selectedData.map(({ id, rubric }) => {
      const selectedRowData = getSelectedRowData(id);
      if (selectedRowData) {
        return {
          created_by: user_id,
          question_1: selectedRowData.question1,
          question_2: selectedRowData.question2,
          isavailable_online: selectedRowData.isAvailableOnline,
          plagarisam: selectedRowData.plagiarism
        };
      }
      return null;
    }).filter(Boolean);

    axios.post(`${Host}/RubricsData`, dataToSave)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    setSelectedData([]);
  };


  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = rubricData.slice(indexOfFirstRow, indexOfLastRow);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
      <div className="container mx-auto mt-10">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            {rubricData.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="py-2 px-4 border">S.No</th>
                      <th className="py-2 px-4 border">Question 1</th>
                      <th className="py-2 px-4 border ">Question 2</th>
                      <th className="py-2 px-4 border w-1/4">Is this question available online</th>
                      <th className="py-2 px-4 border">Plagiarism</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentRows.map(({ id, question_1, question_2, isAvailableOnline, plagiarism }, index) => (
                      <tr key={id + 1}>
                        <td className="py-2 px-4 border">{index + 1}</td>
                        <td className="py-2 px-4 border w-1/4">{<div dangerouslySetInnerHTML={{ __html:question_1 }} />}</td>
                        <td className="py-2 px-4 border w-1/4">{<div dangerouslySetInnerHTML={{ __html:question_2 }} />}</td>
                        <td className="py-2 px-4 border">
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              className="form-radio text-indigo-600"
                              value="Yes"
                              checked={isAvailableOnline === "Yes"}
                              onChange={() => handleCheckboxChange(id, 'isAvailableOnline', "Yes")}
                            />
                            <span className="ml-2 text-gray-800">Yes</span>
                          </label>
                          <label className="inline-flex items-center ml-4">
                            <input
                              type="radio"
                              className="form-radio text-indigo-600"
                              value="No"
                              checked={isAvailableOnline === "No"}
                              onChange={() => handleCheckboxChange(id, 'isAvailableOnline', "No")}
                            />
                            <span className="ml-2 text-gray-800">No</span>
                          </label>
                        </td>
                        <td className="py-2 px-4 border">
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              className="form-radio text-indigo-600"
                              value="Yes"
                              checked={plagiarism === "Yes"}
                              onChange={() => handleCheckboxChange(id, 'plagiarism', "Yes")}
                            />
                            <span className="ml-2 text-gray-800">Yes</span>
                          </label>
                          <label className="inline-flex items-center ml-4">
                            <input
                              type="radio"
                              className="form-radio text-indigo-600"
                              value="No"
                              checked={plagiarism === "No"}
                              onChange={() => handleCheckboxChange(id, 'plagiarism', "No")}
                            />
                            <span className="ml-2 text-gray-800">No</span>
                          </label>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div>No questions assigned to you.</div>
            )}
          </>
        )}
        <Stack spacing={2} direction="row" className='flex justify-center mt-6'>
          <Button variant="contained" disabled={!saveButtonActive} onClick={handleSaveRubrics}>Submit</Button>
        </Stack>
      </div>
    );
    
};

export default RubricsTable;
