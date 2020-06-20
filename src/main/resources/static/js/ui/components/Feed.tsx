import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as MessageActions from 'store/actions/messageActions';
import Form from './messages/Form';
import MessageList from './messages/MessageList';
import { connectToWs } from 'util/WebSocket';
import { AppBar, Toolbar, Typography, IconButton, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from 'react-router-dom';
import { IMessage } from 'model/IMessage';
import { IUser } from 'model/IUser';

interface IFeedProps {
    user: IUser;
    addMessage: (message: IMessage) => void;
    updateMessage: (message: IMessage) => void;
    addHeader: () => void;
}

interface IFeedState {
    updatedMessage?: IMessage;
}

class Feed extends React.Component<IFeedProps, IFeedState> {

    public state: IFeedState = {
        updatedMessage: null,
    };

    public componentDidMount() {
        connectToWs();
        this.props.addHeader();
    }

    public updateMessageAndCleanUpdatedMessage = (message: IMessage) => {
        const { updateMessage } = this.props;
        updateMessage(message);
        this.setState({ updatedMessage: null });
    }

    public setUpdatedMessage = (message: IMessage) => {
        this.setState({ updatedMessage: message });
    }

    public render() {
        const { addMessage, user } = this.props;
        const { updatedMessage } = this.state;
        const updateMessage = (updatedMessage: IMessage) => this.updateMessageAndCleanUpdatedMessage(updatedMessage);
        const changeUpdatedMessage = (updatedMessage: IMessage) => this.setUpdatedMessage(updatedMessage);

        const form = updatedMessage ?
            (<Form onSubmit={ updateMessage } initialValues={ updatedMessage }/>) :
            (<Form onSubmit={ addMessage }/>);

        return (
            <div>
                <ToolBarComp user={ user }/>
                <Container style={ { marginTop: 40 } }>
                    { form }
                </Container>
                <MessageList changeUpdatedMessage={ changeUpdatedMessage }/>
            </div>
        );
    }
}

const ToolBarComp = ({ user: { id, name } }: any) => {
    const { root, title } = useStyles({});
    return (
        <div className={ root }>
            <AppBar position="static" color="default">
                <Toolbar>
                    <Typography variant="h6" className={ title }>
                        Sarafan
                    </Typography>
                    <Link to={ `/user/${ id }` }>{ name }</Link>
                    <IconButton href="/logout">
                        <ExitToAppIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
};

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
});

const mapStateToProps = (state: any) => ({
    user: state.userReducer.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    addMessage: MessageActions.addMessage,
    updateMessage: MessageActions.updateMessage,
    addHeader: MessageActions.addHeader,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Feed);
