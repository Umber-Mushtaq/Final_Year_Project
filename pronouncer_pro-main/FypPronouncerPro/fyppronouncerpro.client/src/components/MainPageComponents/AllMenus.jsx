import { Menu, MenuItem, Button, Tooltip, Zoom} from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MicIcon from '@mui/icons-material/Mic';
import { useState } from "react";
import { PropTypes } from 'prop-types';
import { useEffect } from "react";
import { GetCompletedLessons } from "../../ApiRequests";

export function FilterMyLessonMenu({ onFilterClick }) {

    const [anchorEI, setAnchorEI] = useState(null);
    const open = Boolean(anchorEI);
    const handleFilterClick = (event) => {
        setAnchorEI(event.currentTarget);
    }

    const handleCompletedClick = () => {
        onFilterClick("isCompleted");
        handleFilterClose();
    }

    const handleInProgressClick = () => {
        onFilterClick("inProgress");
        handleFilterClose();
    }

    const handleFilterClose = () => {
        setAnchorEI(null);
    }

    return (
        <>
            <button
                id="filterBtnId"
                onClick={handleFilterClick}
                className="filterButton"
                aria-controls={open ? "filterMenuId" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
            >
                <FilterAltIcon fontSize="large" />
            </button>
            <Menu
                id="filterMenuId"
                open={open}
                onClose={handleFilterClose}
                anchorEl={anchorEI}
            >
                <MenuItem onClick={handleCompletedClick}>Completed</MenuItem>
                <MenuItem onClick={handleInProgressClick}>InProgress</MenuItem>
            </Menu>
        </>
    );
}

FilterMyLessonMenu.propTypes = {
    onFilterClick: PropTypes.func.isRequired,
}

export function LessonMenu(){
    const [anchorEI, setAnchorEI] = useState(null);

    const open = Boolean(anchorEI);

    const handleClick = (event) => {
        setAnchorEI(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEI(null);
    };
    return (
        <>
            <button
                id="AccentButton"
                className="menuButton"
                onClick={handleClick}
                aria-controls={open ? "AccentMenu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
            >
                Lessons<KeyboardArrowDownIcon/>
            </button>
            <Menu
                id="AccentMenu"
                anchorEl={anchorEI}
                open={open}
                MenuListProps={{
                    "aria-labelledby": "AccentButton",
                }}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>
                    <Button sx={{ "&:hover": { backgroundColor: "transparent" }}} color="warning" endIcon={<MenuBookIcon fontSize="large" />}>Paragraph Lessons</Button>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Button sx={{ "&:hover": { backgroundColor: "transparent" }}} color="warning" endIcon={<MicIcon fontSize="large" />}>Audio Lessons</Button>
                </MenuItem>
            </Menu>
        </>
    );
}

export function FilterAllParaLessonMenu({onFilterResult}) {

    const [anchorEI, setAnchorEI] = useState(null);
    const [disableMedium, setDisableMedium] = useState(null);
    const [disableHard, setDisableHard] = useState(null);
    const open = Boolean(anchorEI);
    const handleFilterClick = (event) => {
        setAnchorEI(event.currentTarget);
    }
    const handleEasyClick = () => {
        onFilterResult("easy");
        handleFilterClose();
    }
    const handleMediumClick = () => {
        onFilterResult("medium");
        handleFilterClose();
    }
    const handleHardClick = () => {
        onFilterResult("hard");
        handleFilterClose();
    }
    const handleFilterClose = () => {
        setAnchorEI(null);
    }

    useEffect(() => {
        const fetchData = async () => {
            const mediumDisable = await GetCompletedLessons(localStorage.email, 1);
            setDisableMedium(mediumDisable);
            const hardDisable = await GetCompletedLessons(localStorage.email, 2);
            setDisableHard(hardDisable);
        };

        fetchData();
    }, []);

    return (
        <>
            <Tooltip title="Complete easy lessons to unlock medium and hard" arrow TransitionComponent={Zoom}> 
            <button
                id="filterBtnId"
                onClick={handleFilterClick}
                className="filterButton"
                aria-controls={open ? "filterMenuId" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
            >
                <MenuBookIcon fontSize="large" />
                </button></Tooltip>
            <Menu
                id="filterMenuId"
                open={open}
                onClose={handleFilterClose}
                anchorEl={anchorEI}
            >
                <MenuItem onClick={handleEasyClick}>Easy</MenuItem>
                < MenuItem disabled={disableMedium !== 0} onClick={handleMediumClick}>Medium</MenuItem>
                <MenuItem disabled={disableHard !== 0} onClick={handleHardClick}>Hard</MenuItem>
            </Menu>
        </>
    );
}

FilterAllParaLessonMenu.propTypes = {
    onFilterResult: PropTypes.func.isRequired,
}


export function FilterAllAudioLessonMenu() {

    const [anchorEI, setAnchorEI] = useState(null);
    const open = Boolean(anchorEI);
    const handleFilterClick = (event) => {
        setAnchorEI(event.currentTarget);
    }
    const handleFilterClose = () => {
        setAnchorEI(null);
    }

    return (
        <>
            <button
                id="filterBtnId"
                onClick={handleFilterClick}
                className="filterButton"
                aria-controls={open ? "filterMenuId" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
            >
                <MicIcon fontSize="large" />
            </button>
            <Menu
                id="filterMenuId"
                open={open}
                onClose={handleFilterClose}
                anchorEl={anchorEI}
            >
                <MenuItem onClick={handleFilterClose}>Easy</MenuItem>
                <MenuItem onClick={handleFilterClose}>Medium</MenuItem>
                <MenuItem onClick={handleFilterClose}>Hard</MenuItem>
            </Menu>
        </>
    );
}