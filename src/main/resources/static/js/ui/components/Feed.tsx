import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as MessageActions from 'store/actions/messageActions';
import Form from 'ui/components/messages/Form';
import MessageList from 'ui/components/messages/MessageList';
import { connectToWs } from 'util/WebSocket';
import { AppBar, Toolbar, Typography, IconButton, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Link } from 'react-router-dom';
import { IMessage } from 'model/IMessage';
import { IUser } from 'model/IUser';
import { FindByName } from 'ui/components/users/FindByName';
import * as UserActions from 'store/actions/userActions';

interface IFeedProps {
    user: IUser;
    addMessage: (message: IMessage) => void;
    updateMessage: (message: IMessage) => void;
    addHeader: () => void;
    getUserByName: (userName: string) => any;
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
        const { addMessage, user, getUserByName } = this.props;
        const { updatedMessage } = this.state;
        const updateMessage = (updatedMessage: IMessage) => this.updateMessageAndCleanUpdatedMessage(updatedMessage);
        const changeUpdatedMessage = (updatedMessage: IMessage) => this.setUpdatedMessage(updatedMessage);

        const form = updatedMessage ?
            (<Form onSubmit={ updateMessage } initialValues={ updatedMessage }/>) :
            (<Form onSubmit={ addMessage }/>);

        return (
            <div>
                <ToolBarComp user={ user } getUserByName={ getUserByName }/>
                <Container style={ { marginTop: 40 } }>
                    { form }
                </Container>
                <MessageList changeUpdatedMessage={ changeUpdatedMessage }/>
            </div>
        );
    }
}

const ToolBarComp = ({ user: { id, name }, getUserByName }: any) => {
    const { root, title } = useStyles();
    return (
        <div className={ root }>
            <AppBar position="static" color="default">
                <Toolbar>
                    <Typography variant="h6" className={ title }>
                        Sarafan
                    </Typography>
                    <FindByName getUserByName={ getUserByName }/>
                    <Link to={ `/profile/${ id }` }>{ name }</Link>
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
    getUserByName: UserActions.getUserByName,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Feed);
