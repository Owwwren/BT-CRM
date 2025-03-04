import React from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import './ContentBlock.css';
import Account from './Content/Account/Construct';
import Chats from './Content/Chats/Construct';
import Settings from './Content/Settings/Construct'; 
import CRM from './Content/CRM/Construct'; 

const ContentBlock = () => {
    return (
        <div className="contentBlock">
            {/* Outlet будет отображать вложенные маршруты */}
            <Outlet />
            <Routes>
                <Route path="Account" element={<Account />} />
                <Route path="Chats" element={<Chats />} />
                <Route path="Settings" element={<Settings />} />
                <Route path="/CRM" element={<Navigate to="Dashboard" />} /> {/* Редирект на /CRM/Dashboard */}
                <Route path="CRM/*" element={<CRM />} />      
            </Routes>
        </div>
    );
};

export default ContentBlock;