import { Box, Stack, Typography } from '@mui/material';

const styles = {
  base: {
    background:
      'linear-gradient(to left, rgb(24, 89, 154) 0%,rgb(82, 146, 211) 8%,rgb(82, 146, 211) 92%,rgb(24, 89, 154) 100%)',
    padding: '2px',
    borderRadius: '12px',
  },
  display: {
    position: 'relative',
    background: 'transparent',
    border: 'none',
    padding: '0',
  },
  shadow: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    borderRadius: '12px',
    background: 'rgba(0, 0, 0, 0.25)',
    filter: 'blur(2px)',
    transform: 'translateY(2px)',
  },
  edge: {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    borderRadius: '12px',
    background:
      'linear-gradient(to left,rgb(13, 55, 98) 0%,rgb(10, 93, 176) 8%,rgb(10, 93, 176) 92%,rgb(13, 55, 98) 100%)',
  },
  front: {
    minWidth: '60px',
    display: 'block',
    position: 'relative',
    padding: '0 6px',
    borderRadius: '12px',
    backgroundColor: 'rgb(25, 118, 210)',
    transform: 'translateY(-2px)',
  },
};

const Display = ({ value, sx }) => {
  const { fontFamily, color, variant, fontSize, padding, minWidth } = sx;
  return (
    <Box sx={styles.base}>
      <Box sx={styles.display}>
        <Stack sx={styles.shadow}></Stack>
        <Stack sx={styles.edge}></Stack>
        <Stack sx={styles.front}>
          <Typography
            fontFamily={fontFamily}
            color={color}
            variant={variant}
            fontSize={fontSize}
            padding={padding}
            minWidth={minWidth}
            textAlign="center"
          >
            {value}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default Display;
