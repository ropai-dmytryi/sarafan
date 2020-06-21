import * as React from 'react';
import { connect } from 'react-redux';
import { IUser } from 'model/IUser';
import { Button, CardMedia } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import * as UserActions from 'store/actions/userActions';
import { bindActionCreators, Dispatch } from 'redux';

interface IProfileProps {
    user: IUser;
    getUserById: (id: number) => any;
    userId: number;
    changeSubscription: (userId: number) => any;
}

interface IProfileState {
    user: IUser;
}

class Profile extends React.Component<IProfileProps, IProfileState> {

    public state: IProfileState = {
        user: null,
    };

    public componentDidMount() {
        const { userId, user, getUserById } = this.props;

        if (userId === user.id) {
            this.setState({ user });
        } else {
            getUserById(userId).then((user: IUser) => this.setState({ user }));
        }
    }

    public changeSubscriptionAndSetUser = (userId: number) => {
        const { changeSubscription } = this.props;
        changeSubscription(userId).then((user: IUser) => this.setState({ user }));
    }

    public render() {
        if (this.state.user != null) {
            const { userpic, name, email, subscriptions, subscribers } = this.state.user;
            const { userId, user } = this.props;

            let button = null;
            if (userId !== user.id) {
                button = user.subscriptions.some((x: IUser) => x.id === userId) ?
                    (<Button onClick={ () => this.changeSubscriptionAndSetUser(userId) } color="secondary">Unsubscribe</Button>) :
                    (<Button onClick={ () => this.changeSubscriptionAndSetUser(userId) } color="primary">Subscribe</Button>);
            }

            return (
                <div>
                    <UserPicture userpic={ userpic }/>
                    <div>{ name }</div>
                    <div>{ email }</div>
                    <div>Subscriptions: { subscriptions.length }</div>
                    <div>Subscribers: { subscribers.length }</div>
                    <div>{ button }</div>
                </div>
            );
        } else {
            return null;
        }
    }
}

interface IUserPicProps {
    userpic: string;
}

const UserPicture = ({ userpic }: IUserPicProps) => {
    const { igm } = useStyles({});
    return (
        <CardMedia className={ igm } component="img" src={ userpic }/>
    );
};

const useStyles = makeStyles({
    igm: {
        width: '20%',
        height: 'auto',
    },
});

const mapStateToProps = (state: any, ownProps: any) => ({
    user: state.userReducer.user,
    userId: ownProps.match.params.id,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(
        {
            getUserById: UserActions.getUserById,
            changeSubscription: UserActions.changeSubscription,
        },
        dispatch,
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Profile);
