export const isExpired = () => {
  let tokenInfo = getTokenInfo();
  let userInfo = getUserInfo();
  let roleInfo = getRoleInfo();
  let allRoleInfo = getAllRolesInfo();
  let isNotPassed = !middlewareRole();
  try {
    if (
      !tokenInfo ||
      !userInfo ||
      !roleInfo ||
      !allRoleInfo ||
      isNotPassed ||
      (!tokenInfo.ttl || !tokenInfo.created)
    ) {
      return true;
    }
    const dateNow = new Date().getTime() / 1000;
    const dateExpire = new Date(tokenInfo.created).getTime() / 1000 + tokenInfo.ttl;

    if (dateExpire < dateNow) {
      clearTokenInfo();
      window.localStorage.setItem('session', true); //Flag for display 'SessionExpiredSnacker'
      return true;
    }
    return false;
  } catch (e) {
    return true;
  }
};

export const middlewareRole = () => {
  let roleInfo = getRoleInfo();
  //if( roleInfo && (roleInfo.name === 'admin' || roleInfo.name === 'production_export' || roleInfo.name === 'production_mapping') ) {
  ////console.log("roleInfo.name",roleInfo.name)

  if (!roleInfo) {
    return false;
  }
  const pickedProduction = roleInfo.find(
    o => o.name === 'admin',
  );

  if (pickedProduction) {
    return true;
  }
  return false;
  // if( roleInfo && roleInfo.name === 'admin' ){
  //   return false
  // }
  // else if( roleInfo && roleInfo.name === 'production_mapping' ) {
  //   return true
  // }else if( roleInfo && roleInfo.name === 'production_export' ) {
  //   return true
  // }else{
  //   return false
  // }
};

export const containRole = roleName => {
  let roleInfo = getRoleInfo();
  if (!roleInfo) {
    return false;
  }
  const pickedProduction = roleInfo.find(o => o.name === roleName);
  if (pickedProduction) {
    return true;
  }
  return false;
};

export const getTokenInfo = () => {
  let plainText = window.localStorage.getItem('token-info');
  return plainText ? JSON.parse(plainText) : null;
};

export const saveTokenInfo = (tokenInfo = {}) => {
  window.localStorage.setItem('token-info', JSON.stringify(tokenInfo));
};

export const deleteToken = () => {
  window.localStorage.removeItem('token-info');
};

export const getUserInfo = () => {
  let plainText = window.localStorage.getItem('user-info');
  return plainText ? JSON.parse(plainText) : null;
};

export const saveUserInfo = (userInfo = null) => {
  window.localStorage.setItem('user-info', JSON.stringify(userInfo));
};

export const getRoleInfo = () => {
  let plainText = window.localStorage.getItem('role-info');
  return plainText ? JSON.parse(plainText) : null;
};

export const saveRoleInfo = (userInfo = {}) => {
  window.localStorage.setItem('role-info', JSON.stringify(userInfo));
};

export const getSession = () => {
  return window.localStorage.getItem('session') || null;
};

export const deleteSession = () => {
  window.localStorage.removeItem('session');
};

export const clearTokenInfo = () => {
  window.localStorage.clear();
};

export const getAllRolesInfo = role_name => {
  let plainText = window.localStorage.getItem('all-roles-info');
  let roles = plainText ? JSON.parse(plainText) : null;
  if (role_name) {
    for (let role of roles) {
      if (role_name === role.name) {
        return role;
      }
    }
    return {};
  } else {
    return roles || null;
  }
};

export const saveAllRolesInfo = (userInfo = {}) => {
  window.localStorage.setItem('all-roles-info', JSON.stringify(userInfo));
};

export const setAuthenFlag = status => {
  window.localStorage.setItem('auth', status);
};

export const getAuthenFlag = () => {
  return window.localStorage.getItem('auth') || false;
};
