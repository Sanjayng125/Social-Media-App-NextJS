import React from "react";
import "./Spinner2.css";

const Spinner2 = ({
  width,
  height,
  border,
}: {
  width: number;
  height: number;
  border: number;
}) => {
  return (
    <div
      className={`Spinner`}
      style={{
        width: `${width}px` || "80px",
        height: `${height}px` || "80px",
        borderTop: `${border}px solid` || "4px solid",
      }}
    ></div>
  );
};

export default Spinner2;
