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
import CategoryForm from '../../components/Addnew/categoryForm';
import Host from '../../components/api';
import { useNavigate } from 'react-router-dom';

export default function BasicTable() {
    const navigate = useNavigate();
    var id = sessionStorage.getItem("user_id")
    if (id === null || id === undefined) {
        navigate('/login');
    }
    const [data, setData] = useState([]);
    const [iscategoryFormOpen, setcategoryFormOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    useEffect(() => {
        fetch(`${Host}/GetEVCategory`)
            .then(response => response.json())
            .then(data => setData(data));
    }, []);

    const handlecategoryFormClick = () => {
        setcategoryFormOpen(true);
    }

    const handleClosecategoryForm = () => {
        setcategoryFormOpen(false);
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

    return (
        <>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>S No</TableCell>
                            <TableCell align="left">Category ID</TableCell>
                            <TableCell align="left">Category </TableCell>
                            <TableCell align="left">Description</TableCell>
                            <TableCell align="left">Max Team Count</TableCell>
                            <TableCell align="left">Registered Teams Count</TableCell>
                            {/* <TableCell align="left">Action</TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentRows.map((row, index) => {
                            const sNo = (currentPage - 1) * rowsPerPage + index + 1; // Calculate continuous S No

                            return (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {sNo}
                                    </TableCell>
                                    <TableCell align="left">CI{row.id}</TableCell>
                                    <TableCell align="left">{row.category_name}</TableCell>
                                    <TableCell align="left">{row.descritpion}</TableCell>
                                    <TableCell align="left">{row.max_team}</TableCell>
                                    <TableCell align="left">{row.category_count}</TableCell>
                                    {/* <TableCell align="left">
                                        <Stack spacing={2} direction="row">
                                            <Button variant='outlined' color="success" onClick={handlecategoryFormClick}>View</Button>
                                        </Stack>
                                    </TableCell> */}
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
            <CategoryForm open={iscategoryFormOpen} handleClose={handleClosecategoryForm} />
        </>
    );
}
