import * as React from 'react';
import Feed from './Feed';

declare var frontendData: any;

class App extends React.Component {

    public render() {
        const result = frontendData.profile ? (
            <div className="App">
                <Feed user={ frontendData.profile }/>
            </div>
        ) : (
            <div className="App">
                <a href="/login">Login</a>
            </div>
        );

        return (result);
    }
}

export default App;
