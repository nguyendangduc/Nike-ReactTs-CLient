import { NavBarProfile } from "../../components/NavBarProfile";
import { useAppSelector } from "../../services/store";
import styles from "./Profile.module.scss";
const URL_AVATAR = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY-hjuFaNMnEAp28Q9Mo7x6QK_IyHnKdOqqA&usqp=CAU"
export const Profile = () => {
  const { dataUser } = useAppSelector((state) => state.authReducer);
  let email = dataUser.email;
  let name = email.split('@')[0];
  
  
  return (
    <div className="container my-3">
      <NavBarProfile/>
      <div className="row">
        <div className="col-lg-2 col-md-3 col-sm-3">
          <img src={dataUser.avatar ? dataUser.avatar : URL_AVATAR} alt="avatar" className={styles.avatar}/>
        </div>
        <div className="col-lg-10 col-md-9 col-sm-9">
          <p className="h5 text-capitalize">{name}</p>
          <p>Nike Member Since January 2022</p>
        </div>
      </div>
      <p className="h4 mt-5">Member Benefits</p>
      <div className="row justify-content-between">
        <div className={`${styles.benefit} card col-xl-3`}>
          <img src="https://c.static-nike.com/a/images/w_1920,c_limit/wnvgdvk039burostgbdb/member-home-carousel.jpg" className="card-img-top" alt="..."/>
          <div className="card-body">
            <p className="card-text">Member Only Products</p>
          </div>
        </div>
        <div className={`${styles.benefit} card col-xl-3`}>
          <img src="https://c.static-nike.com/a/images/w_1920,c_limit/gkq1c6xpvais2s9cvre6/member-home-carousel.jpg" className="card-img-top" alt="..."/>
          <div className="card-body">
            <p className="card-text">Free Returns With Every Order</p>
          </div>
        </div>
        <div className={`${styles.benefit} card col-xl-3`}>
          <img src="https://c.static-nike.com/a/images/w_1920,c_limit/dwchwjfhrmorbr1qapdx/member-home-carousel.jpg" className="card-img-top" alt="..."/>
          <div className="card-body">
            <p className="card-text">Exclusive Deals</p>
          </div>
        </div>
        <div className={`${styles.benefit} card col-xl-3`}>
          <img src="https://static.nike.com/a/images/w_1920,c_limit/70c351cb-82c0-49f6-b5b9-6941ed9754bc/member-home-carousel.jpg" className="card-img-top" alt="..."/>
          <div className="card-body">
            <p className="card-text">Free Running and Training App</p>
          </div>
        </div>
      </div>
    </div>
  );
};