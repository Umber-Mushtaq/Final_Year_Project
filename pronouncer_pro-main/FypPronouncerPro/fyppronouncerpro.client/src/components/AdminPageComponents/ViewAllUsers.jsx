import { useEffect, useState } from 'react';
import { GetAllUsersRequest } from '../../ApiRequests';
import { Avatar, Box, Typography, IconButton } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { GeneralEasyLessonsProgressChart, GeneralHardLessonsProgressChart, GeneralMediumLessonsProgressChart } from './GeneralProgressCharts';

function ViewAllUsers() {
    const [users, setUsers] = useState([]);
    const [expandedUserIndex, setExpandedUserIndex] = useState(null);

    const getInitials = (fullName) => {
        const words = fullName.split(' ');
        let initials = words[0].charAt(0).toUpperCase();
        if (words.length > 1) {
            initials += words[1].charAt(0).toUpperCase();
        }
        return initials;
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await GetAllUsersRequest();
                setUsers(response);
            } catch (error) {
                console.log("Error fetching lessons:", error);
            }
        };

        fetchUsers();
    }, []);

    const toggleExpand = (index) => {
        if (expandedUserIndex === index) {
            setExpandedUserIndex(null);
        } else {
            setExpandedUserIndex(index);
        }
    };

    return (
        <>
            {users.map((user, index) => (
                <Box key={index} sx={{ display: 'flex', flexDirection: 'column', padding: "20px 50px", borderBottom:'1px solid #ccc' }}>
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{  display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                            <Avatar sx={{ bgcolor: '#38a9de' }}>{getInitials(user.fullName)}</Avatar>
                            <Box>
                                <Typography variant="body1" style={{ marginLeft: '10px', color: "red" }}>{user.fullName}</Typography>
                                <Typography variant="body2" style={{ marginLeft: '10px' }}>{user.email}</Typography>
                            </Box>
                        </Box>
                        <IconButton onClick={() => toggleExpand(index)}>
                            {expandedUserIndex === index ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                    </Box>
                    {expandedUserIndex === index && (
                        <Box sx={{ display: 'flex', padding: "5px 20px", overflow: "hidden" }}>
                            <GeneralEasyLessonsProgressChart email={user.email} />
                            <GeneralMediumLessonsProgressChart email={user.email} />
                            <GeneralHardLessonsProgressChart email={user.email} />
                        </Box>
                    )}
                </Box>
            ))}
        </>
    );
}

export default ViewAllUsers;
