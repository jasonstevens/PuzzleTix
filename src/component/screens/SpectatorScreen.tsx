import {
  Box, Button, FormGroup, Stack, TextField, Typography, Grid, Divider,
  Select, MenuItem, Paper,
  FormControl,
  InputLabel
} from "@mui/material";

import AccountCircle from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import CheckroomIcon from '@mui/icons-material/Checkroom';
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

const reasons = [
  { key: 'F', description: "I'm watching friends or family compete" },
  { key: 'C', description: "I'm interested in competing in Speed Puzzling" },
  { key: 'I', description: "I'm interested in finding out more about Speed Puzzling" },
  { key: 'O', description: "Other (please comment below)" },
]

export default function SpectatorScreen() {
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
    seats: 0,
    reason: '',
    comments: ''
  });

  const formFilled = (): boolean => {
    return !(
      formData.firstName != ''
      && formData.lastName != ''
      && formData.email != ''
      && formData.seats > 0
    );
  }

  const handleChange = (event: { target: { name: any; value: any }; }) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const submit = async () => {
    await client.models.Spectator.create(formData);
    setSubmitted(true);
  }

  return (
    <>
      {puzzleEvent != undefined ?
        <>
          {puzzleEvent.spectators == 0 ?
            <>
              <Box component="img" src={logo} sx={{ maxWidth: "300px" }} />
              <Box component="img" src={puzzleEvent.logo} sx={{ maxWidth: "350px" }} />
              <br />
              <Typography variant="h5">This event does not have spectator tickets.</Typography>
            </>
            :
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
                      <Divider />
                      <Grid container columns={8} sx={{ width: "100%" }} spacing={0}>
                        <Grid size={5}><Typography variant="h5" sx={{ paddingTop: 1 }}>Spectator Seats</Typography></Grid>
                        <Grid size={3} textAlign="right">
                          <Select name="seats" defaultValue={0} sx={{ p: 0, m: 0, fontWeight: 800 }} size='small' onChange={handleChange}>
                            {Array(puzzleEvent.spectators + 1).fill(1).map((_el, i) => <MenuItem value={i}>{i}</MenuItem>)}
                          </Select>
                        </Grid>
                      </Grid>

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

                      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <CheckroomIcon sx={{ color: 'action.active', mr: 1, my: 2 }} />
                        <FormControl sx={{ width: '100%' }}>
                          <InputLabel>I'm spectating because...</InputLabel>
                          <Select name="reason" variant="outlined" label="I'm spectating because..." required onChange={handleChange} defaultValue=''>
                            {reasons.map((reason) => (<MenuItem value={reason.key}>{reason.description}</MenuItem>))}
                          </Select>
                        </FormControl>
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <CommentIcon sx={{ color: 'action.active', mr: 1, my: 3.5 }} />
                        <TextField name="comments" label="Additional Comments" size='small' multiline rows={3} sx={{ width: '100%' }} onChange={handleChange} />
                      </Box>

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
                    <Typography variant="h6">We will contact you in the near future.</Typography>
                  </>
                }

              </Paper>
            </>
          }
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