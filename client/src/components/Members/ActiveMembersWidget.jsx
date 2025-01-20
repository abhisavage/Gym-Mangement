import styled from 'styled-components';
import { Link } from 'react-router-dom';

const MembersCard = styled.div`
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

const MembersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MemberRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: #f8f8f8;
  border-radius: 5px;
`;

const MemberInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const MemberAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #e0e0e0;
`;

const ActiveMembersWidget = () => {
  const previewMembers = [
    { id: 1, name: "James Medalla" },
    { id: 2, name: "Kent Charl Mabutas" },
    { id: 3, name: "John Elmar Rodrigo" }
  ];

  return (
    <MembersCard>
      <Header>
        <Title>Active Members</Title>
        <ViewAll to="/members">View All Members</ViewAll>
      </Header>
      <MembersList>
        {previewMembers.map(member => (
          <MemberRow key={member.id}>
            <MemberInfo>
              <MemberAvatar />
              <span>{member.name}</span>
            </MemberInfo>
          </MemberRow>
        ))}
      </MembersList>
    </MembersCard>
  );
};

export default ActiveMembersWidget;
