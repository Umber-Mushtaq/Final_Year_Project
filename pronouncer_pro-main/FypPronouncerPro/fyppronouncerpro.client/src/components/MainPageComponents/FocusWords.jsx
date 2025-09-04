import { Container, Typography } from '@mui/material';
import { WordToSpeech } from '../../speechAnalysis/TextToSpeech';
import PropTypes from 'prop-types'
function FocusWords({ focusWords }) {
    return (
        <>
            <Container sx={{ padding: '15px', background: '#fcebee', borderRadius: '8px', width: {md:'50%', xs:"100%"} }}>
                <Typography
                    component="h1"
                    variant="h5"
                    sx={{
                        textAlign: 'left',
                        fontFamily: 'comfortaa',
                        color: "#f02e4e ",
                    }}
                >
                    Focus :
                </Typography>
                {focusWords.split(",").map((word, index) => (
                    <WordToSpeech key={index} word={word} />
                ))}
            </Container>
        </>
    )
}

FocusWords.propTypes = {
    focusWords: PropTypes.string.isRequired,
}

export default FocusWords;