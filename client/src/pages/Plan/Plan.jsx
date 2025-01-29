import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Formik, Form, FieldArray } from 'formik';
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
import axios from 'axios';
import EditPlanModal from '../../components/EditPlanModal/EditPlanModal';
import API_BASE_URL from '../../config';

const PlanForm = styled(Card)`
  background: #1A1B4B;
  color: white;
  margin-bottom: 30px;
`;

const TableSection = styled(Card)`
  background: rgba(26, 27, 75, 0.1);
`;

const SaveButton = styled(Button)`
  background: #F4B740;
  color: #1A1B4B;
  border: none;
  
  &:hover {
    background: #F5C160;
  }
`;

const validationSchema = Yup.object().shape({
  planName: Yup.string().required('Plan name is required'),
  validity: Yup.number().required('Validity is required'),
  amount: Yup.number().required('Amount is required'),
  features: Yup.array().of(Yup.string().required('Feature is required')).min(1, 'At least one feature is required')
});

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

const InputGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: white;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const CancelButton = styled(Button)`
  background: transparent;
  border: 1px solid white;
  color: white;
`;

const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ShowEntities = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Select = styled.select`
  padding: 8px;
  border-radius: 8px;
  border: none;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
`;

const SearchInput = styled(Input)`
  width: 200px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: 12px;
  color: #1A1B4B;
`;

const Td = styled.td`
  padding: 12px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;

const EditButton = styled(Button)`
  padding: 6px 12px;
  font-size: 14px;
`;

const Plan = () => {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/memberships/plans`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
          },
        });
        
        if (Array.isArray(response.data.plans)) {
          setPlans(response.data.plans);
        } else {
          toast.error('Unexpected response format');
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        toast.error('Failed to fetch plans');
        console.error('Error fetching plans:', error);
      }
    };

    fetchPlans();
  }, []);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Prepare the data for the API call
      const planData = {
        planName: values.planName,
        duration: parseInt(values.validity), // Convert validity to an integer
        cost: parseFloat(values.amount), // Convert amount to a float
        features: values.features // This is already an array
      };

      // Make API call to add the plan
      const response = await axios.post(`${API_BASE_URL}/memberships/plans`, planData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
          'Content-Type': 'application/json'
        }
      });

      // Update the state with the new plan
      setPlans([...plans, response.data.plan]); // Assuming the response contains the new plan
      toast.success('Plan added successfully!');
      resetForm();
    } catch (error) {
      toast.error('Failed to add plan');
      console.error('Error adding plan:', error.response ? error.response.data : error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (plan) => {
    setSelectedPlan(plan); // Set the selected plan to be edited
    setIsModalOpen(true); // Open the modal
  };

  const handleUpdate = async (id, updatedPlan) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/memberships/plans/${id}`, updatedPlan, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
          'Content-Type': 'application/json'
        }
      });
      setPlans(plans.map(plan => (plan.id === id ? response.data.plan : plan))); // Update the state
      toast.success('Plan updated successfully!');
    } catch (error) {
      toast.error('Failed to update plan');
      console.error('Error updating plan:', error.response ? error.response.data : error);
    }
  };

  const filteredPlans = plans.filter(plan => 
    plan.planName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

        <PlanForm>
          <Formik
            initialValues={{ planName: '', validity: '', amount: '', features: [''] }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
              <Form>
                <FormGrid>
                  <InputGroup>
                    <Label>Plan Name</Label>
                    <Input
                      name="planName"
                      value={values.planName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.planName && errors.planName && (
                      <div style={{color: '#F4B740'}}>{errors.planName}</div>
                    )}
                  </InputGroup>

                  <InputGroup>
                    <Label>Duration (months)</Label>
                    <Input
                      name="validity"
                      type="number"
                      value={values.validity}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.validity && errors.validity && (
                      <div style={{color: '#F4B740'}}>{errors.validity}</div>
                    )}
                  </InputGroup>

                  <InputGroup>
                    <Label>Cost (₹)</Label>
                    <Input
                      name="amount"
                      type="number"
                      value={values.amount}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.amount && errors.amount && (
                      <div style={{color: '#F4B740'}}>{errors.amount}</div>
                    )}
                  </InputGroup>

                  <FieldArray name="features">
                    {({ push, remove }) => (
                      <div>
                        <Label>Features</Label>
                        {values.features.map((feature, index) => (
                          <InputGroup key={index}>
                            <Input
                              name={`features.${index}`}
                              value={feature}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <Button type="button" onClick={() => remove(index)}>Remove</Button>
                            {touched.features && touched.features[index] && errors.features && errors.features[index] && (
                              <div style={{color: '#F4B740'}}>{errors.features[index]}</div>
                            )}
                          </InputGroup>
                        ))}
                        <Button type="button" onClick={() => push('')}>Add Feature</Button>
                      </div>
                    )}
                  </FieldArray>
                </FormGrid>

                <ButtonGroup>
                  <CancelButton type="button">Cancel</CancelButton>
                  <SaveButton type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : 'Save'}
                  </SaveButton>
                </ButtonGroup>
              </Form>
            )}
          </Formik>
        </PlanForm>

        <TableSection>
          <TableHeader>
            <ShowEntities>
              Show Entries
              <Select 
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </Select>
            </ShowEntities>

            <SearchBar>
              <SearchInput
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchBar>
          </TableHeader>

          <Table>
            <thead>
              <tr>
                <Th>Plan Name</Th>
                <Th>Duration (months)</Th>
                <Th>Cost (₹)</Th>
                <Th>Edit</Th>
              </tr>
            </thead>
            <tbody>
              {filteredPlans.map(plan => (
                <tr key={plan.id}>
                  <Td>{plan.planName}</Td>
                  <Td>{plan.duration} months</Td>
                  <Td>₹{plan.cost}</Td>
                  <Td>
                    <EditButton onClick={() => handleEdit(plan)}>
                      Edit
                    </EditButton>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableSection>
        <EditPlanModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          plan={selectedPlan}
          onUpdate={handleUpdate}
        />
        <ToastContainer position="top-right" autoClose={3000} />
      </MainContent>
    </PageContainer>
  );
};

export default Plan; 