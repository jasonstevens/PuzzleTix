import { Box, Tabs, Tab, Paper, Stack } from "@mui/material";

import { getEvents } from "../data/PuzzleEvent";
import React from "react";
import FinderEventList from "./FinderEventList";
import FinderResponseList from "./FinderResponseList";
import FinderAvailableList from "./FinderAvailableList";

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

export default function FoundlingPanel({ foundlingId }: Params) {

  const [value, setValue] = React.useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const puzzleEvents = getEvents().filter(f => (f.finder));

  return (
    <>
      <Tabs onChange={handleTabChange} value={value}>
        <Tab label="Events" sx={{ fontWeight: '800' }} />
        <Tab label="Messages" sx={{ fontWeight: '800' }} />
        <Tab label="Puzzlers" sx={{ fontWeight: '800' }} />
      </Tabs>

      <CustomTabPanel value={value} index={0}>
        <FinderAvailableList foundlingId={foundlingId} />
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        <FinderResponseList foundlingId={foundlingId} />
      </CustomTabPanel>

      <CustomTabPanel value={value} index={2} >
        <Stack direction="column" spacing={1}>
          {puzzleEvents.map((thisEvent) =>
            <>
              <Paper sx={{ padding: '3px', paddingLeft: '10px', paddingRight: '10px', backgroundColor: "#ffffff55", borderRadius: '10px' }}>

                <Box display="flex" justifyContent="center" sx={{ padding: '1px' }}>
                  <Box component="img" src={thisEvent.logo} sx={{ width: "200px" }} />
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
