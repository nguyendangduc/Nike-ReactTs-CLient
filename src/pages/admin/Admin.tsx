import React from "react";
import AuthenticatedGuard from "../../components/auth/authentication/authenticatedGuard/AuthenticatedGuard";
const rules = ['admin']
interface Props {

}
const Admin:React.FC<Props> = () => {
  return (
    <AuthenticatedGuard routeRules={rules} >
      <div>Admin</div>
    </AuthenticatedGuard>
  );
};

export default Admin;
