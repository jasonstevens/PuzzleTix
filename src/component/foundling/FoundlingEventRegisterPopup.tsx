import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import type { PuzzleEvent } from '../data/PuzzleEvent';
import { Checkbox, FormControlLabel } from '@mui/material';

import type { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

type FoundlingEvent = Schema['FoundlingEvent']['type'];

interface Params {
    puzzleEvent: PuzzleEvent;
    foundlingId: string;
}

export default function FoundlingEventPopup({ puzzleEvent, foundlingId }: Params) {
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
        const pair = formJson.pair;
        const solo = formJson.solo;
        console.log(email);
        handleCreate({
            id: '',
            eventId: puzzleEvent!.id.toString(),
            comments: 'Blerg',
            foundlingId: foundlingId,
            createdAt: '',
            updatedAt: ''
        });
        handleClose();
    };


    const handleCreate = async (formData: FoundlingEvent) => {
        console.log(formData)
        console.log("Creating")
        console.log(formData)
        const { data, errors } = await client.models.FoundlingEvent.create(formData);

        if (errors) {
            console.error("Error:", errors);
            console.log(data);
            for (const error of errors) {
                console.error(error.message);
            }
            return;
        }
    }

    return (
        <React.Fragment>
            <Button variant="contained" onClick={handleClickOpen}>Register</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{puzzleEvent.name}</DialogTitle>
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
                    <Button type="submit" form="subscription-form">Register</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}