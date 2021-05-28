import * as geolib from 'geolib';
import moment from 'moment';

import { firestore } from '@ctb/firebase-auth';
const currentDate = moment()._d;

const formatDate = moment(currentDate).format('YYYY-MM-DD HH:mm');
const start = moment(formatDate);
const roundTo = 30 - (start.minute() % 30);

export const currentDateRoundTo = moment(start).add(roundTo, 'minutes')._d;

export const getTableBookingById = async (id) => {
  let data = null;
  const tablesRef = firestore
    .collection('tableBookings')
    .where('companyId', '==', id);
  const companyTables = await tablesRef.get();

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

  const data = [];
  const allCompanies = await companiesRef.get();

  for (const doc of allCompanies.docs) {
    data.push({
      ...doc.data(),
      id: doc.id,
    });
  }

  return data;
};

export const getOpeningHours = (item, day) => {
  if (!item) return;
  const today = item[day];
  const { open, closed } = today;
  let isOpen = false;
  const format = 'hh:mm:ss';
  const date = moment.utc().format('YYYY-MM-DD HH:mm:ss');

  const stillUtc = moment.utc(date).toDate();
  const time = moment(stillUtc).local();

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
