import { Stack } from '@mui/material';
import GetPhonetic from './GetPhonetic';
import { PropTypes } from 'prop-types';
function WordGuide({word }) {
    return (
        <Stack>
            <GetPhonetic word={word} />
        </Stack>
    );
}
WordGuide.propTypes = {
    word: PropTypes.string.isRequired,
}
export default WordGuide;