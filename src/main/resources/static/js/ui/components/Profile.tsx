import * as React from 'react';
import { connect } from 'react-redux';
import { IUser } from 'model/IUser';
import { CardMedia } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import * as UserActions from 'store/actions/userActions';
import { bindActionCreators, Dispatch } from 'redux';

interface IProfileProps {
    user: IUser;
    getUserById: (id: number) => Promise<IUser>;
    userId: number;
}

interface IProfileState {
    user: IUser;
}

class Profile extends React.Component<IProfileProps, IProfileState> {

    public state: IProfileState = {
        user: null,
    };

    public componentDidMount() {
        console.log('did mount')
        const { userId, user, getUserById } = this.props;

        //const userId = this.props.match.params.id;
        console.log(userId);

        if (userId === user.id) {
            this.setState({ user });
        } else {
            getUserById(userId).then((user: IUser) => this.setState({ user }));
        }
    }

    public render() {
        console.log(this.state)
        const { userpic, name, locale, email, subscriptions, subscribers } = this.state.user;
        return(
            <div>
                <UserPicture userpic={ userpic }/>
                <div>{ name }</div>
                <div>{ locale }</div>
                <div>{ email }</div>
                <div>Subscriptions: { subscriptions.length }</div>
                <div>Subscribers: { subscribers.length }</div>
            </div>
        );
    }
}

interface IUserPicProps {
    userpic: string;
}

const UserPicture = ({ userpic }: IUserPicProps) => {
    const { igm } = useStyles({});
    return (
        <CardMedia className={ igm } component="img" src={ userpic } />
    );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    igm: {
        width: '20%',
        height: 'auto',
    },
  }),
);

const mapStateToProps = (state: any, ownProps: any) => ({
    user: state.userReducer.user,
    userId: ownProps.match.params.id,
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getUserById: UserActions.getUserById,
    },
    dispatch,
  );

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Profile);
