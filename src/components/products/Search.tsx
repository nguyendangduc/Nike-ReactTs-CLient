import { memo } from "react";

interface Props {
  setSearchInput: (value: string) => void;
}

const Search: React.FC<Props> = ({ setSearchInput }) => {
  return (
    <input
      type="text"
      className="form-control search"
      placeholder="Search"
      onChange={(e) => setSearchInput(e.target.value)}
    />
  );
};
export default memo(Search);
