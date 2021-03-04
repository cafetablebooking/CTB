import * as Yup from 'yup';
import moment from 'moment';
import * as geolib from 'geolib';
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

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('This field is required.'),
  password: Yup.string()
    .min(8, 'Minimum 8 symbols')
    .max(60, 'Maximum 60 symbols')
    .required('This field is required.'),
});
export const registerSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(60, 'Maximum 60 symbols')
    .required('This field is required.'),
  password: Yup.string()
    .min(8, 'Minimum 8 symbols')
    .max(60, 'Maximum 60 symbols')
    .required('This field is required.'),
  confirmPassword: Yup.string()
    .min(8, 'Minimum 8 symbols')
    .max(60, 'Maximum 60 symbols')
    .required('This field is required.')
    .when('password', {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref('password')],
        "Password and Confirm Password didn't match"
      ),
    }),
});
export const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('This field is required.'),
});
