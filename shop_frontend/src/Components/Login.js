import {useState} from "react";
import AuthRequests from "../Requests/AuthRequests";
import {Button, Grid, TextField, Typography} from "@mui/material";
import '../styles/login.css'

function Login(){
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        setInputs({...inputs, [event.target.name]: event.target.value})   ;
    }
    const handleSubmit = async () => {
        const loginResponse = await AuthRequests.login(inputs);
        localStorage.setItem('expiredAt',new Date(loginResponse))
        localStorage.setItem('signedIn','true')
        window.location.href = '/';
    }
    return (
        <div className={'login-container'}>
            <Grid container justifyContent="center">
                <Grid item xs={12} sm={3}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Login
                    </Typography>
                        <div>
                            <TextField
                                label={"Email"}
                                variant={"standard"}
                                name={'email'}
                                sx={{ width: '100%' }}
                                value={inputs.email || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <TextField
                                label={"Password"}
                                type={"password"}
                                name={'password'}
                                variant={"standard"}
                                sx={{ width: '100%' }}
                                value={inputs.password || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <Button onClick={handleSubmit} variant="contained" color="primary" fullWidth>
                            Login
                        </Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default Login;