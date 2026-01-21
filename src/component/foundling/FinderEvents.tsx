import { Box, Button, Tabs, Tab, Paper, Grid } from "@mui/material";

import type { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useEffect, useState } from "react";

import { useAuthenticator } from '@aws-amplify/ui-react';

import { Amplify } from 'aws-amplify';
import outputs from '../../../amplify_outputs.json';
import { getEvents } from "../data/PuzzleEvent";
import React from "react";
import FoundlingEventPopup from "./FoundlingEventRegisterPopup";
import FinderEventList from "./FinderEventList";

Amplify.configure(outputs)

const client = generateClient<Schema>();


type FoundlingEvent = Schema['FoundlingEvent']['type'];
type FoundlingResponse = Schema['FoundlingResponse']['type'];

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

  const { user } = useAuthenticator((context) => [context.user]);

  const [value, setValue] = React.useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const puzzleEvents = getEvents().filter(f => (f.finder));

  const [foundlingEvents, setFoundlingEvents] = useState<FoundlingEvent[]>();
  const [foundlingResponses, setFoundlingResponses] = useState<FoundlingResponse[]>();

  const fetchData = async () => {
    console.log('Load')
    const { data: foundlingEvents, errors: eventErrors } = await client.models.FoundlingEvent.listFoundlingEventsByFoundling({ foundlingId: user!.signInDetails!.loginId! })

    const { data: foundlingResponses, errors: responseErrors } = await client.models.FoundlingResponse.listFoundlingResponsesByFoundling({ foundlingId: user!.signInDetails!.loginId! })

    setFoundlingEvents(foundlingEvents);
    setFoundlingResponses(foundlingResponses);

    if (eventErrors) {
      console.error("Error:", eventErrors);
      console.log(foundlingEvents);
      for (const error of eventErrors) {
        console.error(error.message);
      }
      return;
    }

    if (responseErrors) {
      console.error("Error:", responseErrors);
      console.log(foundlingResponses);
      for (const error of responseErrors) {
        console.error(error.message);
      }
      return;
    }
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <>
      <Grid container spacing={1}>
        {puzzleEvents.map((thisEvent) =>
          <>
            <Paper sx={{ padding: 1, backgroundColor: "#00000022", borderRadius: '10px' }}>
              <Box component="img" src={thisEvent.logo} sx={{ width: "150px", paddingTop: "2px" }} />
              <Box sx={{ textAlign: "center" }} alignItems='center'>
                <FoundlingEventPopup puzzleEvent={thisEvent} foundlingId={foundlingId} />
              </Box>
            </Paper>
          </>
        )}
      </Grid>

      <Tabs onChange={handleTabChange} value={value}>
        <Tab label="Messages for Me" />
        <Tab label="Other Puzzlers" />
      </Tabs>
      <CustomTabPanel value={value} index={0}>
        {foundlingResponses?.map((thisEvent) =>
          <>
            <Paper sx={{ padding: 1, backgroundColor: "#00000022", borderRadius: '10px' }}>
              {/* <Box component="img" src={thisEvent.logo} sx={{ width: "150px", paddingTop: "2px" }} /> */}
              <Box sx={{ textAlign: "center" }} alignItems='center'>
                <Button sx={{ m: 1 }} variant="contained">Reply</Button>

              </Box>
            </Paper>
          </>
        )}
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        {puzzleEvents.map((thisEvent) =>
          <>
            <Paper sx={{ padding: 1, backgroundColor: "#00000022", borderRadius: '10px' }}>
              <Box component="img" src={thisEvent.logo} sx={{ width: "150px", paddingTop: "2px" }} />
              <Box sx={{ textAlign: "center" }} alignItems='center'>
                <FinderEventList foundlingId={foundlingId} eventId={thisEvent.id} />
              </Box>
            </Paper>
          </>
        )}


      </CustomTabPanel>
    </>
  );
};
