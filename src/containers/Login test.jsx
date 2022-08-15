import React from "react";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import '../styles/containers/Login.css'


const Loginn = () => {
    const [formSingin, setFormSingin] = useState({
        correo: '',
        contrasena: '',
    });

    const handleSubmitSingin = (e) => {
        e.preventDefault();
        setFormSingin({
            ...formSingin,
            contrasena: 'bbbb',
        });
        console.log(formSingin);
    }
 
    return (
        <div className="Login-container">
            <div className="Modal-content--save">
                <button className="Modal-content-save--button btn btn-primary"
                        onClick={handleSubmitSingin} >
                    <i className="fa-solid fa-floppy-disk"></i>
                    Guardar cambios
                </button>
            </div>
        </div>
    );
}

export default Loginn;