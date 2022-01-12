import { NavLink } from "react-router-dom";

export const NavBarProfile = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-transparent mb-3">
        <div className="collapse navbar-collapse ">
          <ul className="navbar-nav m-auto mb-2 mb-lg-0 d-flex ">
            <li className=" d-flex">
              <NavLink
                to="/profile"
                className="navbar__link me-3"
                activeClassName="navbar__link--active"
              >
                Profile
              </NavLink>
              <NavLink
                to="/ordershistory"
                className="navbar__link me-3"
                activeClassName="navbar__link--active"
              >
                Orders History
              </NavLink>
              <NavLink
                to="/update"
                className="navbar__link me-3"
                activeClassName="navbar__link--active"
              >
                Setting Update
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};
