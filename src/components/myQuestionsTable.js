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
import CategoryForm from '../components/categoryForm';
import Host from '../components/api';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function MyQuestionTable() {
    const navigate = useNavigate();
    var id = sessionStorage.getItem("user_id")
    if (id === null || id === undefined) {
        navigate('/login');
    }
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 7;

    useEffect(() => {
        axios({
            url: `${Host}/GetMyQuestion`,
            method: "POST",
            data: { created_by: sessionStorage.getItem('user_id') }
        })
            .then((res1) => {
                setData(res1.data.events);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    }

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    }

    const handleReadMore = (index) => {
        setExpandedRows([...expandedRows, index]);
    };

    const [expandedRows, setExpandedRows] = useState([]);

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>SNo</TableCell>
                            <TableCell align="left">Category </TableCell>
                            <TableCell align="left">Topics </TableCell>
                            <TableCell align="left">Scenario</TableCell>
                            <TableCell align="left">Question 1</TableCell>
                            <TableCell align="left">Question 2</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentRows.map((row, index) => {
                            const sNo = (currentPage - 1) * rowsPerPage + index + 1;

                            return (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {sNo}
                                    </TableCell>
                                    <TableCell align="left" className="max-h-40 overflow-hidden">
                                        {row.category_name}
                                    </TableCell>
                                    <TableCell align="left" className="max-h-40 overflow-hidden">
                                        {row.topics}
                                    </TableCell>
                                    <TableCell align="left" className="max-h-40 overflow-hidden">
                                        {row.scenario}
                                    </TableCell>
                                    <TableCell align="left" className="max-h-40 overflow-hidden">
                                        {expandedRows.includes(index) ? (
                                            row.question_1
                                        ) : (
                                            <>
                                                {row.question_1.length > 50 ? `${row.question_1.substring(0, 50)}...` : row.question_1}
                                                {row.question_1.length > 50 && (
                                                    <button onClick={() => handleReadMore(index)} className="text-blue-500">Read More</button>
                                                )}
                                            </>
                                        )}
                                    </TableCell>
                                    <TableCell align="left" className="max-h-40 overflow-hidden">
                                        {expandedRows.includes(index) ? (
                                            row.question_2
                                        ) : (
                                            <>
                                                {row.question_2.length > 50 ? `${row.question_2.substring(0, 50)}...` : row.question_2}
                                                {row.question_2.length > 50 && (
                                                    <button onClick={() => handleReadMore(index)} className="text-blue-500">Read More</button>
                                                )}
                                            </>
                                        )}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className='flex justify-end mt-5'>
                <Stack spacing={2} direction="row">
                    {currentPage > 1 && <Button variant='outlined' color="primary" onClick={handlePrevPage}>Previous Page</Button>}
                    {data.length > currentPage * rowsPerPage && <Button variant='outlined' color="primary" onClick={handleNextPage}>Next Page</Button>}
                </Stack>
            </div>
        </>
    );
}
