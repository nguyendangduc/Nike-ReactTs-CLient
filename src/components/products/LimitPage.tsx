import { memo } from "react";

interface Props {
  setPageLimit: (value: string) => void;
}

const LimitPage: React.FC<Props> = ({ setPageLimit }) => {
  return (
    <select
      className="form-select"
      aria-label="Default select example"
      onChange={(e) => setPageLimit(e.target.value)}
    >
      <option value={10}>10</option>
      <option value={8}>8</option>
      <option value={6}>6</option>
      <option value={4}>4</option>
    </select>
  );
};
export default memo(LimitPage);
