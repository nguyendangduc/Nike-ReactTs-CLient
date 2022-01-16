import React, { memo, useContext, useEffect } from "react";
import Sort from "../components/products/Sort";
import Product from "../components/products/Product";
import SideBar from "../components/products/SideBar";
import Pagination from "../components/products/Pagination";
import LimitPage from "../components/products/LimitPage";
import Search from "../components/products/Search";
import { ContextElement } from "../App";

interface Props {
  setSortInput: (value: string) => void;
  products: Array<Product>;
  totalProducts: number;
  currentPage: number;
  setCurrentPage: (value: number) => void;
  pageLimit: string;
  setPageLimit: (value: string) => void;
  loading: boolean;
  setSearchInput: (value: string) => void;
  setCategory: (value: string) => void;
  category: string;
  gender: string;
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
}) => {
  let { setToDashBoard } = useContext(ContextElement);

  useEffect(() => {
    setToDashBoard(false);
  }, []);

  return (
    <div className="App products">
      <div className="container">
        <div className="row mb-3">
          <div className="col-2"></div>
          <div className="col-12 col-md-4 mb-3">
            <Search setSearchInput={setSearchInput} />
          </div>
          <div className="col-0 col-md-2"></div>

          <div className="col-4 col-md-1">
            <LimitPage setPageLimit={setPageLimit} />
          </div>

          <div className="col-8 col-md-3">
            <Sort setSortInput={setSortInput} />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-2 sidebar ">
            <SideBar setCategory={setCategory} />
          </div>

          <div className="col-12 col-md-10">
            <div className="row">
              {loading ? (
                <div className="d-flex justify-content-center">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <Product products={products} />
              )}
            </div>

            <Pagination
              totalProducts={totalProducts}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              pageLimit={pageLimit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default memo(Products);
