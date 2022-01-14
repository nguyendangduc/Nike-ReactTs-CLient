const ProductEditForm: React.FC<{}> = () => {
  return (
    <div className="container">
      <form>
        <div className="row">
          <div className="col-4">
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input type="text" className="form-control" id="name" />
            </div>
          </div>

          <div className="col-2">
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input type="text" className="form-control" id="price" />
            </div>
          </div>

          <div className="col-2">
            <div className="mb-3">
              <label htmlFor="color" className="form-label">
                Color's number
              </label>
              <input type="text" className="form-control" id="color" />
            </div>
          </div>

          <div className="col-2">
            <div className="mb-3">
              <label htmlFor="gender" className="form-label">
                Gender
              </label>
              <input type="text" className="form-control" id="gender" />
            </div>
          </div>

          <div className="col-2">
            <div className="mb-3">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <input type="text" className="form-control" id="category" />
            </div>
          </div>

          <div className="col-12">
            <div className="mb-3">
              <label htmlFor="thumbnail" className="form-label">
                Thumbnail url
              </label>
              <input type="text" className="form-control" id="thumbnail" />
            </div>
          </div>

          <div className="col-12">
            <div className="mb-3">
              <label htmlFor="detailimg" className="form-label">
                Detail image url
              </label>
              <textarea className="form-control" id="detailimg" />
            </div>
          </div>

          <div className="col-12">
            <div className="mb-3">
              <label htmlFor="colorimg" className="form-label">
                Color image url
              </label>
              <textarea className="form-control" id="colorimg" />
            </div>
          </div>

          <div className="col-12">
            <div className="mb-3">
              <label htmlFor="size" className="form-label">
                Size
              </label>
              <textarea className="form-control" id="size" />
            </div>
          </div>
        </div>

        <button type="button" className="btn btn-outline-dark me-4">
          Cancel
        </button>
        <button type="submit" className="btn btn-dark">
          Add
        </button>
      </form>
    </div>
  );
};

export default ProductEditForm;
