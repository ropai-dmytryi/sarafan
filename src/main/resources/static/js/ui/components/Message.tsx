import * as React from 'react';

class Message extends React.Component<any, any> {
  public render() {
    const { message, deleteMessage, setUpdatedMessage } = this.props;
    return (
    <div>
        { message.text }
        <button onClick={ () => setUpdatedMessage(message) }>Update</button>
        <button onClick={ () => deleteMessage(message.id) }>X</button>
    </div>);
  }
}

export default Message;
