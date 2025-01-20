import { useState } from 'react';
import styled from 'styled-components';
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
  Button
} from '../../styles/CommonStyles';

const Title = styled.h1`
  color: #1A1B4B;
  font-size: 48px;
  margin-bottom: 30px;
  font-weight: 600;
  animation: slideIn 0.4s ease-out;
`;

const TableCard = styled(Card)`
  background: #9195C5;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(26, 27, 75, 0.1);
`;

const SubTitle = styled.h2`
  color: #1A1B4B;
  font-size: 24px;
  margin-bottom: 25px;
  font-weight: 500;
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

const SearchInput = styled.input`
  width: 100%;
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
    outline: none;
    background: white;
    box-shadow: 0 0 0 2px rgba(26, 27, 75, 0.1);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #1A1B4B;
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
  cursor: pointer;
  
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

const Pagination = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
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

const ViewMembers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  const members = [
    { id: 'SFM2301N1', name: 'Member 1', dateEnrolled: 'Jan 11', dateExpiration: 'Feb 11' },
    { id: 'SFM2301N2', name: 'Member 2', dateEnrolled: 'Jan 11', dateExpiration: 'Feb 11' },
    { id: 'SFM2301N3', name: 'Member 3', dateEnrolled: 'Jan 11', dateExpiration: 'Feb 11' },
    { id: 'SFM2301N4', name: 'Member 4', dateEnrolled: 'Jan 11', dateExpiration: 'Feb 11' }
  ];

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

        <Title>Active Members</Title>

        <TableCard>
          <SubTitle>Gym Members</SubTitle>
          
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
                <Th>Name</Th>
                <Th>Member ID</Th>
                <Th>Date Enrolled</Th>
                <Th>Date Expiration</Th>
                <Th>Actions</Th>
              </tr>
            </thead>
            <tbody>
              {members.map(member => (
                <tr key={member.id}>
                  <Td>{member.name}</Td>
                  <Td>{member.id}</Td>
                  <Td>{member.dateEnrolled}</Td>
                  <Td>{member.dateExpiration}</Td>
                  <Td>
                    <EditButton>Edit</EditButton>
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

        <ToastContainer position="top-right" autoClose={3000} />
      </MainContent>
    </PageContainer>
  );
};

export default ViewMembers; 