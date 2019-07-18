import { CardActions, CardContent, IconButton, Typography, Card, Button } from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';
import * as React from 'react';

class Message extends React.Component<any, any> {
    public render() {
        const { message, deleteMessage, setUpdatedMessage } = this.props;
        return (
            <Card>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        { message.text }
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={ () => setUpdatedMessage(message) }>Update</Button>
                    <IconButton onClick={ () => deleteMessage(message.id) }>
                        <Delete />
                    </IconButton>
                </CardActions>
            </Card>
            );
    }
}

export default Message;
