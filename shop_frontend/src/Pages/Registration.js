import {useState} from "react";
import AuthRequests from "../Requests/AuthRequests";
import {Button, Grid, TextField, Typography} from "@mui/material";

function Registration() {
    const [inputs, setInputs] = useState({isSubscribedToDiscounts: false});

    const handleChange = (event) => {
        setInputs({...inputs, [event.target.name]: event.target.value});
    }
    const handleSubmit = async () => {
        const inputsWithDate = {...inputs, joinDate: new Date()};
        await AuthRequests.registration(inputsWithDate);
        window.location.href = '/login';
    }

    const textFields = [
        { label: "Name", variant: "standard", name: "name", type: "text" },
        { label: "Surname", variant: "standard", name: "surname", type: "text" },
        { label: "Email", variant: "standard", name: "email", type: "email" },
        { label: "Phone number", variant: "standard", name: "phoneNumber", type: "text" },
        { label: "Password", variant: "standard", name: "password", type: "password" },
        { label: "Confirm password", variant: "standard", name: "confirmPassword", type: "password" }
    ];

    return (
        <div className={'registration-container'} style={{display: 'flex', justifyContent: 'center', textAlign: 'center'}}>
            <Grid container justifyContent="center" width={500}>
                <Grid item xs={12}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Registration
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
                                fullWidth
                                value={inputs[field.name] || ''}
                                onChange={handleChange}
                            />
                        </Grid>
                    ))}
                <Grid item xs={12}>
                    <Button onClick={handleSubmit} variant="contained" color="primary" fullWidth>
                        Register
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default Registration;