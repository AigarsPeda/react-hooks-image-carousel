import React from "react";

const ArrowIconLeft = (props: React.SVGProps<SVGSVGElement>): JSX.Element => {
  return (
    <svg
      viewBox="0 0 40 64"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={2}
      {...props}
    >
      <path
        d="M40 56l-8.152 8L0 32 31.848 0 40 8 16 32l24 24z"
        fillRule="nonzero"
      />
    </svg>
  );
};

export default ArrowIconLeft;
