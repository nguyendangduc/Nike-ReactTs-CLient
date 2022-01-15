interface Props {
  currentPageAdmin: number;
  setCurrentPageAdmin: (value: number) => void;
  totalPage: number;
  totalPageArr: Array<number>;
}

const Pagination: React.FC<Props> = ({
  currentPageAdmin,
  setCurrentPageAdmin,
  totalPage,
  totalPageArr,
}) => {
  function handlePrev() {
    currentPageAdmin > 1
      ? setCurrentPageAdmin(Number(currentPageAdmin) - 1)
      : setCurrentPageAdmin(1);
  }

  function handleNext() {
    currentPageAdmin < totalPage
      ? setCurrentPageAdmin(Number(currentPageAdmin) + 1)
      : setCurrentPageAdmin(totalPage);
  }

  return (
    <ul className="home-pagination">
      <li className="page-item">
        <button
          onClick={handlePrev}
          disabled={currentPageAdmin === 1 ? true : false}
          className="page-item-btn"
        >
          Previous
        </button>
      </li>
      {totalPageArr.map((page) => (
        <li
          key={page}
          className={
            page === currentPageAdmin
              ? "page-item page-item-active"
              : "page-item"
          }
          onClick={(e) => setCurrentPageAdmin((e.target as any).textContent)}
        >
          {page}
        </li>
      ))}

      <li className="page-item">
        <button
          onClick={handleNext}
          disabled={currentPageAdmin === totalPage ? true : false}
          className="page-item-btn"
        >
          Next
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
