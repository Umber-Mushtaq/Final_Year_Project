import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Typography,
    IconButton,
    Stack,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { ForgotPasswordRequest } from '../../../ApiRequests';
function ForgotPassword({ ForgotOpen }) {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const result = await ForgotPasswordRequest(formData);
        console.log(result);
    };


    const [isDialogOpen, setIsDialogOpen] = useState(ForgotOpen);
    const handleClose = () => {
        setIsDialogOpen(false);
    }

    return (
        <>
            {isDialogOpen && (
                <Dialog open={isDialogOpen} onClose={handleClose}>
                    <DialogActions>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </DialogActions>
                    <Stack sx={{ padding: { md: '0 20px 20px 20px', xs: '0' } }} >
                        <DialogTitle sx={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems:"center", flexDirection:'column' }}>
                            <Typography sx={{ fontSize: { md: '30px', xs: '18px' }, fontFamily: 'Comfortaa', fontWeight: 'bold' }}>
                                Forgot Password?
                            </Typography>
                            <Typography sx={{ fontFamily: 'Comfortaa', paddingTop:'10px'}}>
                                Enter your email and New password.
                            </Typography>
                        </DialogTitle>
                        <DialogContent>
                            <Stack sx={{ padding: { md: '10px 30px', xs: '0' } }}>
                                <form onSubmit={handleFormSubmit}>
                                    <TextField
                                        sx={{ mb: 2, width: "100%", p: 0 }}
                                        label="Email"
                                        type="text"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                    <TextField
                                        sx={{ mb: 2, width: "100%", p: 0 }}
                                        label="New Password"
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <input
                                        style={{
                                            background: '#2196f3',
                                            padding: '10px',
                                            width: '100%',
                                            border: 'none',
                                            color: '#ffffff',
                                            letterSpacing: '2px',
                                            fontSize: '18px',
                                            borderRadius: '5px'
                                        }}
                                        type="submit"
                                        value="Send"
                                        required
                                    />
                                </form>
                            </Stack>
                        </DialogContent>
                    </Stack>
                </Dialog>

            )}

        </>
    );
}

ForgotPassword.propTypes = {
    ForgotOpen: PropTypes.bool.isRequired,
}

export default ForgotPassword;