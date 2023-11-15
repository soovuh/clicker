import { useState, useEffect } from 'react';
import { Stack } from '@mui/material';
import { getUsersList } from '../../../functions/httpRequests';
import Loading from '../../UI/Loading';
import UsersList from './UsersList';
import { sortByClicks } from '../../../functions/usersList';

const LeadersPage = () => {
  const [users, setUsers] = useState([]);

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
      sx={{
        width: '100%',
        height: '100%',
      }}
    >
      {users.length ? <UsersList users={users} /> : <Loading type="bars" />}
    </Stack>
  );
};

export default LeadersPage;
