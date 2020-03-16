import * as React from 'react';
import Container from '@material-ui/core/Container';
import { Avatar, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: any) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.light,
  },
}));

const LoginPage = () => {
  const classes = useStyles({});
  return (
    <Container component="main" maxWidth="xs">
      <div className={ classes.paper }>
        <Avatar className={ classes.avatar }>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <a href="/login">Google</a>
      </div>
    </Container>
  );
};

export default LoginPage;
