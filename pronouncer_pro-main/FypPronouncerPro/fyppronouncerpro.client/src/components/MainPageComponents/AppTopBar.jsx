import {
    AppBar,
    Box,
    Toolbar,
    Button,
    Drawer,
} from "@mui/material";
import Logo from "../_1FirstPageComponents/Logo";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import MenuIcon from "@mui/icons-material/Menu";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AccentSelectionMenu from "../MainPageComponents/AccentSelectionMenu";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import RandomWordPronunciation from "./RandomWordPronunciation";
import UserProfile from "./UserProfile";

function AppTopBar() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [textareaValue, setTextareaValue] = useState("");

    const handleTextareaChange = (event) => {
        setTextareaValue(event.target.value);
    };
    
    return (
        <>
            <AppBar position="sticky">
                <Toolbar>
                    <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Logo />
                    <RandomWordPronunciation />
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'space-around' }}>
                            <AccentSelectionMenu/>
                            <button className="transparentButton" style={{ margin: '0px 15px 0px 15px' }} onClick={() => setIsDrawerOpen(true)}>
                                <MenuIcon fontSize="large" />
                        </button>
                        <UserProfile/>
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                anchor="right"
            >
                <Link to="vocabulary_retention_page" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Button
                        sx={{ m: 2 }}
                        variant="outlined"
                        endIcon={<MenuBookIcon />}
                    >
                        Vocabulary
                    </Button>
                </Link>
                
                <textarea
                    rows="20"
                    value={textareaValue}
                    onChange={handleTextareaChange}
                    style={{
                        margin: "15px",
                        color: "#000000",
                        textAlign: 'justify',
                        outline: "2px solid #2196f3",
                        border: "none",
                        placeholder: "Paste Any Paragraph",
                        resize:"none",
                    }}
                />
                {textareaValue &&
                    (<Link to={`random_para_lesson/${textareaValue}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Button
                            sx={{ m: 2 }}
                            variant="outlined"
                            endIcon={<HourglassTopIcon />}
                        >
                            Generate
                        </Button>
                    </Link>)
                }
            </Drawer>
        </>
        
    );
}

export default AppTopBar;