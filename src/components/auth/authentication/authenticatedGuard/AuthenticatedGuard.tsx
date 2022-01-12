import React, { FC, useEffect, useState } from "react";
import { Redirect } from "react-router";
import {
  useAppSelector,
  useAppDispatch,
  userFetchSuccess,
  RootState,
} from "../../../../services/store";
import { useLocation } from "react-router-dom";
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
    // check mõi router
    authByToken().then((res: any) => {
      dispatch(userFetchSuccess(res.data));
    });
  }, []);
  const checkAuthorization = () => {
    return hasPermission(
      routeRules ? routeRules : [],
      dataUser ? dataUser?.rules : []
    );
  };
  console.log(checkAuthorization(), routeRules , dataUser?.rules);
  return (
    <>
      {isAuth ? (
        checkAuthorization() ? (
          children
        ) : (
          <h4 className="p-4 text-decoration-underline text-danger">Access Denied</h4>
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
