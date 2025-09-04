import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';

function Logo() {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate('/');
    }
    return (
        <img width="15%" style={{ cursor: 'pointer' }} onClick={handleNavigate} src={logo} alt="image"/>
        /*<Typography
            noWrap
            component="a"
            href="/"
            sx={{
                mr: 2,
                fontSize: {md:'30px', xs:'20px'},
                fontWeight: 200,
                fontFamily: "Charm",
                letterSpacing:'.1rem',
                color: "white",
                textDecoration: "none",
*//*                borderBottom: { md: '2px solid #e4effb', xs: 'none' }*//*
            }}
        >
            <span style={{ fontFamily: 'great vibes', fontSize: '40px' }}>P</span>ronouncer<span style={{ fontFamily: 'great vibes', fontSize: '40px' }}>P</span>ro
        </Typography>*/
    );
}

export default Logo;