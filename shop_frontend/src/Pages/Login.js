import {useState} from "react";
import AuthRequests from "../Requests/AuthRequests";
import {Button, Grid, TextField, Typography} from "@mui/material";
import '../styles/login.css'

function Login() {
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        setInputs({...inputs, [event.target.name]: event.target.value});
    }
    const handleSubmit = async () => {
        const loginResponse = await AuthRequests.login(inputs);
        localStorage.setItem('expiredAt', new Date(loginResponse))
        window.location.href = '/';
    }

    const textFields = [
        {label: "Email", variant: "standard", name: "email", type: "email", sx: { width: '100%' }},
        {label: "Password", variant: "standard", name: "password", type: "password", sx: { width: '100%' }},
    ];
    return (
        <div className={'login-container'} style={{display: 'flex', justifyContent: 'center', textAlign: 'center'}}>
            <Grid container justifyContent="center" width={500}>
                <Grid item xs={12}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Login
                    </Typography>
                </Grid>
                {textFields.map((field, index) => (
                    <Grid item xs={12}>
                        <TextField
                            key={index}
                            label={field.label}
                            variant={field.variant}
                            name={field.name}
                            type={field.type}
                            sx={field.sx}
                            value={inputs[field.name] || ''}
                            onChange={handleChange}
                        />
                    </Grid>
                ))}
                <Grid item xs={12}>
                    <Button onClick={handleSubmit} variant="contained" color="primary" fullWidth>
                        Login
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default Login;