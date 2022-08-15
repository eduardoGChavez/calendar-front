import React from "react";
import { useState, useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import '../styles/containers/Login.css'


const Login = ({userData, setUserData}) => {
    const {userState, addUser} =  useContext(UserContext);
    const [iniciar, setIniciar] = useState(true);
    const [termsChecked, setTermsChecked] = useState(false);
    const [formSingin, setFormSingin] = useState({
        correo: '',
        contrasena: '',
    });
    const [formSingup, setFormSingup] = useState({
        nombre: '',
        correo: '',
        contrasena: '',
        repContrasena: '',
    });

    useEffect(() => {
        console.log(userData);
    }, [userData, userState])

    const handleChangeFormSingin = (e) => {
        const { name, value } = e.currentTarget;
        setFormSingin({ ...formSingin, [name]: value });
    }
    const handleChangeFormSingup = (e) => {
        const { name, value } = e.currentTarget;
        setFormSingup({ ...formSingup, [name]: value });
    }

    const handleSubmitSingin = async (e) => {
        e.preventDefault();
        
        if (validateEmail(formSingin.correo) === false) {
            alert('Ingrese el correo correctamente');
            return false;
        }
        if (formSingin.contrasena === "") {
            alert('Es necesario ingresar una contraseña');
            return false;
        }

        
        
        try {
            let config = {
                method: 'GET',
                headers: {
                  Accept: 'application.json',
                  'Content-Type': 'application/json'
                },
                cache: 'default'
            }
            let res = await fetch(`http://52.53.149.201:8000/users/${formSingin.correo}&${formSingin.contrasena}`, config);
            let resJson = await res.json();
            // navigate('/');
            setUserData(resJson);
            addUser(resJson);
            localStorage.setItem("sesion", JSON.stringify(resJson));
        } catch (error) {
            alert('Correo o contraseña incorrectos');
            console.log(error.message);
        }
    }

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(String(email).toLowerCase())
    }
    

    const handleSubmitSingup = async (e) => {
        e.preventDefault();
        
        if (formSingup.nombre === "") {
            alert('Es necesario llenar todos los campos');
            return false;
        }
        if (validateEmail(formSingup.correo) === false) {
            alert('Ingrese el correo correctamente');
            return false;
        }
        if (formSingup.contrasena !== formSingup.repContrasena) {
            alert('Las contraseñas no coinciden.');
            return false;
        }
        
        try {
            let data = {
                name: formSingup.nombre,
                email: formSingup.correo,
                password: formSingup.contrasena,
            }
            let body = JSON.stringify(data);
            let config = {
                method: 'POST',
                headers: {
                  Accept: 'application.json',
                  'Content-Type': 'application/json'
                },
                body: body,
                cache: 'default'
            }
            let res = await fetch("http://52.53.149.201:8000/users/", config);
            let resJson = res.json();
            console.log(resJson);
            // navigate('/');
            alert('¡Cuenta creada con éxito!');
        } catch (error) {
            alert('Error inesperado: ' + e.error);
        }
    }

    const handleClickInicioRegistrar = (e, valor) => {
        e.preventDefault();
        setIniciar(valor);
    }

    const handleClickCheckbox = () => {
        // !termsChecked ? setTermsChecked(true) : setTermsChecked(false);
        setTermsChecked(!termsChecked);
    }
 
    return (
        <div className="Login-container">
            <div className="Login-content">


                <ul className="nav nav-pills nav-justified mb-3">
                    <li className="nav-item">
                        <a  className={iniciar ? "nav-link active" : "nav-link"} 
                            onClick={e => handleClickInicioRegistrar(e, true)} 
                            href="">
                            Iniciar sesión
                        </a>
                    </li>
                    <li className="nav-item">
                        <a  className={!iniciar ? "nav-link active" : "nav-link"} 
                            onClick={e => handleClickInicioRegistrar(e, false)} 
                            href="">
                            Registrar
                        </a>
                    </li>
                </ul>

                <div className="Login-form-container">
                    {iniciar ? (
                        <div className="Login-form-content-singin">
                            <form className="Login-form-singin" onSubmit={handleSubmitSingin}>
                                <div className="form-outline mb-4">
                                    <label className="form-label">Correo electrónico</label>
                                    <input  type="email" 
                                            id="loginName" 
                                            placeholder="mi_correo@ejemplo.com" 
                                            className="form-control"
                                            name="correo"
                                            value={formSingin.correo}
                                            onChange={handleChangeFormSingin} />
                                </div>

                                <div className="form-outline mb-4">
                                    <label className="form-label">Contraseña</label>
                                    <input  type="password" 
                                            id="loginPassword" 
                                            placeholder="Contraseña" 
                                            className="form-control" 
                                            name="contrasena"
                                            value={formSingin.contrasena}
                                            onChange={handleChangeFormSingin}/>
                                </div>

                                <div className="Login-form-singin--forgotPassword-container row mb-4">
                                    <div className="Login-form-singin--forgotPassword-content col-md-6 d-flex">
                                        <a href="#!">¿Olvidaste tu contraseña?</a>
                                    </div>
                                </div>

                                <button type="submit" 
                                        className="btn btn-primary btn-block mb-4"
                                        onClick={handleSubmitSingin}>
                                        Acceder</button>

                                <div className="text-center">
                                    <p>¿No eres miembro? 
                                        <a href="" onClick={e => handleClickInicioRegistrar(e, false)} >¡Regístrate!</a>
                                    </p>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div className="Login-form-content-singin">
                            <form className="Login-form-singup">
                                <div className="form-outline mb-4">
                                    <label className="form-label">Nombre</label>
                                    <input  type="text" 
                                            id="registerName" 
                                            placeholder="Nombre" 
                                            className="form-control" 
                                            name="nombre"
                                            value={formSingup.nombre}
                                            onChange={handleChangeFormSingup}/>
                                </div>

                                <div className="form-outline mb-4">
                                    <label className="form-label">Correo electrónico</label>
                                    <input  type="email" 
                                            id="registerEmail" 
                                            placeholder="mi_correo@ejemplo.com" 
                                            className="form-control" 
                                            name="correo"
                                            value={formSingup.correo}
                                            onChange={handleChangeFormSingup}/>
                                </div>

                                <div className="form-outline mb-4">
                                    <label className="form-label">Contraseña</label>
                                    <input  type="password" 
                                            id="registerPassword" 
                                            placeholder="Contraseña" 
                                            className="form-control" 
                                            name="contrasena"
                                            value={formSingup.contrasena}
                                            onChange={handleChangeFormSingup}/>
                                </div>

                                <div className="form-outline mb-4">
                                    <label className="form-label">Repetir contraseña</label>
                                    <input  type="password" 
                                            id="registerRepeatPassword" 
                                            placeholder="Repetir contraseña" 
                                            className="form-control" 
                                            name="repContrasena"
                                            value={formSingup.repContrasena}
                                            onChange={handleChangeFormSingup}/>
                                </div>

                                <div className="Login-form-singin--terms-container form-check d-flex justify-content-center mb-4">
                                    <input  className="form-check-input me-2" 
                                            type="checkbox" 
                                            checked={termsChecked} 
                                            onClick={handleClickCheckbox}/>
                                    <label  className="Login-form-singin--terms-content form-check-label"
                                            onClick={handleClickCheckbox}>
                                        Estoy de acuerdo con los terminos
                                    </label>
                                </div>

                                <button type="submit" 
                                        className="btn btn-primary btn-block mb-3" 
                                        disabled={!termsChecked} 
                                        onClick={handleSubmitSingup}>
                                    Registrarme
                                </button>
                            </form>
                        </div>
                        )
                    }
                </div>








            </div>
        </div>
    );
}

export default Login;