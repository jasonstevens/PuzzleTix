import { Divider, Grid, Stack, Typography } from "@mui/material";

import type { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useEffect, useState } from "react";

import { Amplify } from 'aws-amplify';
import outputs from '../../../amplify_outputs.json';
import FoundlingResponsePopup from "./FoundlingResponsePopup";

import GroupIcon from '@mui/icons-material/Group';
import GroupsIcon from '@mui/icons-material/Groups';


Amplify.configure(outputs)

const client = generateClient<Schema>();
interface Params {
  foundlingId: string;
  eventId: number;
}

interface FoundlingData {
  id: string,
  pair?: boolean,
  team?: boolean,
  foundlingId: string,
  displayName?: string,
  comments?: string,

}

export default function FinderEventList({ foundlingId, eventId }: Params) {

  const [foundlingEvents, setFoundlingEvents] = useState<FoundlingData[]>();

  const fetchData = async () => {
    console.log('Load')
    const { data: foundlingEvents, errors: eventErrors } = await client.models.FoundlingEvent.listFoundlingEventsByEvent({ eventId: eventId },
      { selectionSet: ['id', 'pair', 'team', 'foundlingId', 'comments', 'foundling.displayName'] },
    )

    const f = foundlingEvents.map(thisRec => {
      const z: FoundlingData = {
        id: thisRec.id,
        pair: thisRec.pair ? thisRec.pair : false,
        team: thisRec.team ? thisRec.team : false,
        comments: thisRec.comments ? thisRec.comments : '',
        foundlingId: thisRec.foundlingId,
        displayName: thisRec.foundling.displayName ? thisRec.foundling?.displayName : 'Woot',
      }
      return z;
    });

    setFoundlingEvents(f);

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
            <Grid container size={12} sx={{ border: 0 }}>
              <Grid size={12}>
                <Divider />
              </Grid>

              <Grid size={7} textAlign={"left"}>
                <Stack direction="column" spacing={1}>
                  <Typography sx={{ fontWeight: 800, fontSize: 20 }}>{thisEvent.displayName}</Typography>
                </Stack>
              </Grid>
              <Grid size={1.5} sx={{ border: 0 }}>

                {thisEvent.pair &&
                  <GroupIcon sx={{ fontSize: 30 }} />
                }
              </Grid>
              <Grid size={1.5} sx={{ border: 0 }}>

                {thisEvent.team &&
                  <GroupsIcon sx={{ fontSize: 30 }} />
                }

              </Grid>
              <Grid size={2}>
                <FoundlingResponsePopup eventId={eventId} foundlingId={thisEvent.foundlingId} foundlingEventId={thisEvent.id} currentFoundlingId={foundlingId} />
              </Grid>

              <Grid size={12} textAlign={"left"} sx={{ border: 0 }}>
                <Typography>{thisEvent.comments}</Typography>
              </Grid>
            </Grid>



          </>
        )}
      </Grid >
    </>
  );
};
