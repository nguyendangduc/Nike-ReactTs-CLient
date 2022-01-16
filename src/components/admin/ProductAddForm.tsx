import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { postProduct } from "../../services/apis/functions/adminApi";

const ProductAddForm: React.FC<{}> = () => {
  const [nameInput, setNameInput] = useState("");
  const [priceInput, setPriceInput] = useState(0);
  const [thumbnailInput, setThumbnailInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [genderInput, setGenderInput] = useState("");
  const [detailImgInput, setDetailImgInput] = useState("");
  const [colorImgInput, setColorImgInput] = useState("");
  const [sizeInput, setSizeInput] = useState("");

  const history = useHistory();

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
      id: -1,
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

    postProduct(newProductInfo)
      .then((res) =>
        alert("Add product successfully.Click Ok to back to product page!")
      )
      .then(() => history.push("/admin"))
      .catch((err) => console.log(err));
  }

  return (
    <div className="container">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="row">
          <div className="col-6 col-md-4">
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

          <div className="col-6 col-md-2">
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
                onChange={(e) => handleChangeDetailImg(e.target.value)}
                placeholder="URL1; URL2;..."
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
                placeholder="URL1; URL2;..."
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
                placeholder="size1; size2;..."
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
          Add
        </button>
      </form>
    </div>
  );
};

export default ProductAddForm;
