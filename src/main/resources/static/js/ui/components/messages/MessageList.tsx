import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import Message from './Message';
import { IMessage } from 'model/IMessage';
import * as MessageActions from 'store/actions/messageActions';
import { Grid } from '@material-ui/core';
import * as CommentsActions from 'store/actions/commentsActions';

interface IMessageProps {
  messages: IMessage[];
  deleteMessage: (id: number) => void;
  changeUpdatedMessage: (message: IMessage) => void;
  getAllMessages: () => void;
  createComment: (commentText: string, messageId: number, formNameForReset: string) => void;
}

class MessageList extends React.Component<IMessageProps> {
  public componentDidMount() {
     this.props.getAllMessages();
  }

  public render() {
    const { messages, deleteMessage, changeUpdatedMessage, createComment } = this.props;
    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
      >
        <Grid item>
            { messages.map((message: IMessage, index: number) => (
            <Message
                key={ index }
                message={ message }
                deleteMessage={ deleteMessage }
                changeUpdatedMessage={ changeUpdatedMessage }
                createComment={ createComment }
            />
            )) }
        </Grid>
      </Grid>
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
      createComment: CommentsActions.createComment,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MessageList);
