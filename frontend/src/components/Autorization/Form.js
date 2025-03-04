import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { postUserLoginData } from "../../api/index";
import './Form.css';

const Checkbox = ({ checked, onChange }) => {
    return (
        <div className="checkbox">
            <div className="checkboxContainer">
                <input
                    className="button"
                    type="checkbox"
                    id="remember"
                    name="remember"
                    checked={checked}
                    onChange={onChange}
                />
                <span className="text">ЗАПОМНИТЬ</span>
            </div>
            <a className="link" href="https://crm.bt.servebiz.ru">ЗАБЫЛИ ПАРОЛЬ?</a>
        </div>
    );
};

const Form = ({ setIsLoginIn }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [loginError, setLoginError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [isLoginErrorVisible, setIsLoginErrorVisible] = useState(false);
    const [isPasswordErrorVisible, setIsPasswordErrorVisible] = useState(false);

    // Используем useRef для хранения таймеров
    const loginTimerRef = useRef(null);
    const passwordTimerRef = useRef(null);

    const checkValidPassword = (value) => {
        value = value.trim(); // Удаляем лишние пробелы
    
        if (typeof value === 'string' && value.length > 0) {
            // Проверяем, что пароль от 8 до 50 символов
            if (value.length < 8 || value.length > 50) {
                return {
                    message: 'Пароль должен быть от 8 до 50 символов',
                    state: 'Error_WrongSize'
                };
            }
    
            // Проверяем, что пароль содержит хотя бы одну заглавную букву
            if (!/[A-Z]/.test(value)) {
                return {
                    message: 'Пароль должен содержать хотя бы одну заглавную букву',
                    state: 'Error_NoUppercase'
                };
            }
    
            // Если все проверки пройдены
            return {
                message: value,
                state: 'success'
            };
        } else {
            return {
                message: 'Пароль не может быть пустым',
                state: 'Error_PasswordEmpty'
            };
        }
    };

    const checkValidLogin = (value) => {   
        // Очищаем логин от HTML-тегов и потенциально вредоносного кода
        value = value.replace(/<[^>]*>/g, ''); // Удаляем HTML-теги
        value = value.trim(); // Удаляем лишние пробелы

        if (typeof value === 'string' && value.length > 0) {
            // Проверяем, что логин не содержит запрещенных слов
            const forbiddenWords = ['Error_LoginBlocked', 'Error_WrongSize', 'Error_InvalidChars'];
            if (forbiddenWords.includes(value)) {
                return {
                    message: 'Не верный формат логина',
                    state: 'Error_LoginBlocked'
                };
            }
        
            // Проверяем, что логин от 3 до 50 символов
            if (value.length < 3 || value.length > 50) {
                return {
                    message: 'Логин должен быть от 3 до 50 символов',
                    state: 'Error_WrongSize'
                };
            }
        
            // Проверяем, что логин содержит только буквы и цифры
            if (!/^\w+$/.test(value)) {
                return {
                    message: 'Логин может содержать только буквы и цифры',  
                    state: 'Error_InvalidChars'
                };
            }
            return {
                message: value,
                state: 'success'
            };

        } else {
            return {
                message: 'Логин не может быть пустым',
                state: 'Error_LoginEmpty'
            }
        }
    };
    
    const checkValidData = (login, password) => {
        const loginResult = checkValidLogin(login);
        const passwordResult = checkValidPassword(password);
        const resultCheck = {
            login: false,
            password: false
        };

        if (loginResult.state === 'success') {
            setUsername(loginResult.message);
            resultCheck.login = true;
        }
        if (passwordResult.state === 'success') {
            setPassword(passwordResult.message);
            resultCheck.password = true;
        }

        if (!resultCheck.login) {
            setLoginError(loginResult.message);
            setIsLoginErrorVisible(true); // Показываем ошибку

            // Очищаем предыдущий таймер
            if (loginTimerRef.current) {
                clearTimeout(loginTimerRef.current);
            }

            // Устанавливаем таймер для автоматического скрытия ошибки через 5 секунд
            loginTimerRef.current = setTimeout(() => {
                setIsLoginErrorVisible(false); // Скрываем ошибку (начинаем анимацию)
                setTimeout(() => {
                    setLoginError(null); // Удаляем текст ошибки после завершения анимации
                }, 300); // Задержка для завершения анимации
            }, 5000); // 5000 мс = 5 секунд
        }

        if (!resultCheck.password) {
            setPasswordError(passwordResult.message);
            setIsPasswordErrorVisible(true); // Показываем ошибку

           // Очищаем предыдущий таймер
           if (passwordTimerRef.current) {
                clearTimeout(passwordTimerRef.current);
            }

            // Устанавливаем таймер для автоматического скрытия ошибки через 5 секунд
            passwordTimerRef.current = setTimeout(() => {
                setIsPasswordErrorVisible(false); // Скрываем ошибку (начинаем анимацию)
                setTimeout(() => {
                    setPasswordError(null); // Удаляем текст ошибки после завершения анимации
                }, 300); // Задержка для завершения анимации
            }, 5000); // 5000 мс = 5 секунд
        }
        return resultCheck
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (checkValidData(username, password).login && checkValidData(username, password).password) {
            const data = {
                username,
                password,
                rememberMe, // Передаем состояние чекбокса
            };

            try {
                let response = await postUserLoginData(data);
                if (response === true) {
                    setIsLoginIn(true); // Обновляем состояние авторизации
                    navigate('/AdminPanel');
                } else {
                    if (response === false) {
                        response = "Неверный логин или пароль";
                    }
                    setLoginError(response);
                    setIsLoginErrorVisible(true); // Показываем ошибку

                    // Очищаем предыдущий таймер
                    if (loginTimerRef.current) {
                        clearTimeout(loginTimerRef.current);
                    }

                    // Устанавливаем таймер для автоматического скрытия ошибки через 5 секунд
                    loginTimerRef.current = setTimeout(() => {
                        setIsLoginErrorVisible(false); // Скрываем ошибку (начинаем анимацию)
                        setTimeout(() => {
                            setLoginError(null); // Удаляем текст ошибки после завершения анимации
                        }, 300); // Задержка для завершения анимации
                    }, 5000); // 5000 мс = 5 секунд
                }
            } catch (error) {
                console.error('Ошибка:', error);
            }
        }
    };

    const handleRememberMeChange = (e) => {
        setRememberMe(e.target.checked); // Обновляем состояние чекбокса
    };

    // Функция для удаления нежелательных символов
    const cleanInput = (value) => {
        // Удаляем символы .-=\/ с помощью регулярного выражения
        return value.replace(/[.\-=\\/]/g, '');
    };

    // Обработчик изменения значения в input
    const handleInputChange = (event) => {
        const cleanedValue = cleanInput(event.target.value); // Очищаем значение
        setUsername(cleanedValue); // Обновляем состояние
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <input
                className="loginInput"
                type="text"
                name="username"
                placeholder="ЛОГИН"
                value={username}
                onChange={handleInputChange}
            />
            <div className={`loginErrorMessage ${isLoginErrorVisible ? 'active' : ''}`}>
                {loginError}
            </div>
            <div className={`passwordErrorMessage ${isPasswordErrorVisible ? 'active' : ''}`}>
                {passwordError}
            </div>
            <input
                className="passwordInput"
                type="password"
                name="password"
                placeholder="ПАРОЛЬ"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Checkbox checked={rememberMe} onChange={handleRememberMeChange} />
            <button className="button" type="submit">
                ВОЙТИ
            </button>
        </form>
    );
};
    

export default Form;
