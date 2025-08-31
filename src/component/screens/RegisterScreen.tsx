import { Autocomplete, Box, Button, FormControl, FormGroup, Rating, Stack, TextField, Typography, Grid, Divider, Checkbox, FormControlLabel } from "@mui/material";
import Paper from "@mui/material/Paper";
import { countries } from "../Countries";
import { CreditCard, PaymentForm } from 'react-square-web-payments-sdk';
import ExtensionIcon from '@mui/icons-material/Extension';

import logo from '../../assets/puzzletix-white.svg'
import { useState } from "react";

interface Division {
  id: number;
  name: string;
  description?: string;
  type: number;
  maximum: number;
  cost?: number;
}

interface DivisionData {
  index: number;
  firstName?: string;
  lastName?: string;
}

const divs: Division[] = [
  { id: 1, name: "Solo", description: "Complete a puzzle by yourself.", type: 1, maximum: 4, cost: 30 },
  { id: 2, name: "Pairs", description: "Complete a puzzle as a pair. Only one ticket required per pair.", type: 2, maximum: 2, cost: 40 },
  { id: 3, name: "Teams", description: "Complete a puzzle as a team of 3 or 4.  Only one ticket required per team.", type: 4, maximum: 2, cost: 50 }
];

const getIcon = (div: Division) => {
  switch (div.type) {
    case 2: return <ExtensionIcon fontSize="inherit" />
    case 4: return <ExtensionIcon fontSize="inherit" />
    default: return <ExtensionIcon fontSize="inherit" />
  }
}

const getOutlineIcon = (div: Division) => {
  switch (div.type) {
    case 2: return <ExtensionIcon fontSize="inherit" />
    case 4: return <ExtensionIcon fontSize="inherit" />
    default: return <ExtensionIcon fontSize="inherit" />
  }
}

export default function Register() {

  const [div1, setDiv1] = useState<DivisionData[]>([]);
  const [div2, setDiv2] = useState<DivisionData[]>([]);
  const [div3, setDiv3] = useState<DivisionData[]>([]);

  function handleDivisionTotal(value: number | null, division: Division): void {
    //event: SyntheticEvent<Element, Event>, 
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
  }

  return (
    <>
      <Box component="img" src={logo} sx={{ maxWidth: "350px" }} />

      <Paper sx={{ padding: 1, backgroundColor: "#ffffffbb", borderRadius: '15px' }}>

        <Button href="/" variant="contained">Return</Button>
        <Stack direction="column" spacing={2} sx={{ marginTop: 2 }}>

          <Stack direction="column" spacing={1} textAlign={"left"}>
            <Typography variant="h4" fontWeight={800}>PuzzleMasters 3000</Typography>

            {divs.map(div => (
              <>
                <Divider />
                <Grid container columns={8} sx={{ width: "100%" }} spacing={0}>
                  <Grid size={2}>
                    <Typography variant="h5" sx={{ paddingTop: 1 }}>{div.name}</Typography>
                  </Grid>
                  <Grid size={6} textAlign="right">
                    <Rating defaultValue={0} max={div.maximum} size="large" sx={{ margin: '10px' }}
                      icon={getIcon(div)}
                      emptyIcon={getOutlineIcon(div)}
                      onChange={(_event, value) => handleDivisionTotal(value, div)}
                    />
                  </Grid>
                  {div.cost ?
                    <>
                      <Grid size={6}>
                        <Typography>{div.description}</Typography>
                      </Grid>
                      <Grid size={2} textAlign="right" sx={{ paddingRight: 1.5 }}>
                        <Typography variant="h6">£{div.cost}</Typography>
                      </Grid>
                    </>
                    :
                    <>
                      <Grid size={8}>
                        <Typography>{div.description}</Typography>
                      </Grid>
                    </>
                  }
                </Grid>

                {div.id == 1 &&
                  <>
                    {div1?.map((dd, index) => (
                      ticketFields(dd, div, index)
                    ))}
                  </>
                }

                {div.id == 2 &&
                  <>
                    {div2?.map((dd, index) => (
                      ticketFields(dd, div, index)
                    ))}
                  </>
                }

                {div.id == 3 &&
                  <>
                    {div3?.map((dd, index) => (
                      ticketFields(dd, div, index)
                    ))}
                  </>
                }
              </>
            ))}


            <Typography variant="h5">Buyer</Typography>
            <FormGroup>
              <Stack direction="row" spacing={1}>
                <TextField label="First Name" required={true} />
                <TextField label="Last Name(s)" required={true} />
              </Stack>
            </FormGroup>
            <TextField label="E-Mail Address" required={true} />

            <FormControl>
              <Autocomplete autoHighlight options={countries} getOptionLabel={(option) => option.label}
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
      </Paper>
    </>
  );
};

function ticketFields(_dd: DivisionData, div: Division, index: number) {
  return <>
    <Paper sx={{ padding: 1, borderRadius: '10px', backgroundColor: "#ffffff66" }}>
      <Typography variant="h6">{div.name} Ticket {index + 1}</Typography>
      <Stack direction="column" spacing={1}>
        {div.type < 4 &&
          <Stack direction="row" spacing={1}>
            <TextField label="First Name" required={true} />
            <TextField label="Last Name(s)" required={true} />
          </Stack>}
        {div.type == 2 &&
          <>
            <Stack direction="row" spacing={1}>
              <TextField label="First Name" required={true} />
              <TextField label="Last Name(s)" required={true} />
            </Stack>
            <FormControlLabel required control={<Checkbox />} label="Both puzzlers meet the prize eligibility requirements" />
          </>
        }

        {div.type == 4 &&
          <>
            <TextField label="Team Name" required={true} />
            <FormControlLabel required control={<Checkbox />} label="Two of the team's puzzlers meet the prize eligibility requirements" />
          </>
        }
      </Stack>
    </Paper>
  </>;
}
