import { CircularProgress, Grid, Typography } from "@mui/material";

import type { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useEffect, useState } from "react";

import { getEventById } from "../data/PuzzleEvent";

const client = generateClient<Schema>();
interface Params {
  foundlingId: string;
}

interface FoundlingData {
  id: string,
  foundlingId: string,
  responderId?: string,
  displayName?: string,
  comments?: string,
  eventId: number,

}

export default function FinderResponseList({ foundlingId }: Params) {

  const [foundlingEvents, setFoundlingEvents] = useState<FoundlingData[]>();

  const fetchData = async () => {
    console.log('LoadF:' + foundlingId)
    const { data: foundlingResponses, errors: eventErrors } = await client.models.FoundlingResponse.list(
      { selectionSet: ['id', 'foundlingId', 'responderId', 'eventId', 'comments', 'foundling.displayName'] }
    );

    console.log(foundlingResponses)

    const f = foundlingResponses.filter(rec => { return rec.foundlingId == foundlingId }).map(thisRec => {
      const z: FoundlingData = {
        id: thisRec.id,
        comments: thisRec.comments ? thisRec.comments : '',
        eventId: thisRec.eventId,
        responderId: thisRec.responderId,
        foundlingId: thisRec.foundlingId,
        displayName: thisRec.foundling.displayName ? thisRec.foundling?.displayName : 'Woot',
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
      {foundlingEvents ?
        <>
          {foundlingEvents?.map((thisEvent) =>
            <>
              <Grid container size={12} sx={{ border: 0 }}>
                <Grid size={3} textAlign={"left"}>From:</Grid>
                <Grid size={9} textAlign={"left"}>
                  <Typography sx={{ fontWeight: 800 }}>{thisEvent.displayName}</Typography>
                </Grid>

                <Grid size={3} textAlign={"left"}>Event:</Grid>
                <Grid size={9} textAlign={"left"}>{getEventById(thisEvent.eventId).name}</Grid>

                <Grid size={3} textAlign={"left"}>Message:</Grid>
                <Grid size={9} textAlign={"left"} sx={{ border: 0 }}>
                  <Typography>{thisEvent.comments}</Typography>
                </Grid>
              </Grid>

            </>
          )}
        </>
        :
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </div>
      }

    </>
  );
};
