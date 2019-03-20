import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as MessageActions from '../../middleware/actions/messageActions';
import Message from './Message';
import { MessageModel } from './../../model/Message';

interface FeedState {
  message: MessageModel;
}

class Feed extends React.Component<any, FeedState> {
  public constructor(props: any) {
    super(props);

    this.state = {
      message: {
          id: 0,
          text: '',
          creationDate: new Date
      },
    };
  }

  public componentDidMount() {
    this.props.getAllMessages();
  }

  public render() {
    const { message } = this.state;
    const { messages, deleteMessage, handleUpdateChange } = this.props;
   
    return (
      <div>
        <div>Sarafan</div>
        <div className="row">
          <div className="col-sm">
            <input type="text" value={ message.text } onChange={ this.handleChange } />
          </div>
          <div className="col-sm">
            <button type="submit" disabled={ !message.text } onClick={ this.handleSubmit }>Send</button>
          </div>
          <div className="col-sm">
            <button type="submit" disabled={ !message.text } onClick={ this.clear }>Clear</button>
          </div>
        </div>
        <div>
        { messages.map((message: MessageModel, index: number) => (
          <Message key={ index } message={ message } deleteMessage={ deleteMessage } handleUpdateChange={ handleUpdateChange }/>
        )) }
        </div>
      </div>
    );
  }

  private clear = () => {
    this.setState({ message: {id: 0, text: '', creationDate: new Date} })
  }

  private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ message: { ...this.state.message, text:  e.target.value } });
  }

  public handleUpdateChange = (messageForUpdate: MessageModel) => {
    this.setState({ message: messageForUpdate});
  } 

  private handleSubmit = () => {
    const { addMessage } = this.props;
    const { message } = this.state;

    addMessage(message.text);
    this.setState({ message: {...this.state.message, text: ''} });
  }
}

const mapStateToProps = (state: any) => ({
  messages: state.userReducer.messages,
});

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
  getAllMessages: MessageActions.getAllMessages,
  addMessage: MessageActions.addMessage,
  deleteMessage: MessageActions.deleteMessage,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Feed);
