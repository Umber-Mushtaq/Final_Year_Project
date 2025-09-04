import { useState } from 'react';
import SearchRandomWord from './SearchRandomWord';
import WordDialog from './WordDialog';

function RandomWordPronunciation() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [searchText, setSearchText] = useState("");

    const handleClose = () => {
        setIsDialogOpen(false);
    };

    const handleSearch = (searchText) => {
        if (searchText.trim() !== "") {
            setIsDialogOpen(true);
            setSearchText(searchText.trim());
        }
    };

    return (
        <>
            <SearchRandomWord onSearch={handleSearch} />
            <WordDialog open={isDialogOpen} onClose={handleClose} word={searchText} />
        </>
    );
}

export default RandomWordPronunciation;
