import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    IconButton,
    Stack,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import PropTypes from 'prop-types';
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";
import LoginDialogForm from "./LoginDialogForm";
function Login({ loginOpen }) {


    const [isDialogOpen, setIsDialogOpen] = useState(loginOpen);
    const handleClose = () => {
        setIsDialogOpen(false);
    }

    const [openSignUpDialog, setOpenSignUpDialog] = useState(false);
    const handleSignUpBtnClick = () => {
        setIsDialogOpen(false);
        setOpenSignUpDialog(!openSignUpDialog);
    }

    const [openForgotPassDialog, setOpenForgotPassDialog] = useState(false);
    const handleForgotPassBtnClick = () => {
        setIsDialogOpen(false);
        setOpenForgotPassDialog(!openForgotPassDialog);
    }

    return (
        <>
            {isDialogOpen && (
                <Dialog open={isDialogOpen} onClose={handleClose} sx={{ color: '#f7f9ed' }}>
                    <DialogActions>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </DialogActions>
                    <Stack sx={{ padding: { md: '0 20px 20px 20px', xs: '0' } }} >
                        <DialogTitle sx={{ display: 'flex', width: '100%', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography sx={{ fontSize: { md: '30px', xs: '16px' }, fontFamily: 'Comfortaa', fontWeight: 'bold' }}>
                                Welcome To PronouncerPro
                            </Typography>
                            <Typography sx={{ fontSize: { md: '20px', xs: '13px' }, textAlign: 'center', clear: 'both' }}>
                                Don&apos;t have an account?
                                <Button onClick={handleSignUpBtnClick} variant="body1" sx={{ color: '#2196f3', fontFamily: 'Comfortaa', margin: '0px 2px', padding: '0' }}> Sign Up </Button>
                                here
                            </Typography>
                        </DialogTitle>
                        <DialogContent>
                            <Stack sx={{ padding: { md: '10px 30px', xs: '0' } }}>
                                <LoginDialogForm />
                                <Button
                                    onClick={handleForgotPassBtnClick}
                                    color="error"
                                    sx={{ padding: '10px', fontFamily: 'Comfortaa', letterSpacing: '2px' }}
                                >
                                    Forgot Password?
                                </Button>
                            </Stack>
                        </DialogContent>
                    </Stack>
                </Dialog>
            )}
            {openSignUpDialog && (<SignUp signUpOpen={openSignUpDialog} />)}
            {openForgotPassDialog && (<ForgotPassword ForgotOpen={openForgotPassDialog} />)}
        </>
    );
}

Login.propTypes = {
    loginOpen: PropTypes.bool.isRequired,
}

export default Login;