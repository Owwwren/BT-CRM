import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.servebiz.space/', 
});


export const postUserLoginData = async (data) => {
    try {
        const response = await api.post(`/Employees/authorization`, {
            login: data.username,
            password: data.password,
            rememberMe: data.rememberMe
        }, {
            withCredentials: true,  
          }); 
        if (response.status === 200) {
            if (response.data.success === true) {
                return true;
            } else {
                return false;
            }
        }
    } catch (error) {
        const response = error.response;
        if (response.status === 422) {
            if (response.data) {
                if (response.data.detail[0].type === 'value_error') {
                    return response.data.detail[0].msg.split(", ")[1];
                }
            } else {
                console.error('Ошибка:', error);
                return false;
            }
        } else {
            console.error('Ошибка:', error);
            return false;
        }
    }
    return false;
};

export const getUserSession = async () => {
    const response = await api.get(`/Employees/authorization/session/`, {
        withCredentials: true, 
        }); 
    }
