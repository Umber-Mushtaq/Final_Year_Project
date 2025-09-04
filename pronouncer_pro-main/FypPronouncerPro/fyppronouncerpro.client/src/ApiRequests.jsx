import axios from 'axios';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const accountBaseURL = 'https://localhost:7077/AccountsManagement';

export const SignUpUserRequest = async (user) => {
    try {
        const response = await axios.post(`${accountBaseURL}/signup`, user);
        toast.success(response.data, { position: 'bottom-right' });
        return true;
    } catch (error) {
        if (error.response) {
            toast.error(error.response.data, { position: 'bottom-right' });
        }
        return false; 
    }
};

export const SignInUserRequest = async (user) => {
    try {
        const response = await axios.post(`${accountBaseURL}/signin`, user);
        return response.data;
    } catch (error) {
        if (error.response) {
            toast.error(error.response.data, { position: 'bottom-right' });
            return error.response.data;
        }
    }
}

export const AdminSignInRequest = async (admin) => {
    try {
        const response = await axios.post(`${accountBaseURL}/adminSignIn`, admin);
        return response.data;
    } catch (error) {
        if (error.response) {
            toast.error(error.response.data, { position: 'bottom-right' });
            return error.response.data;
        }
    }
}

export const ForgotPasswordRequest = async (user) => {
    try {
        const response = await axios.post(`${accountBaseURL}/forgotpassword`, user);
        toast.success(response.data, { position: 'bottom-right' });
        return response.data;
    } catch (error) {
        if (error.response) {
            toast.error(error.response.data, { position: 'bottom-right' });
        }
    }
}

export const GetAllUsersRequest = async() => {
    try {
        const response = await axios.get(`${accountBaseURL}/getAllUsers`);
        console.log('all users', response.data);
        return response.data;
    } catch (error) {
        if (error.response) {
            toast.error(error.response.data, { position: 'bottom-right' });
        }
    }
}


const lessonBaseURL = 'https://localhost:7077/ParaLessonManagement';

export const CreateLesson = async (request) => {
    try {
        const response = await axios.post(`${lessonBaseURL}/createLesson`, request);
        toast.success(response.data, { position: 'bottom-right' });
    } catch (error) {
        if (error.response) {
            toast.error(error.response.data, { position: 'bottom-right' });
        }
    }
}

export const SaveMispronunciations = async (request) => {
    try {
        const response = await axios.post(`${lessonBaseURL}/saveMispronunciations`, request);
        console.log(response.data);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.log(error.response.data);
        }
    }
}

export const SaveJoinedLesson = async (request) => {
    try {
        const response = await axios.post(`${lessonBaseURL}/saveJoinedLesson`, request);
        console.log(response.data);
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
    }
}

export const SaveWordInVocabulary = async (request) => {
    try {
        const response = await axios.post(`${lessonBaseURL}/addWordInVocabulary`, request);
        toast.success(response.data, { position: 'bottom-right' });
    } catch (error) {
        toast.error(error.response.data, { position: 'bottom-right' });
    }
}

export const GetAllParaLessonsRequest = async () => {
    try {
        const response = await axios.get(`${lessonBaseURL}/getAllLessons`);
        return (response.data);
    }
    catch (error) {
        if (error.response.data) {
            return (error.response.data);
        }
    }
}

export const GetAllLessons = (email) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `${lessonBaseURL}/getUnstartedLessons`,
                    {
                        params: {
                            email: email
                        }
                    }
                );
                setData(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [email]);

    return { data, loading, error };
};

export const GetMyLessons = async (email) => {
    try {
        const response = await axios.get(
            `${lessonBaseURL}/getMyLessons`,
            {
                params: {
                    email: email
                }
            }
        );
        return { data: response.data, loading: false, error: null };
    } catch (error) {
        return { data: null, loading: false, error: error.message };
    }
};

export const GetLessonSummary = async (email, level) => {
    try {
        const response = await axios.get(`${lessonBaseURL}/getLessonSummary`, {
            params: {
                email: email,
                level: level
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.log(error.response.data);
        }
    }
};

export const GetMispronunciations = async (email, title) => {
    try {
        const response = await axios.get(
            `${lessonBaseURL}/getMispronunciations`,
            {
                params: {
                    email: email,
                    title: title,
                }
            }
        );
        console.log("got mispronunciations", response.data);
        return response.data;
    } catch (error) {
        console.log(error.response.data);
        return error.response.data;
    }
}

export const RemoveMispronunciation = async (email, title, word) => {
    try {
        const response = await axios.delete(`${lessonBaseURL}/removeMispronunciation`,
            {
                params: {
                    email: email,
                    title: title,
                    word: word,
                }
            });
        console.log(response.data);
    } catch (error) {
        console.log(error.response.data);
    }
}

export const GetCompletedLessons = async (email, level) => {
    try {
        const response = await axios.get(`${lessonBaseURL}/getCompletedLessons`, {
            params: {
                email: email,
                level: level,
            }
        });
        console.log(response.data);
        return (response.data);
    } catch (error) {
        console.log(error.response.data);
    }
}

export const GetVocabularyCollection = async (email) => {
    try {
        const response = await axios.get(`${lessonBaseURL}/getVocabularyCollection`, {
            params: {
                email: email,
            }
        });
        return (response.data);
    } catch (error) {
        return (error.response.data);
    }
}

export const GetOneLesson = async (title) => {
    try {
        const response = await axios.get(`${lessonBaseURL}/getOneLesson`, {
            params: {
                title: title,
            }
        });
        return (response.data);
    } catch (error) {
        if (error.response && error.response.status === 404) {
            toast.error(error.response.data, { position: 'bottom-right' });
            console.log("Lesson not found:", error.response.data);
        } else {
            toast.error(error.response.data, { position: 'bottom-right' });
            console.error("Error fetching lesson:", error);
        }
    }
}

export const GetAllMispronunciations = async () => {
    try {
        const response = await axios.get(`${lessonBaseURL}/getAllMispronunciations`);
        console.log("all mispronunciations", response.data);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.log(error.respose.data);
        }
    }
}

export const EditParaLesson = async (title, updatedLessonDTO) => {
    try {
        const response = await axios.put(`${lessonBaseURL}/editLesson/?title=${title}`, updatedLessonDTO);
        toast.success(response.data, { position: 'bottom-right' }); 
    } catch (error) {
        if (error.response) {
            toast.error(error.response.data, { position: 'bottom-right' });
        } else {
            console.error("Error editing lesson:", error.message);
        }
        throw error; 
    }
}

export const DeleteParaLesson = async (title) => {
    try {
        const response = await axios.delete(`${lessonBaseURL}/deleteLesson`, {
            params: {
                title: title,
            },
        });
        toast.success(response.data, { position: 'bottom-right' });
    } catch (error) {
        if (error.response) {
            toast.error(error.response.data, { position: 'bottom-right' });
        } else {
            console.error("Error deleting lesson:", error.message);
        }
        throw error; 
    }
}

export const GetPhoneticRequest = async (word) => {
    try {
        const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        return (response.data?.[0]?.phonetic || '');
    } catch (error) {
        console.error('Error fetching data from the API:', error.message);
    }
}

export const GetSynonymRequest = async (word) => {
    try {
        const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const synonyms = response.data?.[0]?.meanings[0]?.synonyms;
        const synonymsString = synonyms[0];
       /* const synonymsString = synonyms ? synonyms.join(' - ') : '';*/
        return (synonymsString);
    } catch (error) {
        console.error('Error fetching data from the API:', error.message);
    }
}

export const GetSentenceRequest = async (word) => {
    try {
        const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        return (response.data?.[0]?.meanings[0]?.definitions[0]?.example);
    } catch (error) {
        console.error('Error fetching data from the API:', error.message);
    }
}

export const TextComparisonRequest = async (data) => {
    try {
        const response = await axios.post('https://localhost:7077/textcomparison/comparetext', data);
        return response.data;
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
    }
}