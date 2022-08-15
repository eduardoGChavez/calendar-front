import React, { useState, useContext, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
// import events from "./events";
import "react-big-calendar/lib/css/react-big-calendar.css";
import ModalEvent from "../components/ModalEvent";
import "../styles/containers/Events.css"
import UserContext from "../context/UserContext";
const now = new Date();

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

const Events = () => {
    const { userState, addUser } = useContext(UserContext);
    const [showModal, setShowModal] = useState(false);
    const [eventSelected, setEventSelected] = useState({});
    const [disabledEdit, setDisabledEdit] = useState(true);
    const [eventsData, setEventsData] = useState([]);
    const [newEvent, setNewEvent] = useState();
    const sesionData = JSON.parse(localStorage.getItem('sesion'));

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
            let res = await fetch(`http://localhost:8000/events/${sesionData.email}`, config);
            let resJson = await res.json();
            // navigate('/');
            setEventsData(resJson);
            console.log(eventsData);
        } catch (error) {
            alert('No se pudieron obtener los eventos relacionados a la sesión actual');
            console.log(error.message);
        }
    }

    const events = [
        {
          id: 25,
          title: "Example2",
          start: new Date(2022, 7, 6, 2, 0, 0),
          end: new Date(2022, 7, 6, 3, 0, 0),
          organizer: "organizador@prueba.com",
          guests: []
        },
        {
          id: 26,
          title: "Example3",
          // allDay: true,
          start: new Date(2022, 7, 5, 2, 0, 0),
          end: new Date(2022, 7, 5, 3, 0, 0),
          organizer: "organizador@prueba.com",
          guests: [{correo: "blabla1@gmail.com"}, {correo: "blabla2@gmail.com"}]
        }
    ];

    const handleSelect = ({ start, end }) => {
        setEventSelected({
            id: 0,
            title: "",
            start: start,
            end: end,
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
                defaultDate={new Date()}
                defaultView="month"
                events={eventsData}
                style={{ height: "100vh" }}
                onSelectEvent={(e) => handleModal(e)}
                // onSelectEvent={<ModalEvent/>}
                onSelectSlot={handleSelect}
                header={{
                    left: "previous,next today",
                    // center: "title",
                    // right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
                }}
                messages={{
                    next: ">",
                    previous: "<",
                    today: "Hoy",
                    month: "Mes",
                    week: "Semana",
                    day: "Día",
                    work_week: "Semana",
                }}
            />
            {showModal &&
                <ModalEvent showModal={true}
                            setShowModal={setShowModal}
                            eventSelected={eventSelected}
                            setEventSelected={setEventSelected}
                            disabledEdit={disabledEdit}
                            setDisabledEdit={setDisabledEdit}
                            newEvent={newEvent} />
            }
        </div>
    );
}


export default Events;