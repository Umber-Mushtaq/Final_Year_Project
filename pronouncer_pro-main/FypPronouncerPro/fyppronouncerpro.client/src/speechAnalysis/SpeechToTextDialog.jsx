import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Tooltip,
    Zoom,
} from "@mui/material";
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import RepeatIcon from '@mui/icons-material/Repeat';
import SpeechToText from "./SpechToText";
import { RemoveMispronunciation } from "../ApiRequests";
import GetPhonetic from "../mispronunciations/GetPhonetic";

function SpeechToTextDialog({ word, title }) {
    // speech
    const [speechResult, setSpeechResult] = useState('');
    const handleSpeechRecognitionResult = (result) => {
        setSpeechResult(result);
    }
    // dialog
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const handleClose = () => {
        setIsDialogOpen(false);
    };

    useEffect(() => {
        const cleanSpeechResult = speechResult.replace(/[^\w\s]|_/g, "").toLowerCase();
        const cleanWord = word.replace(/[^\w\s]|_/g, "").toLowerCase();

        if (cleanSpeechResult && cleanWord && cleanSpeechResult === cleanWord) {
            toast.success("Pronunced Correctly", { position: "bottom-left" });
            handleClose();
            RemoveMispronunciation(localStorage.email, title, word);
            window.location.reload();
        }
    }, [speechResult, word, title]);

    return (
        <>
            <Tooltip title="Practice" arrow TransitionCompnent={Zoom}>
                <IconButton
                    onClick={() => setIsDialogOpen(true)}
                    sx={{ color: "#2196f3", }}
                >
                    <RepeatIcon />
                </IconButton>
            </Tooltip> 
            {isDialogOpen && (
                <Dialog open={isDialogOpen} onClose={handleClose} sx={{margin:'30px'} }>
                    <DialogActions sx={{ margin: "0" }}>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </DialogActions>
                    <DialogTitle>
                        <GetPhonetic word={word}/>
                    </DialogTitle>
                    <DialogContent sx={{ textAlign: "center" }}>
                        <SpeechToText onSpeechRecognitionResult={handleSpeechRecognitionResult} showText={true} />
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
}

SpeechToTextDialog.propTypes = {
    word: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};

export default SpeechToTextDialog;