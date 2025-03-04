import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Хук для навигации
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "./ButtonPanel.css";
import Skeleton from "@mui/material/Skeleton";

import WindowIcon from '@mui/icons-material/Window';
import AppsIcon from '@mui/icons-material/Apps';
import GroupIcon from '@mui/icons-material/Group';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import HelpIcon from '@mui/icons-material/Help';

const buttonsList = [
  {
    text: "Dashboard",
    icon: <WindowIcon />,
    navigation: "/AdminPanel/CRM/Dashboard", // Ссылка на страницу
    subButtons: [
      { text: "Заявки", navigation: "/AdminPanel/CRM/Dashboard/Orders" },
      { text: "Мастера", navigation: "/AdminPanel/CRM/Dashboard/Masters" },
      { text: "Финансы", navigation: "/AdminPanel/CRM/Dashboard/FinanceFinance" },
      { text: "Реклама", navigation: "/AdminPanel/CRM/Dashboard/Advertising" },
    ],
  },
  {
    text: "Заявки",
    icon: <AppsIcon />,
    navigation: "/AdminPanel/CRM/Orders",
    subButtons: [
      { text: "Все заявки", navigation: "/AdminPanel/CRM/Orders/all" },
      { text: "Не обработанные", navigation: "/AdminPanel/CRM/Orders/unprocessed" },
      { text: "Активные", navigation: "/AdminPanel/CRM/Orders/active" },
      { text: "СД", navigation: "/AdminPanel/CRM/Orders/sd" },
      { text: "Закрытые", navigation: "/AdminPanel/CRM/Orders/closed" },
      { text: "Гарантии", navigation: "/AdminPanel/CRM/Orders/guarantees" },
      { text: "Создать заявку", navigation: "/AdminPanel/CRM/Orders/create" },
    ],
  },
  {
    text: "Мастера",
    icon: <GroupIcon />,
    navigation: "/AdminPanel/CRM/Masters",
    subButtons: [
      { text: "Все мастера", navigation: "/AdminPanel/CRM/Masters/all" },
      { text: "График работы", navigation: "/AdminPanel/CRM/Masters/workingHours" },
      { text: "Учет ЗПЧ", navigation: "/AdminPanel/CRM/Masters/sparePartsAccounting" },
      { text: "Финансовый учет", navigation: "/AdminPanel/CRM/Masters/financialAccounting" },
      { text: "Эффективность", navigation: "/AdminPanel/CRM/Masters/efficiency" },
      { text: "Рейтинг", navigation: "/AdminPanel/CRM/Masters/rating" },
      { text: "Должники", navigation: "/AdminPanel/CRM/Masters/debtors" },
      { text: "Добавить мастера", navigation: "/AdminPanel/CRM/Masters/create" },
    ],
  },
  {
    text: "Клиенты",
    icon: <Diversity3Icon />,
    navigation: "/AdminPanel/CRM/Clients",
    subButtons: [
      { text: "Все клиенты", navigation: "/AdminPanel/CRM/Clients/all" },
      { text: "Требуют внимания", navigation: "/AdminPanel/CRM/Clients/needAttention" },
      { text: "Прозвоны", navigation: "/AdminPanel/CRM/Clients/ringing" },
      { text: "Постоянщики", navigation: "/AdminPanel/CRM/Clients/regulars" },
      { text: "Лояльность", navigation: "/AdminPanel/CRM/Clients/loyalty" },
      { text: "Рассылки", navigation: "/AdminPanel/CRM/Clients/newsLetters" },
      { text: "ЧС", navigation: "/AdminPanel/CRM/Clients/blacklist" },
    ],
  },
  {
    text: "Финансы",
    icon: <AccountBalanceIcon />,
    navigation: "/AdminPanel/CRM/Finance",
    subButtons: [
      { text: "Все операции", navigation: "/AdminPanel/CRM/Finance/allOperations" },
      { text: "Учет доходов", navigation: "/AdminPanel/CRM/Finance/income" },
      { text: "Учет расходов", navigation: "/AdminPanel/CRM/Finance/expenses" },
      { text: "Бюджетирование", navigation: "/AdminPanel/CRM/Finance/budgeting" },
      { text: "Отчет", navigation: "/AdminPanel/CRM/Finance/report" },
      { text: "Метрики", navigation: "/AdminPanel/CRM/Finance/metrics" },
      { text: "Долги", navigation: "/AdminPanel/CRM/Finance/debts" },
      { text: "Архив", navigation: "/AdminPanel/CRM/Finance/archive" },
      { text: "Создать операцию", navigation: "/AdminPanel/CRM/Finance/create" },
    ],
  },
  {
    text: "Заметки",
    icon: <CalendarMonthIcon />,
    navigation: "/AdminPanel/CRM/Notes",
    subButtons: [
      { text: "Календарь", navigation: "/AdminPanel/CRM/Notes/calendar" },
      { text: "Заметки", navigation: "/AdminPanel/CRM/Notes/all" },
      { text: "Создать заметку", navigation: "/AdminPanel/CRM/Notes/create" },
    ],
  },
];

const ButtonSection = ({ subButtons, isOpen, activeSubButton, onSubButtonClick, activeSubPanel, panelText }) => {
    // Проверяем, активен ли текущий subPanel
    const isSubPanelActive = activeSubPanel === panelText;
  
    return (
      <div className={`subPanel ${isOpen ? "open" : ""} ${isSubPanelActive ? "active" : ""}`}>
        {subButtons.map((subButton, index) => (
          <div
            key={index}
            className={`subButton ${activeSubButton === subButton.navigation ? "active" : ""}`}
            onClick={() => onSubButtonClick(subButton.navigation)}
          >
            {subButton.text}
          </div>
        ))}
      </div>
    );
  };

  const Button = ({ text, icon, isActiveButton, subButtons, isOpen, onClickPanel, onClickButton, navigation, onSubButtonClick, activeSubButton, activeSubPanel }) => {
    return (
      <div className={`buttonContainer ${isActiveButton === text ? "active" : ""}`}>
        <div
          className={isActiveButton === text ? "button active" : "button"}
          onClick={() => onClickButton(navigation, text)}
        >
          <div className="textAndIcon">
            {icon}
            <p>{text}</p>
          </div>
          <ExpandMoreIcon
            style={{
              marginRight: "15px",
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
            }}
            onClick={(e) => {
              e.stopPropagation();
              onClickPanel();
            }}
          />
        </div>
  
        {/* Выезжающая панель */}
        <ButtonSection
          subButtons={subButtons}
          isOpen={isOpen}
          activeSubButton={activeSubButton}
          onSubButtonClick={onSubButtonClick}
          activeSubPanel={activeSubPanel}
          panelText={text} // Передаем идентификатор subPanel
        />
      </div>
    );
  };

  const ButtonPanel = () => {
    const [isActiveButton, setIsActiveButton] = useState(null); // Активная главная кнопка
    const [openPanel, setOpenPanel] = useState(null); // Открытый subPanel
    const [isLoading, setIsLoading] = useState(false); // Состояние загрузки
    const [activeSubButton, setActiveSubButton] = useState(null); // Активная подкнопка
    const [activeSubPanel, setActiveSubPanel] = useState(null); // Активный subPanel
    const navigate = useNavigate();
  
    // Обработчик нажатия на стрелочку (открытие/закрытие subPanel)
    const handlePanelClick = (text) => {
      if (openPanel === text) {
        setOpenPanel(null); // Закрыть subPanel, если он уже открыт
        setIsActiveButton(null); // Сбросить активную главную кнопку
      } else {
        setOpenPanel(text); // Открыть subPanel
        setIsActiveButton(text); // Установить активную главную кнопку
      }
    };
  
    // Обработчик нажатия на главную кнопку
    const handleButtonClick = (navigation, text) => {
      setIsActiveButton(text); // Установить активную главную кнопку
      setOpenPanel(null); // Закрыть все subPanel
      setActiveSubButton(null); // Сбросить активную подкнопку
      setActiveSubPanel(null); // Сбросить активный subPanel
      navigate(navigation); // Переход на страницу
    };
  
    // Обработчик нажатия на подкнопку
    const handleSubButtonClick = (subNavigation, panelText) => {
      setActiveSubButton(subNavigation); // Установить активную подкнопку
      setActiveSubPanel(panelText); // Установить активный subPanel
      navigate(subNavigation); // Переход на страницу
    };
  
    return (
      <div style={{ width: "250px", height: "100%" }}>
        {isLoading && (
          <Skeleton
            variant="rounded"
            width="100%"
            height="100%"
          />
        )}
  
        <div style={{ border: "none", display: isLoading ? "none" : "flex" }} className="buttonPanel">
          {buttonsList.map((button, index) => (
            <Button
              key={index}
              text={button.text}
              icon={button.icon}
              isActiveButton={isActiveButton}
              subButtons={button.subButtons}
              isOpen={openPanel === button.text}
              onClickPanel={() => handlePanelClick(button.text)}
              onClickButton={() => handleButtonClick(button.navigation, button.text)}
              navigation={button.navigation}
              onSubButtonClick={(subNavigation) => handleSubButtonClick(subNavigation, button.text)} // Передаем идентификатор subPanel
              activeSubButton={activeSubButton} // Активная подкнопка
              activeSubPanel={activeSubPanel} // Активный subPanel
            />
          ))}
        </div>
        <div className="bottomPanel">
          <div className="line"></div>
          <div className="bottomContent">
            <HelpIcon />
            <p>Помощь</p>
          </div>
          <div className="bottomContent">
            <p>F.A.Q</p>
          </div>
        </div>
      </div>
    );
  };
export default ButtonPanel;