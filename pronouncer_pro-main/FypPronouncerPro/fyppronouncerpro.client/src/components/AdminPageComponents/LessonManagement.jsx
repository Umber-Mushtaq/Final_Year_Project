import { Container, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

function LessonManagement() {
    const location = useLocation();

    return (
        <>
            <Container sx={{ backgroundColor: '#38a9de', borderRadius: '10px',margin:'20px 0px', padding: '10px 30px' }} >
                <Typography variant="h5">Lessons</Typography>
            </Container>
            <Link to="." className={location.pathname === '/admin' ? 'activeLink' : 'lessonLink'}>
                <Typography variant="h6" sx={{ fontFamily: 'comfortaa' }}>Add Lesson</Typography>
            </Link>
            <Link to="edit_lesson" className={location.pathname === '/admin/edit_lesson' ? 'activeLink' : 'lessonLink'}>
                <Typography variant="h6" sx={{ fontFamily: 'comfortaa' }}>Edit Lesson</Typography>
            </Link>
            <Link to="delete_lesson" className={location.pathname === '/admin/delete_lesson' ? 'activeLink' : 'lessonLink'}>
                <Typography variant="h6" sx={{ fontFamily: 'comfortaa' }}>Delete Lesson</Typography>
            </Link>
            <Link to="all_lessons" className={location.pathname === '/admin/all_lessons' ? 'activeLink' : 'lessonLink'}>
                <Typography variant="h6" sx={{ fontFamily: 'comfortaa' }}>All Lessons</Typography>
            </Link>
        </>
    );
}

export default LessonManagement;
