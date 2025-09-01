import * as React from 'react';
import { Box, Input, Slider, Grid } from '@mui/material';
import TimerIcon from '@mui/icons-material/Timer';
import { Typography } from '@mui/material';

export default function InputSlider() {
    const [value, setValue] = React.useState(24);

    const handleSliderChange = (_event: Event, newValue: number) => {
        setValue(newValue);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value === '' ? 0 : Number(event.target.value));
    };

    const handleBlur = () => {
        if (value < 1) {
            setValue(1);
        } else if (value > 48) {
            setValue(48);
        }
    };

    return (
        <Box sx={{ paddingLeft: 0.5 }}>
            <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                <Grid>
                    <TimerIcon sx={{ fontSize: '2rem' }} color="primary" />
                </Grid>
                <Grid size="grow">
                    <Slider
                        value={typeof value === 'number' ? value : 0}
                        onChange={handleSliderChange}
                        aria-labelledby="input-slider"
                        min={12}
                        max={48}
                        step={2}
                        marks
                    />
                </Grid>
                <Grid>
                    <Input
                        value={value}
                        size="small"
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        inputProps={{
                            step: 2,
                            min: 12,
                            max: 48,
                            type: 'number',
                            'aria-labelledby': 'input-slider',
                        }}
                    />
                </Grid>
                <Grid>
                    <Typography>Hrs</Typography>
                </Grid>
            </Grid>
        </Box>
    );
}