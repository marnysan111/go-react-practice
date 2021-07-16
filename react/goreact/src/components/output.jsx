import React from 'react'
import {Card,CardActions,CardContent,Typography,Button} from '@material-ui/core';


const TodoOutput = (props) => {
    return ( 
    <div>
        <Card>
            <CardContent>
                <Typography variant="h5" component="h2">
                    {props.title}
                </Typography>
                <Typography color="textSecondary">
                </Typography>
                <Typography variant="body2" component="p">
                    {props.text}
                </Typography>
            </CardContent>
        </Card>
    </div>
    )
};

export default TodoOutput;