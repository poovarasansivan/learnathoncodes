import React, { useEffect, useState } from 'react';
import { HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent, Toolbar } from '@syncfusion/ej2-react-richtexteditor';
import Button from '@mui/material/Button';
import axios from "axios";
import Host from "./api";

export default function AnswerEditor() {
    const [data, setData] = useState([]);
    const [categoryID, setCategoryID] = useState();
    const [loading, setLoading] = useState(true);
    const [idsForUpdate, setIdsForUpdate] = useState([]);
    const [questions, setquestions] = useState([]);
    const [insertionFlag, setInsertionFlag] = useState(false);
    const [Answers, setAnswers] = useState([]); // Define Answers state


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
                    // console.log(res1.data.events)
                    setLoading(false);
                    const id = res1.data.events.map(item => item.id);
                    setIdsForUpdate(id)
                    // console.log(id)
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        }
    }, [categoryID]);

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
    }

    useEffect(() => {
        axios({
            url: `${Host}/GetMyassignQuestions`,
            method: "POST",
            data: {
                assigned_to: sessionStorage.getItem('user_id'),
            }
        })
            .then((res1) => {
                setquestions(res1.data.events);
                // console.log(res1.data.events);

            })
            .catch((err) => {
                console.log(err);
            });
    }, []);


    const updateAssignedStatus = async (ids) => {
        try {
            const response = await axios.post(`${Host}/updateAssigned`, {
                id: ids,
                assigned: 0
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleUpdateStatus = () => {
        if (categoryID && questions.length > 0) {
            const ids = data.map(item => item.id);
            updateAssignedStatus(ids);
        }
    }
    useEffect(() => {
        if (categoryID && questions > 0) {
            const questionIDs = idsForUpdate;
            insertQuestionAssigned(categoryID, questionIDs);
            handleUpdateStatus(questionIDs)
        }
    }, [categoryID, questions, idsForUpdate]);

    // const handleSave = () => {
    //     const scenarioAnswers = {
    //         id: Answers.length + 1,
    //         categoryID: categoryID,
    //         questions1: question1Answer,
    //         questions_ans_1: questions.map(item => item.question_1_ans),
    //         questions2: question2Answer,
    //         questions_ans_2: questions.map(item => item.question_2_ans),
    //     };

    //     setAnswers([...Answers, scenarioAnswers]);
    //     console.log('Answers:', Answers);
    // }


    return (
        <div>
            {loading && <div>Loading...</div>}
            {!loading && questions.length > 0 && (
                <div className='mt-5'>
                    {questions.map((item, index) => (
                        <div key={index}>
                            <p className='font-medium text-xl mb-2'>Scenario {index + 1}</p>
                            <p className='font-small text-base mb-3'>
                                {item.scenario}
                            </p>
                            <p className='font-medium text-xl mb-2'>Question 1</p>
                            <p className='font-small text-base mb-3'>
                                {item.question_1}
                            </p>
                            <div>
                                <RichTextEditorComponent>
                                    <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]} />
                                </RichTextEditorComponent>
                            </div>
                            <div className='mt-5'>
                                <p className='font-medium text-xl mb-2'>Question 2</p>
                                <p className='font-small text-base mb-3'>
                                    {item.question_2}
                                </p>
                                <div>
                                    <RichTextEditorComponent>
                                        <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]} />
                                    </RichTextEditorComponent>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
