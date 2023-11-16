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
import Host from '../../components/api';
import axios from "axios";
import { IoIosArrowDown } from "react-icons/io";
import DOMPurify from 'dompurify';

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

    // console.log(data)
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
    if (loading) {
        return <div className='mt-5'>Loading...</div>;
    }
    
    if (!data || data.length === 0) {
        return <div className='mt-5'>* No questions added yet.</div>;
    }
    
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    }

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    }
    function htmlToPlainText(html) {
        var doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
      }
      
      function htmlToPlainText(html) {
        var doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || '';
      }
      
      function generateCSV() {
        const csvContent =
          'Team Name,CreatorName,Category,Topic,Scenario,Question 1,Question 2,Question 3\n' +
          data
            .map(
              (row) =>
                `"${row.Team_Name}","${row.name}","${row.category_name}","${row.topics}","${htmlToPlainText(
                  row.scenario
                ).replace(/"/g, '""')}","${htmlToPlainText(
                  row.question_1
                ).replace(/"/g, '""')}","${htmlToPlainText(
                  row.question_2
                ).replace(/"/g, '""')}","${row.question_3}"`
            )
            .join('\n');
      
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
                                        <TableCell align="left">{<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(row.scenario) }} />}</TableCell>
                                        <TableCell align="left">
                                            <button onClick={toggleDetails} className="text-blue-500 hover:bg-slate-100 rounded-full"><IoIosArrowDown className='w-5 h-5' /></button>
                                        </TableCell>
                                    </TableRow>
                                    {showDetails[index] && (
                                        <TableRow>
                                            <TableCell colSpan={5}>
                                                <div className="p-4 bg-gray-100">
                                                    <div className="mb-2">
                                                        <p className="font-medium">Question 1:</p>
                                                        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(row.question_1) }} />
                                                    </div>
                                                    <div className="mb-2">
                                                        <p className="font-medium">Question 2:</p>
                                                        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(row.question_2) }} />
                                                    </div>
                                                    <div className="mb-2">
                                                        <p className="font-medium">Question 3:</p>
                                                        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(row.question_3) }} />
                                                    </div>
                                                    <div className="mb-2">
                                                        <p className="font-medium">Creator Name:</p>
                                                        <p>{row.name}</p>
                                                    </div>
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
