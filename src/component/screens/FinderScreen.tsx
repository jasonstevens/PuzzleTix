import { Box, Button, FormGroup, Stack, TextField, Typography, Divider, Paper, CircularProgress } from "@mui/material";

import AccountCircle from '@mui/icons-material/AccountCircle';

import logo from '../../assets/puzzletix-white.svg'

import type { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useEffect, useState } from "react";

import { useAuthenticator } from '@aws-amplify/ui-react';

import { Amplify } from 'aws-amplify';
import outputs from '../../../amplify_outputs.json';
import FinderEvents from "../foundling/FinderEvents";

Amplify.configure(outputs)

const client = generateClient<Schema>();

export default function VolunteerScreen() {

  const { user } = useAuthenticator((context) => [context.user]);

  const [loaded, setLoaded] = useState(false);

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
    }

    setLoaded(true);

  };

  useEffect(() => { fetchData(); }, []);

  const formFilled = (): boolean => {
    return !(formData
      && formData.firstName != ''
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
    }
  }

  return (
    <>
      <Box component="img" src={logo} sx={{ width: '300px', maxWidth: "300px" }} />

      {loaded ?
        <Paper sx={{ padding: 1, paddingTop: 0, backgroundColor: "#ffffffbb", borderRadius: '15px' }}>

          <Stack direction="column" spacing={2}>
            <Stack direction="column" spacing={1} textAlign={"left"}>
              <Divider />
              <Typography variant="h5">Finder Profile</Typography>


              <FormGroup>
                <Stack direction="row" spacing={1}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}><AccountCircle sx={{ color: 'action.active', my: 0.75 }} /></Box>
                  <TextField name="firstName" label="First Name" required size='small' value={formData.firstName} onChange={handleChange} />
                  <TextField name="lastName" label="Last Name(s)" size='small' value={formData.lastName} onChange={handleChange} />
                </Stack>
              </FormGroup>

              <FormGroup>
                <Stack direction="row" spacing={1}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}><AccountCircle sx={{ color: 'action.active', my: 0.75 }} /></Box>
                  <TextField name="displayName" label="Name to Display" required size='small' value={formData.displayName} onChange={handleChange} />
                </Stack>
              </FormGroup>

              {/* <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <CommentIcon sx={{ color: 'action.active', mr: 1, my: 3.5 }} />
              <TextField name="goal" label="Additional Comments" size='small' value={formData.goal} multiline rows={3} sx={{ width: '100%' }} onChange={handleChange} />
            </Box> */}
              <Box sx={{ textAlign: "center" }} alignItems='center'>
                <Button sx={{ m: 1 }} onClick={submit} variant="contained" disabled={formFilled()}>Save</Button>
              </Box>

              {formData.id != '' &&
                <>
                  <Divider />
                  <Typography variant="h5">Available Events</Typography>
                  <FinderEvents foundlingId={formData.id} />
                </>
              }

            </Stack>
          </Stack>
        </Paper>

        :
        <>
          <CircularProgress size='50vw' sx={{ marginTop: '100px' }} />
        </>
      }


    </>
  );
};
