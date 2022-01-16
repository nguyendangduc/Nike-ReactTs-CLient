import { Link } from "react-router-dom";
import style from "../../pages/admin/Admin.module.scss";
import { useAppSelector } from "../../services/store";

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
  const { dataUser } = useAppSelector((state) => state.authReducer);
  const handleNaviUserPage = (event:any) => {
    event.preventDefault();
    if (
      dataUser?.rules.includes("admin") ||
      dataUser?.rules.includes("user_admin")
    ) {
    console.log('')

      setManageType("user");
    } else {
      alert("Access Denied!");
    }
  };
  const handleNaviProductPage = (event: any) => {
    event.preventDefault();
    if (
      dataUser?.rules.includes("admin") ||
      dataUser?.rules.includes("product_admin")
    ) {
    console.log('132')

      setManageType("product");
    } else {
      alert("Access denied!");
    }
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light admin pt-3">
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
                onClick={handleNaviUserPage}
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
                onClick={handleNaviProductPage}
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
