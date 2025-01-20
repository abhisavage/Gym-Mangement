import React from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import { PageContainer } from '../../styles/CommonStyles';

const MainContent = styled.div`
  margin-left: 280px;
  padding: 30px;
  flex-grow: 1;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Title = styled.h1`
  color: #1A1B4B;
  font-size: 28px;
  font-weight: 600;
`;

const FormCard = styled.div`
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  max-width: 600px;
  margin: 0 auto;
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #1A1B4B;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 2px solid #eee;
  border-radius: 8px;
  font-size: 15px;
  
  &:focus {
    outline: none;
    border-color: #1A1B4B;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 30px;
`;

const Button = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
`;

const SaveButton = styled(Button)`
  background: #1A1B4B;
  color: white;
  border: none;
  
  &:hover {
    background: #2A2B5B;
  }
`;

const CancelButton = styled(Button)`
  background: white;
  border: 1.5px solid #1A1B4B;
  color: #1A1B4B;
  
  &:hover {
    background: rgba(26, 27, 75, 0.05);
  }
`;

const ErrorMessage = styled.div`
  color: #ff0000;
  font-size: 12px;
  margin-top: 5px;
`;

// Validation Schema
const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .required('Full name is required')
    .min(3, 'Name must be at least 3 characters'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(/[0-9]/, 'Password requires at least 1 number')
    .matches(/[A-Z]/, 'Password requires at least 1 uppercase letter')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
  contactNo: Yup.string()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(11, 'Must be exactly 11 digits')
    .max(11, 'Must be exactly 11 digits')
    .required('Contact number is required'),
  role: Yup.string()
    .required('Role is required')
});

const RegisterAdmin = () => {
  const navigate = useNavigate();

  const initialValues = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    contactNo: '',
    role: 'admin'
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Here you would typically make an API call to register the admin
      console.log('Registering admin:', values);
      
      toast.success('Admin registered successfully!');
      navigate('/admin/profile');
    } catch (error) {
      toast.error('Failed to register admin');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageContainer>
      <Sidebar />
      <MainContent>
        <Header>
          <Title>Register New Admin</Title>
        </Header>

        <FormCard>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
              <Form>
                <InputGroup>
                  <Label>Full Name</Label>
                  <Input
                    type="text"
                    name="fullName"
                    value={values.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.fullName && errors.fullName && (
                    <ErrorMessage>{errors.fullName}</ErrorMessage>
                  )}
                </InputGroup>

                <InputGroup>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.email && errors.email && (
                    <ErrorMessage>{errors.email}</ErrorMessage>
                  )}
                </InputGroup>

                <InputGroup>
                  <Label>Password</Label>
                  <Input
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.password && errors.password && (
                    <ErrorMessage>{errors.password}</ErrorMessage>
                  )}
                </InputGroup>

                <InputGroup>
                  <Label>Confirm Password</Label>
                  <Input
                    type="password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
                  )}
                </InputGroup>

                <InputGroup>
                  <Label>Contact Number</Label>
                  <Input
                    type="tel"
                    name="contactNo"
                    value={values.contactNo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.contactNo && errors.contactNo && (
                    <ErrorMessage>{errors.contactNo}</ErrorMessage>
                  )}
                </InputGroup>

                <ButtonGroup>
                  <CancelButton type="button" onClick={() => navigate('/admin-profile')}>
                    Cancel
                  </CancelButton>
                  <SaveButton type="submit" disabled={isSubmitting}>
                    Register Admin
                  </SaveButton>
                </ButtonGroup>
              </Form>
            )}
          </Formik>
        </FormCard>
      </MainContent>
    </PageContainer>
  );
};

export default RegisterAdmin; 