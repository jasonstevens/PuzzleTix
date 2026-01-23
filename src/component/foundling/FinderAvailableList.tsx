import { Box, CircularProgress, Divider, Grid, Typography } from "@mui/material";

import { getEventById, getEvents } from "../data/PuzzleEvent";
import FoundlingEventRegisterPopup from "./FoundlingEventRegisterPopup";

import type { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useEffect, useState } from "react";
import FoundlingEventUpdatePopup from "./FoundlingEventUpdatePopup";

const client = generateClient<Schema>();
type FoundlingEvent = Schema['FoundlingEvent']['type'];

interface Params {
  foundlingId: string;
}

export default function FinderAvailableList({ foundlingId }: Params) {

  const [foundlingEvents, setFoundlingEvents] = useState<FoundlingEvent[]>();

  const onRefresh = () => {
    console.log('Refresh');
    fetchData();
  }

  const fetchData = async () => {
    console.log('Load')
    const { data: foundlingEvents, errors: eventErrors } = await client.models.FoundlingEvent.listFoundlingEventsByFoundling({ foundlingId: foundlingId })

    setFoundlingEvents(foundlingEvents.filter(thisEvent => { return thisEvent.status != 'CF' && thisEvent.status != 'CE' && thisEvent.status != 'CC' && thisEvent.status != 'CG' }));

    if (eventErrors) {
      console.error("Error:", eventErrors);
      console.log(foundlingEvents);
      for (const error of eventErrors) {
        console.error(error.message);
      }
      return;
    }
  };

  const puzzleEvents = getEvents()
    .filter(f => f.finder)
    .filter(f =>
      foundlingEvents?.every(g => f.id !== g.eventId))
    ;

  useEffect(() => { fetchData(); }, []);

  return (
    <>

      {foundlingEvents ?
        <>
          {foundlingEvents.length > 0 &&
            <>
              <Typography variant='h6' sx={{ marginBottom: '10px', fontWeight: 700 }}>Your Events</Typography>
              <Grid container alignItems="center">
                {foundlingEvents?.map((thisEvent) =>
                  <>
                    <Grid size={8}>
                      <Box component="img" src={getEventById(thisEvent.eventId).logo} sx={{ width: "200px" }} />
                    </Grid>
                    <Grid size={4}>
                      <FoundlingEventUpdatePopup foundlingResponseId={thisEvent.id}
                        puzzleEvent={getEventById(thisEvent.eventId)}
                        comments={thisEvent.comments ? thisEvent.comments : ''}
                        pair={thisEvent.pair == true ? true : false}
                        team={thisEvent.team == true ? true : false}
                        onRefresh={onRefresh} />
                    </Grid>
                  </>
                )}
              </Grid>
            </>
          }

          {puzzleEvents.length > 0 &&
            <>
              <Divider sx={{ marginTop: '10px', marginBottom: '10px' }} />

              <Typography variant='h6' sx={{ marginBottom: '10px', fontWeight: 700 }}>Available Events</Typography>
              <Grid container alignItems="center">
                {puzzleEvents.map((thisEvent) =>
                  <>
                    <Grid size={8}>
                      <Box component="img" src={thisEvent.logo} sx={{ width: "200px" }} />
                    </Grid>
                    <Grid size={4}>
                      <FoundlingEventRegisterPopup puzzleEvent={thisEvent} foundlingId={foundlingId} onRefresh={onRefresh} />
                    </Grid>
                  </>
                )}
              </Grid>
            </>
          }
        </>
        :
        <div style={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></div>
      }
    </>
  );
};