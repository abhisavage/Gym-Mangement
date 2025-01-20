import * as Yup from 'yup';

export const profileSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .required('Username is required'),
  contactNo: Yup.string()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(11, 'Must be exactly 11 digits')
    .max(11, 'Must be exactly 11 digits')
    .required('Contact number is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
});

export const passwordSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .required('Current password is required'),
  newPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[0-9]/, 'Password requires at least 1 number')
    .matches(/[A-Z]/, 'Password requires at least 1 uppercase letter')
    .required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Password confirmation is required'),
}); 