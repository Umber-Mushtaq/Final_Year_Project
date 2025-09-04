import { Typography, Stack } from '@mui/material';
import { FilterMyLessonMenu } from './AllMenus';
import { useEffect, useState } from 'react';
import MyLessonsTable from './MyLessonsTable';
import { GetMyLessons } from '../../ApiRequests';
function MyLessons() {
    const [lessonData, setLessonData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState(null);

    const handleFilterClick = (result) => {
        setFilter(result);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data, loading, error } = await GetMyLessons(localStorage.email);
                setLessonData(data);
                setLoading(loading);
                setError(error);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    if (error) {
        return <Typography>Error: {error}</Typography>;
    }

    let filteredData = lessonData;
    if (filter === 'inProgress') {
        filteredData = lessonData.filter(lesson => lesson.isComplited === false);
    } else if (filter === 'isCompleted') {
        filteredData = lessonData.filter(lesson => lesson.isComplited === true);
    }



    return (
        <>
            <Stack sx={{ flexDirection: 'row', alignItems: 'center', padding: '20px 0px 0px 20px' }}>
                <Typography variant="h4" sx={{ color: '#000000' }}>My Lessons</Typography>
                <FilterMyLessonMenu onFilterClick={handleFilterClick} />
            </Stack>
            <Stack sx={{ padding: '20px' }}>
                <MyLessonsTable data={filteredData} />
            </Stack>
        </>
    );
}
export default MyLessons;
