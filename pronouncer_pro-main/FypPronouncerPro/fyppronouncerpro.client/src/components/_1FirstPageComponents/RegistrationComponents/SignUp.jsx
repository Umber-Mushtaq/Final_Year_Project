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
import { SignUpUserRequest } from '../../../ApiRequests';
import { useNavigate } from 'react-router-dom';
function SignUp({ signUpOpen }) {
    const navigate = useNavigate();
    const [isDialogOpen, setIsDialogOpen] = useState(signUpOpen);
    const handleClose = () => {
        setIsDialogOpen(false);
    }
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: '',
    });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await SignUpUserRequest(formData);
        localStorage.setItem("email", formData.email);
        if (success) {
            navigate('/main_page');
        }
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
                        <DialogTitle sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
                            <Typography sx={{ fontSize: { md: '30px', xs: '18px' }, fontFamily: 'Comfortaa', fontWeight: 'bold' }}>
                                Create New Account
                            </Typography>
                        </DialogTitle>
                        <DialogContent>
                            <Stack sx={{ padding: { md: '10px 30px', xs: '0' } }}>
                                <form onSubmit={handleSubmit}>
                                    <TextField
                                        sx={{ mb: 2, width: "100%", p: 0 }}
                                        label="Full Name"
                                        type="text"
                                        name="fullname"
                                        value={formData.fullname}
                                        onChange={handleChange}
                                        required
                                    />
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
                                        label="Password"
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
                                        value="Login"
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

SignUp.propTypes = {
    signUpOpen: PropTypes.bool.isRequired,
}

export default SignUp;