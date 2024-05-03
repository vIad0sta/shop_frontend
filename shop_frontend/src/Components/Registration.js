import {useState} from "react";
import AuthRequests from "../Requests/AuthRequests";
import {Button, Grid, TextField, Typography} from "@mui/material";

function Registration(){
    const [inputs, setInputs] = useState({isSubscribedToDiscounts: false});

    const handleChange = (event) => {
        setInputs({...inputs, [event.target.name]: event.target.value})   ;
    }
    const handleSubmit = async () => {
        const inputsWithDate = { ...inputs, joinDate: new Date()};
        await AuthRequests.registration(inputsWithDate);
        window.location.href = '/login';
    }
    return(
        <div className={'registration-container'} style={{ textAlign: 'center' }}>
            <Grid container justifyContent="center">
                <Grid item xs={12} sm={3}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Registration
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <TextField
                                label="Name"
                                variant="standard"
                                name="name"
                                fullWidth
                                value={inputs.name || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <TextField
                                label="Surname"
                                variant="standard"
                                name="surname"
                                fullWidth
                                value={inputs.surname || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <TextField
                                label="Email"
                                variant="standard"
                                name="email"
                                fullWidth
                                value={inputs.email || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <TextField
                                label="Phone number"
                                variant="standard"
                                name="phoneNumber"
                                fullWidth
                                value={inputs.phoneNumber || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <TextField
                                label="Password"
                                type="password"
                                name="password"
                                variant="standard"
                                fullWidth
                                value={inputs.password || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <TextField
                                label="Confirm password"
                                type="password"
                                name="confirmPassword"
                                variant="standard"
                                fullWidth
                                value={inputs.confirmPassword || ''}
                                onChange={handleChange}
                            />
                        </div>
                        <Button onClick={handleSubmit} variant="contained" color="primary" fullWidth>
                            Register
                        </Button>
                    </form>
                </Grid>
            </Grid>
        </div>
    );
}

export default Registration;