import React from "react";
import "./Header.css";

function HeaderBox() {
    return (
        <div className="headerBox">
            <h1 className="title">Авторизация</h1>
            <div className="buttonBox">
                <button className="button" type="submit">Войти</button>
            </div>
        </div>
    );
}


// Функция дря реализации регистрации
// function HeaderBox() {
//     return (
//         <div className="headerBox">
//             <h1 className="title">Авторизация</h1>
//             <div className="buttonBox">
//                 <button className="button" type="submit">Войти</button>
//                 <button className="button" type="submit">Регистрация</button>
//             </div>
//         </div>
//     );
// }

export default HeaderBox;   