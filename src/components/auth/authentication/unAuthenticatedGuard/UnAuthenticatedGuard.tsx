import React, { FC, useEffect, useState } from "react";
import { Redirect } from "react-router";
import { useAppSelector,useAppDispatch,userFetchSuccess } from "../../../../services/store";
import { useLocation } from "react-router-dom";
import {authByToken,} from '../../../../services/apis'

interface Props {
}

const UnAuthenticatedGuard: FC<Props> = (props) => {

  const { children } = props;

  const dispatch = useAppDispatch()
  const { isAuth,dataUser } = useAppSelector((state) => state.authReducer);

  const location: any = useLocation();
  const referrer: string = location?.state?.referrer;

  useEffect(() => {
    authByToken().then((res:any) =>{
      dispatch(userFetchSuccess(res.data))
    })
  }, []);
  
  const redirect = () => {
    if(dataUser) {
      const {rules} = dataUser
      if(rules.includes('admin')) return '/admin'
      return '/'
    }
    return '/'
  }
  return <>{isAuth ? <Redirect to={referrer ? referrer : redirect()} /> : children}</>;
};

export default UnAuthenticatedGuard;
