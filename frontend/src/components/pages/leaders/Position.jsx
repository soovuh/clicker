import { Stack, Typography } from '@mui/material';
import GoldenCupIcon from '../../UI/icons/GoldenCupIcon';
import SilverCupIcon from '../../UI/icons/SilverCupIcon';
import BronzeCupIcon from '../../UI/icons/BronzeCupIcon';

const Position = ({ position }) => {
  let content = null;

  switch (position) {
    case 1:
      content = <GoldenCupIcon />;
      break;
    case 2:
      content = <SilverCupIcon />;
      break;
    case 3:
      content = <BronzeCupIcon />;
      break;
    default:
      content = <Typography>{position}</Typography>;
  }

  return (
    <Stack
      sx={{ width: '50px', justifyContent: 'center', alignItems: 'center' }}
    >
      {content}
    </Stack>
  );
};

export default Position;
