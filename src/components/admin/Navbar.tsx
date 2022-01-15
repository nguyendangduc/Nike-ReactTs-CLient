import { Link } from "react-router-dom";
import style from "../../pages/admin/Admin.module.scss";

interface Props {
  manageType: string;
  setManageType: (value: string) => void;
  setToDashBoard: (value: boolean) => void;
}

const Navbar: React.FC<Props> = ({
  manageType,
  setManageType,
  setToDashBoard,
}) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light admin">
      <div className="container">
        <Link to="/admin" className="navbar-brand">
          Admin
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                to="/admin"
                className={
                  manageType === "user"
                    ? `me-3 ${style.admin_sidebar_item_active}`
                    : `me-3 ${style.admin_sidebar_item}`
                }
                onClick={() => setManageType("user")}
              >
                User
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/admin"
                className={
                  manageType === "product"
                    ? `me-3 ${style.admin_sidebar_item_active}`
                    : `me-3 ${style.admin_sidebar_item}`
                }
                onClick={() => setManageType("product")}
              >
                Product
              </Link>
            </li>
          </ul>
          <Link
            to="/home"
            className="btn btn-dark"
            onClick={() => setToDashBoard(false)}
          >
            Back to home
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
