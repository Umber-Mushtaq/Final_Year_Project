import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { Grid, Paper, Typography, createTheme, ThemeProvider, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { SaveJoinedLesson } from '../../ApiRequests';
import { PropTypes } from 'prop-types';

function AllLessonsCard({ lessons }) {


    const handleJoindedLesson = (title, content, words, level) => {
        SaveJoinedLesson(
            {
                userEmail: localStorage.email,
                lessonTitle: title,
                lessonContent: content,
                focusWords: words,
                lessonLevel: level,
            });
    }

    const theme = createTheme({
        components: {
            MuiPaper: {
                styleOverrides: {
                    root: {
                       
                    },
                },
            },
        },
    });


    return (
        <Grid container spacing={2}>
            {
                lessons.map((lesson, index) => (
                    <Grid item key={index} xs={12} md={4} lg={3}>
                        <ThemeProvider theme={theme}>
                            <Link onClick={() => handleJoindedLesson(lesson.lessonTitle, lesson.lessonContent, lesson.focusWords, lesson.lessonLevel)} to={`solo_para_lesson/${lesson.lessonTitle}/${lesson.lessonContent}/${lesson.lessonLevel}/${lesson.focusWords}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Paper elevation={0}
                                    sx={{
                                        borderBottom: `5px solid ${lesson.level === 1 ? '#30C0A8' : lesson.level === 2 ? '#ff8400' : '#F06060'}`,
                                        padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '200px'
                                    }}>
                                    <Typography variant="h6" sx={{ textAlign: 'center', cursor: 'pointer' }}>
                                        {index + 1} . {lesson.lessonTitle}
                                    </Typography>
                                    <Button
                                        sx={{
                                            color: lesson.level === 1 ? '#30C0A8' : lesson.level === 2 ? '#ff8400' : '#F06060',
                                        borderRadius: '60%',
                                            marginTop: '10px',
                                        }}><PlayCircleOutlineIcon sx={{fontSize:'50px'} } /></Button>
                                </Paper>
                            </Link>
                        </ThemeProvider>
                    </Grid>
                ))
            }
        </Grid>
    );
}

AllLessonsCard.propTypes = {
    lessons: PropTypes.array.isRequired,
}

export default AllLessonsCard;
