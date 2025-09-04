import { Typography, Stack } from '@mui/material';
import { FilterAllParaLessonMenu } from './AllMenus';
import AllLessonsCard from './AllLessonsCard';
import { GetAllLessons } from '../../ApiRequests';
import { useState } from 'react';

function AllLessons() {
    const [filter, setFilter] = useState("easy");
    const { data, loading, error } = GetAllLessons(localStorage.email);
    console.log(data);

    const handleFilterResult = (result) => {
        setFilter(result);
    }

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    if (error) {
        return <Typography>Error: {error}</Typography>;
    }

    let filteredData = data;
    if (filter === "easy") {
        filteredData = data.filter(lesson => lesson.lessonLevel === 1);
    } else if (filter === "medium") {
        filteredData = data.filter(lesson => lesson.lessonLevel === 2);
    } else if (filter === "hard") {
        filteredData = data.filter(lesson => lesson.lessonLevel === 3);
    }
    console.log(filteredData);

    return (
        <>
            <Stack sx={{ flexDirection: 'row', alignItems: 'center', padding: '20px 0px 0px 20px' }}>
                <Typography variant="h4" sx={{ color: '#000000' }}>All Lessons</Typography>
                <FilterAllParaLessonMenu onFilterResult={handleFilterResult} />
            </Stack>

            <Stack sx={{ padding: '20px' }}>
                <AllLessonsCard lessons={filteredData} />
            </Stack>
        </>
    );
}

export default AllLessons;
