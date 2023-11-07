import React, { useEffect, useState } from 'react';
import { HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent, Toolbar } from '@syncfusion/ej2-react-richtexteditor';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import axios from "axios";
import Host from "./api";

export default function AnswerEditor() {
    const [currentPage, setCurrentPage] = useState(0);
    const [data, setData] = useState([]);
    const [categoryID, setCategoryID] = useState();
    const [loading, setLoading] = useState(true);
    console.log(data)
    const [idsForUpdate, setIdsForUpdate] = useState([]);

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

                    const ids = res1.data.events.map(item => item.id);
                    setIdsForUpdate(ids);
                    console.log(ids)
                })
                .catch((err) => {
                    console.log(err);
                    setLoading(false);
                });
        }
    }, [categoryID]);

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    }

    const handleNextPage = () => {
        if (currentPage < data.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    }
    const handleUpdateStatus = () => {
        updateAssignedStatus(idsForUpdate);
    }
    handleUpdateStatus()

    
    const insertQuestionAssigned = async (categoryID, questionID) => {
        try {
            const response = await axios.post(`${Host}/InsertAssignQuestion`, {
                category_id: categoryID,
                question_id: questionID,
                assigned_to: sessionStorage.getItem('user_id'),
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (categoryID && data.length > 0) {
            const currentQuestion = data[currentPage];
            insertQuestionAssigned(categoryID, currentQuestion.id);
        }
    }, [categoryID, currentPage, data]);


    return (
        <div>
            {loading && <div>Loading...</div>}
            {!loading && data.length > 0 && (
                <div className='mt-5'>
                    <p className='font-medium text-xl mb-2'>Scenario {currentPage + 1}</p>
                    <p className='font-small text-base mb-3'>
                        {data[currentPage].scenario}
                    </p>
                    <p className='font-medium text-xl mb-2'>Question 1</p>
                    <p className='font-small text-base mb-3'>
                        {data[currentPage].question_1}
                    </p>
                    <div>
                        <RichTextEditorComponent>
                            <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]} />
                        </RichTextEditorComponent>
                    </div>
                    <div className='mt-5'>
                        <p className='font-medium text-xl mb-2'>Question 2</p>
                        <p className='font-small text-base mb-3'>
                            {data[currentPage].question_2}
                        </p>
                        <div>
                            <RichTextEditorComponent>
                                <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]} />
                            </RichTextEditorComponent>
                        </div>
                    </div>
                    <div className='flex justify-end mt-3'>
                        <Stack spacing={2} direction="row">
                            {currentPage > 0 && <Button variant='outlined' color="primary" onClick={handlePrevPage}>Previous Page</Button>}
                            {data && data.length > 0 && currentPage < data.length - 1 && <Button variant='outlined' color="primary" onClick={handleNextPage}>Next Page</Button>}
                        </Stack>

                    </div>
                </div>
            )}
        </div>
    )
}
