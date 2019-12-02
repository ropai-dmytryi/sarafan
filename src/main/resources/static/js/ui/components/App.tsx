import * as React from 'react';
import Feed from './Feed';
import { connect } from 'react-redux';
import { IUser } from 'model/IUser';

interface IAppProps {
    user: IUser;
}

class App extends React.Component<IAppProps> {

    public render() {
        const { user } = this.props;
        const result = user ? (
            <div className="App">
                <Feed/>
            </div>
        ) : (
            <div className="App">
                <a href="/login">Login</a>
            </div>
        );

        return (result);
    }
}

const mapStateToProps = (state: any) => ({
    user: state.userReducer.user,
});

export default connect(
    mapStateToProps,
)(App);
