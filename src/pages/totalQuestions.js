import React from 'react'
import SideBarnav from '../components/sideBarnav';
import { Header } from '../components';
import TotalQuestionsTable from "../components/totalquestionm";
 
export default function TotalQuestions() {
    return (
        <SideBarnav body={<Body />} />
    );
}

function Body() {
    return (
        <>
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl ">
                <div className="flex items-center justify-between">
                    <Header title="Total Question" />
                </div>
                <TotalQuestionsTable/>
            </div>
        </>
    )
}