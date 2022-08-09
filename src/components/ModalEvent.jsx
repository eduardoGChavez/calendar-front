import React, { useState } from "react";
import ReactModal from "react-modal";
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';
// import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import "../styles/components/ModalEvent.css"

// import { CTimePicker } from '@coreui/react-pro'

const ModalEvent = ({ showModal, handleModal, eventSelected, setEventSelected, testString }) => {
    const [disabledEdit, setDisabledEdit] = useState(true);
    const [formFields, setFormFields] = useState(eventSelected.guests)
    // const [formFields, setFormFields] = useState([{correo: 'aaaa'}]);
    // console.log("---------------------------------------------------------")
    // console.log(formFields)
    // console.log(eventSelected)
    // console.log("---------------------------------------------------------")
    
    const handleDelete = (e) => {
        e.preventDefault();
        setEventSelected({ ...eventSelected, guests: [...formFields] });
        // Elimnar elemento de la base de datos
        console.log(eventSelected);
    }

    const handleFormChange = (event, index) => {
        let data = [...formFields];
        data[index][event.target.name] = event.target.value;
        setFormFields(data);
    }

    const addFields = () => {
        let object = {
            correo: ''
        }

        setFormFields([...formFields, object])
    }

    const removeFields = (index) => {
        let data = [...formFields];
        data.splice(index, 1);
        setFormFields(data);
    }

    const handleSave = (e) => {
        e.preventDefault();
        setEventSelected({ ...eventSelected, guests: [...formFields] });
        console.log(eventSelected);
    }

    return (
        <div className="Modal-container">
            {/* <button onClick={toggleModal}>Open modal</button> */}

            <ReactModal
                isOpen={showModal}
                onRequestClose={handleModal}
                contentLabel="My dialog"
            >
                <div className="Modal-content">
                    <div className="Modal-content-buttons--buttons">
                        <button className={disabledEdit ? "Modal-content--edit btn" : "Modal-content--edit active btn"} 
                                onClick={() => setDisabledEdit(!disabledEdit)}
                                title="Editar evento" >
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>

                        <button className="Modal-content-buttons--delete btn"
                                onClick={handleDelete}
                                title="Eliminar evento" >
                            <i class="fa-solid fa-trash-can"></i>
                        </button>

                        <button className="Modal-content-buttons--close btn btn-danger"
                                onClick={handleModal}
                                title="Cerrar ventana" >
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                    
                    <div className="Modal-content--body">
                        <div>                         
                            <input  type="text"
                                    placeholder="correo@ejemplo.com"
                                    className="Modal-content-invitados--content-input-title form-control"
                                    name="title"
                                    disabled= { disabledEdit }
                                    // onChange={event => handleFormChange(event, index)}
                                    value={eventSelected.title} />
                        </div>
                        <div>                         
                            <input  type="email"
                                    placeholder="correo@ejemplo.com"
                                    className="Modal-content-invitados--content-input-organizer form-control"
                                    name="organizer"
                                    disabled= { true }
                                    value={eventSelected.organizer} />
                        </div>
                        <LocalizationProvider dateAdapter={AdapterDateFns} >
                            <Stack spacing={1}>
                                <div className="Modal-content--time">
                                    <div className="Modal-content--time-timeStart">
                                        <StaticTimePicker
                                            ampm
                                            label="Inicio"
                                            orientation="portrait"
                                            openTo="minutes"
                                            disabled= { disabledEdit }
                                            value={eventSelected.start}
                                            onChange={(newValue) => { setEventSelected({ ...eventSelected, start: newValue }) }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </div>
                                    <div className="modal-content--time-timeEnd">
                                        <StaticTimePicker
                                            ampm
                                            label="Fin"
                                            orientation="portrait"
                                            openTo="minutes"
                                            disabled= { disabledEdit }
                                            value={eventSelected.end}
                                            onChange={(newValue) => { setEventSelected({ ...eventSelected, end: newValue }) }}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
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
                                            onChange={event => handleFormChange(event, index)}
                                            value={form.correo} />
                                    <button type="button" 
                                            class="Modal-content-invitados--content-removeBtn btn btn-danger"
                                            disabled= { disabledEdit }
                                            onClick={ () => removeFields(index)} >
                                        <i class="fa-solid fa-trash-can"></i>
                                    </button>                                    
                                </div>
                            )
                            )}
                            <div>
                                <button className="btn btn-outline-primary"
                                        disabled= { disabledEdit }
                                        onClick={addFields} >
                                    <i class="fa-solid fa-circle-plus"></i>
                                    Nuevo invitado
                                </button>
                            </div>
                            
                            <div className="Modal-content--save">
                                <button className="Modal-content-save--button btn btn-primary"
                                        disabled= { disabledEdit }
                                        onClick={handleSave} >
                                    <i class="fa-solid fa-floppy-disk"></i>
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