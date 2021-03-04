import * as geolib from 'geolib';
import moment from 'moment';
export const getOpeningHours = (day) => {
  const date = new Date();
  const getDay = date.getDay();
  const today = day[getDay];
  const { open, closed } = today;
  let isOpen = false;
  var format = 'hh:mm:ss';
  var time = moment();

  const beforeTime = moment(`${open}:00:00`, format);
  const afterTime = moment(`${closed}:00:00`, format);

  if (time.isBetween(beforeTime, afterTime)) {
    isOpen = true;
  } else {
    isOpen = false;
  }

  return isOpen ? today : null;
};
export const getDistance = (item: any, lat: number, lng: number) => {
  console.log(lat + ' ' + lng);

  return geolib.getDistance(
    {
      latitude: lat,
      longitude: lng,
    },
    {
      latitude: item.coordinates.lat,
      longitude: item.coordinates.lng,
    }
  );
};
