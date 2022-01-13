import { memo } from "react";

interface Props {
  setSortInput: (value: string) => void;
}

const Sort: React.FC<Props> = ({ setSortInput }) => {
  return (
    <select
      className="form-select"
      required
      onChange={(e) => setSortInput(e.target.value)}
    >
      <option value="">Default</option>
      <option value="desc">Price descending</option>
      <option value="asc">Price ascending</option>
    </select>
  );
};
export default memo(Sort);
