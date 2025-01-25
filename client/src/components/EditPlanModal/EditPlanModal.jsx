import React from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button } from '../../styles/CommonStyles';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 30px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
  color: #1A1B4B;
`;

const InputGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #1A1B4B;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const validationSchema = Yup.object().shape({
  planName: Yup.string().required('Plan name is required'),
  duration: Yup.number().required('Duration is required'),
  cost: Yup.number().required('Cost is required'),
  features: Yup.array().of(Yup.string().required('Feature is required')).min(1, 'At least one feature is required')
});

const EditPlanModal = ({ isOpen, onClose, plan, onUpdate }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <Title>Edit Plan</Title>
        <Formik
          initialValues={{
            planName: plan.planName,
            duration: plan.duration,
            cost: plan.cost,
            features: plan.features
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            await onUpdate(plan.id, values);
            onClose();
          }}
        >
          {({ values, handleChange, handleBlur }) => (
            <Form>
              <InputGroup>
                <Label>Plan Name</Label>
                <Input
                  name="planName"
                  value={values.planName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </InputGroup>
              <InputGroup>
                <Label>Duration (months)</Label>
                <Input
                  name="duration"
                  type="number"
                  value={values.duration}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </InputGroup>
              <InputGroup>
                <Label>Cost (₹)</Label>
                <Input
                  name="cost"
                  type="number"
                  value={values.cost}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </InputGroup>
              <InputGroup>
                <Label>Features</Label>
                {values.features.map((feature, index) => (
                  <Input
                    key={index}
                    name={`features.${index}`}
                    value={feature}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                ))}
              </InputGroup>
              <Button type="submit">Update Plan</Button>
              <Button type="button" onClick={onClose}>Cancel</Button>
            </Form>
          )}
        </Formik>
      </ModalContent>
    </ModalOverlay>
  );
};

export default EditPlanModal; 