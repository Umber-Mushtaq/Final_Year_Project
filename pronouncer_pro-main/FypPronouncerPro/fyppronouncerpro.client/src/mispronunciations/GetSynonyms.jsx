import { TableCell } from "@mui/material";
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { GetPhoneticRequest, GetSynonymRequest, GetSentenceRequest } from "../ApiRequests";

export const GetSynonyms = ({ word }) => {
    const [phonetic, setPhonetic] = useState('');

    useEffect(() => {
        const fetchPhonetic = async () => {
            const result = await GetPhoneticRequest(word);
            setPhonetic(result);
        };
        fetchPhonetic();
    }, [word]);

    return (
        <>
            <TableCell>{phonetic}</TableCell>
        </>
    );
};

export const Phonetic = ({ word }) => {
    const [phonetic, setPhonetic] = useState('');

    useEffect(() => {
        const fetchPhonetic = async () => {
            const result = await GetSynonymRequest(word);
            setPhonetic(result);
        };
        fetchPhonetic();
    }, [word]);

    return (
        <>
            <TableCell>{phonetic}</TableCell>
        </>
    );
};

export const Sentences = ({ word }) => {
    const [phonetic, setPhonetic] = useState('');

    useEffect(() => {
        const fetchPhonetic = async () => {
            const result = await GetSentenceRequest(word);
            setPhonetic(result);
        };
        fetchPhonetic();
    }, [word]);

    return (
        <>
            <TableCell>{phonetic}</TableCell>
        </>
    );
};



GetSynonyms.propTypes = {
    word: PropTypes.string.isRequired,
};

Phonetic.propTypes = {
    word: PropTypes.string.isRequired,
};

Sentences.propTypes = {
    word: PropTypes.string.isRequired,
};
