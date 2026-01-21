import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Checkbox, FormControlLabel } from '@mui/material';

import type { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

interface Params {
    currentFoundlingId: string;
    foundlingId: string;
    foundlingEventId: string;
    eventId: number;
}

interface Form {
    comments: string;
    foundlingId: string;
    foundlingEventId: string;
    responderId: string;
    eventId: number;
}

export default function FoundlingEventPopup({ foundlingId, foundlingEventId, eventId, currentFoundlingId }: Params) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries((formData as any).entries());
        const email = formJson.email;
        console.log(email);
        handleCreate({
            comments: 'Blerg',
            eventId: eventId,
            foundlingEventId: foundlingEventId,
            foundlingId: foundlingId,
            responderId: foundlingId
        });
        handleClose();
    };


    const handleCreate = async (formData: Form) => {
        console.log("Creating")
        console.log(formData)
        const { data, errors } = await client.models.FoundlingResponse.create(formData);

        if (errors) {
            console.error("Error:", errors);
            console.log(data);
            for (const error of errors) {
                console.error(error.message);
            }
            return;
        } else {
            console.log("Success")
        }
    }

    return (
        <React.Fragment>
            <Button variant="contained" onClick={handleClickOpen} disabled={foundlingId == currentFoundlingId}>Message</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle></DialogTitle>
                <DialogContent>
                    <DialogContentText>

                    </DialogContentText>
                    <form onSubmit={handleSubmit} id="subscription-form">
                        <FormControlLabel control={<Checkbox name="pair" />} label="Seeking a Pair" sx={{ height: '30px' }} />
                        <FormControlLabel control={<Checkbox name="team" />} label="Seeking a Team" sx={{ height: '30px' }} />

                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            name="comments"
                            label="Comments"
                            type="comments"
                            fullWidth
                            variant="standard"
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>

                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}