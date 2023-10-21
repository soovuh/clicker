import { NavLink } from 'react-router-dom';

const RouterLink = ({ children, to, sx }) => {
  const styles = {
    textDecoration: 'none',
    color: 'inherit',
    ...sx,
  };

  return (
    <NavLink to={to} style={styles}>
      {children}
    </NavLink>
  );
};

export default RouterLink;
