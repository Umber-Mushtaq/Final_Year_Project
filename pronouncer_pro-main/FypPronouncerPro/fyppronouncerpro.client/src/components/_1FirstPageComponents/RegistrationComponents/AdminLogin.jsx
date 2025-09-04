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
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { AdminSignInRequest } from "../../../ApiRequests";
function AdminLogin({ AdminLoginOpen }) {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        adminEmail: '',
        adminPassword: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        AdminSignInRequest(formData)
            .then(responseData => {
                if (responseData.startsWith('Welcome')) {
                    localStorage.setItem("adminEmail", formData.adminEmail);
                    navigate('/admin');
                    toast.success("Welcome to PronouncerPro!", {
                        position: "bottom-right"
                    });
                }
            })
            .catch(error => {
                console.log("catch", error);
            });
    }

    const [isDialogOpen, setIsDialogOpen] = useState(AdminLoginOpen);
    const handleClose = () => {
        setIsDialogOpen(false);
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
                            <Typography sx={{ fontSize: { md: '30px', xs: '18px' }, fontFamily: 'Comfortaa', fontWeight: 'bold' }}>
                                Welcome To PronouncerPro
                            </Typography>
                        </DialogTitle>
                        <DialogContent>
                            <Stack sx={{ padding: { md: '10px 30px', xs: '0' } }}>
                                <form onSubmit={handleSubmit}>
                                    <TextField
                                        sx={{ mb: 2, width: "100%", p: 0 }}
                                        label="Admin Email"
                                        type="text"
                                        name="adminEmail"
                                        value={formData.adminEmail}
                                        onChange={handleChange}
                                        required
                                    />
                                    <TextField
                                        sx={{ mb: 2, width: "100%", p: 0 }}
                                        label="Admin Password"
                                        type="password"
                                        name="adminPassword"
                                        value={formData.adminPassword}
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

AdminLogin.propTypes = {
    AdminLoginOpen: PropTypes.bool.isRequired,
}

export default AdminLogin;