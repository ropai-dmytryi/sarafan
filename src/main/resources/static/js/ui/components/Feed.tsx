import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as MessageActions from '../../middleware/actions/messageActions';
import Message from './Message';
import { MessageModel } from './../../model/Message';

class Feed extends React.Component<any, any> {
  public constructor(props: any) {
    super(props);

    this.state = {
      message: '',
      disabled: true,
    };
  }

  public componentDidMount() {
    this.props.getAllMessages();
  }

  public render() {
    const { message, disabled } = this.state;
    const { messages, deleteMessage } = this.props;
   
    return (
      <div>
        <div>Sarafan</div>
        <div className="row">
          <div className="col-sm">
            <input type="text" value={ message } onChange={ this.handleChange } />
          </div>
          <div className="col-sm">
            <button type="submit" disabled={ disabled } onClick={ this.handleSubmit }>Send</button>
          </div>
        </div>
        <div>
        { messages.map((message: MessageModel, index: number) => (
          <Message key={ index } message={ message } deleteMessage={ deleteMessage }/>
        )) }
        </div>
      </div>
    );
  }

  private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) {
      this.setState({ message: e.target.value, disabled: true });
    } else {
      this.setState({ message: e.target.value, disabled: false });
    }
  }

  private handleSubmit = () => {
    const { addMessage } = this.props;
    const { message } = this.state;

    addMessage(message);
    this.setState({ message: '', disabled: true });
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
