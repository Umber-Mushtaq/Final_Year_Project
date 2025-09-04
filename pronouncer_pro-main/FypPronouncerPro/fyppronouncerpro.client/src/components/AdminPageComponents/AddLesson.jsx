import { Typography, Container, TextField } from '@mui/material';
import { useState } from 'react';
import { CreateLesson } from '../../ApiRequests';

function AddLesson() {
    const [lessonData, setLessonData] = useState({
        lessonTitle: '',
        lessonContent: '',
        lessonLevel: '',
        focusWords: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'focusWords') {
            const wordsArray = value.split(',');
            setLessonData({ ...lessonData, [name]: wordsArray });
        } else {
            setLessonData({ ...lessonData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(lessonData);
        CreateLesson(lessonData);
    };

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h4" sx={{ margin: "10px 0px" }}>Add Lesson</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    sx={{ mb: 2, width: "100%", p: 0 }}
                    label="Title"
                    type="text"
                    name="lessonTitle"
                    value={lessonData.lessonTitle}
                    onChange={handleChange}
                    required
                />
                <TextField
                    sx={{ mb: 2, width: "100%", p: 0 }}
                    label="Content"
                    type="text"
                    name="lessonContent"
                    value={lessonData.lessonContent}
                    onChange={handleChange}
                    required
                    multiline
                />
                <TextField
                    sx={{ mb: 2, width: "100%", p: 0 }}
                    label="Focus Words"
                    type="text"
                    name="focusWords"
                    value={lessonData.focusWords.join(',')} // Join the array into a string for display
                    onChange={handleChange}
                    required
                />
                <TextField
                    sx={{ mb: 2, width: "100%", p: 0 }}
                    label="Level"
                    type="number"
                    name="lessonLevel"
                    value={lessonData.lessonLevel}
                    onChange={handleChange}
                    required
                />
                <input
                    style={{
                        background: '#2196f3',
                        padding: '10px',
                        width: '100%',
                        border: 'none',
                        color: '#ffffff',
                        letterSpacing: '2px',
                        fontSize: '18px',
                        borderRadius: '5px'
                    }}
                    type="submit"
                    value="Create"
                    required
                />
            </form>
        </Container>
    );
}

export default AddLesson;
