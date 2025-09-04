import { useState } from 'react';
import { Avatar, Menu, MenuItem, Tooltip, Zoom } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import { useNavigate } from 'react-router-dom';

function UserProfile() {
    const navigate = useNavigate();
    const firstLetter = localStorage.email ? localStorage.email.charAt(0).toUpperCase() : '';

    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleProgress = () => {
        navigate('progress_page');
        handleMenuClose();
    };

    const handleLogout = () => {
        localStorage.removeItem('email');
        navigate('/');
        handleMenuClose();
    };

    return (
        <div>
            <Tooltip title={localStorage.email} arrow TransitionComponent={Zoom}>
                <Avatar sx={{ bgcolor: '#f02e4e' }} onClick={handleMenuOpen}>{firstLetter}</Avatar>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={handleLogout}>
                    <LogoutIcon sx={{ mr: 1 }} />
                    Logout
                </MenuItem>
                <MenuItem onClick={handleProgress}>
                    <HourglassBottomIcon sx={{ mr: 1 }} />
                    Progress
                </MenuItem>
            </Menu>
        </div>
    );
}

export default UserProfile;
