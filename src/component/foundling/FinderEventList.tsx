import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";

import type { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useEffect, useState } from "react";

import { Amplify } from 'aws-amplify';
import outputs from '../../../amplify_outputs.json';
import FoundlingResponsePopup from "./FoundlingResponsePopup";

import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import GroupsIcon from '@mui/icons-material/Groups';


Amplify.configure(outputs)

const client = generateClient<Schema>();

type FoundlingEvent = Schema['FoundlingEvent']['type'];

interface Params {
  foundlingId: string;
  eventId: number;
}

export default function FinderEventList({ foundlingId, eventId }: Params) {

  const [foundlingEvents, setFoundlingEvents] = useState<FoundlingEvent[]>();

  const fetchData = async () => {
    console.log('Load')
    const { data: foundlingEvents, errors: eventErrors } = await client.models.FoundlingEvent.listFoundlingEventsByEvent({ eventId: eventId })

    setFoundlingEvents(foundlingEvents);

    if (eventErrors) {
      console.error("Error:", eventErrors);
      console.log(foundlingEvents);
      for (const error of eventErrors) {
        console.error(error.message);
      }
      return;
    }
  };

  useEffect(() => { fetchData(); }, []);

  return (
    <>
      <Grid container sx={{ border: 0 }} spacing={1}>

        {foundlingEvents?.map((thisEvent) =>
          <>
            <Grid size={8}>
              <Grid container size={12} sx={{ border: 0 }}>
                <Grid size={9} textAlign={"left"}>
                  <Stack direction="column" spacing={1}>
                    <Typography sx={{ fontWeight: 800 }}>{thisEvent.foundlingId}</Typography>
                  </Stack>
                </Grid>
                <Grid size={3} sx={{ border: 0 }}>
                  <Stack direction="row" spacing={1}>
                    {thisEvent.pair &&
                      <GroupIcon />
                    }
                    {thisEvent.team &&
                      <GroupsIcon />
                    }
                  </Stack>

                </Grid>

                <Grid size={12} textAlign={"left"} sx={{ border: 0 }}>
                  <Typography>{thisEvent.comments}</Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid size={4}>
              <FoundlingResponsePopup eventId={thisEvent.eventId} foundlingId={thisEvent.foundlingId} foundlingEventId={thisEvent.id} currentFoundlingId={foundlingId} />
            </Grid>

          </>
        )}
      </Grid >
    </>
  );
};
