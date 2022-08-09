import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import resourceTimeGridPlugin from "@fullcalendar/resource-timegrid";
import { useState } from "react";

const CreateEvent = () => {
    const events = [
        { title: "All Day Event", start: getDate("YEAR-MONTH-01") },
        {
            title: "Long Event",
            start: getDate("YEAR-MONTH-07"),
            end: getDate("YEAR-MONTH-10")
        },
        {
            groupId: "999",
            title: "Repeating Event",
            start: getDate("YEAR-MONTH-09T16:00:00+00:00")
        },
        {
            groupId: "999",
            title: "Repeating Event",
            start: getDate("YEAR-MONTH-16T16:00:00+00:00")
        },
        {
            title: "Conference",
            start: "YEAR-MONTH-17",
            end: getDate("YEAR-MONTH-19")
        },
        {
            title: "Meeting",
            start: getDate("YEAR-MONTH-18T10:30:00+00:00"),
            end: getDate("YEAR-MONTH-18T12:30:00+00:00")
        },
        { title: "Lunch", start: getDate("YEAR-MONTH-18T12:00:00+00:00") },
        { title: "Birthday Party", start: getDate("YEAR-MONTH-19T07:00:00+00:00") },
        { title: "Meeting", start: getDate("YEAR-MONTH-18T14:30:00+00:00") },
        { title: "Happy Hour", start: getDate("YEAR-MONTH-18T17:30:00+00:00") },
        { title: "Dinner", start: getDate("YEAR-MONTH-18T20:00:00+00:00") }
    ];
    
    function getDate(dayString) {
        const today = new Date();
        const year = today.getFullYear().toString();
        let month = (today.getMonth() + 1).toString();

        if (month.length === 1) {
            month = "0" + month;
        }

        return dayString.replace("YEAR", year).replace("MONTH", month);
    }

    return (
        <div className="CreateEvent-container">

            <div>
                {/* <FullCalendar
                    schedulerLicenseKey="GPL-My-Project-Is-Open-Source"
                    //   ref={this.calendarComponentRef}
                    defaultView="dayGridMonth"
                    //   dateClick={this.handleDateClick}
                    displayEventTime={true}
                    header={{
                        left: "prev,next today",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
                    }}
                    selectable={true}
                    plugins={[
                        dayGridPlugin,
                        interactionPlugin,
                        timeGridPlugin,
                        resourceTimeGridPlugin
                    ]}
                    //   eventClick={event => {
                    //     console.log(event.event._def.publicId);
                    //   }}
                    //   events={this.state.events}
                    //   select={this.handleSelectedDates}
                    eventLimit={3}
                /> */}





                <FullCalendar
                    defaultView="dayGridMonth"
                    header={{
                        left: "prev,next",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay"
                    }}
                    themeSystem="Simplex"
                    plugins={[dayGridPlugin, interactionPlugin]}
                    events={events}
                />
                <FullCalendar
                    defaultView="dayGridMonth"
                    // themeSystem="Simplex"
                    // header={{
                    //   left: "prev,next",
                    //   center: "title",
                    //   right: "dayGridMonth,timeGridWeek,timeGridDay",
                    // }}
                    plugins={[dayGridPlugin, interactionPlugin]}
                    events={events}
                    displayEventEnd="true"
                    onClick={() => alert("Has hecho click en algo")}
                    dateClick={() => alert("Has hecho click en un día")}
                    eventClick={() => alert("Has hecho click en un evento")}
                    // eventColor={"#" + Math.floor(Math.random() * 16777215).toString(16)}
                />
            </div>
        </div>
    );
}

export default CreateEvent;