import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import type { PuzzleEvent } from '../data/PuzzleEvent';
import { Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select } from '@mui/material';

import type { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

interface Params {
    puzzleEvent: PuzzleEvent;
    foundlingResponseId: string;
    pair: boolean;
    team: boolean;
    comments: string;
}

interface Form {
    id: string;
    comments?: string;
    pair?: boolean;
    team?: boolean;
}
const status = [
    { status: 'CF', description: 'I found a group here' },
    { status: 'CE', description: 'I found a group somewhere else' },
    { status: 'CG', description: 'I no longer want a group' },
    { status: 'CC', description: 'I\'m no longer attending' },
];

export default function FoundlingEventCancelPopup({ puzzleEvent, foundlingResponseId, pair, team, comments }: Params) {
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
        console.log(formJson);
        const update = {
            id: foundlingResponseId,
            comments: formJson.comments,
            status: formJson.status,
            pair: formJson.pair == 'on' ? true : false,
            team: formJson.team == 'on' ? true : false,
        };
        console.log(update);
        handleUpdate(update);
        handleClose();
    };


    const handleUpdate = async (formData: Form) => {
        console.log("Updating")
        console.log(formData)

        const { data, errors } = await client.models.FoundlingEvent.update(formData);

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
            <Button variant="contained" onClick={handleClickOpen}>Update</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{puzzleEvent.name}</DialogTitle>
                <DialogContent>
                    <DialogContentText>Select a status if you've found what you're looking for!</DialogContentText>

                    <form onSubmit={handleSubmit} id="subscription-form">

                        <FormControl sx={{ m: 1, width: '100%' }}>
                            <InputLabel>Status</InputLabel>
                            <Select name='status' label='Status' defaultValue={0} sx={{ p: 0, m: 0, fontWeight: 800 }} size='small'>
                                {status.map((el) => <MenuItem value={el.status}>{el.description}</MenuItem>)}
                            </Select>
                        </FormControl>
                        <FormControlLabel control={<Checkbox name="pair" defaultChecked={pair} />} label="Seeking a Pair" sx={{ height: '30px' }} />
                        <FormControlLabel control={<Checkbox name="team" defaultChecked={team} />} label="Seeking a Team" sx={{ height: '30px' }} />


                        <TextField
                            autoFocus
                            multiline
                            rows="4"
                            margin="dense"
                            id="name"
                            name="comments"
                            label=""
                            type="comments"
                            fullWidth
                            variant="outlined"
                            defaultValue={comments}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" form="subscription-form">Save</Button>
                </DialogActions>
            </Dialog >
        </React.Fragment >
    );
}