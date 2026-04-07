
import { Box, FormGroup, Stack, TextField, Typography, CircularProgress, IconButton, Grid, Paper, Alert } from "@mui/material";

import SaveIcon from '@mui/icons-material/Save';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';

import Snackbar, { type SnackbarCloseReason } from '@mui/material/Snackbar';

import type { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useEffect, useState } from "react";

import { useAuthenticator } from '@aws-amplify/ui-react';

import { Amplify } from 'aws-amplify';
import outputs from '../../../amplify_outputs.json';

Amplify.configure(outputs)

const client = generateClient<Schema>();

export default function PuzzlerTeamScreen() {

  const { user } = useAuthenticator((context) => [context.user]);

  const [loaded, setLoaded] = useState(false);

  const [team, setTeam] = useState(false);

  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState({
    id: '',
    loginId: '',
    teamName: '',
    member1: '',
    member2: '',
    member3: '',
    member4: ''
  });

  const fetchData = async () => {
    console.log('Load')
    const { data: items, errors } = await client.models.PuzzlerTeam.listPuzzlerTeamByLoginId({ loginId: user!.signInDetails!.loginId! })

    console.log('Retrieving Team')
    console.log(user!.signInDetails!.loginId!);

    if (errors) {
      console.error("Error:", errors);
      console.log(items);
      for (const error of errors) {
        console.error(error.message);
      }
      return;
    }

    console.log(items);
    console.log(items?.length);

    if (items?.length > 0) {
      const puzzler = items[0]!;
      console.log('Setting');
      console.log(puzzler);
      setFormData((prevFormData) => ({
        ...prevFormData,
        id: puzzler.id,
        loginId: puzzler.loginId ? puzzler.loginId : '',
        teamId: puzzler.teamId ? puzzler.teamId : '',
        teamName: puzzler.teamName ? puzzler.teamName : '',
        member1: puzzler.member1 ? puzzler.member1 : '',
        member2: puzzler.member2 ? puzzler.member2 : '',
        member3: puzzler.member3 ? puzzler.member3 : '',
        member4: puzzler.member4 ? puzzler.member4 : '',
      }));
      setTeam(true);
    }
    setLoaded(true);
  };

  useEffect(() => { fetchData(); }, []);

  const formFilled = (): boolean => {
    return !(formData
      && formData.teamName != '' && formData.member1 != ''
    );
  }

  const handleChange = (event: { target: { name: any; value: any }; }) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData!,
      [name]: value,
    }));
  };

  // const handleChecked = (event: { target: { name: any; checked: any }; }) => {
  //   const { name, checked } = event.target;
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     [name]: checked,
  //   }));
  // };

  const submit = async () => {
    console.log(formData)

    console.log("Update")
    const { data, errors } = await client.models.PuzzlerTeam.update(formData);

    if (errors) {
      console.error("Error:", errors);
      console.log(data);
      for (const error of errors) {
        console.error(error.message);
      }
      return;
    }
    setSaved(true);
  }

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setSaved(false);
  };

  return (
    <>
      {loaded ?
        <>
          {team &&
            <Box sx={{ minWidth: '350px' }}>
              <Paper sx={{ padding: 1, backgroundColor: "#ffffff77", borderRadius: '15px', marginBottom: '15px' }} >
                <Stack direction="column" spacing={1} textAlign={"left"}>

                  <Grid container>
                    <Grid size={10.5}><Typography variant="h5">Team Registration</Typography></Grid>
                    <Grid size={1.5}>
                      <Box sx={{ textAlign: "center" }} alignItems='center'>
                        <IconButton onClick={submit} disabled={formFilled()} sx={{ color: '#e33e7f', padding: '3px', marginTop: '2px', border: 2 }} size='large'><SaveIcon /></IconButton>
                      </Box>
                    </Grid>
                  </Grid>

                  <FormGroup>
                    <Stack direction="column" spacing={1.5}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <GroupsIcon sx={{ color: 'action.active', mr: 1, my: 0.75 }} />
                        <TextField name="teamName" label="Team Name" size='small' sx={{ width: '100%' }} required onChange={handleChange} value={formData.teamName} />
                      </Box>
                      {/* 
                      <FormControlLabel control={<Checkbox sx={{ paddingLeft: 0 }} name="eligible" onChange={handleChecked} />}
                        label="Two team members are residents of the United Kingdom, its Territories or Crown Dependencies" checked={formData.eligible} /> */}

                      <Typography variant="h5">Members</Typography>

                      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <PersonIcon sx={{ color: 'action.active', mr: 1, my: 1 }} />
                        <TextField name="member1" label="Member 1's Preferred Full Name" required size='small' sx={{ width: '100%' }} onChange={handleChange} value={formData.member1} />
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <PersonIcon sx={{ color: 'action.active', mr: 1, my: 1 }} />
                        <TextField name="member2" label="Member 2's Preferred Full Name" size='small' sx={{ width: '100%' }} onChange={handleChange} value={formData.member2} />
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <PersonIcon sx={{ color: 'action.active', mr: 1, my: 1 }} />
                        <TextField name="member3" label="Member 3's Preferred Full Name" size='small' sx={{ width: '100%' }} onChange={handleChange} value={formData.member3} />
                      </Box>

                      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <PersonIcon sx={{ color: 'action.active', mr: 1, my: 1 }} />
                        <TextField name="member4" label="Member 4's Preferred Full Name" size='small' sx={{ width: '100%' }} onChange={handleChange} value={formData.member4} />
                      </Box>

                    </Stack>
                  </FormGroup>

                </Stack>
              </Paper>
              <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                autoHideDuration={5000}
                open={saved}
                onClose={handleClose}
                message="Team Registration Saved"
              >
                <Alert
                  onClose={handleClose}
                  severity="success"
                  variant="filled"
                  sx={{ width: '100%' }}
                >Team Registration Saved</Alert>
              </Snackbar>
            </Box>
          }
        </>
        :
        <div>
          <CircularProgress size='100px' sx={{ marginTop: '100px' }} />
        </div>
      }
    </>
  );
};
