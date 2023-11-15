import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
} from '@mui/material';
import Position from './Position';

const ListItemUser = ({ avatar, username, clicks, position }) => {
  return (
    <ListItem sx={{ padding: '4px 16px' }}>
      <ListItemAvatar>
        <Avatar alt={username} src={avatar} />
      </ListItemAvatar>
      <ListItemText
        primary={<Typography>{username}</Typography>}
        secondary={
          <Typography
            sx={{ display: 'inline' }}
            component="span"
            variant="body2"
            color="text.primary"
          >
            {clicks}
          </Typography>
        }
      />
      <Position position={position} />
    </ListItem>
  );
};

export default ListItemUser;
