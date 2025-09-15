import {
  Autocomplete, Box, Button, FormControl, FormGroup, Stack, TextField, Typography, Grid, Divider, Checkbox, FormControlLabel,
  Dialog, DialogTitle, DialogContentText, DialogActions, DialogContent, Select, MenuItem, Paper
} from "@mui/material";
import { countries } from "../Countries";
import { CreditCard, PaymentForm } from 'react-square-web-payments-sdk';
import InfoIcon from '@mui/icons-material/Info';

import logo from '../../assets/puzzletix-white.svg'
import { useState } from "react";
import React from "react";

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

interface DivisionData {
  index: number;
  firstName?: string;
  lastName?: string;
}

interface EventData {
  name: string;
  maxSpectators: number;
}

const event: EventData =
  { name: "Alderaan Regionals 1976", maxSpectators: 6 }


const divs: Division[] = [
  {
    id: 1, name: "Solo", description: "Complete a puzzle as an individual.", type: 1, maximum: 4, cost: 30,
    extraText: "Solo division uses an unreleased 500pc Ravensburger puzzle. The puzzle is yours to keep and take home after completion of the event. All Ewoks must be accompanied by a Wookie."
  },
  {
    id: 2, name: "Pairs", description: "Complete a puzzle as a pair. Only one ticket required per pair.", type: 2, maximum: 2, cost: 40,
    extraText: "The Pairs division uses two unreleased 500pc Ravensburger puzzles. The puzzle is yours to keep and take home after completion of the event."
  },
  {
    id: 3, name: "Teams", description: "Complete a puzzle as a team of 3 or 4.  Only one ticket required per team.", type: 4, maximum: 2, cost: 50,
    extraText: "Teams division uses an unreleased 1000pc Ravensburger puzzle. The puzzle is yours to keep and take home after completion of the event. No Jedi."
  },
  {
    id: 4, name: "Puzzle Chicken", description: "Puzzle Chicken side event run per UKJPA Blitz rules.", url: "https://ukjpa.org/chicken", type: 1, maximum: 2, cost: 10,
    extraText: "Puzzle Chicken is a fun new type of casual speed race created by the UKJPA, and has been run at numerous online and in-person events.\n\nFor more details and full rules, see the website linked below."
  }
];

export default function Register() {

  const [open, setOpen] = React.useState(false);
  const [dialogDiv, setDialogDiv] = React.useState<Division>();

  const handleClickOpen = (div: Division) => { setOpen(true), setDialogDiv(div) };

  const handleClose = () => { setOpen(false); };

  const [div1, setDiv1] = useState<DivisionData[]>([]);
  const [div2, setDiv2] = useState<DivisionData[]>([]);
  const [div3, setDiv3] = useState<DivisionData[]>([]);
  const [div4, setDiv4] = useState<DivisionData[]>([]);
  const [div5, setDiv5] = useState<DivisionData[]>([]);


  function funcStuff(event: React.ChangeEvent<Omit<HTMLInputElement, "value"> & { value: number; }> | (Event & { target: { value: number; name: string; }; }), division: Division): void {
    const value = event.target.value;
    console.log(value);

    if (division.id == 1) {
      if (value) {
        if (div1?.length < value) {
          for (let i = 0; i < value - div1.length; i++) {
            setDiv1(prevItems => [...prevItems, { index: 0 }])
          }
        } else if (div1?.length > value) {
          setDiv1([...div1].slice(0, value));
        }
      } else {
        setDiv1([]);
      }
    }

    if (division.id == 2) {
      if (value) {
        if (div2?.length < value) {
          for (let i = 0; i < value - div2.length; i++) {
            setDiv2(prevItems => [...prevItems, { index: 0 }])
          }
        } else if (div2?.length > value) {
          setDiv2([...div2].slice(0, value));
        }
      } else {
        setDiv2([]);
      }
    }

    if (division.id == 3) {
      if (value) {
        if (div3?.length < value) {
          for (let i = 0; i < value - div3.length; i++) {
            setDiv3(prevItems => [...prevItems, { index: 0 }])
          }
        } else if (div3?.length > value) {
          setDiv3([...div3].slice(0, value));
        }
      } else {
        setDiv3([]);
      }
    }

    if (division.id == 4) {
      if (value) {
        if (div4?.length < value) {
          for (let i = 0; i < value - div4.length; i++) {
            setDiv4(prevItems => [...prevItems, { index: 0 }])
          }
        } else if (div4?.length > value) {
          setDiv4([...div4].slice(0, value));
        }
      } else {
        setDiv4([]);
      }
    }

    if (division.id == 5) {
      if (value) {
        if (div5?.length < value) {
          for (let i = 0; i < value - div5.length; i++) {
            setDiv5(prevItems => [...prevItems, { index: 0 }])
          }
        } else if (div5?.length > value) {
          setDiv5([...div5].slice(0, value));
        }
      } else {
        setDiv5([]);
      }
    }
  }

  return (
    <>
      <Box component="img" src={logo} sx={{ maxWidth: "350px" }} />
      <Paper sx={{ padding: 1, backgroundColor: "#ffffffbb", borderRadius: '15px' }}>
        <Box component="img" src={'/events/alderaan.png'} sx={{ maxWidth: "350px" }} />
        <Box sx={{ textAlign: "center" }} alignItems='center'>
          <Button sx={{ m: 1 }} href="http://www.starwars.com" variant="contained">Details</Button>
          <Button sx={{ m: 1 }} href="/" variant="contained">Return</Button>
        </Box>

        <Stack direction="column" spacing={2}>
          <Stack direction="column" spacing={1} textAlign={"left"}>
            {divs.map(div => (
              <>
                <Divider />
                <Grid container columns={8} sx={{ width: "100%" }} spacing={0}>
                  <Grid size={5}>
                    <Stack direction="row">
                      <a onClick={(_event) => handleClickOpen(div)}><InfoIcon sx={{ fontSize: 30, marginRight: '0.5rem', marginTop: '0.55rem' }} color="primary" /></a>
                      <Typography variant="h5" sx={{ paddingTop: 1, fontWeight: 600 }}>{div.name}</Typography>
                    </Stack>
                  </Grid>
                  <Grid size={3} textAlign="right">
                    <Select defaultValue={0} onChange={(event) => funcStuff(event, div)} sx={{ p: 0, m: 0, fontWeight: 800 }} size='small'>
                      {Array(div.maximum + 1).fill(1).map((_el, i) => <MenuItem value={i}>{i}</MenuItem>)}
                    </Select>

                  </Grid>
                  {div.cost ?
                    <>
                      <Grid size={6}><Typography>{div.description}</Typography></Grid>
                      <Grid size={2} textAlign="right" sx={{ paddingRight: 1.5 }}><Typography variant="h6" sx={{ fontWeight: 600 }}>£{div.cost}</Typography></Grid>
                    </>
                    :
                    <Grid size={8}><Typography>{div.description}</Typography></Grid>
                  }
                </Grid>
                {div.id == 1 && div1.length > 0 && <Paper sx={{ m: 0, padding: 0.7, borderRadius: '5px', backgroundColor: "#ffffff66" }}><Stack spacing={0.5}>{div1?.map((dd, index) => (ticketFields(dd, div, index)))}</Stack></Paper>}
                {div.id == 2 && div2.length > 0 && <Paper sx={{ m: 0, padding: 0.7, borderRadius: '5px', backgroundColor: "#ffffff66" }}><Stack spacing={0.5}>{div2?.map((dd, index) => (ticketFields(dd, div, index)))}</Stack></Paper>}
                {div.id == 3 && div3.length > 0 && <Paper sx={{ m: 0, padding: 0.7, borderRadius: '5px', backgroundColor: "#ffffff66" }}><Stack spacing={0.5}>{div3?.map((dd, index) => (ticketFields(dd, div, index)))}</Stack></Paper>}
                {div.id == 4 && div4.length > 0 && <Paper sx={{ m: 0, padding: 0.7, borderRadius: '5px', backgroundColor: "#ffffff66" }}><Stack spacing={0.5}>{div4?.map((dd, index) => (ticketFields(dd, div, index)))}</Stack></Paper>}
                {div.id == 5 && div5.length > 0 && <Paper sx={{ m: 0, padding: 0.7, borderRadius: '5px', backgroundColor: "#ffffff66" }}><Stack spacing={0.5}>{div5?.map((dd, index) => (ticketFields(dd, div, index)))}</Stack></Paper>}
              </>
            ))}

            <Divider />
            <Grid container columns={8} sx={{ width: "100%" }} spacing={0}>
              <Grid size={5}><Typography variant="h5" sx={{ paddingTop: 1, fontWeight: 600 }}>Spectators</Typography></Grid>
              <Grid size={3} textAlign="right">
                <Select defaultValue={0} sx={{ p: 0, m: 0, fontWeight: 800 }} size='small'>
                  {Array(event.maxSpectators + 1).fill(1).map((_el, i) => <MenuItem value={i}>{i}</MenuItem>)}
                </Select>
                <Select defaultValue={0} sx={{ p: 0, m: 0, marginLeft: 1, fontWeight: 800 }} size='small'>
                  {Array(5).fill(1).map((_el, i) => <MenuItem value={i}>£{i}</MenuItem>)}
                </Select>
              </Grid>
              <Grid size={8}><Typography sx={{ paddingTop: 1 }}>Select a donation amount (per spectator).</Typography></Grid>
            </Grid>

            <Typography variant="h5">Buyer</Typography>
            <FormGroup>
              <Stack direction="row" spacing={1}>
                <TextField label="First Name" required={true} size='small' />
                <TextField label="Last Name(s)" required={true} size='small' />
              </Stack>
            </FormGroup>
            <TextField label="E-Mail Address" required={true} size='small' />

            <FormControl>
              <Autocomplete autoHighlight options={countries} getOptionLabel={(option) => option.label} size='small'
                renderOption={(props, option) => {
                  const { key, ...optionProps } = props;
                  return (
                    <Box key={key} component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...optionProps}>
                      <img loading="lazy" width="20" alt=""
                        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`} />
                      {option.label}
                    </Box>
                  );
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Country" slotProps={{ htmlInput: { ...params.inputProps, autoComplete: 'new-password', } }}
                  />
                )}
              />
            </FormControl>


            <Typography variant="h5">Payment</Typography>
            <Typography>Cost Summary Here</Typography>

            <PaymentForm
              applicationId="sandbox-sq0idb-8HmJ8A4B5YSiqalsBJxbVw"
              cardTokenizeResponseReceived={(token, verifiedBuyer) => {
                console.log('token:', token);
                console.log('verifiedBuyer:', verifiedBuyer);
              }}
              locationId='LH6VET0JMRVNY'
            >

              {/* <GooglePay /> */}

              <CreditCard />

            </PaymentForm>
          </Stack>
        </Stack>
      </Paper >

      {InfoDialog(open, dialogDiv, handleClose)}
    </>
  );
};

function InfoDialog(open: boolean, division: Division | undefined, handleClose: () => void) {
  return <Dialog open={open} onClose={handleClose} sx={{ padding: 0 }}>
    <DialogTitle sx={{ padding: 1 }}>{division?.name}</DialogTitle>
    <DialogContent sx={{ padding: 1 }}>
      <DialogContentText sx={{ whiteSpace: "pre-line" }}>{division?.extraText}</DialogContentText>
    </DialogContent>
    <DialogActions>
      {division?.url && <Button onClick={() => { window.open(division.url, "_this"); }}>Website</Button>}
      <Button onClick={handleClose}>Close</Button>
    </DialogActions>
  </Dialog>
}

function ticketFields(_dd: DivisionData, div: Division, index: number) {
  return <>
    <Stack direction="row" spacing={0.75}>
      <Typography sx={{ paddingTop: '4px' }} variant="h5" fontWeight={700}>{index + 1}</Typography>
      <Stack direction="column" spacing={'5px'}>
        {div.type < 4 &&
          <Stack direction="row" spacing={'5px'}>
            <TextField label="First Name" required={true} size='small' />
            <TextField label="Last Name(s)" required={true} size='small' />
          </Stack>}
        {div.type == 2 &&
          <>
            <Stack direction="row" spacing={'5px'}>
              <TextField label="First Name" required={true} variant='outlined' size='small' />
              <TextField label="Last Name(s)" required={true} variant='outlined' size='small' />
            </Stack>
            <FormControlLabel required control={<Checkbox />} label="Both puzzlers meet eligibility requirements" />
          </>
        }
        {div.type == 4 &&
          <>
            <TextField label="Team Name" required={true} size='small' />
            <FormControlLabel required control={<Checkbox />} label="Two of the team's puzzlers meet eligibility requirements" />
          </>
        }
      </Stack>
    </Stack>
  </>
}