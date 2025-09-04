import { IconButton, Tooltip, Zoom } from '@mui/material';
import MicIcon from "@mui/icons-material/Mic";
import { useSpeechRecognition } from 'react-speech-kit';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const SpeechToText = ({ onSpeechRecognitionResult, showText }) => {

    const [value, setValue] = useState('');

    const [Listening, setListening] = useState(false);

    const { listen, stop, listening } = useSpeechRecognition({
        onResult: (result) => {
            setValue(result);
            onSpeechRecognitionResult(result);
        },
    });

    const handleListening = () => {

        setListening(!Listening);

        if (Listening === true) {
            listen({ continuous: true, language: "en-Us" });
        }
        if (Listening === false){
            console.log(value);
            stop();
        }
    }

    useEffect(() => {
        return () => {
            stop();
        };
    }, [stop]);

    return (
        <>
            <Tooltip title="Double Click" arrow TransitionComponent={Zoom}>
                <IconButton
                    onClick={handleListening}
                    className={listening && "ZoomAnimation"}
                    sx={{ mx: 3, color: "#f02e4e" }}
                >
                    <MicIcon fontSize="large" />
                </IconButton>
            </Tooltip>

            {showText && <div>{value}</div>}
        </>
    );
};

SpeechToText.propTypes = {
    onSpeechRecognitionResult: PropTypes.func.isRequired,
    showText: PropTypes.bool.isRequired,
};

export default SpeechToText;
