import { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import GetPhonetic from "../../mispronunciations/GetPhonetic";
import SpeechToText from "../../speechAnalysis/SpechToText";
import { TextToSpeech } from "../../speechAnalysis/TextToSpeech";
import SaveIcon from '@mui/icons-material/Save';
import { SaveWordInVocabulary } from "../../ApiRequests";
import { toast } from 'react-toastify';
import { PropTypes } from 'prop-types';

function WordDialog({ open, onClose, word }) {
    const [speechResult, setSpeechResult] = useState('');

    const handleSpeechRecognitionResult = (result) => {
        setSpeechResult(result);
    }

    const handleSaveWordInVocabulary = () => {
        if (word) {
            SaveWordInVocabulary({
                userEmail: localStorage.email,
                Word: word,
            });
        }
    }

    useEffect(() => {
        const cleanSpeechResult = speechResult.replace(/[^\w\s]|_/g, "").toLowerCase();
        const cleanWord = word.replace(/[^\w\s]|_/g, "").toLowerCase();

        if (cleanSpeechResult && cleanWord && cleanSpeechResult === cleanWord) {
            toast.success("Pronunced Correctly", { position: "bottom-left" });
            setSpeechResult('');
            onClose();
        }
    }, [speechResult, word, onClose]);

    return (
        <Dialog open={open} onClose={onClose} sx={{ margin: { md: "30px", xs: '10px' } }}>
            <DialogActions sx={{ margin: "0" }}>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </DialogActions>
            <DialogTitle>
                <GetPhonetic word={word} />
            </DialogTitle>
            <DialogContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                <SpeechToText onSpeechRecognitionResult={handleSpeechRecognitionResult} showText={true} />
                <TextToSpeech para={word} />
                <IconButton onClick={handleSaveWordInVocabulary} sx={{ mx: 3, color: "#f02e4e" }}>
                    <SaveIcon fontSize="large" />
                </IconButton>
            </DialogContent>
        </Dialog>
    );
}

WordDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    word: PropTypes.string.isRequired,
}

export default WordDialog;
