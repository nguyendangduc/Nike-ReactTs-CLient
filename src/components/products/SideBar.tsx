import { memo } from "react";

interface Props {
  setCategory: (value: string) => void;
}

const SideBar: React.FC<Props> = ({ setCategory }) => {
  function handleSetCategory(e: string) {
    setCategory(e);
  }

  return (
    <div className="sidebar d-md-block">
      <div className="row">
        <h3 className="sidebar-header col-12 ">Men's Shoes</h3>
      </div>
      <div className="row mt-4">
        <div className="col-6 col-md-12">
          <p
            className="sidebar-category "
            onClick={(e) => handleSetCategory((e.target as HTMLElement).innerText)}
          >
            All
          </p>
          <p
            className="sidebar-category "
            onClick={(e) => handleSetCategory((e.target as HTMLElement).innerText)}
          >
            Sandals
          </p>
          <p
            className="sidebar-category "
            onClick={(e) => handleSetCategory((e.target as HTMLElement).innerText)}
          >
            Jordan
          </p>
          <p
            className="sidebar-category "
            onClick={(e) => handleSetCategory((e.target as HTMLElement).innerText)}
          >
            Running
          </p>
        </div>
        <div className="col-6 col-md-12">
          <p
            className="sidebar-category "
            onClick={(e) => handleSetCategory((e.target as HTMLElement).innerText)}
          >
            Basketball
          </p>
          <p
            className="sidebar-category "
            onClick={(e) => handleSetCategory((e.target as HTMLElement).innerText)}
          >
            Football
          </p>
          <p
            className="sidebar-category "
            onClick={(e) => handleSetCategory((e.target as HTMLElement).innerText)}
          >
            Training & Gym
          </p>
        </div>
      </div>

    </div>
  );
};
export default memo(SideBar);
