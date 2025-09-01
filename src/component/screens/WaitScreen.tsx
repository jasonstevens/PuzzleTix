import { Box, Button, Stack, Typography, Grid, Divider, FormControlLabel, Switch } from "@mui/material";
import Paper from "@mui/material/Paper";

import logo from '../../assets/puzzletix-white.svg'

import Reorder from "../admin/WaitGrid";
import WaitSlider from "../admin/WaitSlider";

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
const divs: Division[] = [
  {
    id: 1, name: "Solo", description: "Complete a puzzle as an individual.", type: 1, maximum: 4, cost: 30,
    extraText: "Solo division uses an unreleased 500pc Ravensburger puzzle. The puzzle is yours to keep and take home after completion of the event."
  },
  {
    id: 2, name: "Pairs", description: "Complete a puzzle as a pair. Only one ticket required per pair.", type: 2, maximum: 2, cost: 40,
    extraText: "The Pairs division uses two unreleased 500pc Ravensburger puzzles. The puzzle is yours to keep and take home after completion of the event."
  },
  {
    id: 3, name: "Teams", description: "Complete a puzzle as a team of 3 or 4.  Only one ticket required per team.", type: 4, maximum: 2, cost: 50,
    extraText: "Teams division uses an unreleased 1000pc Ravensburger puzzle. The puzzle is yours to keep and take home after completion of the event."
  },
  {
    id: 4, name: "Puzzle Chicken", description: "Puzzle Chicken side event.", url: "https://ukjpa.org/chicken", type: 1, maximum: 2, cost: 10,
    extraText: "Puzzle Chicken is a fun new type of casual speed race created by the UKJPA, and has been run at numerous online and in-person events.\n\nFor more details and full rules, see the website linked below."
  }
];

export default function Register() {

  return (
    <>
      <Box component="img" src={logo} sx={{ maxWidth: "350px" }} />

      <Paper sx={{ padding: 1, backgroundColor: "#ffffffbb", borderRadius: '15px' }}>

        <Box sx={{ textAlign: "right" }}>
          <Button href="/" variant="contained">Return</Button>
        </Box>

        <Stack direction="column" spacing={2} sx={{ marginTop: 2 }}>

          <Stack direction="column" spacing={1} textAlign={"left"}>
            <Typography variant="h4" fontWeight={800}>Waiting List: PuzzleMasters 3000</Typography>
            <Divider />

            {divs.map(div => (
              <>

                <Grid container columns={8} sx={{ width: "100%" }} spacing={0}>
                  <Grid size={8}>
                    <Stack direction="row">
                      <Typography variant="h4" sx={{ paddingTop: 1, fontWeight: 600 }}>{div.name}</Typography>
                    </Stack>
                  </Grid>
                </Grid>

                <Paper sx={{ padding: 2, width: '100%' }}>

                  <Grid container columns={8}>
                    <Grid size={4}>
                      <Grid container columns={4} spacing={0}>
                        <Grid size={3} textAlign="left">Total</Grid><Grid size={1}>200</Grid>
                        <Grid size={3} textAlign="left">Sold</Grid><Grid size={1}>195</Grid>
                        <Grid size={3} textAlign="left">Reserved</Grid><Grid size={1}>5</Grid>
                        <Grid size={3} textAlign="left">Waiting</Grid><Grid size={1}>2</Grid>
                      </Grid>
                    </Grid>

                    <Grid size={4}>
                      <FormControlLabel control={<Switch />} label="Automatically offer available tickets" />
                      <WaitSlider />
                    </Grid>
                  </Grid>
                </Paper >

                <Paper>
                  <Reorder />
                </Paper>
              </>
            ))}
          </Stack >
        </Stack>
      </Paper >
    </>
  );
};