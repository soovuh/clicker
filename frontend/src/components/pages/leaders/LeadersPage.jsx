import { useState, useEffect } from 'react';
import { Stack, Typography } from '@mui/material';
import { getUsersList } from '../../../functions/httpRequests';
import Loading from '../../UI/Loading';

const LeadersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsersList();
      setUsers(users);
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
      <Typography>That's a Leaders Page.</Typography>
      {users.length ? (
        <>
          {users.map(({ id, username, clicks }) => (
            <Stack key={id} direction="row" gap={2}>
              <Typography>{username}</Typography>
              <Typography>{clicks}</Typography>
            </Stack>
          ))}
        </>
      ) : (
        <Loading type="bars" />
      )}
    </Stack>
  );
};

export default LeadersPage;
