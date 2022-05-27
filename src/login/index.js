import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
//import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../resources/logo.jpeg';
import Container from '../container/index';
//import { hashHistory } from 'react-router';
//import { withRouter,useHistory} from 'react-router-dom';
import {
    Routes,
    Route,
    //Link,
    useNavigate,
    useLocation,
    Navigate,
    Outlet,
} from "react-router-dom";
//import { useHistory } from "react-router";
import Icon from '@ant-design/icons';

//import { useHistory } from "react-router-dom";


//var ActiveDirectory = require('activedirectory');
function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'EMMA Company © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(' + logo + ')',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: '250px',
        backgroundPosition: 'center',


    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));




function Login() {
    //let location = useLocation();
    let navigate = useNavigate();
    //const history = useHistory();
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [typeUser, setTypeUser] = React.useState('0');
    const [message, setMessage] = useState();
    const [token, setToken] = useState(false);
    const [loadingImage, setLoadingImage] = useState(false);
    const classes = useStyles();

    const handleChange = (event) => {
        setTypeUser(event.target.value);
      };
    const handleSubmit = async e => {
        e.preventDefault();
        //console.log('login', username + ' ' + password);
        setLoadingImage(true);


        const token = await loginUser({
            "email": username,
            "password": password,
            "userType": typeUser
        });
    }

    function loginUser(credentials) {

        console.log('loginUser', credentials);
        //window.location.href = "/container";
        return fetch('http://localhost:3001/api/loginWeb', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(credentials)
        }).then(res => res.json())
            .then(data => {
                console.log('info', data.state);

                setToken(data);

                if (data.id != 0) {

                    

                    localStorage.setItem('myData', data.state.name + ' ' + data.state.last_name);
                    localStorage.setItem('idUser', data.state.id);
                    navigate('/container')
                    setLoadingImage(false);
                }
                else {
                    console.log('info false', data);
                    setMessage('Usuario incorrecto');
                    setLoadingImage(false);
                }
            }
            )


    }
    return (
        <div>
            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7} className={classes.image} />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>

                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <form className={classes.form} onSubmit={handleSubmit}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="user"
                                label="Usuario"
                                name="user"
                                autoComplete="User"
                                //defaultValue="aaaaaa@ed"
                                autoFocus
                                onChange={e => setUserName(e.target.value)}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                //defaultValue="11111"
                                autoComplete="current-password"
                                onChange={e => setPassword(e.target.value)}
                            />
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={typeUser}
                                label="Tipo"
                                placeholder='Tipo Usuario'
                                onChange={handleChange}
                            >
                                <MenuItem value={1}>Reciclador</MenuItem>
                                <MenuItem value={2}>Cliente</MenuItem>

                            </Select>
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="#D40E14"
                                className={classes.submit}
                            >
                                Sign In
                            </Button>

                            <Grid container>
                                <Grid item xs>
                                    {/*<Link href="#" variant="body2">
                                    Forgot password?
                                </Link>*/}
                                </Grid>
                                <Grid item>
                                    {/*<Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                            </Link>*/}
                                </Grid>
                            </Grid>
                            <Box mt={5}>
                                <Copyright />
                            </Box>
                        </form>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default Login;