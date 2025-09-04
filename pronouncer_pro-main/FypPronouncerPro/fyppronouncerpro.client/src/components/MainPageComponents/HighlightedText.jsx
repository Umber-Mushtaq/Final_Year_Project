import PropTypes from 'prop-types';
import { Typography } from '@mui/material'
const HighlightedText = ({ content, mispronunciations }) => {
    // Split the content into words
    const words = content.toLowerCase().split(/\s+/);
    const splitWords = words.map(word => word.replace(/[^\w\s]|_/g, "") );


    return (
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
            {splitWords.map((word, index) => (
                <span key={index} style={{
                    backgroundColor: mispronunciations.includes(word) ? 'yellow' : 'transparent',
                    color: mispronunciations.includes(word) ? 'red' : 'inherit'
                }}>
                    {word}{' '}
                </span>
            ))}
        </Typography>
    );
};

HighlightedText.propTypes = {
    content: PropTypes.string.isRequired,
    mispronunciations: PropTypes.array.isRequired,
};

export default HighlightedText;
