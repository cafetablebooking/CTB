import * as Yup from 'yup';

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

export const creatCompanyUserSchema = Yup.object().shape({
  displayName: Yup.string().required(),
  email: Yup.string().required().email(),
  password: Yup.string()
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'
    ),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match'
  ),
  message: Yup.string().required(),
});
