/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-empty-interface */
import React from 'react';
import { Calendar, Views, globalizeLocalizer } from 'react-big-calendar';
import globalize from 'globalize';

import withDragAndDrop from '../../../../../node_modules/react-big-calendar/lib/addons/dragAndDrop';

import Layout from '../../components/layout/layout';
import '../../../../../node_modules/react-big-calendar/lib/css/react-big-calendar.css';
import '../../../../../node_modules/react-big-calendar/lib/addons/dragAndDrop/styles.scss';

const DragAndDropCalendar = withDragAndDrop(Calendar);
// react - big - calendar / lib / css / react - big - calendar.css;

const events = [
  {
    id: 0,
    title: 'GH',
    start: new Date(2021, 2, 8, 12, 0, 0),
    end: new Date(2021, 2, 8, 13, 0, 0),
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
  { resourceId: 1, resourceTitle: 'Ramy' },
  { resourceId: 2, resourceTitle: 'Table 2' },
  { resourceId: 3, resourceTitle: 'Table 3' },
  { resourceId: 4, resourceTitle: 'Table 4' },
];

interface reservationProps {}
const localizer = globalizeLocalizer(globalize);

const reservation: React.FC<reservationProps> = ({}) => {
  return (
    <Layout>
      <DragAndDropCalendar
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
        resizable
      />
    </Layout>
  );
};

export default reservation;
