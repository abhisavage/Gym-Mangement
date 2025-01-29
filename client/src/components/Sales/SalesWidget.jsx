import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SalesCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const Title = styled.h3`
  margin: 0;
`;

const ViewAll = styled(Link)`
  color: #1a1b4b;
  text-decoration: none;
  font-size: 14px;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ChartPreview = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 150px;
  background: #f8f8f8;
  border-radius: 8px;
`;

const SalesPercentage = styled.div`
  font-size: 32px;
  font-weight: bold;
  color: #1a1b4b;
`;

const TotalSales = styled.h3`
  margin: 0;
  font-weight: normal;
`;

const SalesWidget = () => {
  const [totalSales, setTotalSales] = useState(0);
  const [salesPercentage, setSalesPercentage] = useState(0);
  const targetSales = 100000; // Example target sales amount

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/payments/revenue-and-active-memberships', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`, // Use the appropriate token
          },
        });
        const totalRevenue = response.data.totalRevenue; // Adjust based on your actual response structure
        setTotalSales(totalRevenue);

        // Calculate percentage
        const percentage = ((totalRevenue / targetSales) * 100).toFixed(2); // Fixed to 2 decimal places
        setSalesPercentage(percentage);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };

    fetchSalesData();
  }, []);

  return (
    <SalesCard>
      <Header>
        <Title>Sales</Title>
        <ViewAll to="/report">View Details</ViewAll>
      </Header>
      <ChartPreview>
        <SalesPercentage>{salesPercentage}%</SalesPercentage>
      </ChartPreview>
      <TotalSales>Target Sales: ₹{targetSales}</TotalSales>
    </SalesCard>
  );
};

export default SalesWidget;
