import { useState } from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Input } from '../../styles/CommonStyles';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(26, 27, 75, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const ModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 20px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  animation: slideIn 0.3s ease-out;

  @keyframes slideIn {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
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
  margin-bottom: 8px;
  font-weight: 500;
`;

const StyledInput = styled(Input)`
  width: 100%;
  padding: 12px;
  background: #F5F5F5;
  border: none;
  border-radius: 10px;
  
  &:hover {
    background: #EFEFEF;
  }
  
  &:focus {
    background: #EFEFEF;
    box-shadow: 0 0 0 2px rgba(26, 27, 75, 0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  background: #F5F5F5;
  border: none;
  border-radius: 10px;
  color: #1A1B4B;
  cursor: pointer;
  
  &:hover {
    background: #EFEFEF;
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

const SaveButton = styled(Button)`
  background: #1A1B4B;
  color: white;
  padding: 12px 25px;
  border: none;
  border-radius: 10px;
  
  &:hover {
    background: #2A2B5B;
    transform: translateY(-2px);
  }
`;

const CancelButton = styled(Button)`
  background: white;
  color: #1A1B4B;
  padding: 12px 25px;
  border: 1px solid #1A1B4B;
  border-radius: 10px;
  
  &:hover {
    background: #F5F5F5;
    transform: translateY(-2px);
  }
`;

const ErrorMessage = styled.div`
  color: #FF4757;
  font-size: 14px;
  margin-top: 5px;
  animation: slideIn 0.3s ease-out;
`;

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Equipment name is required'),
  quantity: Yup.number()
    .required('Total number is required')
    .positive('Must be a positive number'),
  status: Yup.string().required('Status is required'),
  category: Yup.string().required('Category is required')
});

const AddEquipmentModal = ({ onClose, onSubmit }) => {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <Formik
          initialValues={{
            name: '',
            quantity: '',
            status: '',
            category: ''
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
            <Form>
              <InputGroup>
                <Label>Equipment Name</Label>
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
                <Label>Quantity</Label>
                <StyledInput
                  type="number"
                  name="quantity"
                  value={values.quantity}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.quantity && errors.quantity && (
                  <ErrorMessage>{errors.quantity}</ErrorMessage>
                )}
              </InputGroup>

              <InputGroup>
                <Label>Category</Label>
                <StyledInput
                  name="category"
                  value={values.category}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.category && errors.category && (
                  <ErrorMessage>{errors.category}</ErrorMessage>
                )}
              </InputGroup>

              <InputGroup>
                <Label>Status</Label>
                <Select
                  name="status"
                  value={values.status}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="">Select status</option>
                  <option value="Available">Available</option>
                  <option value="Not Available">Not Available</option>
                </Select>
                {touched.status && errors.status && (
                  <ErrorMessage>{errors.status}</ErrorMessage>
                )}
              </InputGroup>

              <ButtonGroup>
                <CancelButton type="button" onClick={onClose}>
                  Cancel
                </CancelButton>
                <SaveButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : 'Save'}
                </SaveButton>
              </ButtonGroup>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AddEquipmentModal; 