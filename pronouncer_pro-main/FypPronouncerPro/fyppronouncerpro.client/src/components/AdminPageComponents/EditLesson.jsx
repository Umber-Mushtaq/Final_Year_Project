import { Typography, Stack, InputAdornment, TextField, Container } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { GetOneLesson, EditParaLesson } from '../../ApiRequests';
function EditLesson() {
    const [searchText, setSearchText] = useState("");
    const [lessonData, setLessonData] = useState({
        lessonTitle: '',
        lessonContent: '',
        lessonLevel: '',
        focusWords: [],
    });

    const handleSearchTextChange = (e) => {
        setSearchText(e.target.value);
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            if (searchText) {
                GetOneLesson(searchText)
                    .then(response => {
                        if (response) {
                            setLessonData(response);
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching lesson:', error);
                    });
            }
        }
    };

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
        EditParaLesson(searchText, lessonData);
    };
    return (
        <Container>
            <Stack sx={{display:'flex',flexDirection:'row', alignItems:'center', justifyContent:"space-between", margin:'10px 0px'}}>
                <Typography variant="h4">Edit Lesson</Typography>
                <TextField
                    label="Search with title.."
                    value={searchText}
                    onChange={handleSearchTextChange}
                    onKeyPress={handleKeyPress}
                    type="text"
                    name="email"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Stack>
            <form onSubmit={handleSubmit}>
                <TextField
                    sx={{ mb: 2, width: "100%", p: 0, display:"none" }}
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
                    value="Edit"
                    required
                />
            </form>
           
        </Container>
    );
}
export default EditLesson;