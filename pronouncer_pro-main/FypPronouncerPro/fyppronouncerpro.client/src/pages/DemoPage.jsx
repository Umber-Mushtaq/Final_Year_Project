import {
    Stack,
    Typography,
    IconButton,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import HearingIcon from "@mui/icons-material/Hearing";
import MicIcon from "@mui/icons-material/Mic";
import Loading from "./Loading";

const DemoPage = () => {
    const [isActiveHearing, setActiveHearing] = useState(false);
    const [isActiveListening, setActiveListening] = useState(false);

    const handleToggleHearing = () => {
        if (isActiveListening === true) {
            setActiveListening(false);
        }
        setActiveHearing(!isActiveHearing);
    };

    const handleToggleListening = () => {
        if (isActiveHearing === true) {
            setActiveHearing(false);
        }
        setActiveListening(!isActiveListening);
    };

    // Dialog

    const [open, setOpen] = useState(false);
    const [highlightDifficultWords, setHighlightDifficultWords] = useState(false);
    const [loading, setLoading] = useState(false)
    const para =
        "One day a hunter sets a net to catch birds and placed grains and rice over the net. After some time a flock of pigeons comes by and start eating grains and get caught in the net. After some time they started losing hope, then their leader asks them to fly together up in the sky. They did as they were told and carried the net away. The hunter runs after them but they flew away to their friend's mouse hole. Then the mouse cuts the net and freed the pigeons.";

    const difficultWords = [
        "hunter",
        "net",
        "placed",
        "grains",
        "rice",
        "flock",
        "pigeons",
        "caught",
        "losing",
        "hope",
        "leader",
        "fly",
        "together",
        "sky",
        "carried",
        "away",
        "runs",
        "friend’s",
        "mouse",
        "hole",
        "cuts",
        "freed",
    ];
    const words = para.split(/\s+/);

    const handleClose = () => {
        setOpen(false);
    };

    const handleTestClick = () => {
        setLoading(true);
        setTimeout(() => {
            setHighlightDifficultWords(!highlightDifficultWords);
            setOpen(true);
            setLoading(false);
        }, 5000);
        
        setActiveHearing(false);
        setActiveListening(false);
    };

    return (
        <Stack
            className="DemoPageBackground"
            direction="column"
            sx={{ height: { md: "100vh", xs: "100%" } }}
        >
            <Typography
                component="h1"
                variant="h2"
                sx={{
                    fontFamily: 'cinzel',
                     color: "#f02e4e",
                }}
            >
                Test Your Level
            </Typography>
            <Typography
                component="p"
                variant="h6"
                sx={{
                    fontFamily: "Manrope",
                    width: "80%",
                    color:'#000000 ',
                    textAlign: "justify",
                    lineHeight: "2.2",
                    letterSpacing: "1px",
                    marginBottom: {md:"10px", xs:"0"},
                    borderBottom: "2px solid #000000 ",
                }}
            >
                {words.map((word, index) => (
                    <span
                        key={index}
                        style={{
                            color:
                                highlightDifficultWords &&
                                    difficultWords.includes(word.toLowerCase())
                                    ? "red"
                                    : "#000000 ",
                        }}
                    >
                        {word}{" "}
                    </span>
                ))}
            </Typography>

            <Stack direction="row" alignItems="center" justifyContent="center">
                <IconButton
                    className={isActiveHearing && "ZoomAnimation"}
                    onClick={handleToggleHearing}
                    sx={{ color: "#f02e4e",} }
                >
                    <HearingIcon fontSize="large" />
                </IconButton>

                <IconButton
                    className={isActiveListening && "ZoomAnimation"}
                    onClick={handleToggleListening}
                    sx={{ color: "#f02e4e" }}
                >
                    <MicIcon fontSize="large" />
                </IconButton>

                <button className="PinkBtn" onClick={handleTestClick}>
                    Analyze
                </button>
            </Stack>

            {highlightDifficultWords && (
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Level Test</DialogTitle>
                    <DialogContent>
                        <Typography>We Suggest You Should Start From Easy Level</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Link to="/main_page">
                            <Button color="primary">Ok</Button>
                        </Link>
                    </DialogActions>
                </Dialog>
            )}

            {loading && (
                <Loading/>
            )}
        </Stack>
    );
};

export default DemoPage;
