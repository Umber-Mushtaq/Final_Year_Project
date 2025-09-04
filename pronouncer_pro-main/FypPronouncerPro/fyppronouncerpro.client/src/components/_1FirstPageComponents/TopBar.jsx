import {
    AppBar,
    Box,
    Button,
    Toolbar,
} from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from 'react';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';
import Logo from "./Logo";
import Login from "./RegistrationComponents/Login";
import AdminLogin from "./RegistrationComponents/AdminLogin";

function TopBar() {
    const isSmallScreen = useMediaQuery('(max-width:600px)');

    const [openLoginDialog, setOpenLoginDialog] = useState(false);
    const handleLoginBtnClick = () => {
        setOpenLoginDialog(!openLoginDialog);
    }

    const [openAdminLoginDialog, setOpenAdminLoginDialog] = useState(false);
    const handleAdminLoginBtnClick = () => {
        setOpenAdminLoginDialog(!openAdminLoginDialog);
    }

    return (
        <>
            <AppBar position="sticky" color="info">
                <Toolbar>
                    <Box
                        sx={{
                            display: "flex",
                            width: "100%",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Logo />
                        <Box sx={{display:'flex'} }>
                            <Button
                                onClick={handleLoginBtnClick}
                                disableRipple
                                sx={{ marginRight: { md: '10px', xs: '5px' } }}
                                color="inherit"
                                variant={isSmallScreen ? 'text' : 'outlined'}
                                endIcon={!isSmallScreen && <PersonIcon fontSize="large" />}
                            >
                                {isSmallScreen ? <PersonIcon fontSize="large" /> : 'Login'}
                            </Button>

                            <Button
                                onClick={handleAdminLoginBtnClick}
                                disableRipple
                                color="inherit"
                                variant={isSmallScreen ? 'text' : 'outlined'}
                                endIcon={!isSmallScreen && <AdminPanelSettingsIcon fontSize="large" />}
                            >
                                {isSmallScreen ? <AdminPanelSettingsIcon fontSize="large" /> : 'Admin Login'}
                            </Button>
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>


            {openLoginDialog && (<Login loginOpen={openLoginDialog} />)}
            {openAdminLoginDialog && (<AdminLogin AdminLoginOpen={openAdminLoginDialog} />)}
        </>
       
    );
}

export default TopBar;