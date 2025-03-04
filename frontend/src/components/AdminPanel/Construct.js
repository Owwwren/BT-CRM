import React from 'react';
import './Construct.css';
import LeftPanel from './LeftPanel';
import { Outlet } from "react-router-dom";
import RightPanel from './RightPanel';
import ContentBlock from './ContentBlock/ContentBlock';

const Construct = () => {
    return (
        <div className="construct">
            <LeftPanel />
            <Outlet />
            <ContentBlock />
            <RightPanel />
        </div>
    );
};

export default Construct;