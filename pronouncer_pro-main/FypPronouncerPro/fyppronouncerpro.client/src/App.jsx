import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FrontPage from './pages/FirstPage';
import DemoPage from './pages/DemoPage';
import MainPage from './pages/MainPage';
import SoloParaLesson from './components/MainPageComponents/SoloParaLesson';
import LayoutComponent from './components/MainPageComponents/LayoutComponent';
import VocabularyRetentionPage from './pages/VocabularyRetentionPage';
import SoloAudioLesson from './components/MainPageComponents/SoloAudioLesson';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddLesson from './components/AdminPageComponents/AddLesson';
import EditLesson from './components/AdminPageComponents/EditLesson';
import DeleteLesson from './components/AdminPageComponents/DeleteLesson';
import AdminPage from './pages/AdminPage';
import RandomParaLesson from './components/MainPageComponents/RandomParaLesson';
import UserProgressPage from './pages/UserProgressPage';
import ShowAllLessons from './components/AdminPageComponents/ShowAllLessons';
import MostMispronuncedWords from './components/AdminPageComponents/MostMispronunciations';
import ViewAllUsers from './components/AdminPageComponents/ViewAllUsers';

function App() {
    
    return (
            <BrowserRouter>
                <Routes>
                    <Route path='/'>
                        <Route index element={<FrontPage />} />
                    </Route>
                    <Route path="demo_page" element={<DemoPage />} />
                    <Route path="main_page" element={<LayoutComponent />} >
                        <Route index element={<MainPage />} />
                        <Route path="solo_para_lesson/:title/:content/:level/:focusWords" element={<SoloParaLesson />} />
                        <Route path="random_para_lesson/:content" element={<RandomParaLesson />} />
                        <Route path="solo_audio_lesson" element={<SoloAudioLesson />} />
                        <Route path="vocabulary_retention_page" element={<VocabularyRetentionPage />} />
                        <Route path="progress_page" element={<UserProgressPage />} />
                    </Route>
                    <Route path='admin' element={<AdminPage/> }>
                        <Route index element={<AddLesson />} />
                        <Route path="edit_lesson" element={<EditLesson />} />
                        <Route path="delete_lesson" element={<DeleteLesson />} />
                        <Route path="all_lessons" element={<ShowAllLessons />} />
                        <Route path="most_mispronunciations" element={<MostMispronuncedWords />} />
                        <Route path="all_users" element={<ViewAllUsers />} />
                    </Route>
                </Routes>
                <ToastContainer/>
            </BrowserRouter>
         
    );
}
export default App;