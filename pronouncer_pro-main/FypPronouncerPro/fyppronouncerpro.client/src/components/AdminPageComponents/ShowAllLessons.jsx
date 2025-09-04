import { useEffect, useState } from "react";
import { GetAllParaLessonsRequest } from "../../ApiRequests";
import { Typography, Box, Rating, Grid, Card, CardContent, Container } from '@mui/material';
import Brightness1Icon from '@mui/icons-material/Brightness1';
import { PropTypes } from 'prop-types';
import FilterLessons from "./FilterLessons";

function ShowAllLessons() {
    const [lessons, setLessons] = useState([]);
    const [filterOption, setFilterOption] = useState(null);

    const handleFilterClick = (result) => {
        setFilterOption(result);
    }

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const response = await GetAllParaLessonsRequest();
                setLessons(response);
            } catch (error) {
                console.log("Error fetching lessons:", error);
            }
        };

        fetchLessons();
    }, []);

    let filteredData = lessons;
    if (filterOption === "easy") {
        filteredData = lessons.filter(lesson => lesson.lessonLevel === 1);
    } else if (filterOption === "medium") {
        filteredData = lessons.filter(lesson => lesson.lessonLevel === 2);
    } else if (filterOption === "hard") {
        filteredData = lessons.filter(lesson => lesson.lessonLevel === 3);
    }

    return (
        <Container sx={{margin:"10px 0px"} }>
            <Box sx={{ width: "100%", display: 'flex', flexDirection: 'row', alignItems: "center", justifyContent: "space-between", padding: "0px 30px" }}>
                <Typography variant="h4">All Lessons</Typography>
                <FilterLessons onFilterClick={handleFilterClick} />
            </Box>
            <Grid container spacing={2} sx={{ padding: '20px' }}>
                {filteredData.map((lesson, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                        <Card style={{ padding: "20px", border: "1px solid #dddddd" }}>
                            <CardContent>
                                <Typography variant="h6" sx={{ color: '#565656', marginBottom: '10px' }}>{index + 1}. {lesson.lessonTitle}</Typography>
                                <Typography variant="body1" sx={{ color: '#444444', marginBottom: '10px' }}>{lesson.lessonContent}</Typography>
                                <Typography variant="body2" sx={{ color: '#666666' }}>{lesson.focusWords.join(", ")}</Typography>
                                {lesson.lessonLevel === 1 && <Rating sx={{ color: "#66BB6A" }} icon={<Brightness1Icon />} defaultValue={1} max={1} readOnly />}
                                {lesson.lessonLevel === 2 && <Rating sx={{ color: "#FFA726" }} icon={<Brightness1Icon />} defaultValue={2} max={2} readOnly />}
                                {lesson.lessonLevel === 3 && <Rating sx={{ color: "#EF5350" }} icon={<Brightness1Icon />} defaultValue={3} max={3} readOnly />}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

ShowAllLessons.propTypes = {
    filter: PropTypes.string.isRequired,
}

export default ShowAllLessons;
