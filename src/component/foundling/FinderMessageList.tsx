import { Grid, Stack, Typography } from "@mui/material";

import type { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useEffect, useState } from "react";

import { Amplify } from 'aws-amplify';
import outputs from '../../../amplify_outputs.json';

Amplify.configure(outputs)

const client = generateClient<Schema>();
interface Params {
  foundlingId: string;
}

interface FoundlingData {
  id: string,
  foundlingId: string,
  responderId: string,
  displayName?: string,
  comments?: string,

}

export default function FinderMessageList({ foundlingId }: Params) {

  const [foundlingEvents, setFoundlingEvents] = useState<FoundlingData[]>();

  const fetchData = async () => {
    console.log('LoadF:' + foundlingId)
    const { data: foundlingResponses, errors: eventErrors } = await client.models.FoundlingResponse.listFoundlingResponsesByFoundling({ foundlingId: foundlingId });
    //   { selectionSet: ['id', 'pair', 'team', 'foundlingId', 'comments', 'foundling.displayName'] },
    // )

    console.log(foundlingResponses)

    const f = foundlingResponses.map(thisRec => {
      const z: FoundlingData = {
        id: thisRec.id,
        responderId: thisRec.responderId,
        comments: thisRec.comments ? thisRec.comments : '',
        foundlingId: thisRec.foundlingId,
        //        displayName: thisRec.foundling.displayName ? thisRec.foundling?.displayName : 'Woot',
      }
      return z;
    });
    setFoundlingEvents(f);

    if (eventErrors) {
      console.error("Error:", eventErrors);
      console.log(foundlingResponses);
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
                    <Typography sx={{ fontWeight: 800 }}>{thisEvent.displayName}</Typography>
                  </Stack>
                </Grid>

                <Grid size={12} textAlign={"left"} sx={{ border: 0 }}>
                  <Typography>{thisEvent.comments}</Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid size={4}>
              {/* <FoundlingResponsePopup eventId={eventId} foundlingId={thisEvent.foundlingId} foundlingEventId={thisEvent.id} currentFoundlingId={foundlingId} /> */}
            </Grid>

          </>
        )}
      </Grid >
    </>
  );
};
