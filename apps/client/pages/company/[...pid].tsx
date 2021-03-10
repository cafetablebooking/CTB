import React, { useContext } from 'react';
import { Typography, Button } from '@material-ui/core';

import { useRouter } from 'next/router';

import { useForm } from 'react-hook-form';
import {
  Wrapper,
  CoverImage,
  Separator,
  CompanyContent,
  OpeningHours,
  TextBox,
  CalendarWrapper,
} from '../../styles/companyDetailStyles';
import {
  ImageInnerCircle,
  ImageOuterCircle,
} from 'apps/client/styles/companyDetailStyles';
import Image from 'next/image';

import { ClientContext } from 'apps/client/contexts/ClientContext';
import moment from 'moment';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import { firestore, firebase } from '@ctb/firebase-auth';
import 'react-big-calendar/lib/css/react-big-calendar.css';
interface Props {}
type WeekDay = 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat';
const localizer = momentLocalizer(moment);
const ValueMap: { [value in WeekDay]: string } = {
  Sun: 'Sunday',
  Mon: 'Monday',
  Tue: 'Tuesday',
  Wed: 'Wednesday',
  Thu: 'Thursday',
  Fri: 'Friday',
  Sat: 'Saturday',
} as const;
const companyDetail = (props: Props) => {
  const { register, handleSubmit, watch, errors } = useForm({});
  const { companies }: any = useContext(ClientContext);
  const router = useRouter();
  const companyId = router.query.pid && router.query.pid[0];

  const company = companies && companies.find((item) => item.id === companyId);

  const renderOpeniningHours = () => {
    const openingDay =
      company &&
      company.openingHours.map((item) => {
        const weekDay = ValueMap[item.day];

        return (
          <div key={item.day}>
            <Typography variant="body2">
              <b>{weekDay}</b>
            </Typography>
            <Typography variant="caption">
              {item.open + '-' + item.closed}
            </Typography>
          </div>
        );
      });
    return openingDay;
  };
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

  const selectSlotsHandler = (slots) => {
    const formatStart = moment(slots.start).format('YYYY-MM-DDTHH:mm:ss');
    const formatEnd = moment(slots.end).format('YYYY-MM-DDTHH:mm:ss');

    const bookedTimes = {
      allDay: true,
      start: formatStart,
      end: formatEnd,
      resourceId: slots.resourceId,
    };
    var companyRef = firestore.collection('companies').doc(company.id);

    companyRef.update({
      bookedTimes: firebase.firestore.FieldValue.arrayUnion(bookedTimes),
    });
  };
  const onSubmit = (data) => {};
  return (
    <>
      {company && (
        <Wrapper>
          <CoverImage coverimage={company.coverImage}></CoverImage>

          <Separator>
            <div
              style={{
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                left: '5vw',
              }}
            >
              <ImageOuterCircle>
                <ImageInnerCircle>
                  <Image
                    src={company.image}
                    alt="Avatar Image For Companies"
                    layout="fill"
                  />
                </ImageInnerCircle>
              </ImageOuterCircle>
              <TextBox>
                <Typography variant="h5">{company.companyName}</Typography>

                <Typography>
                  {company.adress.name} {company.adress.postalCode}{' '}
                  {company.adress.city}
                </Typography>
              </TextBox>
            </div>
            <Button
              style={{
                marginRight: '5vw',
                width: '242.5px',
                height: '56px',
              }}
              color="primary"
              variant="contained"
              type="submit"
            >
              Book now
            </Button>
          </Separator>

          <CompanyContent>
            <OpeningHours>
              <Typography variant="h6">Bookable times</Typography>
              {renderOpeniningHours()}
            </OpeningHours>
            <CalendarWrapper>
              {/* <FullCalendar
                allDaySlot={false}
                schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
                plugins={[interactionPlugin, resourceTimeGridPlugin]}
                initialView="resourceTimeGridDay"
                nowIndicator={true}
                editable={false}
                initialEvents={company.availableBookings}
                initialResources={company.tables}
                slotMinTime="09:00:00"
                slotMaxTime="21:00:00"
                hiddenDays={[]}
                eventClick={(e) => console.log(e.event._def.resourceIds[0])}
                slotLabelFormat={{
                  hour12: false,
                  hour: '2-digit',
                  minute: '2-digit',
                  omitZeroMinute: false,
                  meridiem: 'narrow',
                }}
              /> */}
              <Calendar
                eventPropGetter={eventStyle}
                selectable
                onSelectSlot={selectSlotsHandler}
                events={company.bookedTimes}
                localizer={localizer}
                defaultView={Views.DAY}
                views={['day', 'work_week']}
                step={30}
                resources={company.tables}
                resourceIdAccessor="resourceId"
                resourceTitleAccessor="resourceTitle"
              />
            </CalendarWrapper>
          </CompanyContent>
        </Wrapper>
      )}
    </>
  );
};

export default companyDetail;
