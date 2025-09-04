import { useState } from 'react';
import { Avatar, Menu, MenuItem, Tooltip, Zoom } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

function AdminProfile() {
    const navigate = useNavigate();
    const firstLetter = localStorage.adminEmail ? localStorage.adminEmail.charAt(0).toUpperCase() : '';

    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('adminEmail');
        navigate('/');
        handleMenuClose();
    };

    return (
        <div>
            <Tooltip title={localStorage.email} arrow TransitionComponent={Zoom}>
                <Avatar sx={{ bgcolor: '#38a9de' }} onClick={handleMenuOpen}>{firstLetter}</Avatar>
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
            </Menu>
        </div>
    );
}

export default AdminProfile;
