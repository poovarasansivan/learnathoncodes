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
import ViewTeams from '../components/ViewTeams';
import Host from '../components/api';
import { useNavigate } from 'react-router-dom';

function Allusers() {
    const navigate = useNavigate();
    var id = sessionStorage.getItem("user_id")
    if (id === null || id === undefined) {
      navigate('/login');
    }
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isViewTeamsOpen, setIsViewTeamsOpen] = useState(false);
    const [selectedTeamId, setSelectedTeamId] = useState(null);
//    console.log(data)
    const rowsPerPage = 5;

    useEffect(() => {
        fetch(`${Host}/teams`)
            .then(response => response.json())
            // console.log(response)
            .then(data => setData(data));
    }, []);

    const handleViewTeamsClick = (teamId) => {
        setSelectedTeamId(teamId);
        setIsViewTeamsOpen(true);
    }

    const handleCloseViewTeams = () => {
        setIsViewTeamsOpen(false);
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
                            <TableCell align="left">Team ID</TableCell>
                            <TableCell align="left">Team Name</TableCell>
                            <TableCell align="left">Category </TableCell>
                            <TableCell align="left">Team Leader Name</TableCell>
                            <TableCell align="left">Team Leader Mobile</TableCell>
                            <TableCell align="left">Team Status</TableCell>
                            <TableCell align="left">Team Details</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentRows.map((row, index) => {
                            const sNo = (currentPage - 1) * rowsPerPage + index + 1; // Calculate continuous S No
                            return (
                                <TableRow
                                    key={row.TeamID}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {sNo}
                                    </TableCell>
                                    <TableCell align="left">TI{row.id}</TableCell>
                                    <TableCell align="left">{row.team_name}</TableCell>
                                    <TableCell align="left">{row.category_name}</TableCell>
                                    <TableCell align="left">{row.name1}</TableCell>
                                    <TableCell align="left">{row.phone}</TableCell>
                                    <TableCell align="left">Active</TableCell>
                                    <TableCell align="left">
                                        <Stack spacing={2} direction="row">
                                            <Button variant='outlined' color="success" onClick={() => handleViewTeamsClick(row.id)}>View</Button>
                                        </Stack>
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
            <ViewTeams open={isViewTeamsOpen} handleClose={handleCloseViewTeams} selectedTeamId={selectedTeamId} />
        </>
    );
}

export default Allusers;
