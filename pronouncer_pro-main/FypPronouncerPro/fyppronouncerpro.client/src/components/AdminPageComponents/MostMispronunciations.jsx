import { useEffect, useState } from 'react';
import { GetAllMispronunciations } from '../../ApiRequests';
import {Chip, Typography, Container, Button} from '@mui/material';

function MostMispronuncedWords() {
    const [mispronunciations, setMispronunciations] = useState([]);
    const [showAllWords, setShowAllWords] = useState(true);

    useEffect(() => {
        const fetchMispronunciations = async () => {
            try {
                const response = await GetAllMispronunciations();
                setMispronunciations(response);
                console.log("inside", response);
            } catch (error) {
                console.log("Error fetching mispronunciations:", error);
            }
        };

        fetchMispronunciations();
    }, []);

    const findRepeatingWords = (words) => {
        const wordFrequency = {};
        const repeatingWords = [];

        words.forEach((word) => {
            if (wordFrequency[word]) {
                wordFrequency[word]++;
            } else {
                wordFrequency[word] = 1;
            }
        });

        for (const word in wordFrequency) {
            if (wordFrequency[word] > 1) {
                repeatingWords.push(word);
            }
        }

        return repeatingWords;
    };

    const repeatingWords = findRepeatingWords(mispronunciations);

    const handleButtonClick = () => {
        setShowAllWords(!showAllWords);
    };

    return (
        <Container sx={{margin:"10px 0px"}}>
            <Typography variant="h4" >Mispronunciations</Typography>
            <Button onClick={handleButtonClick} >
                {showAllWords ? 'Most Mispronunciations' : 'All Mispronunciations'}
            </Button>
            <div style={{ display: 'flex',  flexWrap: 'wrap' }}>
                {(showAllWords ? mispronunciations : repeatingWords).map((word, index) => (
                    <Chip
                        key={index}
                        label={word}
                        variant="outlined"
                        style={{ margin: '5px', backgroundColor: '#f8d7da', color: '#721c24' }}
                    />
                ))}
            </div>
        </Container>
    );
}

export default MostMispronuncedWords;
