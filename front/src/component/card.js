import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import List from './list';

const card = (
    <React.Fragment>
        <CardContent>
            <Typography align="center" variant="h5" component="div"  className={"brdr"}>
                To-Do List
            </Typography>
            <List/>
        </CardContent>
    </React.Fragment>
);

export default function OutlinedCard() {
    return (
        <Box sx={{ maxWidth: 400,mx:"auto",my:10 }}>
            <Card className={"brd"} variant="outlined">{card}</Card>
        </Box>
    );
}