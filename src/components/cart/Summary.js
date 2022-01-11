import { memo } from "react";

let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
function Summary({ subTotal, shipping, total }) {
  return (
    <>
      <div>Summary</div>
    </>
  );
}
export default memo(Summary);