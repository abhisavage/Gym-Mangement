import { useState } from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import {
  PageContainer,
  MainContent,
  Header,
  Logo,
  HeaderActions,
  FeedbackButton,
  NotificationIcon,
  Card,
  Button,
  Input
} from '../../styles/CommonStyles';

const Title = styled.h1`
  color: #1A1B4B;
  font-size: 32px;
  margin-bottom: 10px;
  animation: slideIn 0.4s ease-out;
`;

const Subtitle = styled.h2`
  color: #F4B740;
  font-size: 48px;
  margin-bottom: 30px;
  animation: slideIn 0.4s ease-out;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const FormCard = styled(Card)`
  margin-bottom: 30px;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-bottom: 30px;
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const Label = styled.label`
  display: block;
  color: #1A1B4B;
  font-size: 16px;
  margin-bottom: 10px;
`;

const StyledInput = styled(Input)`
  background: #F5F5F5;
  
  &:hover {
    background: #EFEFEF;
  }
`;

const DateInput = styled(StyledInput)`
  &::-webkit-calendar-picker-indicator {
    cursor: pointer;
  }
`;

const PlanSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  background: #F5F5F5;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #EFEFEF;
    transform: translateY(-2px);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(26, 27, 75, 0.1);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 30px;
`;

const AvailButton = styled(Button)`
  background: #1A1B4B;
  color: white;
  border: none;
  
  &:hover {
    background: #2A2B5B;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(26, 27, 75, 0.2);
  }
`;

const CancelButton = styled(Button)`
  background: white;
  border: 1px solid #1A1B4B;
  color: #1A1B4B;
  
  &:hover {
    background: #F5F5F5;
    transform: translateY(-2px);
  }
`;

const ErrorMessage = styled.div`
  color: #FF0000;
  font-size: 14px;
  margin-top: 5px;
  animation: slideIn 0.3s ease-out;
`;

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name is too short')
    .required('Name is required'),
  dateOfJoin: Yup.date()
    .required('Join date is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  contactNo: Yup.string()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(11, 'Must be exactly 11 digits')
    .max(11, 'Must be exactly 11 digits')
    .required('Contact number is required'),
  plan: Yup.string()
    .required('Plan selection is required'),
  price: Yup.string()
    .required('Price is required')
});

const Registration = () => {
  const [selectedPlan, setSelectedPlan] = useState('');
  
  const plans = {
    'Basic': '1500',
    'Standard': '2500',
    'Premium': '3500',
    'Elite': '5000'
  };

  const handlePlanChange = (setFieldValue, e) => {
    const plan = e.target.value;
    setSelectedPlan(plan);
    setFieldValue('plan', plan);
    setFieldValue('price', plans[plan] || '');
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Registration values:', values);
      toast.success('Membership registration successful!');
      resetForm();
      setSelectedPlan('');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageContainer>
      <Sidebar />
      <MainContent>
        <Header>
          <Logo src="/assets/stamina-logo.png" alt="Stamina Fitness" />
          <HeaderActions>
            <FeedbackButton onClick={() => toast.info('Feedback feature coming soon!')}>
              Feedback
            </FeedbackButton>
            <NotificationIcon onClick={() => toast.info('No new notifications')}>
              🔔
            </NotificationIcon>
          </HeaderActions>
        </Header>

        <Title>Become a Member!</Title>
        <Subtitle>Register</Subtitle>

        <Formik
          initialValues={{
            name: '',
            dateOfJoin: '',
            email: '',
            contactNo: '',
            plan: '',
            price: ''
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, setFieldValue, isSubmitting }) => (
            <Form>
              <FormCard>
                <FormGrid>
                  <InputGroup>
                    <Label>Name of Participant</Label>
                    <StyledInput
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.name && errors.name && (
                      <ErrorMessage>{errors.name}</ErrorMessage>
                    )}
                  </InputGroup>

                  <InputGroup>
                    <Label>Date of Join</Label>
                    <DateInput
                      type="date"
                      name="dateOfJoin"
                      value={values.dateOfJoin}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.dateOfJoin && errors.dateOfJoin && (
                      <ErrorMessage>{errors.dateOfJoin}</ErrorMessage>
                    )}
                  </InputGroup>

                  <InputGroup>
                    <Label>Email Address</Label>
                    <StyledInput
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
                    <Label>Contact No.</Label>
                    <StyledInput
                      name="contactNo"
                      value={values.contactNo}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.contactNo && errors.contactNo && (
                      <ErrorMessage>{errors.contactNo}</ErrorMessage>
                    )}
                  </InputGroup>
                </FormGrid>

                <PlanSection>
                  <InputGroup>
                    <Label>Plan</Label>
                    <Select
                      name="plan"
                      value={values.plan}
                      onChange={(e) => handlePlanChange(setFieldValue, e)}
                      onBlur={handleBlur}
                    >
                      <option value="">Select a plan</option>
                      {Object.keys(plans).map(plan => (
                        <option key={plan} value={plan}>{plan}</option>
                      ))}
                    </Select>
                    {touched.plan && errors.plan && (
                      <ErrorMessage>{errors.plan}</ErrorMessage>
                    )}
                  </InputGroup>

                  <InputGroup>
                    <Label>Price</Label>
                    <StyledInput
                      name="price"
                      value={values.price}
                      readOnly
                    />
                  </InputGroup>
                </PlanSection>

                <ButtonGroup>
                  <CancelButton type="button" onClick={() => window.history.back()}>
                    Cancel
                  </CancelButton>
                  <AvailButton type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Processing...' : 'Avail Membership'}
                  </AvailButton>
                </ButtonGroup>
              </FormCard>
            </Form>
          )}
        </Formik>
        <ToastContainer position="top-right" autoClose={3000} />
      </MainContent>
    </PageContainer>
  );
};

export default Registration; 