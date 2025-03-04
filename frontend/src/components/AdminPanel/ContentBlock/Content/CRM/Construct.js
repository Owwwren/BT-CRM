import React from "react";
import ButtonPanel from "../ButtonPanel";
import ContentBlock from "./pages/ContentBlock";



const CRM = () => {
    // const [isLoading, setIsLoading] = useState(true); // Состояние загрузки


    return (
        <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start' }}>
            <ButtonPanel />
            <ContentBlock />
        </div>
    )
}

export default CRM 