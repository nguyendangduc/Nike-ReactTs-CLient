export const hasPermission = (routeRole: string[], userRole: string[]) => {
  if (userRole.includes("admin")) {
    return true;
  } else {
    for (let i = 0; i < userRole.length; i++) {
      for (let j = 0; j < routeRole[i].length; j++) {
        if (userRole[i] === routeRole[j]) return true;
      }
    }
    return false;
  }
  return false;
};
