import { FC, useEffect } from "react";
import { Redirect } from "react-router";
import { useAppSelector } from "../../../../services/store";
import { useLocation } from "react-router-dom";

interface Props {}

const UnAuthenticatedGuard: FC<Props> = (props) => {
  const { children } = props;
  const { isAuth, dataUser } = useAppSelector((state) => state.authReducer);
  const location: any = useLocation();
  const referrer: string = location?.state?.referrer;

  const redirect = () => {
    if (dataUser) {
      const { rules } = dataUser;
      for (let rule of rules) {
        if (rule.includes("admin")) return "/admin";
      }
      return "/";
    }
    return "/";
  };
  return (
    <>
      {isAuth ? <Redirect to={referrer ? referrer : redirect()} /> : children}
    </>
  );
};

export default UnAuthenticatedGuard;
