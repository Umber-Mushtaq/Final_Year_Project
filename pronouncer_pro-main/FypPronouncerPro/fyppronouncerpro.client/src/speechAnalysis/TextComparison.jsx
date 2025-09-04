import PropTypes from 'prop-types';
import { IconButton } from "@mui/material";
import BugReportIcon from '@mui/icons-material/BugReport';
import { TextComparisonRequest, SaveMispronunciations } from '../ApiRequests';


const TextComparison = ({ originalText, spokenText, title }) => {
    const data = {
        OriginalString: originalText,
        SpokenString: spokenText,
    }

    const compareTexts = async () => {
        try {
            const response = await TextComparisonRequest(data);
            if (response) {
                const mispronunciations = response.mispronunciations;
                const splitMispronunciations = mispronunciations.map(pair => pair.split(', '));
                const wordsArray1 = splitMispronunciations.map(words => words[0]);
                const wordsArray2 = splitMispronunciations.map(words => words[1]);

                const requestObj = {
                    Email: localStorage.email,
                    LessonTitle: title,
                    M_What: wordsArray1,
                    M_How: wordsArray2,
                }
                SaveMispronunciations(requestObj); 
                window.location.reload(true); 
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <IconButton onClick={compareTexts} sx={{ color:"#f02e4e"} }>
                <BugReportIcon fontSize="large"/>
            </IconButton>
        </>

    );
};
TextComparison.propTypes = {
    originalText: PropTypes.string.isRequired,
    spokenText: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};

export default TextComparison;
