import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import ConstructDashboard from "./Dashboard/Construct";
import Orders from "./Orders/Orders";
import ConstructMasters from "./Masters/Construct";
import ConstructClients from "./Clients/Construct";
import ConstructFinance from "./Finance/Construct";
import ConstructNotes from "./Notes/Construct";


const ContentBlock = () => {
    // const [isLoading, setIsLoading] = useState(true); // Состояние загрузки


    return (
        <div style={{width: "calc(100% - 250px)", height: "100%", display: "flex", justifyContent: "center", alignItems: "flex-start", padding: '15px 15px 0 15px', backgroundColor: '#202020'}}>
            {/* Outlet будет отображать вложенные маршруты */}
            <Outlet />
            <Routes>
                <Route path="Dashboard" element={<ConstructDashboard />} />
                <Route path="Orders" element={<Orders />} />
                <Route path="Masters" element={<ConstructMasters />} />
                <Route path="Clients" element={<ConstructClients />} />
                <Route path="Finance" element={<ConstructFinance />} />
                <Route path="Notes" element={<ConstructNotes />} />
            </Routes>
        </div>
    )
}

export default ContentBlock;