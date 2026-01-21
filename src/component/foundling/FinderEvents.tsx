import { Box, Tabs, Tab, Paper, Grid, Container, Stack } from "@mui/material";

import { Amplify } from 'aws-amplify';
import outputs from '../../../amplify_outputs.json';
import { getEvents } from "../data/PuzzleEvent";
import React from "react";
import FoundlingEventPopup from "./FoundlingEventRegisterPopup";
import FinderEventList from "./FinderEventList";
import FinderResponseList from "./FinderResponseList";

Amplify.configure(outputs)


// import { useAuthenticator } from '@aws-amplify/ui-react';
// import type { Schema } from "../../../amplify/data/resource";
// import { generateClient } from "aws-amplify/data";
// import { useEffect, useState } from "react";
// const client = generateClient<Schema>();
// type FoundlingEvent = Schema['FoundlingEvent']['type'];
interface Params {
  foundlingId: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div hidden={value !== index} {...other} >
      {value === index && <Box sx={{ p: 0, paddingTop: '5px' }}>{children}</Box>}
    </div>
  );
}

export default function FinderEvents({ foundlingId }: Params) {

  const [value, setValue] = React.useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const puzzleEvents = getEvents().filter(f => (f.finder));


  // const { user } = useAuthenticator((context) => [context.user]);
  // const [foundlingEvents, setFoundlingEvents] = useState<FoundlingEvent[]>();

  // const fetchData = async () => {
  //   console.log('Load')
  //   const { data: foundlingEvents, errors: eventErrors } = await client.models.FoundlingEvent.listFoundlingEventsByFoundling({ foundlingId: user!.signInDetails!.loginId! })

  //   setFoundlingEvents(foundlingEvents);

  //   if (eventErrors) {
  //     console.error("Error:", eventErrors);
  //     console.log(foundlingEvents);
  //     for (const error of eventErrors) {
  //       console.error(error.message);
  //     }
  //     return;
  //   }
  // };

  // useEffect(() => { fetchData(); }, []);

  return (
    <>
      {puzzleEvents.map((thisEvent) =>
        <>
          <Paper sx={{ padding: 1, backgroundColor: "#00000022", borderRadius: '10px', width: '100%' }}>
            <Grid container alignItems="center">
              <Grid size={8}>
                <Box component="img" src={thisEvent.logo} sx={{ width: "200px" }} />
              </Grid>
              <Grid size={4}>
                <FoundlingEventPopup puzzleEvent={thisEvent} foundlingId={foundlingId} />
              </Grid>
            </Grid>
          </Paper>
        </>
      )}

      <Tabs onChange={handleTabChange} value={value}>
        <Tab label="Messages" sx={{ fontWeight: '800' }} />
        <Tab label="Puzzlers" sx={{ fontWeight: '800' }} />
      </Tabs>
      <CustomTabPanel value={value} index={0}>
        <FinderResponseList foundlingId={foundlingId} />
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1} >
        <Stack direction="column" spacing={1}>
          {puzzleEvents.map((thisEvent) =>
            <>
              <Paper sx={{ padding: '3px', paddingLeft: '10px', paddingRight: '10px', backgroundColor: "#00000022", borderRadius: '10px' }}>
                <Box display="flex" justifyContent="center" sx={{ paddingBottom: '10px' }}>
                  <Box component="img" src={thisEvent.logo} sx={{ width: "250px" }} />
                </Box>
                <Box sx={{ textAlign: "center" }} alignItems='center'>
                  <FinderEventList foundlingId={foundlingId} eventId={thisEvent.id} />
                </Box>
              </Paper>
            </>
          )}
        </Stack>

      </CustomTabPanel>
    </>
  );
};
