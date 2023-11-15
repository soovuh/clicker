import { useState, useEffect } from 'react';
import { Stack } from '@mui/material';
import { getUsersList } from '../../../functions/httpRequests';
import Loading from '../../UI/Loading';
import UsersList from './UsersList';
import { getUserPosition, sortByClicks } from '../../../functions/usersList';
import { useAuth } from '../../../context/AuthContext';
import { getUser, getUserExtended } from '../../../functions/httpRequests';
import UserInfo from './UserInfo';

const INITIAL_USER = { id: null, username: null, image: null, clicks: 0 };

const LeadersPage = () => {
  const { accessToken } = useAuth();
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(INITIAL_USER);
  const { id, username, image, clicks } = user;

  useEffect(() => {
    if (!accessToken) return;
    const fetchUser = async () => {
      try {
        const response = await getUser(accessToken);
        const data = await response.json();
        const { id } = data;

        if (!response.ok) {
          return;
        }

        const extendedResponse = await getUserExtended(id);
        const extendedData = await extendedResponse.json();
        setUser(extendedData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [accessToken]);

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
            {accessToken && (
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
