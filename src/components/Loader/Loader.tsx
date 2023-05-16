import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';


export default function LinearIndeterminate(props:{width:string}) {
    return (
        <Box sx={{ width: props.width , marginTop:'25px'}}>
            <LinearProgress color='inherit'/>
        </Box>
    );
}