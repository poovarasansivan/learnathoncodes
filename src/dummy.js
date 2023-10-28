import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Header } from '../components';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import SideBarnav from '../components/sideBarnav';
import axios from 'axios'; // Import Axios for making API calls

const Teamsize = [
  {
    value: '1',
    label: '1',
  },
  // ... (your Teamsize options)
];

export default function Register() {
  return <SideBarnav body={<Body />} />;
}

function Body() {
  const [teamSize, setTeamSize] = React.useState('1');
  const [rollNo, setRollNo] = React.useState(''); // Add state to store selected Roll No
  const [userData, setUserData] = React.useState({
    name: '',
    email: '',
    phone: '',
  });

  const navigate = useNavigate();

  const navigateToCategory = () => {
    navigate('/Category');
  };

  const handleTeamSizeChange = (event) => {
    setTeamSize(event.target.value);
  };

  const handleRollNoChange = (event) => {
    setRollNo(event.target.value);

    // Make an API call to fetch user data based on the selected Roll No
    axios
      .get(`http://your-api-url/users/${event.target.value}`)
      .then((response) => {
        const userData = response.data; // Assuming API response contains user data
        setUserData(userData);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  };

  const renderTeamFields = () => {
    let fields = [];
    for (let i = 0; i < teamSize; i++) {
      fields.push(
        <div key={i} className="mt-5">
          <TextField
            required
            id={`team-member-${i + 1}`}
            label={`Team Member ${i + 1}`}
            defaultValue={i === 0 ? userData.name : 'Name'}
          />
          <TextField
            required
            id={`phone-${i + 1}`}
            label={`Phone no ${i + 1}`}
            type="mobile"
            defaultValue={i === 0 ? userData.phone : '+91xxxxxxxxxx'}
            autoComplete="off"
          />
          {/* ... (other fields) */}
        </div>
      );
    }
    return fields;
  };

  return (
    <>
      <div className="m-2 md:m-10 mt-20 p-2 md:p-6 bg-white rounded-3xl">
        <div className="flex items-center justify-between">
          <Header title="Register Team" />
        </div>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <div className="mt-5">
            <TextField
              id="outlined"
              select
              label="Select Team Size"
              value={teamSize}
              onChange={handleTeamSizeChange}
              helperText="Select Team Size"
            >
              {Teamsize.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              required
              label="Roll No" // Add a field for Roll No
              value={rollNo}
              onChange={handleRollNoChange}
            />

            <TextField
              required
              label="Team Leader Name"
              defaultValue="Name"
            />
            <TextField
              required
              label="Team Leader Mobile"
              defaultValue="+91xxxxxxxxxx"
            />
          </div>
          {renderTeamFields()}
        </Box>
        <Stack spacing={2} direction="row" className="flex justify-center">
          <Button variant="contained" onClick={navigateToCategory}>
            Submit
          </Button>
        </Stack>
      </div>
    </>
  );
}
