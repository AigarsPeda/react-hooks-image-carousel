import * as React from "react";

const ArrowIconRight = (props: React.SVGProps<SVGSVGElement>): JSX.Element => {
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
        d="M0 8l8.152-8L40 32 8.152 64 0 56l24-24L0 8z"
        fillRule="nonzero"
      />
    </svg>
  );
};

export default ArrowIconRight;
