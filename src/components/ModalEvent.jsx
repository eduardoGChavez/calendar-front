import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';
// import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import "../styles/components/ModalEvent.css"
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Form, TextArea } from 'semantic-ui-react'
// import { CTimePicker } from '@coreui/react-pro'

const ModalEvent = ({ 
    showModal, 
    setShowModal, 
    eventSelected,
    setEventSelected, 
    disabledEdit, 
    setDisabledEdit, 
    newEvent, 
    removeEventData,
    addEventData
}) => {
    const [formFields, setFormFields] = useState(eventSelected.guests);
    const [encontrarHueco, setEncontrarHueco] = useState();
    const [viewHueco, setViewHueco] = useState(false);
    
    const handleDelete = async (e) => {
        e.preventDefault();
        
        try {
            let config = {
                method: 'DELETE',
                headers: {
                  Accept: 'application.json',
                  'Content-Type': 'application/json'
                },
                cache: 'default'
            }
            let res = await fetch(`http://localhost:8000/events/${eventSelected.id}`, config);
            let resJson = await res.json();
            console.log(resJson);
            if(resJson.messageType === "1"){
                removeEventData(eventSelected.id);
                alert(resJson.message);
                setShowModal(!showModal);
            }
        } catch (error) {
            alert('Error inesperado: ' + e.error);
        }
    }

    const handleChangeFormInputs = (e) => {
        const { name, value } = e.currentTarget;
        setEventSelected({ ...eventSelected, [name]: value });
    }

    const handleChangeTimePicker = (event, index) => {
        let data = [...formFields];
        data[index][event.target.name] = event.target.value;
        setFormFields(data);
        setEventSelected({ ...eventSelected, guests: formFields });
    }

    const addFields = () => {
        let object = {
            correo: ''
        }

        setFormFields([...formFields, object]);
        setEncontrarHueco(true);
        
    }

    const removeFields = (index) => {
        let data = [...formFields];
        data.splice(index - 1, 1);
        setFormFields(data);
        if(data.length === 0) {        
            setEncontrarHueco(false);
        }
    }

    // const handleSave = (e) => {
    //     e.preventDefault();
    //     setEventSelected({ ...eventSelected, guests: [...formFields] });
    //     console.log(eventSelected);
    // }

    const handleSave = async (e) => {
        e.preventDefault();
        // console.log(eventSelected);
        
        if (eventSelected.title == "") {
            alert('Es necesario llenar todos los campos');
            return false;
        }
        if (eventSelected.start.getTime() > eventSelected.end.getTime()) {
            alert('La fecha/horario de termino del evento no puede ser mayor');
            return false;
        }

        for(let i = 0; i < eventSelected.guests.length; i++){
            if (validateEmail(eventSelected.guests[i].correo) === false) {
                alert('Ingrese correos válidos en la sección de invitados');
                return false;
            }
        }

        if ( newEvent ) {
            createNewEvent();
        }
    }
    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(String(email).toLowerCase())
    }
    const createNewEvent = async () => {
        try {
            let body = JSON.stringify(eventSelected);
            let config = {
                method: 'POST',
                headers: {
                  Accept: 'application.json',
                  'Content-Type': 'application/json'
                },
                body: body,
                cache: 'default'
            }
            let res = await fetch("http://localhost:8000/events/", config);
            let resJson = await res.json();
            console.log(resJson);
            if(resJson.messageType === "1"){
                alert(resJson.message);
                addEventData(eventSelected);
                setShowModal(!showModal);
            }
        } catch (error) {
            alert('Error inesperado: ' + error.message);
        }
    }

    return (
        <div className="Modal-container">
            {/* <button onClick={toggleModal}>Open modal</button> */}

            <ReactModal
                className={!viewHueco ? "Modal-content-personalizado" : "Modal-content-personalizado active"}
                portalClassName={"Modal-Portal-content"}
                overlayClassName={"Modal-Overlay-content"}
                isOpen={true}
                onRequestClose={() => setShowModal(!showModal)}
                contentLabel="My dialog"
            >
                <div className="Modal-content">
                    {viewHueco && 
                        // <button className={disabledEdit ? "Modal-content--buscar-hueco btn" : "Modal-content--buscar-hueco active btn"} 
                        <button className="Modal-content--buscar-hueco btn" 
                                onClick={() => setViewHueco(!viewHueco)}
                                title="Cerrar vista" >
                            <i className="fa-solid fa-eye"></i>
                        </button>
                        }

                    <div className="Modal-content-buttons--buttons">
                        {!newEvent && 
                        [<button className={disabledEdit ? "Modal-content--edit btn" : "Modal-content--edit active btn"} 
                                onClick={() => setDisabledEdit(!disabledEdit)}
                                title="Editar evento" >
                            <i className="fa-solid fa-pen-to-square"></i>
                        </button>,
                    
                        <button className="Modal-content-buttons--delete btn"
                                onClick={handleDelete}
                                title="Eliminar evento" >
                            <i className="fa-solid fa-trash-can"></i>
                        </button>]
                        }
                        <button className="Modal-content-buttons--close btn btn-danger"
                                onClick={() => setShowModal(!setShowModal)}
                                title="Cerrar ventana" >
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                    
                    <div className="Modal-content--body">
                        <div className="Modal-content-invitados--content-input-title">                         
                            <input  type="text"
                                    placeholder="Título evento"
                                    className="Modal-content-invitados-content--input-title form-control"
                                    name="title"
                                    disabled= { disabledEdit }
                                    onChange={handleChangeFormInputs}
                                    value={eventSelected.title} />
                        </div>
                        <div className="Modal-content-invitados--content-textarea-description">                         
                            {/* <input  type="text"
                                    placeholder="Título evento"
                                    className="Modal-content-invitados-content--input-title form-control"
                                    name="title"
                                    disabled= { disabledEdit }
                                    onChange={handleChangeFormInputs}
                                    value={eventSelected.title} /> */}
                            <TextArea placeholder='Tell us more' />
                        </div>
                        <div className="Modal-content-invitados--content-input-organizer">                         
                            <input  type="email"
                                    placeholder="correo@ejemplo.com"
                                    className="Modal-content-invitados-content--input-organizer form-control"
                                    name="organizer"
                                    disabled= { true }
                                    // disabled= { disabledEdit }
                                    onChange={handleChangeFormInputs}
                                    value={eventSelected.organizer} />
                        </div>
                        <LocalizationProvider dateAdapter={AdapterDateFns} >
                            <Stack spacing={3}>
                                <div className="Modal-content--time">
                                    <div className="Modal-content--time-timeStart">
                                        <DateTimePicker
                                            renderInput={(props) => <TextField {...props} />}
                                            label="Inicio"
                                            value={eventSelected.start}
                                            onChange={(newValue) => { setEventSelected({ ...eventSelected, start: newValue }) }}
                                        />
                                        {/* <StaticTimePicker
                                            ampm
                                            label="Inicio"
                                            orientation="portrait"
                                            openTo="minutes"
                                            disabled= { disabledEdit }
                                            value={eventSelected.start}
                                            onChange={(newValue) => { setEventSelected({ ...eventSelected, start: newValue }) }}
                                            renderInput={(params) => <TextField {...params} />}
                                        /> */}
                                    </div>
                                    <div className="Modal-content--time-timeEnd">
                                        <DateTimePicker
                                            renderInput={(props) => <TextField {...props} />}
                                            label="Fin"
                                            value={eventSelected.end}
                                            onChange={(newValue) => { setEventSelected({ ...eventSelected, end: newValue }) }}
                                        />
                                        {/* <StaticTimePicker
                                            ampm
                                            label="Fin"
                                            orientation="portrait"
                                            openTo="minutes"
                                            disabled= { disabledEdit }
                                            value={eventSelected.end}
                                            onChange={(newValue) => { setEventSelected({ ...eventSelected, end: newValue }) }}
                                            renderInput={(params) => <TextField {...params} />}
                                        /> */}
                                    </div>
                                </div>
                            </Stack>
                        </LocalizationProvider>

                        <div className="Modal-content-invitados">
                            <div>
                                <label className="Modal-content-invitados--label form-label">Correo electrónico</label>
                            </div>

                            {formFields.map((form, index) => (
                                <div className="Modal-content-invitados--content" key={index}>
                                    <input  type="email"
                                            placeholder="correo@ejemplo.com"
                                            className="Modal-content-invitados--content-input form-control"
                                            name="correo"
                                            disabled= { disabledEdit }
                                            onChange={event => handleChangeTimePicker(event, index)}
                                            value={form.correo} />
                                    <button type="button" 
                                            className="Modal-content-invitados--content-removeBtn btn btn-danger"
                                            disabled= { disabledEdit }
                                            onClick={ () => removeFields(index)} >
                                        <i className="fa-solid fa-trash-can"></i>
                                    </button>                                    
                                </div>
                            )
                            )}
                            <div>
                                <button className="Modal-content-invitados--add btn btn-outline-primary"
                                        disabled= { disabledEdit }
                                        onClick={addFields} >
                                    <i className="fa-solid fa-circle-plus"></i>
                                    Nuevo invitado
                                </button>
                                { encontrarHueco &&
                                    <button className="Modal-content-encontrar-hueco--button btn btn-primary"
                                        disabled= { disabledEdit }
                                        onClick={() => setViewHueco(!viewHueco)} 
                                        >
                                        Encontrar un hueco
                                    </button>
                                }
                            </div>

                            <div className="Modal-content--save">
                                <button className="Modal-content-save--button btn btn-primary"
                                        disabled= { disabledEdit }
                                        onClick={handleSave} >
                                    <i className="fa-solid fa-floppy-disk"></i>
                                    Guardar cambios
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </ReactModal>
        </div>
    );
}

export default ModalEvent;