import { Menu, MenuItem} from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useState } from "react";
import { PropTypes } from 'prop-types';
function FilterLessons({ onFilterClick }) {

    const [anchorEI, setAnchorEI] = useState(null);
    const open = Boolean(anchorEI);
    const handleFilterClick = (event) => {
        setAnchorEI(event.currentTarget);
    }

    const handleEasyClick = () => {
        onFilterClick("easy");
        handleFilterClose();
    }

    const handleMediumClick = () => {
        onFilterClick("medium");
        handleFilterClose();
    }

    const handleHardCLick = () => {
        onFilterClick("hard");
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
                style={{ background: 'transparent', border: 'none', color: '#f02e4e', cursor:'pointer' }}
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
                <MenuItem onClick={handleEasyClick}>Easy</MenuItem>
                <MenuItem onClick={handleMediumClick}>Medium</MenuItem>
                <MenuItem onClick={handleHardCLick}>Hard</MenuItem>
            </Menu>
        </>
    );
}

FilterLessons.propTypes = {
    onFilterClick: PropTypes.func.isRequired,
}

export default FilterLessons;