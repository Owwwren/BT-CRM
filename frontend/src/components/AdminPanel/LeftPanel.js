import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LeftPanel.css';


import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import BackupTableRoundedIcon from '@mui/icons-material/BackupTableRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';


const Panel = (peops) => {
    const [showPanel, setShowPanel] = React.useState(false);
  
    const navigate = useNavigate(); // Хук для навигации

    const handleNavigation = (path) => {
        navigate(path); // Переход на указанный путь
    }


    return (
        <div     
            style={{marginTop: `${peops.position.y}`}}      
            className={`panel ${showPanel ? 'active' : ''}`}
        >
            <div onClick={() => handleNavigation('/AdminPanel/Account')} className="item">
                <AccountCircleRoundedIcon className="icon" />
            </div>
            <div onClick={() => handleNavigation('/AdminPanel/Chats')} className="item">
                <ChatBubbleOutlineRoundedIcon className="icon" />
            </div>
            <div onClick={() => handleNavigation('/AdminPanel/CRM')} className="item">
                <BackupTableRoundedIcon className="icon" />
            </div>
            <div onClick={() => handleNavigation('/AdminPanel/Settings')} className="item">
                <SettingsRoundedIcon className="icon" />          
            </div>      
            <div onClick={() => handleNavigation('/Autorization')} className="item">            
                <LogoutRoundedIcon className="icon" />
            </div>    
            <ArrowBackIosRoundedIcon onClick={() => setShowPanel(!showPanel)} className="arrow"/>
        </div>    
    );      
}

const LeftPanel = () => {
    const [position, setPosition] = useState({ x: '0px', y: '22vh' });
    const [isMoving, setIsMoving] = useState(false);

    const handleMouseMove = (e) => {
        if (isMoving) {
            if (e.clientY > 10) {
                    setPosition({
                    x: `${e.clientX}px`,
                    y: `${e.clientY}px`,
                });
            }
        }
    };

    // Обработчик начала касания (для мобильных устройств)
    const handleTouchMove = (e) => {
        if (isMoving) {
            const touch = e.touches[0]; // Получаем первое касание
            setPosition({
                x: touch.clientX,
                y: touch.clientY,
            });
        }
    };

    return (
        <div 
            onMouseMove={handleMouseMove} 
            onMouseDown={() => setIsMoving(true)}  
            onMouseUp={() => setIsMoving(false)} 

            onTouchMove={handleTouchMove}
            onTouchStart={() => setIsMoving(true)}
            onTouchEnd={() => setIsMoving(false)}
            className="leftPanel"
        >
            <Panel position={position}/>
        </div>    
    );
}

export default LeftPanel