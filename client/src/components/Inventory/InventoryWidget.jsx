import styled from 'styled-components';

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
  const inventoryItems = [
    { name: 'Dumbbells', count: '24 sets' },
    { name: 'Treadmills', count: '8 units' },
    { name: 'Yoga Mats', count: '15 pcs' }
  ];

  return (
    <InventoryWrapper>
      <Title>Inventory Overview</Title>
      <InventoryList>
        {inventoryItems.map((item, index) => (
          <InventoryItem key={index}>
            <ItemName>{item.name}</ItemName>
            <ItemCount>{item.count}</ItemCount>
          </InventoryItem>
        ))}
      </InventoryList>
    </InventoryWrapper>
  );
};

export default InventoryWidget;