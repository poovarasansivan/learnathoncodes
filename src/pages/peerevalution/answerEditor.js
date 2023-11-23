import React, { useEffect, useState, useRef } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from "axios";
import Host from "../../components/api";
import { useNavigate } from 'react-router-dom';

export default function AnswerEditor() {
    const [categoryID, setCategoryID] = useState();
    const [questions, setquestions] = useState([]);
    const [insertionFlag, setInsertionFlag] = useState(false);
    const [saveButtonActive, setSaveButtonActive] = useState(true);
    const [data, setData] = useState([]);
    const [ids, setId] = useState([]);
    const question1Refs = useRef([]);
    const question2Refs = useRef([]);
    const question3Refs = useRef([]);
    const navigate = useNavigate();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    var id = sessionStorage.getItem("user_id")
    if (id === null || id === undefined) {
        navigate('/login');
    }
    useEffect(() => {
        fetchRubricsData()
    }, []);
    const fetchRubricsData = () => {
        axios({
            url: `${Host}/rubrics/getAll`,
            method: "GET"
        })
            .then((res) => {
                setData(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    useEffect(() => {
        axios({
            url: `${Host}/GetMyCategory`,
            method: "POST",
            data: {
                user_1: sessionStorage.getItem('user_id'),
            }
        })
            .then((res1) => {
                setCategoryID(res1.data.event.event_category_id);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        const fetchButtonStatus = () => {
            axios.get(`${Host}/ButtonStatus`)
                .then((res) => {
                    let data = res.data;
                    const buttonStatus = data.events[0].save_answer === 1;
                    setSaveButtonActive(buttonStatus);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        fetchButtonStatus();

        const interval = setInterval(() => {
            fetchButtonStatus();
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        axios({
            url: `${Host}/GetMyassignQuestions`,
            method: "POST",
            data: {
                user_1: sessionStorage.getItem('user_id'),
            }
        })
            .then((res1) => {
                setquestions(res1.data.events);
                const ids = res1.data.events.map(event => event.id);
                setId(ids);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        const storedIndex = localStorage.getItem('currentQuestionIndex');
        if (storedIndex !== null) {
            setCurrentQuestionIndex(parseInt(storedIndex, 10));
        }
    }, []);

    const handleSaveAnswers = () => {
        const updatedAnswer = {
            answered_by: sessionStorage.getItem('user_id'),
            questionset_id: questions[currentQuestionIndex].id,
            question_1_ans: question1Refs.current[currentQuestionIndex]?.value || '',
            question_2_ans: question2Refs.current[currentQuestionIndex]?.value || '',
            question_3_ans: question3Refs.current[currentQuestionIndex]?.value || '',
        };
        // const updatedQstatus = {
        //     user_id: sessionStorage.getItem('user_id'),
        //     question_id: questions[currentQuestionIndex].id,
        // };

        try {
            axios.post(`${Host}/InsertAnswer`, [updatedAnswer]);
            var tempData = [];
            data.forEach(element => {
                tempData.push({
                    question_id: element.question_id,
                    criteria_id: element.criteria_id,
                    selected: parseInt(element.selected),
                    created_by: element.created_by
                })
            });
            axios.post(`${Host}/RubricsData`, tempData);
            setInsertionFlag(true);
            setData([]);
            fetchRubrics();
            InsertQuestions()

            // Clear editor content after saving
            if (question1Refs.current[currentQuestionIndex]) {
                question1Refs.current[currentQuestionIndex].value = '';
            }
            if (question2Refs.current[currentQuestionIndex]) {
                question2Refs.current[currentQuestionIndex].value = '';
            }
            if (question3Refs.current[currentQuestionIndex]) {
                question3Refs.current[currentQuestionIndex].value = '';
            }

            // Increment the current question index
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                window.scrollTo(0, 0);
            } else {
                console.log('Last question saved!');
            }
            localStorage.setItem('currentQuestionIndex', currentQuestionIndex.toString());
        } catch (error) {
            console.error(error);
        }
    };

    const questionStatusData = [
        {
            Question_id: ids[currentQuestionIndex],
            User_id: sessionStorage.getItem("user_id")
        }
    ];

    const InsertQuestions = () => {
        axios({
            url: `${Host}/QuestionStatus`,
            method: "POST",
            data: questionStatusData
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.error(error);
            });
    }

    const fetchRubrics = () => {
        axios({
            url: `${Host}/rubrics/getAll`,
            method: "GET"
        })
            .then((res) => {
                setData(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const handleRadioChange = (criteria_id, rubrics_id) => {
        const updatedData = data.map(item => {
            if (item.criteria_id === criteria_id) {
                return {
                    ...item,
                    selected: rubrics_id,
                    created_by: sessionStorage.getItem("user_id"),
                    question_id: questions[currentQuestionIndex].id,
                };
            }
            return item;
        });

        setData(updatedData);
    };

    if (!questions || questions.length === 0) {
        return <div>No questions assigned to you.</div>;
    }

    return (
        <>
            <div>
                <div className='mt-7'>
                    {questions[currentQuestionIndex] && (
                        <div>
                            <p className='font-medium text-xl mb-2'>Question ID: {questions[currentQuestionIndex].id}</p>
                            <p className='font-medium text-xl mb-2'>Scenario {currentQuestionIndex + 1}</p>
                            <p className='font-small text-base mb-3'>
                                <div dangerouslySetInnerHTML={{ __html: questions[currentQuestionIndex].scenario }} />
                            </p>
                            <div>
                                <p className='font-medium text-xl mb-2'>Question 1</p>
                                <p className='font-small text-base mb-3'>
                                    <div dangerouslySetInnerHTML={{ __html: questions[currentQuestionIndex].question_1 }} />
                                </p>
                            </div>
                            <div className='mt-5'>
                                <p className='font-medium text-xl mb-2'>Question 2</p>
                                <p className='font-small text-base mb-3'>
                                    <div dangerouslySetInnerHTML={{ __html: questions[currentQuestionIndex].question_2 }} />
                                </p>
                            </div>
                            <div className='mt-5'>
                                <p className='font-medium text-xl mb-2'>Question 3</p>
                                <p className='font-small text-base mb-3'>
                                    <div dangerouslySetInnerHTML={{ __html: questions[currentQuestionIndex].question_3 }} />
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="overflow-x-auto mt-8">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="py-2 px-4 border">S.No</th>
                                <th className="py-2 px-4 border">Criteria</th>
                                <th className="py-2 px-4 border">Rubrics 1</th>
                                <th className="py-2 px-4 border">Rubrics 2</th>
                                <th className="py-2 px-4 border">Rubrics 3</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td className="py-2 px-4 border">{index + 1}</td>
                                    <td className="py-2 px-4 border">{item.criteria_name}</td>
                                    {item.rubrics.map((rubric) => (
                                        <td className="py-2 px-4 border" key={rubric.rubrics_id}>
                                            <div>
                                                <input
                                                    type="radio"
                                                    name={`rubric-${item.criteria_id}`}
                                                    value={rubric.rubrics_id}
                                                    checked={item.selected === rubric.rubrics_id}
                                                    onChange={() => handleRadioChange(item.criteria_id, rubric.rubrics_id)}
                                                    style={{ marginRight: '8px' }}
                                                />
                                                {rubric.rubrics_name}
                                            </div>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Stack spacing={2} direction="row" className='flex justify-center mt-6'>
                    <Button variant="contained" disabled={saveButtonActive === false} onClick={handleSaveAnswers}>Save Answers</Button>
                </Stack>
            </div>
        </>
    );
}
