import { Box, Stack, Typography } from "@mui/material";
import SideImage from '../../assets/jjh.png'

function ContentSection() {
    return (
        <Stack p={5} display="flex" flexDirection="row" alignItems="center" justifyContent="space-around">
                <Box>
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{
                            fontFamily: 'Merriweather',
                            width: 'fit-content',
                            letterSpacing: '2px',
                            marginBottom:'20px'
                        }}
                    >
                        A Gateway to Fluent Communication
                    </Typography>
                    <Typography
                        component="p"
                        sx={{
                            fontFamily: "Oxygen",
                            fontSize:'18px',
                            display: "block",
                            width: "100%",
                            textAlign: 'justify',
                            lineHeight: "2",
                            letterSpacing: "1px",
                        }}
                    >
                        Welcome to PronouncerPro, where language mastery meets innovation. Our platform is designed to
                        elevate your English pronunciation skills through immersive
                        paragraph-based lessons. Whether you are a non-native English speaker,
                        a student honing your language abilities, or a professional aiming for
                        articulate communication, PronouncerPro is your personalized journey
                        to improved pronunciation, enriched vocabulary, and real-time
                        feedback. Join us on this transformative learning experience and
                        unlock the power of clear and confident English articulation.
                    </Typography>
                </Box>
                <Box display={{ md: "flex", xs: "none" }}>
                    <img src={SideImage} alt="pic here" />
                </Box>
        </Stack>
    );
}

export default ContentSection;