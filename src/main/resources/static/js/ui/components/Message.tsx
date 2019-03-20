import * as React from 'react';

class Message extends React.Component<any, any> {
  public render() {
    const { message, deleteMessage, handleUpdateChange } = this.props;
    return (
    <div>
        { message.text }
        <button onClick={ () => handleUpdateChange.bind(message) }>Update</button>
        <button onClick={ () => deleteMessage(message.id) }>X</button>
    </div>);
  }
}

export default Message;
