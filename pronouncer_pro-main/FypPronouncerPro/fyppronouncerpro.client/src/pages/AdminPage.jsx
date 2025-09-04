import { Outlet } from 'react-router-dom';
import { Stack, Typography } from '@mui/material';
import logoImage from '../assets/logo.png';
import LessonManagement from '../components/AdminPageComponents/LessonManagement';
import MostMispronunciations from '../components/AdminPageComponents/MispronunciationManagemnet';
import AllUsers from '../components/AdminPageComponents/UserManagement';
import AdminProfile from '../components/AdminPageComponents/AdminProfile';

function AdminPage() {
    return (
        <>
            <Stack sx={{ display: 'flex', flexDirection: { md: 'row', xs: 'column' } }}>
                <Stack sx={{ backgroundColor: "#82d1f6", padding: '10px 20px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
                    <img width="50%" style={{ cursor: 'pointer', alignSelf: 'center' }} src={logoImage} alt="image" />
                    <LessonManagement />
                    <MostMispronunciations />
                    <AllUsers />
                </Stack>
                <Stack sx={{ width: '100%' }}>
                    <Stack sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: "20px 20px", borderBottom: '1px solid #ccc' }}>
                        <Typography
                            component="h1"
                            variant="h4"
                            sx={{
                                fontFamily: 'comfortaa',
                                letterSpacing: { md: '3px', xs: "1px" },
                            }}
                        >
                            Admin Dashboard
                        </Typography>
                        <AdminProfile />
                    </Stack>
                    <Stack>
                        <Outlet />
                    </Stack>
                </Stack>
            </Stack>
        </>
    );
}

export default AdminPage;
