import React from "react";
import { useNavigate } from 'react-router-dom';
import "./Orders.css";
import DateTimeInput from "./DateTimeInput";

import DataObjectIcon from '@mui/icons-material/DataObject';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import PrintIcon from '@mui/icons-material/Print';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';






const Switch = ({isActive, setIsActive}) => {
    return (
            <div onClick={() => setIsActive(!isActive)} className={isActive ? "switch active" : "switch"}>
                <div className={isActive ? "circle active" : "circle"}></div>
            </div>
    )
}

const NavigatePanel = () => {
    const navigate = useNavigate();
    return (
        <div className="navigatePanel">
            <p onClick={() => navigate('/AdminPanel/CRM/Orders')} className="text">Заявки</p>
            <p className="separator"> / </p>
            <p onClick={() => navigate('/AdminPanel/CRM/Orders/Management')} className="text">Управление таблицей</p>
            <p className="separator"> / </p>
            <p style={{ color: "#636363" }}>Создание заявки</p>
        </div>
    )
}

const TypeDevice = ({ device, deviceClient, setDeviceClient }) => {
    return (
        <div onClick={deviceClient === device ? () => setDeviceClient(null) : () => setDeviceClient(device)} className={deviceClient === device ? "typeDevice active" : "typeDevice"}>
            <p>{device}</p>
        </div>
    )
}

const ContentPage = () => {
    const [Urgent, setUrgent] = React.useState(false)
    const [deviceClient, setDeviceClient] = React.useState(null)
    const [Guarantee, setGuarantee] = React.useState(false)
    const [orderID, setOrderID] = React.useState(Math.floor(Math.random() * 1000000))


    return (
        <div className="contentPage">
            <div className="titleAndButton">
                <h1>Создание заявки</h1>
                <div className="buttonBox">
                    <button className="iconButton">
                        <DataObjectIcon className="icon" />
                    </button>
                    <button className="iconButton">
                        <FileCopyIcon className="icon"/>
                    </button>
                    <button className="iconButton">
                        <PrintIcon className="icon"/>
                    </button>
                    <button className="buttonClear" type="submit">Очистить</button>
                    <button className="buttonOK" type="submit">OK</button>
                </div>
            </div>
            <div className="formContainer">
                <form action="" method="post" encType="multipart/form-data">
                    <div className="inputRow">
                        <div className="inputBox halfWidth">
                            <label>
                                <span>id</span>
                                <QuestionMarkIcon style={{transform: 'translate(6px, -8px)'}} className="infoIcon" />
                            </label>
                            <input type="text" name="title" placeholder={orderID} />
                        </div>
                        <div className="SwitchContainer">
                            <span>Срочная заявка</span>
                            <Switch isActive={Urgent} setIsActive={setUrgent} />
                        </div>
                    </div>
                    <div className="inputRow">
                        <div className="inputBox halfWidth">
                            <label>
                                <span>Клиент</span>
                                <QuestionMarkIcon style={{transform: 'translate(48px, -8px)'}} className="infoIcon" />
                            </label>
                            <input type="text" name="description" placeholder="Укажите имя клиента" />
                        </div>
                        <div className="SwitchContainer">
                            <span style={{marginRight: '69px'}}>Гарантия</span>
                            <Switch isActive={Guarantee} setIsActive={setGuarantee} />
                        </div>
                    </div>
                    <div className="inputRow">
                        <div className="inputBox halfWidth">
                            <label>
                                <span>Фамилия</span>
                                <QuestionMarkIcon style={{transform: 'translate(63px, -8px)'}} className="infoIcon" />
                            </label>
                            <input type="text" name="description" placeholder="Укажите фамилию клиента" />
                        </div>
                        
                    </div>
                    <div className="inputRow">
                        <div className="inputBox halfWidth">
                            <label>
                                <span>Номер</span>
                                <QuestionMarkIcon style={{transform: 'translate(43px, -8px)'}} className="infoIcon" />
                            </label>
                            <input type="text" name="description" placeholder="Укажите номер телефона клиента" />
                        </div>
                        <div className="SwitchContainer">
                            <span>Техника</span>
                            <TypeDevice device="ХД" deviceClient={deviceClient} setDeviceClient={setDeviceClient}/>
                            <div style={{width: '10px'}}></div>
                            <TypeDevice device="СМ" deviceClient={deviceClient} setDeviceClient={setDeviceClient}/>
                            <div style={{width: '10px'}}></div>
                            <TypeDevice device="ПМ" deviceClient={deviceClient} setDeviceClient={setDeviceClient}/>
                            <div style={{width: '10px'}}></div>
                            <TypeDevice device="ДШ" deviceClient={deviceClient} setDeviceClient={setDeviceClient}/>
                            <div style={{width: '10px'}}></div>
                            <TypeDevice device="ВП" deviceClient={deviceClient} setDeviceClient={setDeviceClient}/>
                            <div style={{width: '10px'}}></div>
                            <TypeDevice device="ПК" deviceClient={deviceClient} setDeviceClient={setDeviceClient}/>
                        </div>
                    </div>
                    <div className="inputRow">
                        <div className="inputBox halfWidth">
                            <label>
                                <span>Город</span>
                                <QuestionMarkIcon style={{transform: 'translate(37px, -8px)'}} className="infoIcon" />
                            </label>
                            <input type="text" name="description" placeholder="Укажите город" />
                        </div>
                        <div className="SwitchContainer">
                            <div style={{marginLeft: '40px'}}></div>
                            <TypeDevice device="ТВ" deviceClient={deviceClient} setDeviceClient={setDeviceClient}/>
                            <div style={{width: '10px'}}></div>
                            <TypeDevice device="Бойлер" deviceClient={deviceClient} setDeviceClient={setDeviceClient}/>
                            <div style={{width: '10px'}}></div>
                            <TypeDevice device="Кондиционер" deviceClient={deviceClient} setDeviceClient={setDeviceClient}/>
                            <div style={{width: '10px'}}></div>
                            <TypeDevice device="МелкаяБытовая" deviceClient={deviceClient} setDeviceClient={setDeviceClient}/>
                            <div style={{width: '10px'}}></div>
                        </div>
                    </div>
                    <div className="inputRow">
                        <div className="inputBox halfWidth">
                            <label>
                                <span>Улица</span>
                                <QuestionMarkIcon style={{transform: 'translate(40px, -8px)'}} className="infoIcon" />
                            </label>
                            <input type="text" name="description" placeholder="Укажите улицу" />
                        </div>
                        
                    </div>
                    <div className="inputRow">
                        <div className="inputBox halfWidth">
                            <label>
                                <span>Дом</span>
                                <QuestionMarkIcon style={{transform: 'translate(24px, -8px)'}} className="infoIcon" />
                            </label>
                            <input type="text" name="description" placeholder="Укажите номер дома" />
                        </div>
                    </div>
                    <div className="inputRow">
                        <div className="inputBox halfWidth">
                            <label>
                                <span>Квартира</span>
                                <QuestionMarkIcon style={{transform: 'translate(64px, -8px)'}} className="infoIcon" />
                            </label>
                            <input type="text" name="description" placeholder="Укажите номер квартиры" />
                        </div>
                        <div className="SwitchContainer">
                            <DateTimeInput />
                        </div>
                    </div>
                    <div className="inputBox fullWidth">
                        <label>
                            <span>Описание</span>
                            <QuestionMarkIcon style={{transform: 'translate(-7px, -8px)'}} className="infoIcon" />
                        </label>
                        <textarea type="text" name="description" placeholder="Введите описание заявки" />
                    </div>
                </form>
            </div>
        </div>
    )
}

const ConstructOrders = () => {
    return (
        <div className="ordersPage">
            <NavigatePanel />
            <ContentPage />
        </div>
    )
};

export default ConstructOrders;