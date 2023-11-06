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
import DownloadIcon from '@mui/icons-material/CloudDownload';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Host from './api';
import axios from "axios";
import { IoIosArrowDown } from "react-icons/io";

export default function MyQuestionTable() {
    const navigate = useNavigate();
    var id = sessionStorage.getItem("user_id")
    if (id === null || id === undefined) {
        navigate('/login');
    }
    const [data, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 7;
    const [loading, setLoading] = useState(true);
    const [showDetails, setShowDetails] = useState({});

    console.log(data)
    useEffect(() => {
        axios({
            url: `${Host}/TotalQuestion`,
            method: "GET"
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
        const csvContent = "Category,Topic,Scenario,Question 1,Question 2,CreatorName\n" +
            data.map(row => `"${row.category_name}","${row.topics}","${row.scenario.replace(/"/g, '""')}","${row.question_1.replace(/"/g, '""')}","${row.question_2.replace(/"/g, '""')}","${row.name}"`).join('\n');
    
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'questions.csv';
        link.click();
    }
    

    if (loading) {
        return <div>Loading...</div>;
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
                            <TableCell>SNo</TableCell>
                            <TableCell align="left">Category </TableCell>
                            <TableCell align="left">Topic</TableCell>
                            <TableCell align="left">Scenario</TableCell>
                            <TableCell align="left">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentRows.map((row, index) => {
                            const sNo = (currentPage - 1) * rowsPerPage + index + 1;

                            const toggleDetails = () => {
                                setShowDetails(prevState => ({
                                    ...prevState,
                                    [index]: !prevState[index]
                                }));
                            };

                            return (
                                <React.Fragment key={index}>
                                    <TableRow
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {sNo}
                                        </TableCell>
                                        <TableCell align="left">{row.category_name}</TableCell>
                                        <TableCell align="left">{row.topics}</TableCell>
                                        <TableCell align="left">{row.scenario}</TableCell>
                                        <TableCell align="left">
                                            <button onClick={toggleDetails} className="text-blue-500 hover:bg-slate-100 rounded-full"><IoIosArrowDown className='w-5 h-5' /></button>
                                        </TableCell>
                                    </TableRow>
                                    {showDetails[index] && (
                                        <TableRow>
                                            <TableCell colSpan={5}>
                                                <div className="p-4 bg-gray-100">
                                                    <p className=''>Question 1:  {row.question_1}</p>
                                                    <p>Question 2:  {row.question_2}</p>
                                                    <p>Creator Name:  {row.name}</p>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </React.Fragment>
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
