import { useState } from 'react';
import { Typography, Stack,Container, InputAdornment, TextField, Dialog, DialogContent, DialogActions, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DeleteParaLesson } from '../../ApiRequests';

function DeleteLesson() {
    const [lessonTitle, setLessonTitle] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleOpenDialog = () => {
        if (lessonTitle.trim() !== '') {
            setDialogOpen(true);
        }
    };

    const handleDeleteLesson = () => {
        DeleteParaLesson(lessonTitle);
        setDialogOpen(false);
        setLessonTitle('');
    };

    return (
        <Container>
            <Stack sx={{ display: 'flex', flexDirection: 'column', margin:"10px 0px"}}>
                <Typography variant="h4" sx={{marginBottom:"10px"} }>Delete Lesson</Typography>
                <TextField
                    label="Search with title.."
                    type="text"
                    name="email"
                    value={lessonTitle}
                    onChange={(e) => setLessonTitle(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleOpenDialog();
                        }
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <DeleteIcon onClick={handleOpenDialog} style={{ cursor: 'pointer' }} />
                            </InputAdornment>
                        ),
                    }}
                />
            </Stack>
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogContent>
                    <Typography variant="body1">Are you sure you want to delete the lesson?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteLesson} color="error">Delete</Button>
                    <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default DeleteLesson;
