import {
  Box, Button, FormGroup, Stack, TextField, Typography, Divider, Checkbox, FormControlLabel,
  Paper,
} from "@mui/material";

import AccountCircle from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import CommentIcon from '@mui/icons-material/Comment';

import logo from '../../assets/puzzletix-white.svg'

import { getEvent, type PuzzleEvent } from '../data/PuzzleEvent';

import type { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useState } from "react";
import { useParams } from "react-router";

const client = generateClient<Schema>();

type EventParams = {
  eventId: string;
}

interface Division {
  id: number;
  name: string;
  description?: string;
  type: number;
  wait?: boolean;
}

const divs: Division[] = [
  { id: 1, name: "Solo", description: "Complete a puzzle as an individual.", type: 1 },
  { id: 2, name: "Pairs", description: "Complete a puzzle as a pair. Only one ticket required per pair.", type: 2, wait: true },
  { id: 3, name: "Teams", description: "Complete a puzzle as a team of 3 or 4.  Only one ticket required per team.", type: 4 }
];

export default function WaitListScreen() {
  const { eventId } = useParams<EventParams>();

  let puzzleEvent: PuzzleEvent | undefined = undefined;
  if (eventId) puzzleEvent = getEvent(eventId);

  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    eventId: puzzleEvent ? puzzleEvent.id : -1,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
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
      && (formData.div1 || formData.div2 || formData.div3)
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
    await client.models.Waiter.create(formData);
    setSubmitted(true);
  }

  return (
    <>
      {puzzleEvent != undefined ?
        <>
          <Box component="img" src={logo} sx={{ maxWidth: "300px" }} />
          <Box component="img" src={puzzleEvent.logo} sx={{ maxWidth: "350px" }} />
          <Paper sx={{ padding: 1, paddingTop: 0, backgroundColor: "#ffffffbb", borderRadius: '15px' }}>

            <Box sx={{ textAlign: "center" }} alignItems='center'>
              <Button sx={{ m: 1 }} href="http://ukjpa.org" variant="contained">Back to UKJPA</Button>
            </Box>

            {!submitted ?
              <Stack direction="column" spacing={2}>
                <Stack direction="column" spacing={1} textAlign={"left"}>
                  <Typography>To register for the event wait list, enter your details and select which divisions you'd like to register for. Only divisions
                    that are currently sold out are listed.
                  </Typography>
                  <Divider />
                  <Typography variant="h5">Details</Typography>
                  <FormGroup>
                    <Stack direction="row" spacing={1}>

                      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}><AccountCircle sx={{ color: 'action.active', my: 0.75 }} /></Box>
                      <TextField name="firstName" label="First Name" required size='small' onChange={handleChange} />
                      <TextField name="lastName" label="Last Name(s)" required size='small' onChange={handleChange} />
                    </Stack>
                  </FormGroup>
                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.75 }} />
                    <TextField name="email" label="E-Mail" required size='small' sx={{ width: '100%' }} onChange={handleChange} />
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <PhoneIcon sx={{ color: 'action.active', mr: 1, my: 0.75 }} />
                    <TextField name="phone" label="Phone" size='small' sx={{ width: '100%' }} onChange={handleChange} />
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <CommentIcon sx={{ color: 'action.active', mr: 1, my: 3.5 }} />
                    <TextField name="comments" label="Comments" size='small' multiline rows={3} sx={{ width: '100%' }} onChange={handleChange} />
                  </Box>


                  <Divider />
                  <Typography variant="h5">Divisions</Typography>

                  {divs.filter(d => d.wait == true).map(div => (
                    <FormControlLabel control={<Checkbox name={"div" + div.id} onChange={handleChecked} />} label={div.name + " Division"} sx={{ height: '30px' }} />
                  ))}

                  <Box sx={{ textAlign: "center" }} alignItems='center'>
                    <Button sx={{ m: 1 }} onClick={submit} variant="contained" disabled={formFilled()}>Submit</Button>
                  </Box>

                </Stack>
              </Stack>
              :
              <>
                <br />
                <Typography variant="h5">Thanks for your Submission!</Typography>
                <br />
                <Typography variant="h6">We will contact you if a ticket becomes available for you.</Typography>
              </>
            }
          </Paper>
        </>
        :
        <>
          <Box component="img" src={logo} sx={{ width: "350px" }} />
          <br /><br />
          <Typography variant="h5">These are not the droids you're looking for.</Typography>
        </>
      }
    </>
  );
};
