import React from 'react';
import { navigate } from 'react-big-calendar/lib/utils/constants';
import dates from 'react-big-calendar/lib/utils/dates';
interface Props {}

const WorkWeekViewComponent = (props: Props) => {
  return <div></div>;
};
WorkWeekViewComponent.title = (date, { localizer }) =>
  localizer.format(date, 'yearHeaderFormat');
WorkWeekViewComponent.navigate = (date, action) => {
  switch (action) {
    case navigate.PREVIOUS:
      return dates.add(date, -1, 'year');

    case navigate.NEXT:
      return dates.add(date, 1, 'year');

    default:
      return date;
  }
};
export default WorkWeekViewComponent;
