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
  color: #F4B740;
  font-size: 32px;
  margin-bottom: 10px;
  animation: slideIn 0.4s ease-out;
`;

const Subtitle = styled.h2`
  color: #1A1B4B;
  font-size: 48px;
  margin-bottom: 30px;
  animation: slideIn 0.4s ease-out;
`;

const PaymentCard = styled(Card)`
  margin-bottom: 30px;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 20px;
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

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  margin-top: 30px;
`;

const SaveButton = styled(Button)`
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

const validationSchema = Yup.object().shape({
  memberName: Yup.string().required('Member name is required'),
  plan: Yup.string().required('Plan is required'),
  price: Yup.string().required('Price is required'),
  dateOfJoin: Yup.date().required('Join date is required')
});

const Payment = () => {
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Payment values:', values);
      toast.success('Payment added successfully!');
      resetForm();
    } catch (error) {
      toast.error('Failed to add payment. Please try again.');
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

        <Title>Point of Sale</Title>
        <Subtitle>Add Payment</Subtitle>

        <Formik
          initialValues={{
            memberName: '',
            plan: '',
            price: '',
            dateOfJoin: ''
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
            <Form>
              <PaymentCard>
                <FormGrid>
                  <InputGroup>
                    <Label>Name of Member</Label>
                    <StyledInput
                      name="memberName"
                      value={values.memberName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.memberName && errors.memberName && (
                      <div style={{color: '#FF0000', fontSize: '14px', marginTop: '5px'}}>
                        {errors.memberName}
                      </div>
                    )}
                  </InputGroup>

                  <InputGroup>
                    <Label>Plan</Label>
                    <StyledInput
                      name="plan"
                      value={values.plan}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.plan && errors.plan && (
                      <div style={{color: '#FF0000', fontSize: '14px', marginTop: '5px'}}>
                        {errors.plan}
                      </div>
                    )}
                  </InputGroup>

                  <InputGroup>
                    <Label>Price</Label>
                    <StyledInput
                      name="price"
                      value={values.price}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.price && errors.price && (
                      <div style={{color: '#FF0000', fontSize: '14px', marginTop: '5px'}}>
                        {errors.price}
                      </div>
                    )}
                  </InputGroup>
                </FormGrid>

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
                    <div style={{color: '#FF0000', fontSize: '14px', marginTop: '5px'}}>
                      {errors.dateOfJoin}
                    </div>
                  )}
                </InputGroup>

                <ButtonGroup>
                  <CancelButton type="button" onClick={() => window.history.back()}>
                    Cancel
                  </CancelButton>
                  <SaveButton type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : 'Save'}
                  </SaveButton>
                </ButtonGroup>
              </PaymentCard>
            </Form>
          )}
        </Formik>
        <ToastContainer position="top-right" autoClose={3000} />
      </MainContent>
    </PageContainer>
  );
};

export default Payment; 