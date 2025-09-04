
import { useEffect } from "react";
import AllLessons from "../components/MainPageComponents/AllLessons";
import MyLessons from "../components/MainPageComponents/MyLessons";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';  
function MainPage() {
    const navigate = useNavigate();
    const token = localStorage.getItem("email");

    useEffect(() => {

        if (!token) {
            toast.error("Please login first!", {
                position: "bottom-right"
            });
            navigate('/');
        } 
    }, []);

    return (
        <>
            <MyLessons />
            <AllLessons />
        </>
    );
}

export default MainPage;