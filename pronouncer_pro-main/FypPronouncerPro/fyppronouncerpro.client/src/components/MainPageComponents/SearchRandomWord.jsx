import { useState } from 'react';
import { IconButton, InputBase } from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { PropTypes } from 'prop-types';

const Search = styled("div")(({ theme }) => ({
    display: "flex",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    backdropFilter: "blur(20px)",
    color: "black",
    margin: "15px",
    width: { md: "100%", xs: "80%" },
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
    },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "#474747",
    width: "100%",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        transition: theme.transitions.create("width"),
        [theme.breakpoints.up("sm")]: {
            width: "30ch",
            "&:focus": {
                width: "50ch",
            },
        },
    },
}));

function SearchRandomWord({ onSearch }) {
    const [searchText, setSearchText] = useState("");

    const handleSearchInputChange = (event) => {
        const inputValue = event.target.value.trim();
        setSearchText(inputValue);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            onSearch(searchText);
        }
    };

    return (
        <Search>
            <IconButton sx={{ color: "#474747" }} onClick={() => onSearch(searchText)}>
                <SearchIcon />
            </IconButton>
            <StyledInputBase
                placeholder="Search Random Word"
                inputProps={{
                    "aria-label": "search",
                    value: searchText,
                    onChange: handleSearchInputChange,
                    onKeyDown: handleKeyPress
                }}
            />
        </Search>
    );
}
SearchRandomWord.propTypes = {
    onSearch: PropTypes.func.isRequired,
}

export default SearchRandomWord;
