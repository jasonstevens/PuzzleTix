
import {
  Box, FormControl, FormGroup, Stack, TextField, Typography, Divider, Checkbox, FormControlLabel, CircularProgress, IconButton, Grid
  , MenuItem, Paper, InputLabel,
  Select,
  Alert
} from "@mui/material";

import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import SaveIcon from '@mui/icons-material/Save';
import InstagramIcon from '@mui/icons-material/Instagram';
import TimerIcon from '@mui/icons-material/Timer';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import ExtensionIcon from '@mui/icons-material/Extension';
import PersonIcon from '@mui/icons-material/Person';
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import CrueltyFreeIcon from '@mui/icons-material/CrueltyFree';
import PublicIcon from '@mui/icons-material/Public';
import Snackbar, { type SnackbarCloseReason } from '@mui/material/Snackbar';

import logo from '../../assets/puzzletix-white.svg'

import type { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useEffect, useState } from "react";

import { useAuthenticator } from '@aws-amplify/ui-react';

import { Amplify } from 'aws-amplify';
import outputs from '../../../amplify_outputs.json';

Amplify.configure(outputs)

const client = generateClient<Schema>();

const divs = [
  { key: 1, name: "Solo", description: "Solo / Individual" },
  { key: 2, name: "Pairs", description: "Pairs" },
  { key: 4, name: "Teams", description: "Teams (of Four)" },
  { key: 6, name: "Chess", description: "Puzzle Chess" },
  { key: 8, name: "Chicken", description: "Puzzle Chicken" },
];

const ukCountry = [
  { key: "GB-ENG", description: "England" },
  { key: "GB-NIR", description: "Northern Ireland" },
  { key: "GB-SCO", description: "Scotland" },
  { key: "GB-WLs", description: "Wales" },
  { key: "GG", description: "Guernsey" },
  { key: "JE", description: "Jersey" },
  { key: "IM", description: "Isle of Man" },
  { key: "GI", description: "Gibraltar" },
  { key: "OT", description: "Other Overseas Territory" },

];

export default function VolunteerScreen() {

  const { user } = useAuthenticator((context) => [context.user]);

  const [loaded, setLoaded] = useState(false);

  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState({
    id: '',
    loginId: '',
    preferredName: '',
    instagram: '',
    mySpeedPuzzling: '',
    eligible: false,
    country: '',
    otherCountry: '',
    firstEvent: false,
    firstEventName: '',
    favouriteArtist: '',
    favouriteStyle: '',
    favouriteDivision: '',
    favouriteCritter: '',
  });

  const fetchData = async () => {
    console.log('Load')
    const { data: items, errors } = await client.models.Puzzler.listPuzzlerByLoginId({ loginId: user!.signInDetails!.loginId! })

    if (errors) {
      console.error("Error:", errors);
      console.log(items);
      for (const error of errors) {
        console.error(error.message);
      }
      return;
    }

    if (items?.length > 0) {
      const puzzler = items[0]!;
      console.log('Setting');
      console.log(puzzler);
      setFormData((prevFormData) => ({
        ...prevFormData,
        id: puzzler.id,
        loginId: puzzler.loginId ? puzzler.loginId : '',
        preferredName: puzzler.preferredName ? puzzler.preferredName : '',
        instagram: puzzler.instagram ? puzzler.instagram : '',
        mySpeedPuzzling: puzzler.mySpeedPuzzling ? puzzler.mySpeedPuzzling : '',
        eligible: puzzler.eligible ? puzzler.eligible : false,
        country: puzzler.country ? puzzler.country : '',
        otherCountry: puzzler.otherCountry ? puzzler.otherCountry : '',
        firstEvent: puzzler.firstEvent ? puzzler.firstEvent : false,
        firstEventName: puzzler.firstEventName ? puzzler.firstEventName : '',
        favouriteArtist: puzzler.favouriteArtist ? puzzler.favouriteArtist : '',
        favouriteStyle: puzzler.favouriteStyle ? puzzler.favouriteStyle : '',
        favouriteDivision: puzzler.favouriteDivision ? puzzler.favouriteDivision : '',
        favouriteCritter: puzzler.favouriteCritter ? puzzler.favouriteCritter : '',
      }));
    }
    setLoaded(true);
  };

  useEffect(() => { fetchData(); }, []);

  const formFilled = (): boolean => {
    return !(formData
      && formData.preferredName != ''
    );
  }

  const handleChange = (event: { target: { name: any; value: any }; }) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData!,
      [name]: value,
    }));
  };

  const handleChecked = (event: { target: { name: any; checked: any }; }) => {
    const { name, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: checked,
    }));
  };

  const submit = async () => {
    console.log(formData)
    if (formData?.id) {
      console.log("Update")
      const { data, errors } = await client.models.Puzzler.update(formData);

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
      const { data, errors } = await client.models.Puzzler.create({
        loginId: user.signInDetails!.loginId!,
        preferredName: formData!.preferredName,
        instagram: formData!.instagram,
        mySpeedPuzzling: formData!.mySpeedPuzzling,
        eligible: formData!.eligible,
        country: formData!.country,
        otherCountry: formData!.otherCountry,
        firstEvent: formData!.firstEvent,
        firstEventName: formData!.firstEventName,
        favouriteArtist: formData!.favouriteArtist,
        favouriteStyle: formData!.favouriteStyle,
        favouriteDivision: formData!.favouriteDivision,
        favouriteCritter: formData!.favouriteCritter,

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
      <Box component="img" src={logo} sx={{ width: '320px', maxWidth: "320px", marginTop: '75px' }} />

      {loaded ?
        <Box sx={{ minWidth: '350px' }}>
          <Paper sx={{ padding: 1, backgroundColor: "#ffffff77", borderRadius: '15px', marginBottom: '15px' }} >
            <Stack direction="column" spacing={1} textAlign={"left"}>

              <Grid container>
                <Grid size={10.5}><Typography variant="h5">Profile</Typography></Grid>
                <Grid size={1.5}>
                  <Box sx={{ textAlign: "center" }} alignItems='center'>
                    <IconButton onClick={submit} disabled={formFilled()} sx={{ color: '#e33e7f', padding: '3px', marginTop: '2px', border: 2 }} size='large'><SaveIcon /></IconButton>
                  </Box>
                </Grid>
              </Grid>

              <FormGroup>
                <Stack direction="column" spacing={1.5}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <PersonIcon sx={{ color: 'action.active', mr: 1, my: 0.75 }} />
                    <TextField name="preferredName" label="Puzzler Name" size='small' sx={{ width: '100%' }} required onChange={handleChange} value={formData.preferredName} />
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <InstagramIcon sx={{ color: 'action.active', mr: 1, my: 0.75 }} />
                    <TextField name="instagram" label="Instagram Account" size='small' sx={{ width: '100%' }} onChange={handleChange} value={formData.instagram} />
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <TimerIcon sx={{ color: 'action.active', mr: 1, my: 0.75 }} />
                    <TextField name="mySpeedPuzzling" label="My Speed Puzzling ID" size='small' sx={{ width: '100%' }} onChange={handleChange} value={formData.mySpeedPuzzling} />
                  </Box>


                  <Divider />
                  <Typography variant="h5">Event</Typography>

                  <FormControlLabel control={<Checkbox sx={{ paddingLeft: 0 }} name="eligible" onChange={handleChecked} />}
                    label="I am a resident of the United Kingdom, its Territories or Crown Dependencies" checked={formData.eligible} />

                  {formData.eligible &&
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <PublicIcon sx={{ color: 'action.active', mr: 1, my: 2 }} />
                      <FormControl sx={{ width: '100%' }}>
                        <InputLabel>Country / Territory / Dependency</InputLabel>
                        <Select name="country" variant="outlined" label="Country / Territory / Dependency" required onChange={handleChange} defaultValue={formData.country}>
                          {ukCountry.map((shirt) => (<MenuItem value={shirt.key}>{shirt.description}</MenuItem>))}
                        </Select>
                      </FormControl>
                    </Box>
                  }

                  {formData.country == 'OT' &&
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <PublicIcon sx={{ color: 'action.active', mr: 1, my: 0.75 }} />
                      <TextField name="otherCountry" label="Other Overseas Territory" size='small' sx={{ width: '100%' }} onChange={handleChange} value={formData.otherCountry} />
                    </Box>
                  }

                  <Divider />
                  <Typography variant="h5">About Me</Typography>

                  <FormControlLabel control={<Checkbox sx={{ paddingLeft: 0 }} name="firstEvent" onChange={handleChecked} />} label="UK Nationals is my first in-person puzzle event" checked={formData.firstEvent} />

                  {!formData.firstEvent &&
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <MapsHomeWorkIcon sx={{ color: 'action.active', mr: 1, my: 3.5 }} />
                      <TextField name="firstEventName" label="First in-person puzzle event" size='small' multiline rows={3} sx={{ width: '100%' }} onChange={handleChange} value={formData.firstEventName} />
                    </Box>
                  }

                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <ColorLensIcon sx={{ color: 'action.active', mr: 1, my: 1 }} />
                    <TextField name="favouriteArtist" label="Favourite Puzzle Artist" size='small' sx={{ width: '100%' }} onChange={handleChange} value={formData.favouriteArtist} />
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <ExtensionIcon sx={{ color: 'action.active', mr: 1, my: 3.5 }} />
                    <TextField name="favouriteStyle" label="Favourite Style of Puzzle" size='small' multiline rows={3} sx={{ width: '100%' }} onChange={handleChange} value={formData.favouriteStyle} />
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <DirectionsRunIcon sx={{ color: 'action.active', mr: 1, my: 2 }} />
                    <FormControl sx={{ width: '100%' }}>
                      <InputLabel>Favourite Puzzling Format</InputLabel>
                      <Select name="favouriteDivision" variant="outlined" label="Favourite Puzzling Format" required onChange={handleChange} defaultValue={formData.favouriteDivision}>
                        {divs.map((shirt) => (<MenuItem value={shirt.key}>{shirt.description}</MenuItem>))}
                      </Select>
                    </FormControl>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <CrueltyFreeIcon sx={{ color: 'action.active', mr: 1, my: 1 }} />
                    <TextField name="favouriteCritter" label="Favourite Critter" size='small' sx={{ width: '100%' }} onChange={handleChange} value={formData.favouriteCritter} />
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
            message="Profile Saved"
          >
            <Alert
              onClose={handleClose}
              severity="success"
              variant="filled"
              sx={{ width: '100%' }}
            >Profile Saved</Alert>
          </Snackbar>
        </Box>

        :
        <div>
          <CircularProgress size='100px' sx={{ marginTop: '100px' }} />
        </div>
      }
    </>
  );
};
