import * as React from 'react';
import { IMessage } from 'model/IMessage';
import { Card, CardMedia, CardContent, Grid } from '@material-ui/core';
import YouTube from './YouTube';
import { makeStyles } from '@material-ui/core/styles';

interface IMediaProps {
    message: IMessage;
}

const Media = ({ message }: IMediaProps) => {
    const result = getMessageType(message);
    return <Card>{ result }</Card>;
};

const getMessageType = (message: IMessage) => {
    if (message.link.indexOf('youtu') > -1) {
        return (<YouTube link={ message.link }/>);
    } else if (message.link.match(/\.(jpeg|jpg|gif|png)$/) !== null) {
        return getImageComponent(message);
    } else {
        return getHrefComponent(message);
    }
};

const getHrefComponent = ({ link, linkTitle, linkDescription, linkCover }: IMessage) => {
    const { card } = useStyles({});
    const image = linkCover ? (
        <CardMedia component="img" className={ card } src={ linkCover }/>
    ) : null;
    return (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
        >
            { image }
            <CardContent>
                <div>
                    <h3>
                        <a href={ link }>{ linkTitle || link }</a>
                    </h3>
                    <div>{ linkDescription ? linkDescription : '' }</div>
                </div>
            </CardContent>
        </Grid>
    );
};

const getImageComponent = ({ link, linkCover }: IMessage) => {
    const { media } = useStyles({});
    const image = linkCover ? (
        <CardMedia component="img" className={ media } src={ linkCover }/>
    ) : null;
    return (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
        >
            <a href={ link }>
                { image }
            </a>
        </Grid>
    );
};

const useStyles = makeStyles({
    card: {
        maxWidth: 350,
    },
    media: {
        maxWidth: 500,
    },
});

export default Media;
