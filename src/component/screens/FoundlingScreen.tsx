import { Box, FormGroup, Stack, TextField, Typography, Paper, CircularProgress, IconButton, Grid } from "@mui/material";

import SaveIcon from '@mui/icons-material/Save';

import logo from '../../assets/puzzletix-white.svg'

import type { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useEffect, useState } from "react";

import { useAuthenticator } from '@aws-amplify/ui-react';

import { Amplify } from 'aws-amplify';
import outputs from '../../../amplify_outputs.json';
import FoundlingPanel from "../foundling/FoundlingPanel";

Amplify.configure(outputs)

const client = generateClient<Schema>();

export default function VolunteerScreen() {

  const { user } = useAuthenticator((context) => [context.user]);

  const [loaded, setLoaded] = useState(false);
  const [profile, setProfile] = useState(true);

  const [formData, setFormData] = useState({
    id: '',
    loginId: '',
    firstName: '',
    lastName: '',
    performance: '',
    displayName: '',
    goal: '',
  });

  const fetchData = async () => {
    console.log('Load')
    const { data: items, errors } = await client.models.Foundling.listFoundlingByLoginId({ loginId: user!.signInDetails!.loginId! })

    if (errors) {
      console.error("Error:", errors);
      console.log(items);
      for (const error of errors) {
        console.error(error.message);
      }
      return;
    }

    if (items?.length > 0) {
      const foundling = items[0]!;
      console.log('Setting');
      console.log(foundling);
      setFormData((prevFormData) => ({
        ...prevFormData,
        id: foundling.id,
        loginId: foundling.loginId ? foundling.loginId : '',
        firstName: foundling.firstName ? foundling.firstName : '',
        lastName: foundling.lastName ? foundling.lastName : '',
        displayName: foundling.displayName ? foundling.displayName : '',
        goal: foundling.goal ? foundling.goal : '',
        performance: foundling.performance ? foundling.performance : '',

      }));
    } else {
      setProfile(false);
    }

    setLoaded(true);
  };

  useEffect(() => { fetchData(); }, []);

  const formFilled = (): boolean => {
    return !(formData
      && formData.firstName != '' && formData.displayName != ''
    );
  }

  const handleChange = (event: { target: { name: any; value: any }; }) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData!,
      [name]: value,
    }));
  };

  const submit = async () => {
    console.log(formData)
    if (formData?.id) {
      console.log("Update")
      const { data, errors } = await client.models.Foundling.update(formData);

      if (errors) {
        console.error("Error:", errors);
        console.log(data);
        for (const error of errors) {
          console.error(error.message);
        }
        return;
      }

    } else {
      console.log("Creating")
      formData!.loginId = user.signInDetails!.loginId!;
      console.log(formData)
      const { data, errors } = await client.models.Foundling.create({
        loginId: user.signInDetails!.loginId!,
        firstName: formData!.firstName,
        lastName: formData!.lastName,
        displayName: formData!.displayName,
      });

      if (errors) {
        console.error("Error:", errors);
        console.log(data);
        for (const error of errors) {
          console.error(error.message);
        }
        return;
      }
      console.log('Done')
      formData.id = data!.id;
      setProfile(true);
    }
  }

  return (
    <>
      <Box component="img" src={logo} sx={{ width: '280px', maxWidth: "280px", marginTop: '75px' }} />

      {loaded ?
        <Box sx={{ width: '100%' }}>
          <Paper sx={{ padding: 1, backgroundColor: "#ffffff77", borderRadius: '15px', marginBottom: '15px' }} >
            <Stack direction="column" spacing={1} textAlign={"left"}>

              <Grid container>
                <Grid size={10.5}><Typography variant="h5">Your Details</Typography></Grid>
                <Grid size={1.5}>
                  <Box sx={{ textAlign: "center" }} alignItems='center'>
                    <IconButton onClick={submit} disabled={formFilled()} sx={{ color: '#e33e7f', padding: '3px', marginTop: '2px', border: 2 }} size='large'><SaveIcon /></IconButton>
                  </Box>
                </Grid>
              </Grid>

              <FormGroup>
                <Stack direction="column" spacing={1.5}>
                  <Stack direction="row" spacing={1}>
                    <TextField name="firstName" label="First Name" required size='small' value={formData.firstName} onChange={handleChange} />
                    <TextField name="lastName" label="Last Name(s)" size='small' value={formData.lastName} onChange={handleChange} />
                  </Stack>
                  <TextField name="displayName" label="Name to Show Other Puzzlers" required size='small' value={formData.displayName} onChange={handleChange} sx={{ maxWidth: '400px' }} />
                  <TextField name="goal" label="Describe Yourself as a Puzzler" size='small' value={formData.goal} onChange={handleChange} sx={{ maxWidth: '400px' }} multiline rows="2" />
                </Stack>
              </FormGroup>

              {profile ?
                <FoundlingPanel foundlingId={formData.id} />
                :
                <Typography>Enter and save your details to find other puzzlers!</Typography>
              }
            </Stack>
          </Paper>
        </Box>
        :
        <div>
          <CircularProgress size='100px' sx={{ marginTop: '100px' }} />
        </div>
      }
    </>
  );
};
