import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const RightBar = ({ ...props }) => {
  return <div {...props}></div>;
};

export default RightBar;
