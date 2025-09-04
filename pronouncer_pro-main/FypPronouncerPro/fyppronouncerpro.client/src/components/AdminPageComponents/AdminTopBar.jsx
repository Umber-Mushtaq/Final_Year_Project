import {
    AppBar,
    Toolbar,
    Stack,
    IconButton,
} from "@mui/material";
import { Link } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PersonIcon from '@mui/icons-material/Person';
/*import Logo from '../_1FirstPageComponents/Logo';*/
function AdminTopBar() {
    return (
        <AppBar position="sticky">
            <Toolbar sx={{ display: 'flex', flexDirection: {md:'row', xs:'column'}, alignItems: 'center', justifyContent:'space-between' }}>
                <Stack sx={{ display: 'flex', flexDirection: "row", alignItems:'center', justifyContent:'center' }}>
                    <div className="roundStyle">
                        <MenuBookIcon sx={{ color: "#ffffff", mx: 2, fontSize:'50px' }} />
                    </div>
                    <Link to=".">
                        <IconButton>
                            <AddCircleIcon sx={{ color: "#ffffff" }} />
                        </IconButton>
                    </Link>
                    <Link to="edit_lesson">
                        <IconButton>
                            <EditIcon sx={{ color: "#ffffff" }} />
                        </IconButton>
                    </Link>
                    <Link to="delete_lesson">
                        <IconButton>
                            <DeleteIcon sx={{ color: "#ffffff" }} />
                        </IconButton>
                    </Link>
                </Stack>
               {/* <Logo />*/}
                <Stack sx={{ display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: 'center' }}>
                    <div className="roundStyle">
                        <PersonIcon sx={{ color: "#ffffff", mx: 2, fontSize: '50px' }} />
                    </div>
                    <Link to="add_user">
                        <IconButton>
                            <AddCircleIcon sx={{ color: "#ffffff" }} />
                        </IconButton>
                    </Link>
                    <Link to="edit_user">
                        <IconButton>
                            <EditIcon sx={{ color: "#ffffff" }} />
                        </IconButton>
                    </Link>
                    <Link to="delete_user">
                        <IconButton>
                            <DeleteIcon sx={{ color: "#ffffff" }} />
                        </IconButton>
                    </Link>
                </Stack>
            </Toolbar>
        </AppBar>
    );
}
export default AdminTopBar;