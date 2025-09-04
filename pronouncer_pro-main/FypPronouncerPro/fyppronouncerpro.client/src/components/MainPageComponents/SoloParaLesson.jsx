import {
    Stack,
    Typography,
    Paper, 
} from "@mui/material";
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import UserGuide from "./UserGuide";
import FocusWords from "./FocusWords";
import HighlightedText from "./HighlightedText";
import Mispronunciations from "./Mispronunciations";
import FunctionalitySection from "./FunctionalitySection";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Link } from 'react-router-dom';
function App() {

    const params = useParams();
    const [mispronunciations, setMispronunciations] = useState(null);
    const handleMispronunciations = (what) => {
        setMispronunciations(what);
    }
    return (
        <>
            <Stack sx={{ padding: { md: '30px', xs: '20px' }, display: 'flex', flexDirection: 'column' }}>
                <Link to="/main_page">
                    <KeyboardBackspaceIcon fontSize="large" sx={{ color: "#f02e4e" }} />
                </Link>
                <Paper sx={{ display: 'flex', flexDirection: {md:'row',xs:'column'},alignItems:'center', padding:'20px'} }>
                    <UserGuide />
                    <FocusWords focusWords={params.focusWords} />
                </Paper>
                <Stack sx={{ display: 'flex', flexDirection: { md: 'row', xs:'column' }, my: 4 }}>
                    <Paper sx={{ padding: "30px", marginRight: { md: 3, xs: 0 }, marginBottom: { md: 0, xs:3 },height:"fit-content"} }>
                        <Typography
                            component="h1"
                            variant="h4"
                            sx={{
                                fontFamily: 'comfortaa',
                                textAlign: 'center',
                                marginBottom: { md: 2, xs: 0 },
                                color: "#f02e4e",
                                letterSpacing: { md: '3px', xs: "1px" },
                            }}
                        >
                            {params.title}
                        </Typography>
                        {mispronunciations ? (<HighlightedText content={params.content} mispronunciations={mispronunciations} />) : (
                            <Typography 
                                component="p"
                                variant="h6"
                                sx={{
                                    fontFamily: "Manrope",
                                    marginBottom: { md: 2, xs: 0 },
                                    color: '#030a1b',
                                    textAlign: "justify",
                                    lineHeight: "2.2",
                                    letterSpacing: "1.5px",
                                    borderBottom: "2px solid #030a1b",
                                }}
                            >
                                {params.content}
                            </Typography>
                        )}
                        <FunctionalitySection title={params.title} content={params.content} />
                    </Paper>
                    <Mispronunciations title={params.title} onMispronunciations={handleMispronunciations} />
                </Stack>
               
            </Stack>
         </>
        
    );
}

export default App;