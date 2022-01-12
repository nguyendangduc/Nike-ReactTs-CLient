import { memo } from "react";

interface Props {
  setCategory: (value: string) => void;
}

const SideBar: React.FC<Props> = ({ setCategory }) => {
  function handleSetCategory(e: string) {
    setCategory(e);
  }

  return (
    <div className="sidebar d-flex d-md-block">
      <h3 className="sidebar-header">Men's Shoes</h3>
      <p
        className="sidebar-category me-3 me-md-0"
        onClick={(e) => handleSetCategory((e.target as HTMLElement).innerText)}
      >
        All
      </p>
      <p
        className="sidebar-category me-3 me-md-0"
        onClick={(e) => handleSetCategory((e.target as HTMLElement).innerText)}
      >
        Sandals
      </p>
      <p
        className="sidebar-category me-3 me-md-0"
        onClick={(e) => handleSetCategory((e.target as HTMLElement).innerText)}
      >
        Jordan
      </p>
      <p
        className="sidebar-category me-3 me-md-0"
        onClick={(e) => handleSetCategory((e.target as HTMLElement).innerText)}
      >
        Running
      </p>
      <p
        className="sidebar-category me-3 me-md-0"
        onClick={(e) => handleSetCategory((e.target as HTMLElement).innerText)}
      >
        Basketball
      </p>
      <p
        className="sidebar-category me-3 me-md-0"
        onClick={(e) => handleSetCategory((e.target as HTMLElement).innerText)}
      >
        Football
      </p>
      <p
        className="sidebar-category me-3 me-md-0"
        onClick={(e) => handleSetCategory((e.target as HTMLElement).innerText)}
      >
        Training & Gym
      </p>
    </div>
  );
};
export default memo(SideBar);
