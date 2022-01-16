import { NavBarProfile } from "../../components/NavBarProfile";
import { useAppSelector } from "../../services/store";
import styles from "./Profile.module.scss";
import AuthenticatedGuard from "../../components/auth/authentication/authenticatedGuard/AuthenticatedGuard";
import { useContext, useEffect } from "react";
import { ContextElement } from "../../App";
const URL_AVATAR =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY-hjuFaNMnEAp28Q9Mo7x6QK_IyHnKdOqqA&usqp=CAU";
let rules = ["user"];

export const Profile = () => {
  const { dataUser } = useAppSelector((state) => state.authReducer);
  let email = dataUser?.email;
  let name = email?.split("@")[0];

  let { setToDashBoard } = useContext(ContextElement);

  useEffect(() => {
    setToDashBoard(false);
  }, []);

  return (
    <AuthenticatedGuard routeRules={rules}>
      <div className="container my-3">
        <NavBarProfile />
        <div className="row">
          <div className="col-lg-2 col-md-3 col-sm-3">
            <img
              src={
                dataUser && dataUser.avatar !== ""
                  ? dataUser.avatar
                  : URL_AVATAR
              }
              alt="avatar"
              className={styles.avatar}
            />
          </div>
          <div className="col-lg-10 col-md-9 col-sm-9">
            <p className="h4 text-capitalize">{name}</p>
            <p>Nike Member Since January 2022</p>
            <p>
              Address: {dataUser?.address?.address}, {dataUser?.address?.city}
            </p>
            <p>Phone number: {dataUser?.phoneNumber}</p>
          </div>
        </div>
        <p className="h4 mt-5">Member Benefits</p>
        <div className="row justify-content-between">
          <div className={`${styles.benefit} card col-xl-3`}>
            <img
              src="https://c.static-nike.com/a/images/w_1920,c_limit/wnvgdvk039burostgbdb/member-home-carousel.jpg"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <p className="card-text">Member Only Products</p>
            </div>
          </div>
          <div className={`${styles.benefit} card col-xl-3`}>
            <img
              src="https://c.static-nike.com/a/images/w_1920,c_limit/gkq1c6xpvais2s9cvre6/member-home-carousel.jpg"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <p className="card-text">Free Returns With Every Order</p>
            </div>
          </div>
          <div className={`${styles.benefit} card col-xl-3`}>
            <img
              src="https://c.static-nike.com/a/images/w_1920,c_limit/dwchwjfhrmorbr1qapdx/member-home-carousel.jpg"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <p className="card-text">Exclusive Deals</p>
            </div>
          </div>
          <div className={`${styles.benefit} card col-xl-3`}>
            <img
              src="https://static.nike.com/a/images/w_1920,c_limit/70c351cb-82c0-49f6-b5b9-6941ed9754bc/member-home-carousel.jpg"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <p className="card-text">Free Running and Training App</p>
            </div>
          </div>
        </div>
        <p className="h4 mt-5">App Nike</p>
        <div className="row">
          <div className={`${styles.benefit} card col-xl-3 mx-1`}>
            <img
              src="https://www.nike.com/static/dotcom-member/profile/dist/4.0.0/images/nrc.jpg"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <p className="card-title">Nike Run Club</p>
              <p className="card-text">
                Run: Find the motivation you need to run better and more often.
              </p>
            </div>
          </div>
          <div className={`${styles.benefit} card col-xl-3 mx-1`}>
            <img
              src="https://www.nike.com/static/dotcom-member/profile/dist/4.0.0/images/ntc.jpg"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <p className="card-title"> Nike Training Club</p>
              <p className="card-text">
                Train: Break a sweat to over 160 guided workouts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedGuard>
  );
};
