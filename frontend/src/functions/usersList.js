export const sortByClicks = users => {
  return users.sort((a, b) => b.clicks - a.clicks);
};
