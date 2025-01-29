import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const InventoryWrapper = styled.div`
  margin-top: 20px;
  background: white;
  border-radius: 10px;
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 18px;
  margin: 0 0 15px 0;
`;

const InventoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const InventoryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

const ItemName = styled.span`
  color: #333;
`;

const ItemCount = styled.span`
  color: #666;
`;

const InventoryWidget = () => {
  const [equipment, setEquipment] = useState([]);

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/equipment/getall', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`, // Use the appropriate token
          },
        });
        setEquipment(response.data); // Assuming response.data is an array of equipment
      } catch (error) {
        console.error('Error fetching equipment:', error);
      }
    };

    fetchEquipment();
  }, []);

  return (
    <InventoryWrapper>
      <Title>Equipment Inventory</Title>
      <InventoryList>
        {equipment.map(item => (
          <InventoryItem key={item.id}>
            <ItemName>{item.name}</ItemName>
            <ItemCount>{item.quantity} units</ItemCount>
          </InventoryItem>
        ))}
      </InventoryList>
    </InventoryWrapper>
  );
};

export default InventoryWidget;