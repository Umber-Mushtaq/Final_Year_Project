import { Container, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

function MostMispronunciations() {

    const location = useLocation();

    return (
        <>
            <Container style={{ backgroundColor: '#38a9de', borderRadius: '10px', padding: '10px 30px', margin: "10px 0px" }}>
                <Typography variant="h5" >Mispronunciations</Typography>
            </Container>
            <Link to="most_mispronunciations" className={location.pathname === '/admin/most_mispronunciations' ? 'activeLink' : 'lessonLink'}>
                <Typography variant="h6" sx={{ fontFamily: 'comfortaa' }}>Mispronunciations</Typography>
            </Link>
        </>
    );
}

export default MostMispronunciations;
