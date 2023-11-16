import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
// import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
// import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import RestoreIcon from '@mui/icons-material/Restore';
import { EmailRounded, LocationCityRounded, LocationOn, Phone } from '@mui/icons-material';


function Contact() {
    const [contactInfo, setContactInfo] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        setContactInfo({ ...contactInfo, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = 'http://127.0.0.1:5000/api/contact/contactinfo';
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify({ name: contactInfo.name, email: contactInfo.email, message: contactInfo.message })
            });
            const json = await response.json();
            console.log(json);
        } catch (error) {
            console.log('Error at Contact.js');
            console.error(error);
        }
        setContactInfo({
            name: '',
            email: '',
            message: '',
        });
    };

    return (
        <Container sx={{ my: 5 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15467.96368517827!2d88.363892!3d22.5726464!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02707df3481931%3A0x9c9b4c09f0a37e6!2sKolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1634485201153"
                        // className={classes.mapContainer}
                        allowFullScreen={true}
                        aria-hidden={false}
                        tabIndex={0}
                        title="Google map"
                    ></iframe>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography variant="h4" align="center" gutterBottom>
                        Visionary Verse
                    </Typography>
                    <Typography>
                        <LocationOn />123 Main St.
                    </Typography>
                    <Typography>
                        <LocationCityRounded />City, State ZIP
                    </Typography>
                    <Typography>
                        <Phone />(123) 456-7890
                    </Typography>
                    <Typography>
                        <EmailRounded />info@VisionaryVerse.com
                    </Typography>
                    <Typography>Experience the power of storytelling</Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography variant="h5">Send Your Contact Details:</Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Name"
                            name="name"
                            required
                            variant="standard"
                            // className={classes.formControl}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            label="Your Email"
                            name="email"
                            required
                            variant="standard"
                            // className={classes.formControl}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            id="message"
                            label="Message"
                            name='message'
                            multiline
                            rows={3}
                            variant="standard"
                            onChange={handleChange}
                            fullWidth
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            startIcon={<SendIcon />}
                            sx={{ m: 1 }}
                        >
                            Send
                        </Button>
                        <Button
                            type="reset"
                            variant="outlined"
                            startIcon={<RestoreIcon />}
                            sx={{ m: 1 }}
                        // className={classes.formControl}
                        >
                            Reset
                        </Button>
                    </form>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Contact;
