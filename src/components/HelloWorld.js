import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


function HelloWorld(props) {
    return (
        <div>
            <Typography variant="h2">Hello World!!!!</Typography>
            <Button type="button" onClick={() => console.log('button clicked')} variant="contained">Click Me!!</Button>
        </div>
    )
}

export default HelloWorld;