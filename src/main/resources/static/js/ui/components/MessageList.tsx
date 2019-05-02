import * as React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators, Dispatch} from 'redux';
import Message from './Message';
import { IMessage } from '../../model/Message';
import * as MessageActions from '../../middleware/actions/messageActions';

class MessageList extends React.Component<any, any> {
    public componentDidMount() {
        this.props.getAllMessages();
    }

    public render() {
        const { messages, deleteMessage, setUpdatedMessage } = this.props;
        return (
            <div>
                {messages.map((message: IMessage, index: number) => (
                    <Message
                        key={ index }
                        message={ message }
                        deleteMessage={ deleteMessage }
                        setUpdatedMessage={ setUpdatedMessage }
                    />
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    messages: state.userReducer.messages,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            getAllMessages: MessageActions.getAllMessages,
            deleteMessage: MessageActions.deleteMessage,
            setUpdatedMessage: MessageActions.setUpdateMessage,
        },
        dispatch,
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MessageList);
