import React, { memo } from "react";
import Sort from "../components/products/Sort";
import Product from "../components/products/Product";
import SideBar from "../components/products/SideBar";
import Pagination from "../components/products/Pagination";
import LimitPage from "../components/products/LimitPage";
import Search from "../components/products/Search";

interface Props {
  setSortInput:any;
  products:any;
  totalProducts:any;
  currentPage:any;
  setCurrentPage:any;
  pageLimit:any;
  setPageLimit:any;
  loading:any;
  setSearchInput:any;
  setCategory:any;
  category:any;
}
const Products: React.FC<Props> = ({
  setSortInput,
  products,
  totalProducts,
  currentPage,
  setCurrentPage,
  pageLimit,
  setPageLimit,
  loading,
  setSearchInput,
  setCategory,
  category,
}) => {
  return (
    <div>Products</div>
  );
}
export default memo(Products);
