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
import Host from '../../components/api';

import axios from "axios";
import { IoIosArrowDown } from "react-icons/io";
import DOMPurify from 'dompurify';

export default function AnswersTable() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [expandedRow, setExpandedRow] = useState(null);
    const itemsPerPage = 7;
    const [loading, setLoading] = useState(true);
    const [id, setId] = useState([]);
    useEffect(() => {
        axios({
            url: `${Host}/GetMyassignQuestions`,
            method: "POST",
            data: {
                User_1: sessionStorage.getItem("user_id")
            }
        })
            .then((res) => {
                const ids = res.data.events.map(event => event.id);
                setId(ids);
                setLoading(false);

            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);
    useEffect(() => {
        axios({
            url: `${Host}/QuestionSubmit`,
            method: "GET",
            data: {
                
                User_1: sessionStorage.getItem("user_id")
            }
        })
            .then((res) => {
               console.log("success")

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

    if (!id || id.length === 0) {
        return <div className='mt-5'>No questions has been Assigned for you..</div>;
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = id.slice(indexOfFirstItem, indexOfLastItem);
    return (
        <>
            <TableContainer component={Paper}  >
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell >SNo</TableCell>
                            <TableCell >Question Id</TableCell>
                            <TableCell >Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentItems.map((row, index) => (
                            <React.Fragment key={index}>
                                <TableRow>
                                    <TableCell>{indexOfFirstItem + index + 1}</TableCell>
                                    <TableCell>{row}</TableCell>
                                    <TableCell>Not submitted</TableCell>
                                </TableRow>
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
