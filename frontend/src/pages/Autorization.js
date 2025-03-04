import React from 'react';
import Construct from '../components/Autorization/Construct';
import './Autorization.css';

const Footer = () => {
    return (
        <div className="footerLicense">
            <p>© 2025 ServeBiz. Все права защищены.</p>
        </div>
    );
}

const Autorization = ({ setIsLoginIn }) => {
    return (
        <div className='autorization'>
            <Construct setIsLoginIn={setIsLoginIn} />
            <Footer />
        </div>
    );
}

export default Autorization;