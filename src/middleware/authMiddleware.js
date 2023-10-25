const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return token ? true : false;
};

const isAdmin = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (currentUser && currentUser.userGroupId) {
    return currentUser.userGroupId == 1 ? true : false;
  }
  return false
};

export default { isAuthenticated, isAdmin };
