/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-empty-interface */
import React from 'react';
import { Calendar, Views, globalizeLocalizer } from 'react-big-calendar';
import globalize from 'globalize';

import Layout from '../../components/layout/layout';
import '../../../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css';
// react - big - calendar / lib / css / react - big - calendar.css;

const events = [
  {
    id: 0,
    title: 'Table 1',
    start: new Date(2021, 0, 29, 9, 0, 0),
    end: new Date(2021, 0, 29, 13, 0, 0),
    resourceId: 1,
  },
  {
    id: 1,
    title: 'Table 2',
    allDay: true,
    start: new Date(2021, 0, 29, 14, 0, 0),
    end: new Date(2021, 0, 29, 16, 30, 0),
    resourceId: 2,
  },
  {
    id: 2,
    title: 'Table 3',
    start: new Date(2021, 0, 29, 8, 30, 0),
    end: new Date(2021, 0, 29, 12, 30, 0),
    resourceId: 3,
  },
  {
    id: 11,
    title: 'Table 4',
    start: new Date(2018, 0, 30, 7, 0, 0),
    end: new Date(2018, 0, 30, 10, 30, 0),
    resourceId: 4,
  },
];

const resourceMap = [
  { resourceId: 1, resourceTitle: 'Table 1' },
  { resourceId: 2, resourceTitle: 'Table 2' },
  { resourceId: 3, resourceTitle: 'Table 3' },
  { resourceId: 4, resourceTitle: 'Table 4' },
];

interface reservationProps {}
const localizer = globalizeLocalizer(globalize);

const reservation: React.FC<reservationProps> = ({}) => {
  return (
    <Layout>
      <Calendar
        events={events}
        localizer={localizer}
        defaultView={Views.DAY}
        views={['day', 'work_week']}
        step={30}
        defaultDate={new Date()}
        resources={resourceMap}
        resourceIdAccessor="resourceId"
        resourceTitleAccessor="resourceTitle"
        style={{ height: 500 }}
      />
    </Layout>
  );
};

export default reservation;
