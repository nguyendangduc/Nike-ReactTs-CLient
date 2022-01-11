import React, { FC, useEffect, useState } from "react";
import { Redirect } from "react-router";
import { useSelector } from "react-redux";
import { useAppSelector, RootState } from "../../../../services/store";
import { useLocation } from "react-router-dom";
interface Props {
  ifInaccessibleRedirectTo: string;
}

const AuthenticatedGuard: FC<Props> = (props) => {
  const { ifInaccessibleRedirectTo, children } = props;

  const { isAuth } = useAppSelector((state) => state.authReducer);
  // const {isAuth} = useSelector((state:RootState) =>state.authReducer);
  const location: any = useLocation();
  console.log(location);
  
  useEffect(() => {
    // const unsubscribe = store.subscribe(() => {
    //   setAuthenticated(isUserHavingToken(store.getState().user))
    // });
    // return unsubscribe;
    //check token
  }, []);

  //   function isUserHavingToken(user: User): boolean {
  //     return !!user.token;
  //   }

  return (
    <>
      {isAuth ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: ifInaccessibleRedirectTo,
            state: { referrer: location?.pathname },
          }}
        />
      )}
    </>
  );
};

export default AuthenticatedGuard;
