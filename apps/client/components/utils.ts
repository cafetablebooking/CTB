import * as geolib from 'geolib';
import moment from 'moment';
import Geocode from 'react-geocode';
import { firestore } from '@ctb/firebase-auth';
export const getTableBookingById = async (id) => {
  let data = null;
  const tablesRef = firestore
    .collection('tableBookings')
    .where('companyId', '==', id);
  let companyTables = await tablesRef.get();

  for (const doc of companyTables.docs) {
    data = doc.data();
  }
  return data;
};

export const getTableBookings = async () => {
  const allBookingsRef = firestore.collection('tableBookings');
  const data = [];
  const allBookings = await allBookingsRef.get();

  for (const doc of allBookings.docs) {
    data.push({
      ...doc.data(),
      docId: doc.id,
    });
  }
  return data;
};
export const getCompaniesData = async () => {
  const companiesRef = firestore.collection('companies');
  const tempArr = [];
  const data = [];
  let allCompanies = await companiesRef.get();

  for (const doc of allCompanies.docs) {
    tempArr.push({
      ...doc.data(),
      id: doc.id,
    });
  }
  tempArr.map(async (item) => {
    //   const response = await Geocode.fromAddress(
    //     `${item.adress.name} ${item.\adress.city} ${item.adress.postalCode}`
    //   );

    //   const { lat, lng } = response && response.results[0].geometry.location;

    const options = {
      ...item,
      coordinates: {
        lat: 59,
        lng: 18,
      },
    };
    data.push(options);
  });

  return data;
};

export const getOpeningHours = (item, day) => {
  if (!item) return;
  const today = item[day];
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

  return { today, isOpen };
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
