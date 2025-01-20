import styled from 'styled-components';
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

const SalesWidget = () => {
  return (
    <SalesCard>
      <Header>
        <Title>Sales</Title>
        <ViewAll to="/sales">View Details</ViewAll>
      </Header>
      <ChartPreview>
        <SalesPercentage>84%</SalesPercentage>
      </ChartPreview>
    </SalesCard>
  );
};

export default SalesWidget;
