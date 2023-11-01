import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Header } from '../components';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { SideBarnav } from '../components';
import Host from '../components/api';

export default function Register() {
  return (
    <SideBarnav body={<Body />} />
  );
}

function Body() {
  const navigate = useNavigate();

  const [user1, setUser1] = useState({});
  const [user2, setUser2] = useState({});
  const [user3, setUser3] = useState({});
  const { categoryId } = useParams();
  const [formError, setFormError] = useState(null);

  const navigateToCategory = () => {
    const teamName = document.getElementById("teamName").value;
    const member1 = user1.id;
    const member2 = user2.id;
    const member3 = user3.id;

    if (!teamName || !member1 || !member2 || !member3) {
      setFormError("* All fields are required");
      return;
    }

    axios.post(`${Host}/insertData`, {
      teamName,
      eventCategoryID: parseInt(categoryId),
      user1: member1,
      user2: member2,
      user3: member3,
    })
      .then((response) => {
        console.log("Data submitted successfully:", response.data);
        navigate('/Category');
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
      });
  };

  const getDetails = (rollno, user) => {
    axios({
      url: `${Host}/users/${rollno}`,
      method: "get",
    }).then((res) => {
      // console.log(res)
      if (user === 2) {
        setUser2(res.data);
      }
      if (user === 1) {
        setUser1(res.data);
      }
      if (user === 3) {
        setUser3(res.data);
      }
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
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
        <div className='mt-5'>
          <TextField
            required
            label={"Team Name "}
            defaultValue="Team name"
            id="teamName"
            onChange={() => setFormError(null)}
          />
        </div>
        <div className='mt-5'>
          <TextField
            required
            label={"Team Member Roll No 1 "}
            defaultValue="Roll no"
            onChange={(e) => {
              getDetails(e.target.value, 1);
            }}
            id="user1"
          />
          <TextField
            required
            disabled
            defaultValue={user1.name}
            value={user1.name}
          />
          <TextField
            required
            disabled
            defaultValue={user1.year}
            value={user1.year}
          />
        </div>
        <div className='mt-5'>
          <TextField
            required
            label={"Team Member Roll No 2 "}
            defaultValue="Roll no"
            onChange={(e) => {
              getDetails(e.target.value, 2);
            }}
          />
          <TextField
            required
            disabled
            defaultValue={user2.name}
            value={user2.name}
          />
          <TextField
            required
            disabled
            defaultValue={user2.year}
            value={user2.year}
          />
        </div>
        <div className='mt-5'>
          <TextField
            required
            label={"Team Member Roll No 3 "}
            defaultValue="Roll no"
            onChange={(e) => {
              getDetails(e.target.value, 3);
            }}
          />
          <TextField
            required
            disabled
            defaultValue={user3.name}
            value={user3.name}
          />
          <TextField
            required
            disabled
            defaultValue={user3.year}
            value={user3.year}
          />
        </div>
      </Box>
      {formError && (
        <div className="text-red-500 mt-2">
          {formError}
        </div>
      )}
      <Stack spacing={2} direction="row" className='flex justify-center'>
        <Button variant="contained" onClick={navigateToCategory}>Submit</Button>
      </Stack>
    </div>
  );
}
