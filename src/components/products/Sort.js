import { memo } from "react";

const Sort= ({ setSortInput }) => {
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
