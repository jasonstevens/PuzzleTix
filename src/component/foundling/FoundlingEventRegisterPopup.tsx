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

interface Params {
    puzzleEvent: PuzzleEvent;
    foundlingId: string;
}

interface Form {
    eventId: number;
    comments: string;
    foundlingId: string;
    pair: boolean;
    team: boolean;
}

export default function FoundlingEventRegisterPopup({ puzzleEvent, foundlingId }: Params) {
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
        const pair = formJson.pair == 'on' ? true : false;
        const team = formJson.team == 'on' ? true : false;
        var create = {
            eventId: puzzleEvent!.id!,
            comments: formJson.comments,
            foundlingId: foundlingId,
            pair: pair,
            team: team,
        };
        console.log(create)
        handleCreate(create);
        handleClose();
    };


    const handleCreate = async (formData: Form) => {
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
        } else {
            console.log("Success")
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