import { useState, useRef } from "react";
import ReactPlayer from "react-player";
import { Button, IconButton, Slider, Stack, Container } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import MicIcon from "@mui/icons-material/Mic";
import ShowMispronunciations from "../../mispronunciations/ShowMispronunciationsTable";

const SoloAudioLesson = () => {
    const [ShowMispronounciationPage, setMispronounciationPage] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const Url = "https://www.learningcontainer.com/wp-content/uploads/2020/02/Sample-FLAC-File.flac";
    const [played, setPlayed] = useState(0);
    const [volume, setVolume] = useState(0.8);
    const playerRef = useRef(null);

    const handleMispronouncedPage = () => {
        setMispronounciationPage(true);
    };

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const handleProgress = (progress) => {
        setPlayed(progress.played);
    };
    
    

    return (
        <Stack
            sx={{
                height: "100vh",
                justifyContent:"center",
                alignItems: "center",
                display: "flex",
                flexDirection: {md:"row", xs:"column"}

            }}
        >
            <div style={{  marginTop: "-30%" }} >
                <ReactPlayer
                    ref={playerRef}
                    url={Url}
                    playing={isPlaying}
                    onProgress={handleProgress}
                    volume={volume}
                />
                <div style={{ display: "flex", alignItems: "center"}}>
                    <IconButton onClick={handlePlayPause} size="large" sx={{ background:"2196f3"} }>
                        {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                    </IconButton>
                    <Slider
                        size="large"
                        value={played * 100}
                        onChange={(event, newValue) => {
                            setPlayed(newValue / 100);
                            playerRef.current.seekTo(newValue / 100);
                        }}
                        sx={{ marginX: 1, flexGrow: 1 }}
                    />
                </div>
                <Button
                    variant="contained"
                    sx={{ ml: 20 }}
                    endIcon={<MicIcon />}
                >
                    Record Yourself
                </Button>
                <Button
                    variant="contained"
                    sx={{ ml: 2 }}
                    onClick={handleMispronouncedPage}
                >
                    Analyze
                </Button>
            </div>
            {ShowMispronounciationPage && (
                <Container>
                    <ShowMispronunciations />
                </Container>
            )}
        </Stack>
    );
};

export default SoloAudioLesson;
