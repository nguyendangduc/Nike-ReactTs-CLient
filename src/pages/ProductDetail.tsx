import React, { memo } from "react";

interface Props {
  products:any;
  loading:boolean;
}
const ProductDetail:React.FC<Props> = ({ products, loading }) =>{
  return (
    <div>Detail</div>
  );
}
export default memo(ProductDetail);
