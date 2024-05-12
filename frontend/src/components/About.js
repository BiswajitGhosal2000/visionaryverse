import React from "react";
import { Container, Typography } from "@mui/material";
import Vision from "./About/Vision";
import Stories from "./About/Stories";
import Team from "./About/Team";
import Contact from "./About/Contact";

function About() {
    document.title = "About Us || Blog";

    return (
        <Container sx={{ my: 5 }}>
            <Typography variant="h4" align="center" sx={{ my: 2 }}>
                Our Vision: Building a Brighter Online World
            </Typography>
            <Vision />
            <Stories />
            <Team />
            <Contact />
        </Container>
    );
}

export default About;