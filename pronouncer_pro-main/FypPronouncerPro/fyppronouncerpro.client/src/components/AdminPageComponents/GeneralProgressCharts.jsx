import { Paper, Typography } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import { GetLessonSummary } from '../../ApiRequests';
import { PropTypes } from 'prop-types';

Chart.register(ArcElement, Legend);

const options = {
    plugins: {
        legend: {
            position: 'bottom'
        }
    },
    responsive: true, // Make the chart responsive
    maintainAspectRatio: true, // Maintain a specific aspect ratio
    aspectRatio: 1, // Fixed aspect ratio (1:1 for a square chart)
};

export function GeneralEasyLessonsProgressChart({ email }) {
    const [lessonData, setLessonData] = useState(null);

    useEffect(() => {
        const fetchLessonData = () => {
            GetLessonSummary(email, 1)
                .then(response => {
                    setLessonData(response);
                })
                .catch(error => {
                    console.error('Error fetching lesson data:', error);
                });
        };

        fetchLessonData();
    }, []);
    const transformLessonData = (lessonData) => {
        if (!lessonData) return null;

        return {
            labels: Object.keys(lessonData),
            datasets: [{
                label: 'Lesson Progress',
                data: Object.values(lessonData),
                backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'], // Add more colors if needed
                borderWidth: 1,
            }]
        };
    };

    return (
        <Paper sx={{ padding: "20px", marginBottom: { md: '0px', xs: '30px' }, width: '200px', height: '250px' }}>
            <div>
                <Typography variant="body1" sx={{ marginBottom: '20px' }}>Easy Lessons</Typography>
                {lessonData && <Doughnut data={transformLessonData(lessonData)} options={options} />}
            </div>
        </Paper>
    );
}
GeneralEasyLessonsProgressChart.propTypes = {
    email: PropTypes.string.isRequired,
}

export function GeneralMediumLessonsProgressChart({ email }) {
    const [lessonData, setLessonData] = useState(null);

    useEffect(() => {
        const fetchLessonData = () => {
            GetLessonSummary(email, 2)
                .then(response => {
                    setLessonData(response);
                })
                .catch(error => {
                    console.error('Error fetching lesson data:', error);
                });
        };

        fetchLessonData();
    }, []);
    const transformLessonData = (lessonData) => {
        if (!lessonData) return null;

        return {
            labels: Object.keys(lessonData),
            datasets: [{
                label: 'Lesson Progress',
                data: Object.values(lessonData),
                backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'], // Add more colors if needed
                borderWidth: 1,
            }]
        };
    };

    return (
        <Paper sx={{ padding: "20px", margin: { md: '0px 30px 0px 30px', xs: '30px' }, width: '200px', height: '250px' }}>
            <div>
                <Typography variant="body1" sx={{ marginBottom: '20px' }}>Medium Lessons</Typography>
                {lessonData && <Doughnut data={transformLessonData(lessonData)} options={options} />}
            </div>
        </Paper>
    );
}


GeneralMediumLessonsProgressChart.propTypes = {
    email: PropTypes.string.isRequired,
}
export function GeneralHardLessonsProgressChart({ email }) {
    const [lessonData, setLessonData] = useState(null);

    useEffect(() => {
        const fetchLessonData = () => {
            GetLessonSummary(email, 3)
                .then(response => {
                    setLessonData(response);
                })
                .catch(error => {
                    console.error('Error fetching lesson data:', error);
                });
        };

        fetchLessonData();
    }, []);
    const transformLessonData = (lessonData) => {
        if (!lessonData) return null;

        return {
            labels: Object.keys(lessonData),
            datasets: [{
                label: 'Lesson Progress',
                data: Object.values(lessonData),
                backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'], // Add more colors if needed
                borderWidth: 1,
            }]
        };
    };

    return (
        <Paper sx={{ padding: "20px", marginBottom: { md: '0px', xs: '30px' }, width: '200px', height: '250px' }}>
            <div>
                <Typography variant="body1" sx={{ marginBottom: '20px' }}>Hard Lessons</Typography>
                {lessonData && <Doughnut data={transformLessonData(lessonData)} options={options} />}
            </div>
        </Paper>
    );
}

GeneralHardLessonsProgressChart.propTypes = {
    email: PropTypes.string.isRequired,
}