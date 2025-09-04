import { Paper, Typography } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import { GetLessonSummary } from '../../ApiRequests';

Chart.register(ArcElement, Legend);

const options = {
    plugins: {
        legend: {
            position: 'bottom' // Position the legend at the bottom
        }
    }
};

export function EasyLessonsProgressChart() {
    const [lessonData, setLessonData] = useState(null);

    useEffect(() => {
        const fetchLessonData = () => {
            GetLessonSummary(localStorage.email, 1)
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
        <Paper sx={{ padding: "20px", marginBottom: { md: '0px', xs: '30px' } }}>
            <div>
                <Typography variant="h6" sx={{ marginBottom: '20px' }}>Easy Lessons Progress Chart</Typography>
                {lessonData && <Doughnut data={transformLessonData(lessonData)} options={options} />}
            </div>
        </Paper>
    );
}
export function MediumLessonsProgressChart() {
    const [lessonData, setLessonData] = useState(null);

    useEffect(() => {
        const fetchLessonData = () => {
            GetLessonSummary(localStorage.email, 2)
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
        <Paper sx={{ padding: "20px", marginBottom: { md: '0px', xs: '30px' } }}>
            <div>
                <Typography variant="h6" sx={{ marginBottom: '20px' }}>Medium Lessons Progress Chart</Typography>
                {lessonData && <Doughnut data={transformLessonData(lessonData)} options={options} />}
            </div>
        </Paper>
    );
}
export function HardLessonsProgressChart() {
    const [lessonData, setLessonData] = useState(null);

    useEffect(() => {
        const fetchLessonData = () => {
            GetLessonSummary(localStorage.email, 3)
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
        <Paper sx={{ padding: "20px", marginBottom: { md: '0px', xs: '30px' } }}>
            <div>
                <Typography variant="h6" sx={{ marginBottom: '20px' }}>Hard Lessons Progress Chart</Typography>
                {lessonData && <Doughnut data={transformLessonData(lessonData)} options={options} />}
            </div>
        </Paper>
    );
}

