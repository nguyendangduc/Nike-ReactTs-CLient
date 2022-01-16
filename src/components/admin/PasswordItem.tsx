import React, { useState } from "react";

interface Props {
  password: string;
}
const PasswordItem: React.FC<Props> = ({ password }) => {
  const [isShow, setIsShow] = useState(false as boolean);
  return (
    <div>
      {isShow ? (
        <span onClick={() => setIsShow(false)}>{password}</span>
      ) : (
        <i onClick={() => setIsShow(true)} className="bi bi-eye"></i>
      )}
    </div>
  );
};

export default PasswordItem;
