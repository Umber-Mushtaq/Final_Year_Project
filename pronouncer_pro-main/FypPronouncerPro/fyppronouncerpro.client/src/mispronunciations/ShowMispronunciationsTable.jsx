import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
    Box,
    IconButton,
} from "@mui/material";
import PropTypes from 'prop-types';
import SpeechToTextDialog from "../speechAnalysis/SpeechToTextDialog";
import { WordToSpeech } from "../speechAnalysis/TextToSpeech";
import SaveIcon from '@mui/icons-material/Save';
import { SaveWordInVocabulary } from "../ApiRequests";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ShowMispronunciations = ({ what, how, title }) => {
    const navigate = useNavigate();

    const handleSaveWordInVocabulary = (word) => {
            SaveWordInVocabulary({
                userEmail: localStorage.email,
                Word: word,
            });
    }
    
    useEffect(() => {
        if (what.length === 0) {
            toast.success('Lesson Completed', { position: 'bottom-right' });
            navigate('/main_page');
        }
    }, [what.length]);

    return (
        <>
            <TableContainer sx={{ width: "100%", marginBottom: "15px" }}>
                <Table>
                    <TableBody>
                        {what.map((word, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <Box sx={{ display: 'flex', justifyContent: "space-between", alignItems: 'center' }}>
                                        <div>
                                            <Typography sx={{ color: "#f02e4e", textTransform: 'capitalize' }} variant="h6" display="inline-block">
                                                <WordToSpeech word={word} />
                                            </Typography>
                                            <SpeechToTextDialog word={word} title={title} />
                                            <IconButton onClick={() => handleSaveWordInVocabulary(word)} sx={{ color: "#f02e4e" }}>
                                                <SaveIcon />
                                            </IconButton>
                                        </div>
                                    </Box>
                                    <Typography sx={{ textTransform: "lowercase", color: "#595959 " }}>
                                        {how[index] === ' ' ? "Did not speak" : `said '${how[index]}' instead of '${word}'`}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );

};

ShowMispronunciations.propTypes = {
    what: PropTypes.array.isRequired,
    how: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
};

export default ShowMispronunciations;
