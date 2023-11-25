import React from 'react'

export default function evaltuion() {
    return (
        <SideBarnav body={<Body />} />
    )
}

function Body() {
    return (
        <>
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl ">
                <div className="flex items-center justify-between mb-6">
                <Header title="MCQ Evalution" />
                </div>
            </div>
        </>
    )
}