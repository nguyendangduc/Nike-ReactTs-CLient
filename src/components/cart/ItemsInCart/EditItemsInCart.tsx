import { memo } from "react";

import style from "./ItemsInCart.module.scss"

const EditItemsInCart = () => {
    return (
        <div >
            edit
        </div>
    );
};
export default memo(EditItemsInCart);




// import React, { memo } from "react";
// import { useParams } from "react-router-dom";
// import { useContext, useState } from "react";
// import AddCartMessage from "../../productDetail/AddCartMessage";
// import { ContextElement } from "../../../App";
// import { addItemToCart } from "../../../services/functions";
// import ProductInfo from "../../productDetail/ProductInfo";
// // import { ContextElement } from "../App";
// // import { addItemToCart } from "../services/functions/getLocalstorage";
// // import ProductInfo from "../components/productDetail/ProductInfo";
// // import AddCartMessage from "../components/productDetail/AddCartMessage";

// interface Props {
//     products: Array<Product>;
//     loading: boolean;
// }

// const EditItemsInCart: React.FC<Props> = ({ products, loading }) => {
//     let { setItemsInCart, addItemToCartMessage, setAddItemToCartMessage } =
//         useContext(ContextElement);

//     let { id }: any = useParams();

//     let currentProduct = products.filter((product: any) => product.id == id)[0];

//     const [colorValue, setColorValue] = useState(0);
//     const [sizeValue, setSizeValue] = useState("EU 38.5");

//     function handleAddCart() {
//         let itemInfo = {
//             id: currentProduct.id,
//             name: currentProduct.name,
//             price: currentProduct.price,
//             size: sizeValue,
//             color: currentProduct.colorimg[colorValue],
//         };
//         setItemsInCart(addItemToCart(itemInfo));
//         document.body.classList.toggle("stopScrolling");
//         setAddItemToCartMessage(true);
//     }

//     function handleChooseColor(imgUrl: string) {
//         for (let i = 0; i < currentProduct.colorimg.length; i++) {
//             currentProduct.colorimg[i] === imgUrl
//                 ? setColorValue(i)
//                 : setColorValue(0);
//         }
//     }

//     function handleChooseSize(size: string) {
//         setSizeValue(size);
//     }

//     return (
//         <div className="container">
//             {currentProduct === undefined ? (
//                 <div className="d-flex justify-content-center">
//                     <div className="spinner-border" role="status">
//                         <span className="visually-hidden">Loading...</span>
//                     </div>
//                 </div>
//             ) : (
//                 <div className="row mt-4">
//                     <AddCartMessage
//                         addItemToCartMessage={addItemToCartMessage}
//                         setAddItemToCartMessage={setAddItemToCartMessage}
//                     />
//                     <div className="col-md-8 col-12">
//                         <div className="row">
//                             {loading ? (
//                                 <div className="d-flex justify-content-center">
//                                     <div className="spinner-border" role="status">
//                                         <span className="visually-hidden">Loading...</span>
//                                     </div>
//                                 </div>
//                             ) : (
//                                 currentProduct.detailimg.map((imgUrl: string) => {
//                                     return (
//                                         <div className="col-6" key={imgUrl}>
//                                             <img src={imgUrl} alt="img" className="mb-3"></img>
//                                         </div>
//                                     );
//                                 })
//                             )}
//                         </div>
//                     </div>

//                     <div className="col-md-4 col-12">
//                         <ProductInfo
//                             currentProduct={currentProduct}
//                             colorValue={colorValue}
//                             handleChooseColor={handleChooseColor}
//                             sizeValue={sizeValue}
//                             handleChooseSize={handleChooseSize}
//                             handleAddCart={handleAddCart}
//                         />
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };
// export default memo(EditItemsInCart);
