import { FC, useEffect } from "react";
import { Redirect } from "react-router";
import {
  useAppSelector,
  useAppDispatch,
  userFetchSuccess,
  userFetchError,
  logoutSuccess,
} from "../../../../services/store";
import { useHistory, useLocation } from "react-router-dom";
import { authByToken } from "../../../../services/apis";
import { hasPermission } from "../../../../services/functions";

interface Props {
  ifInaccessibleRedirectTo?: string;
  routeRules?: string[];
}

const AuthenticatedGuard: FC<Props> = (props) => {
  const { ifInaccessibleRedirectTo, children, routeRules } = props;
  const dispatch = useAppDispatch();
  const { isAuth, dataUser } = useAppSelector((state) => state.authReducer);
  const location: any = useLocation();

  useEffect(() => {
    if(localStorage.getItem('token')) {
      authByToken()
      .then((res: any) => {
        dispatch(userFetchSuccess(res.data));
        setTimeout(function () {
          dispatch(logoutSuccess());
        }, new Date(res.data.expired).getTime() - new Date().getTime());
      })
      .catch((err) => {
        alert('Login expired, Re Login to continue!')
        dispatch(logoutSuccess());
      });
    } else {
      alert('Login to continue!')
      dispatch(logoutSuccess());
    }
  }, [location.pathname]);
  const checkAuthorization = () => {
    return hasPermission(
      routeRules ? routeRules : [],
      dataUser ? dataUser?.rules : []
    );
  };

  return (
    <>
      {isAuth ? (
        checkAuthorization() ? (
          children
        ) : (
          <h4 className="p-4 text-decoration-underline text-danger">
            Access Denied
          </h4>
        )
      ) : (
        <Redirect
          to={{
            pathname: ifInaccessibleRedirectTo
              ? ifInaccessibleRedirectTo
              : "/login",
            state: { referrer: location?.pathname },
          }}
        />
      )}
    </>
  );
};

export default AuthenticatedGuard;
