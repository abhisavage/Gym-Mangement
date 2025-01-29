import { useState, useEffect } from 'react';
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
  Input
} from '../../styles/CommonStyles';
import axios from 'axios';

const Title = styled.h1`
  color: #1A1B4B;
  font-size: 48px;
  margin-bottom: 30px;
  font-weight: 600;
  animation: slideIn 0.4s ease-out;
`;

const DateRangeCard = styled(Card)`
  background: white;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(26, 27, 75, 0.1);
  margin-bottom: 30px;
`;

const DateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  align-items: end;
`;

const DateGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  color: #1A1B4B;
  font-size: 16px;
  font-weight: 500;
`;

const DateInput = styled.div`
  position: relative;
  width: 100%;
`;

const StyledInput = styled(Input)`
  width: 100%;
  padding: 12px;
  padding-right: 40px;
  background: #F5F5F5;
  border: none;
  border-radius: 10px;
  color: #1A1B4B;
  
  &:hover {
    background: #EFEFEF;
  }
  
  &:focus {
    background: #EFEFEF;
    box-shadow: 0 0 0 2px rgba(26, 27, 75, 0.1);
  }
`;

const CalendarIcon = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #1A1B4B;
  cursor: pointer;
`;

const TotalAmount = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #1A1B4B;
  text-align: center;
  padding: 15px;
  background: #F5F5F5;
  border-radius: 10px;
`;

const TableCard = styled(Card)`
  background: #9198C5;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(26, 27, 75, 0.1);
`;

const SubTitle = styled.h2`
  color: white;
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
  color: white;
  font-weight: 500;
`;

const Select = styled.select`
  padding: 8px 15px;
  border-radius: 15px;
  border: none;
  background: rgba(255, 255, 255, 0.9);
  color: #1A1B4B;
  cursor: pointer;
  
  &:hover {
    background: white;
  }
`;

const SearchBar = styled.div`
  position: relative;
  width: 300px;
`;

const SearchInput = styled(Input)`
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
`;

const Th = styled.th`
  text-align: left;
  padding: 15px;
  color: white;
  font-weight: 600;
  
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

const StatisticsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 30px;
`;

const StatCard = styled(Card)`
  background: white;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(26, 27, 75, 0.08);
`;

const StatLabel = styled.div`
  color: #666;
  font-size: 14px;
  margin-bottom: 8px;
`;

const StatValue = styled.div`
  color: #1A1B4B;
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
`;

const StatChange = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: ${props => props.isPositive ? '#22C55E' : '#EF4444'};
`;

const calculateMonthsBetween = (fromDate, toDate) => {
  const start = new Date(fromDate);
  const end = new Date(toDate);
  return (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth() + 1);
};

const Report = () => {
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const [statistics, setStatistics] = useState({
    totalRevenue: 0,
    averageRevenue: 0,
    totalMembers: 0,
    conversionRate: 0,
  });
  const [totalAmount, setTotalAmount] = useState(0);

  // Fetch payment details on component mount
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/payments/all', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`, // Use the appropriate admin token
          },
        });
        setPayments(response.data); // Set the payment details
      } catch (error) {
        console.error('Error fetching payment details:', error);
        toast.error('Failed to fetch payment details.');
      }
    };

    fetchPayments();
  }, []);

  // Fetch statistics on component mount
  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/payments/revenue-and-active-memberships', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`, // Use the appropriate admin token
          },
        });
        const totalRevenue = response.data.totalRevenue;
        const activeMemberships = response.data.activeMemberships;

        // Calculate average revenue and total members
        const months = calculateMonthsBetween(dateRange.from, dateRange.to);
        const averageRevenue = totalRevenue / (months || 1);
        const totalMembers = activeMemberships.reduce((sum, plan) => sum + plan.activeCount, 0);

        setStatistics({
          totalRevenue,
          averageRevenue,
          totalMembers,
          conversionRate: (totalMembers / activeMemberships.length) * 100 || 0,
        });
      } catch (error) {
        console.error('Error fetching statistics:', error);
        toast.error('Failed to fetch statistics.');
      }
    };

    fetchStatistics();
  }, [dateRange]);

  // Calculate total amount based on date range
  useEffect(() => {
    const calculateTotal = () => {
      const filteredPayments = payments.filter(payment => {
        const paymentDate = new Date(payment.paymentDate);
        const fromDate = new Date(dateRange.from);
        const toDate = new Date(dateRange.to);
        return paymentDate >= fromDate && paymentDate <= toDate;
      });

      const total = filteredPayments.reduce((sum, payment) => sum + payment.amount, 0);
      setTotalAmount(total);
    };

    calculateTotal();
  }, [payments, dateRange]);

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

        <Title>Sales Report</Title>

        <StatisticsGrid>
          <StatCard>
            <StatLabel>Total Revenue</StatLabel>
            <StatValue>₹{statistics.totalRevenue.toLocaleString()}</StatValue>
          </StatCard>

          <StatCard>
            <StatLabel>Average Monthly Revenue</StatLabel>
            <StatValue>₹{statistics.averageRevenue.toLocaleString()}</StatValue>
          </StatCard>

          <StatCard>
            <StatLabel>Total Active Members</StatLabel>
            <StatValue>{statistics.totalMembers}</StatValue>
          </StatCard>

          <StatCard>
            <StatLabel>Conversion Rate</StatLabel>
            <StatValue>{statistics.conversionRate.toFixed(2)}%</StatValue>
          </StatCard>
        </StatisticsGrid>

        <DateRangeCard>
          <DateGrid>
            <DateGroup>
              <Label>From Date</Label>
              <DateInput>
                <StyledInput 
                  type="date"
                  value={dateRange.from}
                  onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                />
                <CalendarIcon>📅</CalendarIcon>
              </DateInput>
            </DateGroup>

            <DateGroup>
              <Label>To Date</Label>
              <DateInput>
                <StyledInput 
                  type="date"
                  value={dateRange.to}
                  onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                />
                <CalendarIcon>📅</CalendarIcon>
              </DateInput>
            </DateGroup>

            <DateGroup>
              <Label>Total</Label>
              <TotalAmount>
                {totalAmount > 0 ? `₹${totalAmount.toLocaleString()}` : <h6>No revenue</h6>}
              </TotalAmount>
            </DateGroup>
          </DateGrid>
        </DateRangeCard>

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
                <Th>Member Name</Th>
                <Th>Member ID</Th>
                <Th>Plan</Th>
                <Th>Month</Th>
                <Th>Date Paid</Th>
                <Th>Amount</Th>
              </tr>
            </thead>
            <tbody>
              {payments.map(payment => (
                <tr key={payment.id}>
                  <Td>{payment.member.name}</Td>
                  <Td>{payment.memberId.slice(-12)}</Td>
                  <Td>{payment.membership.planName}</Td>
                  <Td>{payment.membership.duration} Month(s)</Td>
                  <Td>{new Date(payment.paymentDate).toLocaleDateString()}</Td>
                  <Td>₹{payment.amount.toLocaleString()}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </TableCard>

        <ToastContainer position="top-right" autoClose={3000} />
      </MainContent>
    </PageContainer>
  );
};

export default Report; 