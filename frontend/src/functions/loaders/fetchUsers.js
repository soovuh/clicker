import { DUMMY_USERS } from '../../constants';

export const fetchUsers = async () => {
  // fetch('/users')
  return new Promise(res => {
    setTimeout(() => res(DUMMY_USERS), 500);
  });
};
