export const gettUserDetails = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};