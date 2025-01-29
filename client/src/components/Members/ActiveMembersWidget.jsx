import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
  const [activeMembers, setActiveMembers] = useState([]);

  useEffect(() => {
    const fetchActiveMembers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/members', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('adminToken')}`, // Use the appropriate token
          },
        });
        // Assuming response.data contains an array of members with memberships
        const membersWithMemberships = response.data.filter(member => member.membership); // Adjust based on your data structure
        setActiveMembers(membersWithMemberships);
      } catch (error) {
        console.error('Error fetching active members:', error);
      }
    };

    fetchActiveMembers();
  }, []);

  return (
    <MembersCard>
      <Header>
        <Title>Active Members</Title>
        <ViewAll to="/view-members">View All Members</ViewAll>
      </Header>
      <MembersList>
        {activeMembers.map(member => (
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
