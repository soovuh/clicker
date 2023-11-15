export const sortByClicks = users => {
  return users.sort((a, b) => b.clicks - a.clicks);
};

export const getUserPosition = (id, users) => {
  let position = users.findIndex(user => user.id === id);
  return ++position;
};
