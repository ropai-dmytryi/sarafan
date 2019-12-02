import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as MessageActions from 'store/actions/messageActions';
import Form from './messages/Form';
import MessageList from './messages/MessageList';
import { connectToWs } from 'util/WebSocket';
import { AppBar, Toolbar, Typography, IconButton, Container } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from 'react-router-dom';
import { IMessage } from 'model/IMessage';
import { IUser } from 'model/IUser';

interface IFeedProps {
    user: IUser;
    updatedMessage: IMessage;
    addMessage: (message: IMessage) => void;
    updateMessage: (message: IMessage) => void;
    addHeader: () => void;
}

class Feed extends React.Component<IFeedProps> {

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

const ToolBarComp = ({ user: { name } }: any) => {
    const { root, title } = useStyles({});
    return(
        <div className={ root }>
            <AppBar position="static" color="default">
                <Toolbar>
                    <Typography variant="h6" className={ title }>
                        Sarafan
                    </Typography>
                    <Link to={ '/profile' }>{ name }</Link>
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
    title: {
      flexGrow: 1,
    },
  }),
);

const mapStateToProps = (state: any) => ({
    updatedMessage: state.userReducer.updatedMessage,
    user: state.userReducer.user,
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
