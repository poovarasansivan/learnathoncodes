import React, { useEffect, useState, useRef } from 'react';
import Stack from '@mui/material/Stack';
import {
    HtmlEditor,
    Image,
    Inject,
    Link,
    QuickToolbar,
    RichTextEditorComponent,
    Toolbar,
} from '@syncfusion/ej2-react-richtexteditor';
import Button from '@mui/material/Button';
import axios from "axios";
import Host from "./api";
import { useNavigate } from 'react-router-dom';

export default function AnswerEditor() {
    const [data, setData] = useState([]);
    const [categoryID, setCategoryID] = useState();
    const [loading, setLoading] = useState(true);
    const [idsForUpdate, setIdsForUpdate] = useState([]);
    const [questions, setquestions] = useState([]);
    const [insertionFlag, setInsertionFlag] = useState(false);
    const [saveButtonActive, setSaveButtonActive] = useState(true);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const [answers, setAnswers] = useState([]);

    const question1Refs = useRef([]);
    const question2Refs = useRef([]);
    const navigate = useNavigate();

    var id = sessionStorage.getItem("user_id")
    if (id === null || id === undefined) {
        navigate('/login');
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
        if (categoryID) {
            axios({
                url: `${Host}/GetAllQuestion`,
                method: "POST",
                data: {
                    category_id: categoryID,
                    created_by: sessionStorage.getItem('user_id'),
                }
            })
                .then((res1) => {
                    setData(res1.data.events);
                    setLoading(false);
                    const id = res1.data.events.map(item => item.id);
                    setIdsForUpdate(id);
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        }
    }, [categoryID]);

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
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const insertQuestionAssigned = async (categoryID, questionIDs) => {
        try {
            const response = await axios.post(`${Host}/InsertAssignQuestion`, {
                category_id: categoryID,
                question_id: idsForUpdate,
                assigned_to: sessionStorage.getItem('user_id'),
            });
            console.log(response.data);
            setInsertionFlag(true);
        } catch (error) {
            console.error(error);
        }
    };

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
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const currentQuestion = questions[currentQuestionIndex];

    const handleInsertAnswers = async (answers) => {
        try {
            const response = await axios.post(`${Host}/InsertAnswer`, answers);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSaveAnswers = () => {
        const updatedAnswers = questions.map((item, index) => ({
            answered_by: sessionStorage.getItem('user_id'),
            scenario: item.scenario,
            question_1: item.question_1,
            question_1_ans: question1Refs.current[index].value,
            question_2: item.question_2,
            question_2_ans: question2Refs.current[index].value,
        }));

        setAnswers(updatedAnswers);

        updatedAnswers.forEach((answer, index) => {
            console.log(`Scenario ${index + 1}:`, answer);
        });
        handleInsertAnswers(updatedAnswers);
    };

    return (
        <div>
            {loading && <div>Loading...</div>}
            {!loading && questions.length > 0 && (
                <div className='mt-5'>
                    <div key={currentQuestionIndex}>
                        <p className='font-medium text-xl mb-2'>Scenario {currentQuestionIndex + 1}</p>
                        <p className='font-small text-base mb-3'>
                            <div dangerouslySetInnerHTML={{ __html: currentQuestion.scenario }} />
                        </p>
                        <div>
                            <p className='font-medium text-xl mb-2'>Question 1</p>
                            <p className='font-small text-base mb-3'>
                                <div dangerouslySetInnerHTML={{ __html: currentQuestion.question_1 }} />
                            </p>
                            <RichTextEditorComponent
                                ref={(editor) => (question1Refs.current[currentQuestionIndex] = editor)}
                                placeholder="Enter your Answers here..."
                                onPaste={(e) => e.preventDefault()}
                                pasteCleanupSettings={{
                                    prompt: false
                                }}
                            >
                                <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]} />
                            </RichTextEditorComponent>
                        </div>
                        <div className='mt-5'>
                            <p className='font-medium text-xl mb-2'>Question 2</p>
                            <p className='font-small text-base mb-3'>
                                <div dangerouslySetInnerHTML={{ __html: currentQuestion.question_2 }} />
                            </p>
                            <RichTextEditorComponent
                                ref={(editor) => (question2Refs.current[currentQuestionIndex] = editor)}
                                placeholder="Enter your Answers here..."
                                onPaste={(e) => e.preventDefault()}
                                pasteCleanupSettings={{
                                    prompt: false
                                }}
                            >
                                <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]} />
                            </RichTextEditorComponent>
                        </div>
                    </div>
                    <Stack spacing={2} direction="row" className='flex justify-between mt-6'>
                        <Button variant="contained" disabled={currentQuestionIndex === 0} onClick={handlePreviousQuestion}>Previous</Button>
                        <Button variant="contained" disabled={currentQuestionIndex === questions.length - 1} onClick={handleNextQuestion}>Next</Button>
                    </Stack>
                    <Stack spacing={2} direction="row" className='flex justify-center mt-6'>
                        <Button variant="contained" disabled={!saveButtonActive} onClick={handleSaveAnswers}>Save Answers</Button>
                    </Stack>
                </div>
            )}
        </div>
    );
}
