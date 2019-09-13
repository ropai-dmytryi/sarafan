import * as React from 'react';
import { connect } from 'react-redux';
import { IUser } from 'model/IUser';
import { CardMedia } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

class Profile extends React.Component<{ user: IUser }> {

    public render() {
        const { user: { userpic, name, locale, email } } = this.props;
        return(
            <div>
                <UserPicture userpic={ userpic }/>
                <div>{ name }</div>
                <div>{ locale }</div>
                <div>{ email }</div>
            </div>
        );
    }
}

const UserPicture = ({ userpic }: any) => {
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

const mapStateToProps = (state: any) => ({
    user: state.userReducer.user,
});

export default connect(
    mapStateToProps,
)(Profile);
