import { Paper, TableContainer, Typography,Rating, Table, TableBody, TableHead, TableRow, TableCell, Button } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import Brightness1Icon from '@mui/icons-material/Brightness1';

function MyLessonsTable({data}) {

    return (
        <TableContainer component={Paper} sx={{ padding: '20px', minHeight: '200px', maxHeight:'300px' }}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow >
                        <TableCell><Typography variant="h6" sx={{ color: '#f02e4e' }}>Lesson Title</Typography></TableCell>
                        <TableCell><Typography variant="h6" sx={{ color: '#f02e4e' }}>Lesson Level</Typography></TableCell>
                        <TableCell><Typography variant="h6" sx={{ color: '#f02e4e' }}>Progress</Typography></TableCell>
                        <TableCell><Typography variant="h6" sx={{ color: '#f02e4e' }}>Start</Typography></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((lesson) => (
                        <TableRow key={lesson.lessonId}>
                            <TableCell><Typography variant="body1" sx={{ fontFamily: "comfortaa" }}>{lesson.lessonTitle}</Typography></TableCell>
                            <TableCell><Typography variant="body1" sx={{ fontFamily: "comfortaa" }}>
                                {lesson.lessonLevel === 1 && <Rating sx={{ color: "#66BB6A" }} icon={<Brightness1Icon />} defaultValue={1} max={1} readOnly />}
                                {lesson.lessonLevel === 2 && <Rating sx={{ color: "#FFA726" }} icon={<Brightness1Icon />} defaultValue={2} max={2} readOnly />}
                                {lesson.lessonLevel === 3 && <Rating sx={{ color: "#EF5350" }} icon={<Brightness1Icon />} defaultValue={3} max={3} readOnly />}
                            </Typography></TableCell>
                            <TableCell>
                                <Typography variant="body1" sx={{ fontFamily: "comfortaa" }}>
                                    {lesson.inProgress && lesson.isComplited ? "Completed" : lesson.inProgress === false ? "Joined but not started" : "In progress"} 
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Link  to={`solo_para_lesson/${lesson.lessonTitle}/${lesson.lessonContent}/${lesson.lessonLevel}/${lesson.focusWords}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <Button
                                        sx={{
                                            color:'#4a4848',
                                            marginTop: '10px',
                                        }}><PlayCircleOutlineIcon sx={{ fontSize: '40px' }} />
                                    </Button>
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
MyLessonsTable.propTypes = {
    data : PropTypes.object.isRequired,
}

export default MyLessonsTable;
