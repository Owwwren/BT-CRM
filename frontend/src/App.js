import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Autorization from './pages/Autorization';
import AdminPanel from './pages/AdminPanel';
import { getUserSession } from './api';

function App() {
    const [isLoginIn, setIsLoginIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

 useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await getUserSession();
                setIsLoginIn(true); // Сессия активна
            } catch (error) {
                setIsLoginIn(false); // Сессии нет
            } finally {
                setIsLoading(false); // Завершаем загрузку
            }
        };
        checkSession();
    }, []);

    // Если данные загружаются, показываем загрузку
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={ isLoginIn ? <Navigate to="/AdminPanel" /> : <Autorization setIsLoginIn={setIsLoginIn} />} />
                <Route path="/AdminPanel" element={<Navigate to="/AdminPanel/Chats" />} /> {/* Редирект на /AdminPanel/Chats */}
                <Route path="/AdminPanel/*" element={ isLoginIn ? <AdminPanel /> : <Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;