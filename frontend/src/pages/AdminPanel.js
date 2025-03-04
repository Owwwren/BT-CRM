import React from 'react';
import Construct from '../components/AdminPanel/Construct';
import './AdminPanel.css';

const Footer = () => {
    return (
        <div className="footerLicense">
            <p>© 2025 ServeBiz. Все права защищены.</p>
        </div>
    );
}

function AdminPanel() {
    return (
        <div className='adminPanel'>
            <Construct />
            <Footer />
        </div>
    );
}

export default AdminPanel;