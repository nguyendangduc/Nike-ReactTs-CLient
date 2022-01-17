import React, { memo, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { ContextElement } from "../App";
import ProductInfo from "../components/productDetail/ProductInfo";
import AddCartMessage from "../components/productDetail/AddCartMessage";
import { useAppSelector } from "../services/store";
import { postCarts } from "../services/apis";

interface Props {
  products: Array<Product>;
  loading: boolean;
}

interface Param {
  id: string;
}

const ProductDetail: React.FC<Props> = ({ products, loading }) => {
  let { addItemToCartMessage, setAddItemToCartMessage, setToDashBoard } =
    useContext(ContextElement);
  const { dataUser } = useAppSelector((state) => state.authReducer);
  let param: Param = useParams();
  let id = param.id;
  let currentProduct = products.filter(
    (product: Product) => product.id === Number(id)
  )[0];

  const [colorValue, setColorValue] = useState(0);
  const [sizeValue, setSizeValue] = useState("EU 38.5");

  function handleAddCart() {
    let itemInfo = {
      urlImg: currentProduct.colorimg[colorValue],
      productName: currentProduct.name,
      size: sizeValue,
      price: currentProduct.price,
    };

    if (dataUser) {
      postCarts(dataUser.id, itemInfo)
        .then((res) => {})
        .catch((err) => console.error(err));
      setAddItemToCartMessage(true);
      document.body.classList.add("stopScrolling");
    } else {
      setAddItemToCartMessage(true);
      document.body.classList.add("stopScrolling");
    }
  }

  function handleChooseColor(imgUrl: string) {
    for (let i = 0; i < currentProduct.colorimg.length; i++) {
      currentProduct.colorimg[i] === imgUrl
        ? setColorValue(i)
        : setColorValue(0);
    }
  }

  function handleChooseSize(size: string) {
    setSizeValue(size);
  }

  useEffect(() => {
    setToDashBoard(false);
  }, []);

  return (
    <div className="container">
      {currentProduct === undefined ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row mt-4">
          <AddCartMessage
            addItemToCartMessage={addItemToCartMessage}
            setAddItemToCartMessage={setAddItemToCartMessage}
          />
          <div className="col-md-8 col-12">
            <div className="row">
              {loading ? (
                <div className="d-flex justify-content-center">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                currentProduct.detailimg.map((imgUrl: string) => {
                  return (
                    <div className="col-6" key={imgUrl}>
                      <img src={imgUrl} alt="img" className="mb-3"></img>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="col-md-4 col-12">
            <ProductInfo
              currentProduct={currentProduct}
              colorValue={colorValue}
              handleChooseColor={handleChooseColor}
              sizeValue={sizeValue}
              handleChooseSize={handleChooseSize}
              handleAddCart={handleAddCart}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default memo(ProductDetail);
