import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import EmailIcon from '@mui/icons-material/Email';


import type { Schema } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import IconButton from '@mui/material/IconButton';

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
        const val = {
            comments: formJson.comments,
            eventId: eventId,
            foundlingEventId: foundlingEventId,
            foundlingId: foundlingId,
            responderId: currentFoundlingId
        };
        console.log(val);
        handleCreate(val);
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
            <IconButton onClick={handleClickOpen} disabled={foundlingId == currentFoundlingId} sx={{ color: '#e33e7f', padding: '3px', marginTop: '2px', border: 2 }} size='large'>
                <EmailIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Send a Message</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Provide some information on what you want out of the event, and how to best contact you to discuss grouping together!
                    </DialogContentText>
                    <form onSubmit={handleSubmit} id="subscription-form">

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
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" form="subscription-form">Send</Button>

                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}