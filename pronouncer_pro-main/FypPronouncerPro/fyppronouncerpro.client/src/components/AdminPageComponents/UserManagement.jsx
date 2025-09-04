import { Container, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

function AllUsers() {
    const location = useLocation();
    return (
        <>
            <Container style={{ backgroundColor: '#38a9de', borderRadius: '10px', padding: '10px 30px', margin:"10px 0px"}}>
                <Typography variant="h5" >Users</Typography>
            </Container>
            <Link to="all_users" className={location.pathname === '/admin/all_users' ? 'activeLink' : 'lessonLink'}>
                <Typography variant="h6" sx={{ fontFamily: 'comfortaa' }}>View All Users</Typography>
            </Link>
        </>
    );
}

export default AllUsers;
