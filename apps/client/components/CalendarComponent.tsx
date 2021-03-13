import React, { useEffect, useState, Children } from 'react';
import { CalendarWrapper } from '../styles/companyDetailStyles';
import { getTableBookingById } from './utils';
import moment from 'moment';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styled from 'styled-components';
const localizer = momentLocalizer(moment);
interface Props {
  companyId: string;
  setOpenConfirmBox: (value: boolean) => void;
  setBookedInfo: (value: object) => void;
  success: boolean;
}

const CalendarComponent = (props: Props) => {
  const { companyId, setOpenConfirmBox, setBookedInfo, success } = props;

  const [tableBookingsById, setTableBookingsById] = useState<object | null>(
    null
  );

  const handleBookingsById = async () => {
    const data = await getTableBookingById(companyId);
    setTableBookingsById(data);
  };
  useEffect(() => {
    handleBookingsById();
  }, [success]);

  function eventStyle(event, start, end, isSelected) {
    var style = {
      backgroundColor: isSelected ? '#cc354e' : '#b5102c',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'black',
      border: '0px',
      display: 'block',
    };
    return {
      style: style,
    };
  }
  function slotStyle(date) {
    const currentDate = moment()._d;
    const timeHasPassed = date < currentDate ? true : false;
    console.log(timeHasPassed);

    var style = {
      backgroundColor: timeHasPassed ? 'red' : 'inherit',
      backgroundPosition: 'center',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'black',
      border: '0px',
      display: 'block',
    };
    return {
      style: style,
    };
  }
  const selectSlotsHandler = (slots) => {
    const formatStart = moment(slots.start).format('YYYY-MM-DDTHH:mm:ss');
    const formatEnd = moment(slots.end).format('YYYY-MM-DDTHH:mm:ss');

    const bookedTimes = {
      allDay: true,
      start: formatStart,
      end: formatEnd,
      resourceId: slots.resourceId,
    };

    setOpenConfirmBox(true);
    setBookedInfo(bookedTimes);
  };

  const bookedTimes =
    tableBookingsById &&
    Object(tableBookingsById).bookedTimes.map((booking) => {
      const startTime = moment(booking.start, 'YYYY-MM-DD HH:mm:ss').toDate();
      const endTime = moment(booking.end, 'YYYY-MM-DD HH:mm:ss').toDate();
      return {
        title: 'Booked',
        start: startTime,
        end: endTime,
        resourceId: booking.resourceId,
      };
    });

  return (
    <CalendarWrapper>
      {tableBookingsById && (
        <Calendar
          min={new Date(2021, 1, 0, 9, 0, 0)}
          max={new Date(2021, 1, 0, 21, 0, 0)}
          eventPropGetter={eventStyle}
          selectable
          onSelectSlot={selectSlotsHandler}
          events={bookedTimes}
          localizer={localizer}
          defaultView={Views.DAY}
          formats={{
            timeGutterFormat: (date, culture, localizer) =>
              localizer.format(date, 'HH:mm', culture),
          }}
          views={['day', 'work_week']}
          step={30}
          resources={Object(tableBookingsById).resources}
          resourceIdAccessor="resourceId"
          resourceTitleAccessor="resourceTitle"
        />
      )}
    </CalendarWrapper>
  );
};
const StyledSlots = styled.div``;
export default CalendarComponent;
