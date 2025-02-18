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
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
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
`;

const ReadOnlyInput = styled(StyledInput)`
  background:rgb(255, 236, 236); /* Light gray background for read-only fields */
  cursor: not-allowed; /* Change cursor to indicate non-editable */
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
`;

const CancelButton = styled(Button)`
  background: white;
  color: #1A1B4B;
  padding: 12px 25px;
  border: 1px solid #1A1B4B;
  border-radius: 10px;
`;

const EditEquipmentModal = ({ onClose, onSubmit, equipment }) => {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <Formik
          initialValues={{
            quantity: equipment.quantity,
            status: equipment.status,
          }}
          validationSchema={Yup.object().shape({
            quantity: Yup.number()
              .required('Total number is required')
              .positive('Must be a positive number'),
            status: Yup.string().required('Status is required'),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            await onSubmit(equipment.id, values);
            setSubmitting(false);
          }}
        >
          {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
            <Form>
              <InputGroup>
                <Label>Equipment Name</Label>
                <ReadOnlyInput
                  name="name"
                  value={equipment.name}
                  readOnly
                />
              </InputGroup>

              <InputGroup>
                <Label>Category</Label>
                <ReadOnlyInput
                  name="category"
                  value={equipment.category}
                  readOnly
                />
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
                  <div style={{ color: 'red' }}>{errors.quantity}</div>
                )}
              </InputGroup>

              <InputGroup>
                <Label>Status</Label>
                <StyledInput
                  name="status"
                  value={values.status}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.status && errors.status && (
                  <div style={{ color: 'red' }}>{errors.status}</div>
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

export default EditEquipmentModal; 