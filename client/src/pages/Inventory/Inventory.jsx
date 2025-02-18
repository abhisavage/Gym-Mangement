import { useEffect, useState } from 'react';
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
import AddEquipmentModal from '../../components/Modals/AddEquipmentModal';
import EditEquipmentModal from '../../components/Modals/EditEquipmentModal';
import axios from 'axios';

// Styled Components
const AddEquipmentButton = styled(Button)`
  background: white;
  color: #1A1B4B;
  border: none;
  padding: 15px 30px;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(26, 27, 75, 0.1);
  transition: all 0.3s ease;
  margin-bottom: 30px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(26, 27, 75, 0.15);
    background: #F8F9FF;
  }
`;

const ManageTitle = styled.h2`
  color: white;
  font-size: 24px;
  margin-bottom: 25px;
  font-weight: 500;
`;

const TableCard = styled(Card)`
  background: #9195C5;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(26, 27, 75, 0.1);
`;

const TableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  color: #1A1B4B;
`;

const ShowEntities = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #1A1B4B;
  font-weight: 500;
`;

const Select = styled.select`
  padding: 8px 15px;
  border-radius: 15px;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  color: #1A1B4B;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: white;
  }
`;

const SearchBar = styled.div`
  position: relative;
  width: 300px;
`;

const SearchInput = styled(Input)`
  padding: 12px 20px;
  padding-right: 45px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  color: #1A1B4B;
  border-radius: 20px;
  
  &::placeholder {
    color: rgba(26, 27, 75, 0.5);
  }
  
  &:focus {
    background: white;
    box-shadow: 0 0 0 2px rgba(26, 27, 75, 0.1);
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 8px;
  margin-bottom: 25px;
`;

const Th = styled.th`
  text-align: left;
  padding: 15px;
  color: #1A1B4B;
  font-weight: 600;
  border-bottom: 2px solid rgba(26, 27, 75, 0.1);
  
  &:first-child {
    padding-left: 25px;
  }
`;

const Td = styled.td`
  padding: 15px;
  background: rgba(255, 255, 255, 0.9);
  color: #1A1B4B;
  
  &:first-child {
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
    padding-left: 25px;
  }
  
  &:last-child {
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
  }
`;

const EditButton = styled(Button)`
  background: rgba(26, 27, 75, 0.1);
  color: #1A1B4B;
  padding: 8px 25px;
  border-radius: 15px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
  
  &:hover {
    background: rgba(26, 27, 75, 0.2);
    transform: translateY(-1px);
  }
`;

const StatusBadge = styled.span`
  padding: 6px 15px;
  border-radius: 15px;
  font-size: 14px;
  font-weight: 500;
  background: ${props => props.active ? 'rgba(46, 213, 115, 0.2)' : 'rgba(255, 71, 87, 0.2)'};
  color: ${props => props.active ? '#2ED573' : '#FF4757'};
`;

const Pagination = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

const PaginationButton = styled(Button)`
  background: ${props => props.active ? '#1A1B4B' : 'rgba(255, 255, 255, 0.9)'};
  color: ${props => props.active ? 'white' : '#1A1B4B'};
  padding: 8px 20px;
  border-radius: 15px;
  font-weight: 500;
  transition: all 0.2s;
  
  &:hover {
    background: ${props => props.active ? '#1A1B4B' : 'white'};
    transform: translateY(-1px);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    color: white;
  }
`;

// Validation Schema
const equipmentSchema = Yup.object().shape({
  name: Yup.string().required('Equipment name is required'),
  totalNo: Yup.number()
    .required('Total number is required')
    .positive('Must be a positive number'),
  status: Yup.string().required('Status is required')
});

const Inventory = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [showAddModal, setShowAddModal] = useState(false);
  const [equipments, setEquipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentEquipment, setCurrentEquipment] = useState(null);

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/equipment/getall', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`, // Include token if needed
          },
        });
        setEquipments(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipments();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Equipment values:', values);
      toast.success('Equipment added successfully!');
      resetForm();
      setShowAddForm(false);
    } catch (error) {
      toast.error('Failed to add equipment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddEquipment = async (values, { setSubmitting, resetForm }) => {
    try {
      console.log('Equipment values being sent:', values);

      // Call the API to add equipment
      const response = await axios.post('http://localhost:5000/api/equipment/', {
        name: values.name,
        quantity: values.quantity,
        status: values.status,
        category: values.category
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`, // Include token
        },
      });

      // Add the new equipment to the state
      setEquipments(prevEquipments => [...prevEquipments, response.data.equipment]);

      toast.success('Equipment added successfully!');
      resetForm();
      setShowAddModal(false);
    } catch (error) {
      toast.error('Failed to add equipment. Please try again.');
      console.error('Error adding equipment:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditClick = (equipment) => {
    setCurrentEquipment(equipment);
    setShowEditModal(true);
  };

  const handleUpdateEquipment = async (id, updatedValues) => {
    try {
      await axios.put(`http://localhost:5000/api/equipment/${id}`, updatedValues, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`, // Include token
        },
      });

      // Update the equipment in the state
      setEquipments(prevEquipments => 
        prevEquipments.map(equipment => 
          equipment.id === id ? { ...equipment, ...updatedValues } : equipment
        )
      );

      toast.success('Equipment updated successfully!');
      setShowEditModal(false);
    } catch (error) {
      toast.error('Failed to update equipment. Please try again.');
      console.error('Error updating equipment:', error);
    }
  };
  const filteredEquipments = equipments.filter(equipment => 
    equipment.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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

        <AddEquipmentButton onClick={() => setShowAddModal(true)}>
          Add Equipment
        </AddEquipmentButton>

        <TableCard>
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
              <SearchIcon>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
              </SearchIcon>
            </SearchBar>
          </TableHeader>

          <Table>
            <thead>
              <tr>
                <Th>Equipment Name</Th>
                <Th>Total no.</Th>
                <Th>Status</Th>
                <Th>Actions</Th>
              </tr>
            </thead>
            <tbody>
            {filteredEquipments.map(equipment => (
                <tr key={equipment.id}>
                  <Td>{equipment.name}</Td>
                  <Td>{equipment.quantity}</Td>
                  <Td>
                    <StatusBadge active={equipment.status === 'Available'}>
                      {equipment.status}
                    </StatusBadge>
                  </Td>
                  <Td>
                  <EditButton onClick={() => handleEditClick(equipment)}>Edit</EditButton>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Pagination>
            <PaginationButton>Previous</PaginationButton>
            <PaginationButton active>1</PaginationButton>
            <PaginationButton>Next</PaginationButton>
          </Pagination>
        </TableCard>

        {showAddModal && (
          <AddEquipmentModal
            onClose={() => setShowAddModal(false)}
            onSubmit={handleAddEquipment}
          />
        )}
        {showEditModal && currentEquipment && (
          <EditEquipmentModal
            onClose={() => setShowEditModal(false)}
            onSubmit={handleUpdateEquipment}
            equipment={currentEquipment}
          />
        )}
        <ToastContainer position="top-right" autoClose={3000} />
      </MainContent>
    </PageContainer>
  );
};

export default Inventory; 