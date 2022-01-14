import Pagination from "./Pagination";
import ProductsList from "./ProductsList";
import UserList from "./UsersList";

interface Props {
  setSearchInputAdmin: (value: string) => void;
  manageType: string;
  usersList: Array<User>;
  productsList: Array<Product>;
  setProductsList: (value: Array<Product>) => void;
  currentPageAdmin: number;
  setCurrentPageAdmin: (value: number) => void;
  totalPage: number;
  totalPageArr: Array<number>;
}

const Dashboard: React.FC<Props> = ({
  setSearchInputAdmin,
  manageType,
  usersList,
  productsList,
  setProductsList,
  currentPageAdmin,
  setCurrentPageAdmin,
  totalPage,
  totalPageArr,
}) => {
  return (
    <div className="container mt-4">
      <div className="row mb-3">
        <div className="col-4">
          <input
            type="text"
            className="form-control search"
            placeholder="Search"
            onChange={(e) => setSearchInputAdmin(e.target.value)}
          />
        </div>
      </div>
      {manageType === "user" ? (
        <UserList usersList={usersList} />
      ) : (
        <ProductsList
          productsList={productsList}
          setProductsList={setProductsList}
        />
      )}

      <Pagination
        currentPageAdmin={currentPageAdmin}
        setCurrentPageAdmin={setCurrentPageAdmin}
        totalPage={totalPage}
        totalPageArr={totalPageArr}
      />
    </div>
  );
};

export default Dashboard;
