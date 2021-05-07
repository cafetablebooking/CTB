import React, { useEffect, useState, Children } from 'react';
import { CalendarWrapper } from '../styles/companyDetailStyles';
import { getOpeningHours, getTableBookingById } from './utils';
import moment from 'moment';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useMediaQuery } from '@material-ui/core';
import styled from 'styled-components';
import { currentDateRoundTo } from './utils';
const localizer = momentLocalizer(moment);
interface Props {
  companyId: string;
  setOpenConfirmBox: (value: boolean) => void;
  setBookedInfo: (value: Record<string, unknown>) => void;
  success: boolean;
  company: any;
}

const CalendarComponent = (props: Props) => {
  const {
    companyId,
    setOpenConfirmBox,
    setBookedInfo,
    success,
    company,
  } = props;
  const isDesktop = useMediaQuery('(min-width:768px)');
  const [tableBookingsById, setTableBookingsById] = useState<Record<string, unknown> | null>(
    null
  );

  const [showMin, setShowMin] = useState(null);
  const [showMax, setShowMax] = useState(null);
  const handleBookingsById = async () => {
    const data = await getTableBookingById(companyId);
    setTableBookingsById(data);
  };

  useEffect(() => {
    handleBookingsById();
    checkOpeningHours(currentDateRoundTo);
  }, [success]);

  function eventStyle(event, start, end, isSelected) {
    const style = {
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
    const timeHasPassed = date < currentDateRoundTo ? true : false;

    const style = {
      backgroundColor: timeHasPassed ? 'lightgray' : 'inherit',
      backgroundPosition: 'center',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'black',
      border: '0px',
      visibility: timeHasPassed ? 'hidden' : 'visible',
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

  const checkOpeningHours = (date) => {
    const getDay = moment(date).day();
    const getMonth = moment(date).month();
    const dayOfMonth = moment(date).date();

    const getYear = moment(date).year();

    const openingMin = getOpeningHours(company.openingHours, getDay).today.open;
    const openingMax = getOpeningHours(company.openingHours, getDay).today
      .closed;

    const minDate = new Date(getYear, getMonth, dayOfMonth, openingMin, 0, 0);
    const maxDate = new Date(getYear, getMonth, dayOfMonth, openingMax, 0, 0);
    if (currentDateRoundTo >= maxDate) {
      setShowMin(minDate);
      setShowMax(maxDate);
      return;
    }

    if (currentDateRoundTo >= minDate) {
      setShowMin(currentDateRoundTo);
    } else {
      setShowMin(minDate);
    }

    setShowMax(maxDate);
  };
  const futureEvents =
    bookedTimes &&
    bookedTimes.filter((item) => {
      return item.start >= currentDateRoundTo;
    });

  return (
    <CalendarWrapper>
      {tableBookingsById && (
        <Calendar
          min={showMin}
          max={showMax}
          eventPropGetter={eventStyle}
          selectable
          onSelectSlot={selectSlotsHandler}
          events={futureEvents}
          localizer={localizer}
          onRangeChange={(arr) => checkOpeningHours(arr[0])}
          slotPropGetter={slotStyle}
          defaultView={Views.DAY}
          formats={{
            timeGutterFormat: (date, culture, localizer) =>
              localizer.format(date, 'HH:mm', culture),
          }}
          views={isDesktop ? ['day', 'work_week'] : ['day']}
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
