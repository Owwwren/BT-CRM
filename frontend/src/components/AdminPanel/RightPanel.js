import React from 'react';
import './RightPanel.css';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';

const RightPanel = () => {
    return (
        <div className="rightPanel">
            <button className="button" type="submit">
                <SettingsSuggestRoundedIcon className="icon" />
            </button>
        </div>
    );
};

export default RightPanel;