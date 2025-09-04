import HearingIcon from '@mui/icons-material/Hearing';
import MicIcon from '@mui/icons-material/Mic';
import BugReportIcon from '@mui/icons-material/BugReport';
import { Typography, Tooltip, Zoom, Box, Stepper, StepLabel, Step } from '@mui/material';

function UserGuide() {
    return (
        <Box sx={{ width: '100%', display: { md:'block', xs:'none' } }}>
            <Stepper activeStep={3} alternativeLabel>
                <Tooltip title="Lissen" arrow TransitionComponent={Zoom}>
                    <Step >
                        <StepLabel icon={<HearingIcon sx={{ fontSize: "30px", color: "#f02e4e" }} />}>
                            <Typography variant="h6">Step 1</Typography>
                        </StepLabel>
                    </Step>
                </Tooltip>
                <Tooltip title="Speak" arrow TransitionComponent={Zoom}>
                    <Step>
                        <StepLabel icon={<MicIcon sx={{ fontSize: "30px", color: "#f02e4e" }} />}>
                            <Typography variant="h6">Step 2</Typography>
                        </StepLabel>
                    </Step>
                </Tooltip><Tooltip title="Test" arrow TransitionComponent={Zoom}>
                    <Step>
                        <StepLabel icon={<BugReportIcon sx={{ fontSize: "30px", color: "#f02e4e" }} />}>
                            <Typography variant="h6">Step 3</Typography>
                        </StepLabel>
                    </Step>
                </Tooltip>
                
                
            </Stepper>
        </Box>
    );
}

export default UserGuide;
