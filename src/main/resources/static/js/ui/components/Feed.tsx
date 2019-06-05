import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as MessageActions from '../../middleware/actions/messageActions';
import Form from './Form';
import MessageList from './MessageList';
import { connectToWs } from 'util/WebSocket';

class Feed extends React.Component<any, any> {

    public componentDidMount() {
        connectToWs();
        this.props.addHeader();
    }

    public render() {
        const { addMessage, updateMessage, updatedMessage } = this.props;
        return (
            <div>
                <div>Sarafan</div>
                <a href="/logout">Logout</a>
                <Form onSubmit={ updatedMessage.text ? updateMessage : addMessage } initialValues={ updatedMessage } />
                <MessageList/>
            </div>
        );
    }
}

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
