import React from "react";

interface DotProps {
  active: boolean;
}

const Dot: React.FC<DotProps> = ({ active }) => (
  <span
    style={{
      padding: "10px",
      marginRight: "5px",
      cursor: "pointer",
      borderRadius: "50%",
      border: "1px solid black",
      background: active ? "black" : "white"
    }}
  />
);

interface DotsProps {
  children: React.ReactElement[];
  activeIndex: number;
}

const Dots: React.FC<DotsProps> = ({ children, activeIndex }) => (
  <div
    style={{
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}
  >
    {children.map((_, i) => (
      <Dot key={i} active={activeIndex === i ? true : false} />
    ))}
  </div>
);

export default Dots;
