import { useState, useEffect } from 'react';
import { Stack } from '@mui/material';
import { getUsersList } from '../../../functions/httpRequests';
import Loading from '../../UI/Loading';
import UsersList from './UsersList';
import { getUserPosition, sortByClicks } from '../../../functions/usersList';
import { useAuth } from '../../../context/AuthContext';
import { useUserData } from '../../../hooks/useUserData';
import UserInfo from './UserInfo';

const LeadersPage = () => {
  const { accessToken } = useAuth();
  const { user } = useUserData(accessToken);
  const [users, setUsers] = useState([]);
  const { id, username, image, clicks } = user;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsersList();
        const data = await response.json();

        if (!response.ok) {
          alert('Whoops! Something went wrong...');
          const { status, statusText } = response;
          throw new Error(`${status} ${statusText}`);
        }

        const sortedByClicks = sortByClicks(data);
        setUsers(sortedByClicks);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{ width: '100%', height: '100%' }}
    >
      <Stack
        alignItems="center"
        justifyContent="center"
        gap={2}
        sx={{ padding: { xs: '1rem 0', sm: '2rem 0', md: '3rem 0' } }}
      >
        {users.length ? (
          <>
            {id && (
              <UserInfo
                avatar={image}
                username={username}
                clicks={clicks}
                position={getUserPosition(id, users)}
                usersAmount={users.length}
              />
            )}
            <UsersList users={users} />
          </>
        ) : (
          <Loading type="bars" />
        )}
      </Stack>
    </Stack>
  );
};

export default LeadersPage;
