import React, { FC, useEffect, useState } from "react";
import { Redirect } from "react-router";
import { useSelector } from "react-redux";
import { useAppSelector } from "../../../../services/store";
import { useLocation } from "react-router-dom";
interface Props {}

const UnAuthenticatedGuard: FC<Props> = (props) => {
  const { children } = props;

  const { isAuth } = useAppSelector((state) => state.authReducer);

  const location: any = useLocation();
  const referrer: string = location?.state?.referrer;
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

  return <>{isAuth ? <Redirect to={referrer ? referrer : "/"} /> : children}</>;
};

export default UnAuthenticatedGuard;
