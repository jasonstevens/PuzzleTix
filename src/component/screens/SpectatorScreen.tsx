import {
  Box, Button, FormGroup, Stack, TextField, Typography, Grid, Divider,
  Select, MenuItem, Paper
} from "@mui/material";

import AccountCircle from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

import logo from '../../assets/puzzletix-white.svg'

import type { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

interface EventData {
  name: string;
  maxSpectators: number;
}

const client = generateClient<Schema>();

const event: EventData =
  { name: "Alderaan Regionals 1976", maxSpectators: 3 }

export default function Register() {

  const createData = async () => {
    await client.models.PuzzleEvent.create({
      name: window.prompt("Event?"),
    });
  }

  return (
    <>
      <Box component="img" src={logo} sx={{ maxWidth: "350px" }} />
      <Paper sx={{ padding: 1, backgroundColor: "#ffffffbb", borderRadius: '15px' }}>
        <Box component="img" src={'/events/alderaan.png'} sx={{ maxWidth: "350px" }} />
        <Box sx={{ textAlign: "center" }} alignItems='center'>
          <Button sx={{ m: 1 }} href="http://ukjpa.org" variant="contained">Back to UKJPA</Button>
        </Box>

        <Stack direction="column" spacing={2}>
          <Stack direction="column" spacing={1} textAlign={"left"}>
            <Divider />
            <Grid container columns={8} sx={{ width: "100%" }} spacing={0}>
              <Grid size={5}><Typography variant="h5" sx={{ paddingTop: 1 }}>Spectator Seats</Typography></Grid>
              <Grid size={3} textAlign="right">
                <Select defaultValue={0} sx={{ p: 0, m: 0, fontWeight: 800 }} size='small'>
                  {Array(event.maxSpectators + 1).fill(1).map((_el, i) => <MenuItem value={i}>{i}</MenuItem>)}
                </Select>
              </Grid>
            </Grid>

            <FormGroup>
              <Stack direction="row" spacing={1}>

                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}><AccountCircle sx={{ color: 'action.active', my: 0.75 }} /></Box>
                <TextField label="First Name" required size='small' />
                <TextField label="Last Name(s)" required size='small' />
              </Stack>
            </FormGroup>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.75 }} />
              <TextField label="E-Mail Address" required size='small' sx={{ width: '100%' }} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <PhoneIcon sx={{ color: 'action.active', mr: 1, my: 0.75 }} />
              <TextField label="Phone Number" required size='small' sx={{ width: '100%' }} />
            </Box>

            <Box sx={{ textAlign: "center" }} alignItems='center'>
              <Button sx={{ m: 1 }} href="http://ukjpa.org" variant="contained" onClick={createData}>Submit</Button>
            </Box>

          </Stack>
        </Stack>
      </Paper >

    </>
  );
};