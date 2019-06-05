import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as MessageActions from '../../middleware/actions/messageActions';
import Form from './Form';
import MessageList from './MessageList';
import { connectToWs } from 'util/WebSocket';
import { AppBar, Toolbar, Typography, IconButton, Container } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

class Feed extends React.Component<any, any> {

    public componentDidMount() {
        connectToWs();
        this.props.addHeader();
    }

    public render() {
        const { addMessage, updateMessage, updatedMessage, user } = this.props;
        return (
            <div>
                <ToolBarComp user={ user }/>
                <Container style={ { marginTop: 40} }>
                <Form
                    onSubmit={ updatedMessage.text ? updateMessage : addMessage }
                    initialValues={ updatedMessage }
                />
                </Container>
                <MessageList/>
            </div>
        );
    }
}

const ToolBarComp = (props: any) => {
    const classes = useStyles();
    const { user } = props;
    return(
        <div className={ classes.root }>
            <AppBar position="static" color="default">
                <Toolbar>
                    <Typography variant="h6" className={ classes.title }>
                        Sarafan
                    </Typography>
                    <span>{ user.name }</span>
                    <IconButton href="/logout">
                        <ExitToAppIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

const mapStateToProps = (state: any) => ({
    updatedMessage: state.userReducer.updatedMessage,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    addMessage: MessageActions.addMessage,
    updateMessage: MessageActions.updateMessage,
    switchToAddAction: MessageActions.switchToAddAction,
    addHeader: MessageActions.addHeader,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Feed);
