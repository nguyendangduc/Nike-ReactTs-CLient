import { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { updateProduct } from "../../services/apis/functions/adminApi";

interface Param {
  id: string;
}

interface Props {
  productsList: Array<Product>;
  setProductsList: (value: Array<Product>) => void;
}

const ProductEditForm: React.FC<Props> = ({ productsList }) => {
  let param: Param = useParams();
  let history = useHistory();

  let currentProductId = Number(param.id);
  let currentProduct: Product = productsList
    ? productsList.filter((product) => product.id === currentProductId)?.[0]
    : {
        id: -1,
        name: "",
        price: -1,
        color: -1,
        thumbnail: "",
        detailimg: [],
        colorimg: [],
        size: [],
        type: "",
        gender: "",
      };

  const [nameInput, setNameInput] = useState(currentProduct?.name);
  const [priceInput, setPriceInput] = useState(currentProduct?.price);

  const [thumbnailInput, setThumbnailInput] = useState(
    currentProduct?.thumbnail
  );
  const [categoryInput, setCategoryInput] = useState(currentProduct?.type);
  const [genderInput, setGenderInput] = useState(currentProduct?.gender);
  const [detailImgInput, setDetailImgInput] = useState(
    currentProduct?.detailimg
      .toString()
      .replaceAll(",h", ";\nh")
      .replaceAll("g,", "g;\n")
  );
  const [colorImgInput, setColorImgInput] = useState(
    currentProduct?.colorimg
      .toString()
      .replaceAll(",h", ";\nh")
      .replaceAll("g,", "g;\n")
  );
  const [sizeInput, setSizeInput] = useState(
    currentProduct?.size.toString().replaceAll(",", ";")
  );

  function handleChangePrice(input: string) {
    if (!isNaN(parseInt(input))) {
      setPriceInput(parseInt(input));
    }
  }

  function handleChangeDetailImg(input: string) {
    setDetailImgInput(input);
  }

  function handleChangeColorImg(input: string) {
    setColorImgInput(input);
  }

  function handleChangeSize(input: string) {
    setSizeInput(input);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    let newProductInfo = {
      id: currentProductId,
      name: nameInput,
      price: priceInput,
      color: colorImgInput.split(";").length,
      thumbnail: thumbnailInput,
      detailimg: detailImgInput.split(";"),
      colorimg: colorImgInput.split(";"),
      size: sizeInput.split(";"),
      type: categoryInput,
      gender: genderInput,
    };

    updateProduct(currentProductId, newProductInfo)
      .then((res) =>
        alert("Update product successfully.Click Ok to back to product page!")
      )
      .then(() => history.push("/admin"))
      .catch((err) => console.log(err));
  }

  return (
    <div className="container">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="row">
          <div className="col-4">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Name"
                required
              />
            </div>
          </div>

          <div className="col-2">
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                type="text"
                className="form-control"
                id="price"
                value={priceInput}
                onChange={(e) => handleChangePrice(e.target.value)}
              />
            </div>
          </div>

          <div className="col-3">
            <div className="mb-3">
              <label htmlFor="gender" className="form-label">
                Gender
              </label>
              <select
                className="form-select"
                id="gender"
                value={genderInput}
                onChange={(e) => setGenderInput(e.target.value)}
              >
                <option value={"Men"}>Men</option>
                <option value={"Women"}>Women</option>
              </select>
            </div>
          </div>

          <div className="col-3">
            <div className="mb-3">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <select
                className="form-select"
                id="category"
                value={categoryInput}
                onChange={(e) => setCategoryInput(e.target.value)}
              >
                <option value={"Sandals"}>Sandals</option>
                <option value={"Jordan"}>Jordan</option>
                <option value={"Running"}>Running</option>
                <option value={"Basketball"}>Basketball</option>
                <option value={"Football"}>Football</option>
                <option value={"Traning"}>Traning</option>
              </select>
            </div>
          </div>

          <div className="col-12">
            <div className="mb-3">
              <label htmlFor="thumbnail" className="form-label">
                Thumbnail URL
              </label>
              <input
                type="text"
                className="form-control"
                id="thumbnail"
                value={thumbnailInput}
                onChange={(e) => setThumbnailInput(e.target.value)}
                placeholder="Thumbnail URL"
                required
              />
            </div>
          </div>

          <div className="col-12">
            <div className="mb-3">
              <label htmlFor="detailimg" className="form-label">
                Detail image URL
              </label>
              <textarea
                className="form-control"
                id="detailimg"
                value={detailImgInput}
                onChange={(e) => handleChangeDetailImg(e.target.value)}
                placeholder="URL1; URL2..."
                required
              />
            </div>
          </div>

          <div className="col-12">
            <div className="mb-3">
              <label htmlFor="colorimg" className="form-label">
                Color image URL
              </label>
              <textarea
                className="form-control"
                id="colorimg"
                placeholder="URL1; URL2..."
                value={colorImgInput}
                onChange={(e) => handleChangeColorImg(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="col-12">
            <div className="mb-3">
              <label htmlFor="size" className="form-label">
                Size
              </label>
              <textarea
                className="form-control"
                id="size"
                placeholder="size1; size2..."
                value={sizeInput}
                onChange={(e) => handleChangeSize(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <button type="button" className="btn btn-warning me-4">
          <Link to="/admin">Cancel</Link>
        </button>
        <button type="submit" className="btn btn-success">
          Update
        </button>
      </form>
    </div>
  );
};

export default ProductEditForm;
