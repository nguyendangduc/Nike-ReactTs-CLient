export const hasPermission = (routeRole: string[], userRole: string[]) => {
  if (userRole.includes("admin")) {
    // admin có quyền truy cập tất cả
    return true;
  } else {
    // không phải admin
    for (let i = 0; i < userRole.length; i++) {
      for (let j = 0; j < routeRole[i].length; j++) {
        if (userRole[i] === routeRole[j]) return true;
      }
    }
    return false;
  }
  return false;
};
