import React from "react";
import '../styles/components/Header.css'

const Header = () => {
    return (
        <div className="Header-container">
            <a href="/">
                <img className="Header-container--image" src={require('../assets/header/temporal-home.png')} alt="Image banner header" />
                {/* <Image
                    style={styles.tinyLogo}
                    source={require('@expo/snack-static/react-native-logo.png')}
                /> */}
            </a>
        </div>
    );
}

export default Header;