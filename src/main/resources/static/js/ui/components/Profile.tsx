import * as React from 'react';
import { connect } from 'react-redux';
import { IUser } from 'model/IUser';
import { CardMedia } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

class Profile extends React.Component<{ user: IUser }> {

    public render() {
        const { user } = this.props;
        return(
            <div>
                <UserPicture userpic={ user.userpic }/>
                <div>{ user.name }</div>
                <div>{ user.locale }</div>
                <div>{ user.email }</div>
            </div>
        );
    }
}

const UserPicture = (props: any) => {
    const { userpic } = props;
    const classes = useStyles({});
    return (
        <CardMedia className={ classes.igm } component="img" src={ userpic } />
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

const mapStateToProps = (state: any) => ({
    user: state.userReducer.user,
});

export default connect(
    mapStateToProps,
)(Profile);