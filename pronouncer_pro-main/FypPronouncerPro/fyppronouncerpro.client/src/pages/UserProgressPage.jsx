import { EasyLessonsProgressChart, HardLessonsProgressChart, MediumLessonsProgressChart } from "../components/MainPageComponents/ProgressCharts";
import { Stack } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Link } from 'react-router-dom';
function UserProgressPage() {
    return (
        <>
            <Link to="/main_page">
                <KeyboardBackspaceIcon fontSize="large" sx={{ color: "#f02e4e" }} />
            </Link>
            <Stack sx={{ height: { md: "70vh", xs: '100%' }, display: "flex", padding: { md: "0px", xs: '30px' }, flexDirection: { md: 'row', xs: 'column' }, alignItems: "center", justifyContent: 'space-around' }}>
                <EasyLessonsProgressChart />
                <MediumLessonsProgressChart />
                <HardLessonsProgressChart />
            </Stack>
        </>
    );
}

export default UserProgressPage

