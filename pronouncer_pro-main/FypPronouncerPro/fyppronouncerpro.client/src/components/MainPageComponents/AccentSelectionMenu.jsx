import { Menu, MenuItem, IconButton } from "@mui/material";
import LanguageIcon from '@mui/icons-material/Language';
import { useState } from "react";

const AccentSelectionMenu = () => {
    const [anchorEI, setAnchorEI] = useState(null);
    const open = Boolean(anchorEI);
    const handleClick = (event) => {
        setAnchorEI(event.currentTarget);
    };
    const handleUsAccent = () => {
        localStorage.setItem("accent", 1);
        handleClose();
    }
    const handleUkAccent = () => {
        localStorage.setItem("accent", 5);
        handleClose();
    }
    const handleClose = () => {
        setAnchorEI(null);
    };
    return (
        <>
            <IconButton
                id="AccentButton"
                variant="outlined"
                sx={{ color: "inherit" }}
                onClick={handleClick}
                aria-controls={open ? "AccentMenu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
            >
                <LanguageIcon fontSize="large"/>
            </IconButton>
            <Menu
                id="AccentMenu"
                anchorEl={anchorEI}
                open={open}
                MenuListProps={{
                    "aria-labelledby": "AccentButton",
                }}
                onClose={handleClose}
            >
                <MenuItem onClick={handleUsAccent}>en-US</MenuItem>
                <MenuItem onClick={handleUkAccent}>en-UK</MenuItem>
            </Menu>
        </>
    );
};

export default AccentSelectionMenu;
