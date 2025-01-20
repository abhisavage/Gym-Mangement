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
  amount: Yup.number().required('Amount is required')
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
  const [plans, setPlans] = useState([
    { id: 1, planName: '1 month', validity: 1, amount: 800 },
    { id: 2, planName: '3 months', validity: 3, amount: 2200 },
    { id: 3, planName: '6 months', validity: 6, amount: 4300 },
    { id: 4, planName: 'Annual', validity: 12, amount: 8500 },
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPlans([...plans, { id: plans.length + 1, ...values }]);
      toast.success('Plan added successfully!');
      resetForm();
    } catch (error) {
      toast.error('Failed to add plan');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (id) => {
    toast.info('Edit functionality coming soon!');
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

        <Formik
          initialValues={{ planName: '', validity: '', amount: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
            <Form>
              <PlanForm>
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
                    <Label>Validity</Label>
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
                    <Label>Amount</Label>
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
                </FormGrid>

                <ButtonGroup>
                  <CancelButton type="button">Cancel</CancelButton>
                  <SaveButton type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : 'Save'}
                  </SaveButton>
                </ButtonGroup>
              </PlanForm>
            </Form>
          )}
        </Formik>

        <TableSection>
          <TableHeader>
            <ShowEntities>
              Show Entities
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
                <Th>Validity</Th>
                <Th>Amount</Th>
                <Th>Edit</Th>
              </tr>
            </thead>
            <tbody>
              {filteredPlans.map(plan => (
                <tr key={plan.id}>
                  <Td>{plan.planName}</Td>
                  <Td>{plan.validity}</Td>
                  <Td>{plan.amount}</Td>
                  <Td>
                    <EditButton onClick={() => handleEdit(plan.id)}>
                      Edit
                    </EditButton>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableSection>
        <ToastContainer position="top-right" autoClose={3000} />
      </MainContent>
    </PageContainer>
  );
};

export default Plan; 