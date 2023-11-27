import React, { useState, useEffect } from 'react';
import SideBarnav from "../../components/sideBarnav";
import Header from "../../components/header";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from "axios";
import Host from "../../components/api";
import { useNavigate } from 'react-router-dom';
export default function McqEvaluation() {
    const [questions, setQuestions] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 3;
    const [selectedOptions, setSelectedOptions] = useState(Array(itemsPerPage).fill(null));
    const navigate = useNavigate();
    var id = sessionStorage.getItem("user_id")
    if (id === null || id === undefined) {
        navigate('/login');
    }
    useEffect(() => {
        axios.get(`${Host}/McqEvalution`)
            .then((res) => {
                setQuestions(res.data.events || []); // Set questions as an empty array if there's no data
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    useEffect(() => {
        setCurrentPage(0);
        const savedOptions = JSON.parse(localStorage.getItem('savedOptions')) || [];
        setSelectedOptions(savedOptions);
    }, []);

    const currentQuestions = questions.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    const handleOptionChange = (questionIndex, option) => {
        const updatedSelectedOptions = [...selectedOptions];
        updatedSelectedOptions[questionIndex] = option;
        setSelectedOptions(updatedSelectedOptions);
    };

    const handleAnswerSubmit = () => {
        console.log("Selected options:", selectedOptions);
        // Save answers to local storage
        localStorage.setItem('savedOptions', JSON.stringify(selectedOptions));
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const isLastPage = currentPage === Math.ceil(questions.length / itemsPerPage) - 1;
    const isFirstPage = currentPage === 0;

    return (
        <SideBarnav body={
            <>
                <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl ">
                    <div className="flex items-center justify-between mb-6">
                        <Header title={`MCQ Evaluation - Page ${currentPage + 1}`} />
                    </div>
                    <div>
                        {currentQuestions.map((question, index) => (
                            <div key={index} className="mb-4">
                                <h3 className='font-medium text-lg mb-2' style={{ display: 'flex', alignItems: 'center' }}>
                                    <span style={{ marginRight: '8px' }}>{`${currentPage * itemsPerPage + index + 1}.`}</span>
                                    <span dangerouslySetInnerHTML={{ __html: question.question }} />
                                </h3>

                                <ul>
                                    {[question.option1, question.option2, question.option3, question.option4].map((option, optionIndex) => (
                                        <li key={optionIndex} className="flex items-center bg-slate-100 p-2 rounded-md mb-2">
                                            <label>
                                                <div className='flex flex-row'>
                                                    <input
                                                        type="radio"
                                                        value={option}
                                                        checked={selectedOptions[currentPage * itemsPerPage + index] === option}
                                                        onChange={() => handleOptionChange(currentPage * itemsPerPage + index, option)}
                                                    />
                                                    <p className='ml-5 text-normal text-lg' dangerouslySetInnerHTML={{ __html: option }} />
                                                </div>
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <Stack spacing={2} direction="row" className='flex justify-center mt-6'>
                        {!isFirstPage && (
                            <Button variant="contained" onClick={handlePrevPage} >Previous Page</Button>
                        )}
                        {isLastPage ? (
                            <Button variant="contained" onClick={handleAnswerSubmit} >Save Answers</Button>
                        ) : (
                            <Button variant="contained" onClick={handleNextPage} >Next Page</Button>
                        )}
                    </Stack>
                </div>
            </>
        } />
    );
}
