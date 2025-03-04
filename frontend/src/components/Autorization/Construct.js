import React from "react";
import Form from "./Form";
import HeaderBox from "./Header";
import "./Construct.css";

const Header = () => {
    return (
        <div className="header">
            <HeaderBox />
        </div>
    );
}

const Footer = ({ setIsLoginIn }) => {
    return (
        <div className="footer">
            <Form setIsLoginIn={setIsLoginIn}/>  
        </div>
    );
}


const Construct = ({ setIsLoginIn }) => {
    return (
        <div className="construct">
            <Header />
            <Footer setIsLoginIn={setIsLoginIn} />
        </div>
    );
};

export default Construct;