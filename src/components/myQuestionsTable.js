import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Host from './api';
import axios from "axios";
import { IoIosArrowDown } from "react-icons/io";
import DOMPurify from 'dompurify';

export default function MyQuestionTable() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [expandedRow, setExpandedRow] = useState(null);
    const itemsPerPage = 7;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios({
            url: `${Host}/GetMyQuestion`,
            method: "POST",
            data: {
                created_by: sessionStorage.getItem("user_id")
            }
        })
            .then((res) => {
                setData(res.data.events);
                setLoading(false);

            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    const handleExpandRow = (index) => {
        setExpandedRow(index === expandedRow ? null : index);
    }

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    }

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    }

    if (loading) {
        return <div className='mt-5'>Loading...</div>;
    }

    if (!data || data.length === 0) {
        return <div className='mt-5'>No questions has been created by you..</div>;
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>SNo</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Topics</TableCell>
                            <TableCell>Scenario</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentItems.map((row, index) => (
                            <React.Fragment key={index}>
                                <TableRow>
                                    <TableCell>{indexOfFirstItem + index + 1}</TableCell>
                                    <TableCell>{row.category_name}</TableCell>
                                    <TableCell>{row.topics}</TableCell>
                                    <TableCell>{<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(row.scenario) }} />}</TableCell>
                                    <TableCell>
                                        <button onClick={() => handleExpandRow(index)}>
                                            <IoIosArrowDown />
                                        </button>
                                    </TableCell>
                                </TableRow>
                                {expandedRow === index && (
                                    <TableRow>
                                        <TableCell colSpan={5}>
                                            <div className="p-4 bg-gray-100">
                                                <div className='mb-2'>
                                                    <p>Question 1:</p>
                                                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(row.question_1) }} />
                                                </div>
                                                <div className='mb-2'>
                                                    <p>Question 2:</p>
                                                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(row.question_2) }} />
                                                </div>
                                                <div className='mb-2'>
                                                    <p>Question 3:</p>
                                                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(row.question_3) }} />

                                                </div>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className='flex justify-end mt-5'>
                <Stack spacing={2} direction="row">
                    {currentPage > 1 && <Button variant='outlined' color="primary" onClick={handlePrevPage}>Previous Page</Button>}
                    {data.length > currentPage * itemsPerPage && <Button variant='outlined' color="primary" onClick={handleNextPage}>Next Page</Button>}
                </Stack>
            </div>
        </>
    );
}
