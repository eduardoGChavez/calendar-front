import React from "react";
import '../styles/components/Header.css'

const Header = () => {
    return (
        <div className="Header-container">
            <a href="/">
                <img src='../assets/header/temporal-home.png' alt="Image banner header" />
            </a>
        </div>
    );
}

export default Header;