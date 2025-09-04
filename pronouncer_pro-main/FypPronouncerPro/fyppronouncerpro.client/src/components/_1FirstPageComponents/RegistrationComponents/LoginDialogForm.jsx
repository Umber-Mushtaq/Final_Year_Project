import { TextField } from '@mui/material';
import { useState } from 'react';
import { SignInUserRequest } from '../../../ApiRequests';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function LoginDialogForm() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        SignInUserRequest(formData)
            .then(responseData => {
                if (responseData.startsWith('Welcome')) {
                    localStorage.setItem("email", formData.email);
                    localStorage.setItem("accent", 2);
                    navigate('/main_page');
                    toast.success("Welcome to PronouncerPro!", {
                        position: "bottom-right"
                    });
                }
            })
            .catch(error => {
                console.log("catch",error);
            });
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
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
        </>
    );
}

export default LoginDialogForm;
