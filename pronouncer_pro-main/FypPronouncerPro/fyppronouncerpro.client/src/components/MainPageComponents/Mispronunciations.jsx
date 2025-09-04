import { Paper, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { GetMispronunciations } from '../../ApiRequests';
import ShowMispronunciations from '../../mispronunciations/ShowMispronunciationsTable';
function Mispronunciations({ title, onMispronunciations }) {
    const [mispronunciations, setMispronunciations] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await GetMispronunciations(localStorage.email, title);
                setMispronunciations(response);
                onMispronunciations(response[0].m_What);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [title]);

    return (
        <Paper sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
            <Typography
                component="h1"
                variant="h5"
                sx={{
                    textAlign: 'left',
                    fontFamily: 'comfortaa',
                    color: "#f02e4e ",
                }}
            >
                Mispronunciations
            </Typography>
            {mispronunciations && mispronunciations.length > 0 && (
                <ShowMispronunciations what={mispronunciations[0].m_What} how={mispronunciations[0].m_How} title={title} />
            )}
        </Paper>
    );
}
Mispronunciations.propTypes = {
    title: PropTypes.string.isRequired,
    onMispronunciations: PropTypes.func.isRequired,
}
export default Mispronunciations;