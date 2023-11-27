import React from 'react'
import SideBarnav from '../../components/sideBarnav';
import { Header } from '../../components';
import { useEffect, useState } from 'react';
import MyQuestionTable from "./myQuestionsTable";
import MyMCQQuestionTable from './mymcqtable';
import { useNavigate } from 'react-router-dom';
export default function MyQuestions() {
    return (
        <SideBarnav body={<Body />} />
    );
}

function Body() {
    const navigate = useNavigate()
    var user_id = sessionStorage.getItem("user_id")
    if (user_id === null || user_id === undefined) {
        navigate('/login');
    }
    return (
        <>
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl ">
                <div className="flex items-center justify-between mb-6">
                    <Header className='text-2xl font-bold' title="My Scenario Question" />
                </div>
                <MyQuestionTable />
            </div>
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl ">
                <div className="flex items-center justify-between mb-6">
                    <Header className='text-2xl font-bold' title="My MCQ Question" />
                </div>
                <MyMCQQuestionTable />
            </div>
        </>
    )
}