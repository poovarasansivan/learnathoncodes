import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import DownloadIcon from '@mui/icons-material/CloudDownload';

const data = [
    {
        Category: "C Programming",
        Questions: "What is C programming?",
        Topic: "OOPS",
        CreatorName: "POOVARASAN S",
    },
    {
        Category: "DBMS",
        Questions: "What is object in C programming?",
        Topic: "OBJECT",
        CreatorName: "POOVARASAN S",
    },
    {
        Category: "C Programming",
        Questions: "What is Class in C programming?",
        Topic: "CLASS",
        CreatorName: "POOVARASAN S",
    },
    {
        Category: "C Programming",
        Questions: "What is C programming?",
        Topic: "CONTROL STATEMENTS",
        CreatorName: "POOVARASAN S",
    },
    {
        Category: "C Programming",
        Questions: "What is object in C programming?",
        Topic: "LOOPS",
        CreatorName: "POOVARASAN S",
    }
]

export default function MyQuestionTable() {
    const navigate = useNavigate();
    var id = sessionStorage.getItem("user_id")
    if (id === null || id === undefined) {
        navigate('/login');
    }
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 7;

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    }

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    }

    function generateCSV() {
        const csvContent = "Category,Questions,Topic,CreatorName\n" +
            data.map(row => `${row.Category},${row.Questions},${row.Topic},${row.CreatorName}`).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'questions.csv';
        link.click();
    }

    return (
        <>

            <div className='flex flex-row-reverse h-15 mb-4'>
                <Button variant='outlined' color="primary" onClick={generateCSV}><DownloadIcon /></Button>
            </div>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>S No</TableCell>
                            <TableCell align="left">Category </TableCell>
                            <TableCell align="left">Topic</TableCell>
                            <TableCell align="left">Question</TableCell>
                            <TableCell align="left">Creator Name</TableCell>

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
                                    <TableCell align="left">{row.Category}</TableCell>
                                    <TableCell align="left">{row.Topic}</TableCell>
                                    <TableCell align="left">{row.Questions}</TableCell>
                                    <TableCell align="left">{row.CreatorName}</TableCell>
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
