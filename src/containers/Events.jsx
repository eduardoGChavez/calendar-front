import React, { useState, useContext, useEffect } from "react";
import { Calendar, dateFnsLocalizer, momentLocalizer } from "react-big-calendar";
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import moment from "moment";
// import events from "./events";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ModalEvent from "../components/ModalEvent";
import "../styles/containers/Events.css"
import UserContext from "../context/UserContext";
// import { compareAsc, format } from 'date-fns'

import '@trendmicro/react-modal/dist/react-modal.css';
import randomColor from "randomcolor";
import Modal from '@trendmicro/react-modal';


moment.locale("en-GB");
// const localizer = momentLocalizer(moment);
const locales = {
    "es-MX": require ("date-fns/locale/es")
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
})

const Events = () => {
    const { userState, addUser } = useContext(UserContext);
    const [showModal, setShowModal] = useState(false);
    const [eventSelected, setEventSelected] = useState({});
    const [disabledEdit, setDisabledEdit] = useState(true);
    const [eventsData, setEventsData] = useState([]);
    const [newEvent, setNewEvent] = useState();
    const sesionData = JSON.parse(localStorage.getItem('sesion'));
    const now = new Date();

    useEffect(() => {
        getEvents();
    }, []);

    const getEvents = async () => {
        try {
            let config = {
                method: 'GET',
                headers: {
                  Accept: 'application.json',
                  'Content-Type': 'application/json'
                },
                cache: 'default'
            }
            let res = await fetch(`http://52.53.149.201:8000/events/${sesionData.email}`, config);
            let resJson = await res.json();

            let fechaTiempoStart;
            let fechaStart;
            let tiempoStart;
            let fechaTiempoEnd;
            let fechaEnd;
            let tiempoEnd;
            if(resJson.length > 0) {
                for(let i = 0; i < resJson.length; i++) {
                    resJson[i].start = resJson[i].start.replace('T', ' ');
                    resJson[i].start = resJson[i].start.replace('Z', ' ');
                    resJson[i].end = resJson[i].start.replace('T', ' ');
                    resJson[i].end = resJson[i].start.replace('Z', ' ');

                    fechaTiempoStart = resJson[i].start.split(" ");
                    fechaStart = fechaTiempoStart[0].split("-");
                    tiempoStart = fechaTiempoStart[1].split(":");
                    resJson[i].start = new Date(parseInt(fechaStart[0]), (parseInt(fechaStart[1]) - 1), parseInt(fechaStart[2]), parseInt(tiempoStart[0]), parseInt(tiempoStart[1]), 0)

                    fechaTiempoEnd = resJson[i].end.split(" ");
                    fechaEnd = fechaTiempoEnd[0].split("-");
                    tiempoEnd = fechaTiempoEnd[1].split(":");
                    resJson[i].end = new Date(parseInt(fechaEnd[0]), (parseInt(fechaEnd[1]) - 1), parseInt(fechaEnd[2]), parseInt(tiempoEnd[0]), parseInt(tiempoEnd[1]), 0)
                }
                setEventsData(resJson);
            }
        } catch (error) {
            alert('No se pudieron obtener los eventos relacionados a la sesión actual');
            console.log(error.message);
        }
    }
    
    const addEventData = (event) => {
        eventsData.push(event);
    }
    const updateEventData = (event) => {
        // let arrayTmp = [...eventsData]; // copying the old datas array
        // arrayTmp[arrayTmp.findIndex((element) => element.id === event.id)] = event;
        // let arrayTmp = eventsData;
        // arrayTmp.forEach((element) => {
        //     if(element.id = event.id) {
        //         element = event;
        //         return false;
        //     }
        // });
        // setEventsData(arrayTmp);
    }
    const removeEventData = (id) => {
        eventsData.splice(eventsData.findIndex((element) => element.id === id), 1);
    }


    const handleSelect = ({ start, end }) => {
        setEventSelected({
            id: 0,
            title: "",
            start: start,
            end: start,
            organizer: sesionData.email,
            guests: []
        });
        setDisabledEdit(false);
        setShowModal(!showModal);
        setNewEvent(true);
    }
    const handleModal = (e) => {
        setEventSelected(e);
        setDisabledEdit(true);
        setShowModal(!showModal);
        setNewEvent(false);
    }


    return (
        <div className="App">
            <Calendar
                views={["day", "agenda", "work_week", "month"]}
                selectable
                localizer={localizer}
                defaultDate={now}
                defaultView="month"
                // events={events}
                events={eventsData}
                style={{ height: "100vh" }}
                onSelectEvent={(e) => handleModal(e)}
                startAccesor='start'
                endAccessor='end'
                // onSelectEvent={<ModalEvent/>}
                onSelectSlot={(e) => handleSelect(e)}s={{
                    next: ">",
                    previous: "<",
                    today: "Hoy",
                    month: "Mes",
                    week: "Semana",
                    day: "Día",
                    work_week: "Semana",
                }}
                eventPropGetter={
                    (event, start, end, isSelected) => {
                        // let color = randomColor();
                        let newStyle = {
                            backgroundColor: "#3174ad",
                            color: '#ffffff',
                            // borderRadius: "0px",
                            // border: "none"
                        };

                        // if (event.isMine){
                        //     newStyle.backgroundColor = "lightgreen"
                        // }

                        return {
                            className: "",
                            style: newStyle
                        };
                    }
                }
            />
            {showModal &&
                <ModalEvent showModal={true}
                            setShowModal={setShowModal}
                            eventSelected={eventSelected}
                            setEventSelected={setEventSelected}
                            disabledEdit={disabledEdit}
                            setDisabledEdit={setDisabledEdit}
                            newEvent={newEvent} 
                            addEventData={addEventData}
                            updateEventData={updateEventData}
                            removeEventData={removeEventData}
                            getEvents={getEvents}/>
            }
        </div>
    );
}


export default Events;