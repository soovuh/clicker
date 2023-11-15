import { Paper, Stack, Avatar, Typography } from '@mui/material';

const UserInfo = ({ avatar, username, clicks, position, usersAmount }) => {
  return (
    <Paper elevation={4} sx={{ borderRadius: '1rem', overflow: 'hidden' }}>
      <Stack
        direction="row"
        sx={{ width: { xs: '350px', sm: '550px', md: '800px' } }}
      >
        <Avatar
          alt={username}
          src={avatar}
          sx={{
            fontSize: { xs: '30px', sm: '45px', md: '60px' },
            width: { xs: '50px', sm: '75px', md: '100px' },
            height: { xs: '50px', sm: '75px', md: '100px' },
            margin: { xs: '4px', sm: '6px', md: '8px' },
          }}
        />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          sx={{
            margin: { xs: '4px', sm: '6px', md: '8px' },
            marginRight: { xs: '1rem', sm: '16px', md: '32px' },
          }}
        >
          <Stack>
            <Typography
              sx={{
                fontSize: { xs: '20px', sm: '26px', md: '32px' },
                lineHeight: { xs: '28px', sm: '32px', md: '36px' },
              }}
            >
              {username}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: '14px', sm: '20px', md: '26px' },
                lineHeight: { xs: '12px', sm: '18px', md: '24px' },
              }}
            >
              {clicks}
            </Typography>
          </Stack>
          <Stack justifyContent="center" alignItems="center">
            <Typography
              fontWeight="bold"
              sx={{
                fontSize: { xs: '20px', sm: '28px', md: '36px' },
                lineHeight: { xs: '28px', sm: '32px', md: '36px' },
              }}
            >
              #{position}
            </Typography>
            <Typography
              variant="body2"
              color="grey"
              sx={{
                fontSize: { xs: '14px', sm: '20px', md: '26px' },
                lineHeight: { xs: '12px', sm: '18px', md: '24px' },
              }}
            >
              of {usersAmount}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default UserInfo;
