import { Menu, MenuItem, IconButton } from "@mui/material";
import SpeedIcon from '@mui/icons-material/Speed';
import { useState } from "react";
import { PropTypes } from 'prop-types';
const PlaybackSpeedSelectionMenu = ({onSpeedSelection }) => {
    const [anchorEI, setAnchorEI] = useState(null);
    const open = Boolean(anchorEI);
    const handleClick = (event) => {
        setAnchorEI(event.currentTarget);
    };
    const handleNormalSpeed = () => {
        onSpeedSelection(1);
        handleClose();
    }
    const handleFastSpeed = () => {
        onSpeedSelection(1.5);
        handleClose();
    }
    const handleFasterSpeed = () => {
        onSpeedSelection(1.75);
        handleClose();
    }
    const handleFastestSpeed = () => {
        onSpeedSelection(2);
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
                sx={{ mr: 2, color: "#f02e4e" }}
                onClick={handleClick}
                aria-controls={open ? "AccentMenu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
            >
                <SpeedIcon fontSize="large"/>
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
                <MenuItem onClick={handleNormalSpeed}>1x</MenuItem>
                <MenuItem onClick={handleFastSpeed}>1.5x</MenuItem>
                <MenuItem onClick={handleFasterSpeed}>1.75x</MenuItem>
                <MenuItem onClick={handleFastestSpeed}>2x</MenuItem>
            </Menu>
        </>
    );
};
PlaybackSpeedSelectionMenu.propTypes = {
    onSpeedSelection: PropTypes.func.isRequired,
}



export default PlaybackSpeedSelectionMenu;
