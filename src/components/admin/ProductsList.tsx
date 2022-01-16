import { Link } from "react-router-dom";
import style from "../../pages/admin/Admin.module.scss";
import { deleteProduct } from "../../services/apis/functions/adminApi";

interface Props {
  productsList: Array<Product>;
  setProductsList: (value: Array<Product>) => void;
}

const ProductsList: React.FC<Props> = ({ productsList, setProductsList }) => {
  function handleDelete(id: number) {
    deleteProduct(id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    let productsListClone = [...productsList];
    productsListClone = productsListClone.filter(
      (product) => product.id !== id
    );

    setProductsList(productsListClone);
  }

  return (
    <>
      <Link to="/admin/addproduct" className="btn btn-success mb-4">
        Add product
      </Link>

      <div className="table-overflow">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Color</th>
              <th scope="col">Thumbnail</th>
              <th scope="col">Detail Image</th>
              <th scope="col">Color Image</th>
              <th scope="col">Size</th>
              <th scope="col">Type</th>
              <th scope="col">Gender</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {productsList ? (
              productsList.map((product) => {
                return (
                  <tr key={product.id}>
                    <th scope="row">{product.id}</th>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.color}</td>
                    <td>
                      <img
                        src={product.thumbnail}
                        alt="thumb"
                        className={`${style.img_admin}`}
                      />
                    </td>
                    <td>
                      {product.detailimg.map((url: string, index: number) => {
                        return (
                          <img
                            src={url}
                            alt="detail"
                            className={`${style.img_admin}`}
                            key={index}
                          />
                        );
                      })}
                    </td>
                    <td>
                      {product.colorimg.map((url: string, index: number) => {
                        return (
                          <img
                            src={url}
                            alt="color"
                            className={`${style.img_admin}`}
                            key={index}
                          />
                        );
                      })}
                    </td>
                    <td>
                      {product.size.map((size: string, index: number) => {
                        return (
                          <span key={index}>{`${size.replace(
                            "EU",
                            ""
                          )}, `}</span>
                        );
                      })}
                    </td>
                    <td>{product.type}</td>
                    <td>{product.gender}</td>
                    <td>
                      <div
                        className="btn-group"
                        role="group"
                        aria-label="Basic example"
                      >
                        <button type="button" className="btn btn-info">
                          <Link to={`/admin/editproduct/${product.id}`}>
                            Edit
                          </Link>
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => handleDelete(product.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <></>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductsList;
