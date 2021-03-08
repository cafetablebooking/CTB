import * as geolib from 'geolib';
import moment from 'moment';
import Geocode from 'react-geocode';
import { db } from '@ctb/firebase-auth';

export const getCompaniesData = async () => {
  const companiesRef = db.collection('companies');
  const dataArray = [];
  const editedDataArray = [];
  let allCompanies = await companiesRef.get();
  for (const doc of allCompanies.docs) {
    dataArray.push(doc.data());
  }
  dataArray.map(async (item) => {
    //   const response = await Geocode.fromAddress(
    //     `${item.adress.name} ${item.adress.city} ${item.adress.postalCode}`
    //   );

    //   const { lat, lng } = response && response.results[0].geometry.location;

    const availableBookings = item.availableBookings.map((booking) => {
      const startTime = moment(booking.start, 'YYYY-MM-DD HH:mm:ss').toDate();
      const endTime = moment(booking.end, 'YYYY-MM-DD HH:mm:ss').toDate();
      return {
        title: booking.title,
        start: startTime,
        end: endTime,
        resourceId: booking.resourceId,
      };
    });
    const options = {
      ...item,
      availableBookings: availableBookings,
      coordinates: {
        lat: 59,
        lng: 18,
      },
    };
    editedDataArray.push(options);
  });

  return editedDataArray;
};

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
