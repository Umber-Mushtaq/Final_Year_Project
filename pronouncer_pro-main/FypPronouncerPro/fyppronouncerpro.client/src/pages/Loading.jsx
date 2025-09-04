import {
    Dialog,
    DialogContent,
    CircularProgress,
} from "@mui/material";

function Loading() {
    return (
        <Dialog open={true} sx={{backgroundColor:'transparent'}}>
            <DialogContent>
                <CircularProgress/>
            </DialogContent>
        </Dialog>
    );
}

export default Loading;
