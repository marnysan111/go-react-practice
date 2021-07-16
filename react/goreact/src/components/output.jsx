import React from 'react'
import {Card,CardActions,CardContent,Typography,Button} from '@material-ui/core';


const todoOutput = (props) => {
    return ( 
    <div>
        <Card>
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    Word of the Day
                </Typography>
                <Typography variant="h5" component="h2">
                    {props.text}
                </Typography>
                <Typography color="textSecondary">
                    adjective
                </Typography>
                <Typography variant="body2" component="p">
                    well meaning and kindly.
                    <br />
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    </div>
    )
};

export default todoOutput