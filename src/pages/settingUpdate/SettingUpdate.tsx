import { NavBarProfile } from "../../components/NavBarProfile";
import AuthenticatedGuard from "../../components/auth/authentication/authenticatedGuard/AuthenticatedGuard";

let rules = ["user"];
export const SettingUpdate = () => {
  return (
    <AuthenticatedGuard routeRules={rules}>
      <div className="container my-3">
        <NavBarProfile />
        <h1>Setting Update</h1>
      </div>
    </AuthenticatedGuard>
  );
};
