import React from 'react';
import { styled } from "@mui/system";
import { Container, Grid, Paper, Typography } from "@mui/material";

function ProfileInfo({user}) {
    const ProfileContainer = styled(Container)(({ theme }) => ({
        marginTop: theme.spacing(4),
    }));

    const ProfilePaper = styled(Paper)(({ theme }) => ({
        padding: theme.spacing(4),
        borderRadius: theme.spacing(2), // Adding border radius for a smoother look
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Adding subtle shadow
    }));

    return (
        <ProfileContainer>
            <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12} md={6}>
                    <ProfilePaper elevation={3}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12}>
                                <Typography variant="h4" align="center" gutterBottom>
                                    {user && `${user.name} ${user.surname}`}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" align="center" gutterBottom>
                                    Email: {user && user.email}
                                </Typography>
                                <Typography variant="subtitle1" align="center" gutterBottom>
                                    Address: {/* Add address details here if available */}
                                </Typography>
                                <Typography variant="subtitle1" align="center" gutterBottom>
                                    Phone: {user && user.phoneNumber}
                                </Typography>
                            </Grid>
                        </Grid>
                    </ProfilePaper>
                </Grid>
            </Grid>
        </ProfileContainer>
    );
}

export default ProfileInfo;
