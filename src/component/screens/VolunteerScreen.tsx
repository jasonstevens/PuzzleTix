import {
  Box, Button, FormControl, FormGroup, Stack, TextField, Typography, Divider, Checkbox, FormControlLabel,
  Select, MenuItem, Paper, InputLabel
} from "@mui/material";

import AccountCircle from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import CommentIcon from '@mui/icons-material/Comment';

import logo from '../../assets/puzzletix-white.svg'

import type { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useState } from "react";

const client = generateClient<Schema>();

interface Division {
  id: number;
  name: string;
  description?: string;
  type: number;
  maximum: number;
  cost?: number;
  extraText?: string;
  url?: string;
}

const shirtSizes = [
  { key: 'XS', description: "Extra Small" },
  { key: 'S', description: "Small" },
  { key: 'M', description: "Medium" },
  { key: 'L', description: "Large" },
  { key: 'XL', description: "Extra Large" },
  { key: '2XL', description: "2X Large" },
  { key: '3XL', description: "3X Large" }]

const divs: Division[] = [
  { id: 1, name: "Solo", description: "Complete a puzzle as an individual.", type: 1, maximum: 4, cost: 30, },
  { id: 2, name: "Pairs", description: "Complete a puzzle as a pair. Only one ticket required per pair.", type: 2, maximum: 2, cost: 40, },
  { id: 3, name: "Teams", description: "Complete a puzzle as a team of 3 or 4.  Only one ticket required per team.", type: 4, maximum: 2, cost: 50, }
];

export default function Register() {

  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    hasShirt: false,
    shirt: '',
    allergies: '',
    comments: '',
    div1: false,
    div2: false,
    div3: false
  });

  const formFilled = (): boolean => {
    return !(
      formData.firstName != ''
      && formData.lastName != ''
      && formData.email != ''
    );
  }

  const handleChange = (event: { target: { name: any; value: any }; }) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleChecked = (event: { target: { name: any; checked: any }; }) => {
    const { name, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: checked,
    }));
  };

  const submit = async () => {
    await client.models.Volunteer.create(formData);
    setSubmitted(true);
  }

  return (
    <>
      <Box component="img" src={logo} sx={{ maxWidth: "350px" }} />
      <Paper sx={{ padding: 1, backgroundColor: "#ffffffbb", borderRadius: '15px' }}>
        <Box component="img" src={'/events/alderaan.png'} sx={{ maxWidth: "350px" }} />
        <Box sx={{ textAlign: "center" }} alignItems='center'>
          <Button sx={{ m: 1 }} href="http://ukjpa.org" variant="contained">Back to UKJPA</Button>
        </Box>

        {!submitted ?

          <form>

            <Stack direction="column" spacing={2}>
              <Stack direction="column" spacing={1} textAlign={"left"}>
                <Divider />

                <Typography variant="h5">Volunteer Details</Typography>
                <FormGroup>
                  <Stack direction="row" spacing={1}>

                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}><AccountCircle sx={{ color: 'action.active', my: 0.75 }} /></Box>
                    <TextField name="firstName" label="First Name" required size='small' onChange={handleChange} />
                    <TextField name="lastName" label="Last Name(s)" required size='small' onChange={handleChange} />
                  </Stack>
                </FormGroup>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.75 }} />
                  <TextField name="email" label="E-Mail Address" required size='small' sx={{ width: '100%' }} onChange={handleChange} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <PhoneIcon sx={{ color: 'action.active', mr: 1, my: 0.75 }} />
                  <TextField name="phone" label="Contact Number" size='small' sx={{ width: '100%' }} onChange={handleChange} />
                </Box>

                <Typography variant="h5">Other Information</Typography>

                <FormControlLabel control={<Checkbox name="hasShirt" onChange={handleChecked} />} label="I already have a UKJPA Volunteer Shirt" sx={{ height: '30px' }} />

                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <CheckroomIcon sx={{ color: 'action.active', mr: 1, my: 2 }} />
                  <FormControl sx={{ width: '100%' }}>
                    <InputLabel>T-Shirt Size</InputLabel>
                    <Select name="shirt" variant="outlined" label="T-Shirt Size" required onChange={handleChange} value=''>

                      {shirtSizes.map((shirt) => (
                        <MenuItem value={shirt.key}>{shirt.description}</MenuItem>
                      ))}

                    </Select>
                  </FormControl>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <RestaurantIcon sx={{ color: 'action.active', mr: 1, my: 3.5 }} />
                  <TextField name="allergies" label="Food Allergies" size='small' multiline rows={3} sx={{ width: '100%' }} onChange={handleChange} />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <CommentIcon sx={{ color: 'action.active', mr: 1, my: 3.5 }} />
                  <TextField name="comments" label="Additional Comments" size='small' multiline rows={3} sx={{ width: '100%' }} onChange={handleChange} />
                </Box>

                <Typography variant="h5">Are you Competing?</Typography>

                {divs.map(div => (
                  <FormControlLabel control={<Checkbox name={"div" + div.id} onChange={handleChecked} />} label={div.name + " Division"} sx={{ height: '30px' }} />
                ))}

                <Box sx={{ textAlign: "center" }} alignItems='center'>
                  <Button sx={{ m: 1 }} onClick={submit} variant="contained" disabled={formFilled()}>Submit</Button>
                </Box>

              </Stack>
            </Stack>
          </form>
          :
          <>
            <br />
            <Typography variant="h5">Thanks for your Submission!</Typography>
            <br />
            <Typography variant="h6">We will contact you in the near future.</Typography>
          </>
        }
      </Paper>

    </>
  );
};
