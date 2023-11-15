import React, { Fragment } from 'react';
import { List, Divider, Paper, Typography, Stack } from '@mui/material';
import ListItemUser from './ListItemUser';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';

const UsersList = ({ users }) => {
  return (
    <Paper
      elevation={4}
      sx={{
        borderRadius: '1rem',
        overflow: 'hidden',
        margin: {
          xs: '1rem 0',
          sm: '2rem 0',
          md: '3rem 0',
        },
      }}
    >
      <List
        sx={{
          width: { xs: '350px', sm: '550px', md: '800px' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: '1rem',
        }}
      >
        <Stack direction="row" gap={1} alignItems="center">
          <LeaderboardIcon color="primary" />
          <Typography variant="h6" fontWeight="bold" color="primary">
            Worldwide Leaderboard
          </Typography>
        </Stack>
        {users.map(({ id, username, clicks, image }, index) => (
          <Fragment key={id}>
            <ListItemUser
              avatar={image}
              username={username}
              clicks={clicks}
              position={++index}
            />
            {index !== users.length && (
              <Divider component="li" sx={{ width: '100%' }} />
            )}
          </Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default UsersList;
