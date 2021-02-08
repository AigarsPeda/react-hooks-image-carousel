import React, { useRef, useState } from "react";
import Dots from "./Dots/Dots";
import ArrowIconLeft from "./Icons/ArrowIconLeft";
import ArrowIconRight from "./Icons/ArrowIconRight";

interface Props {
  children: React.ReactElement[];
}

const Carousel: React.FC<Props> = (props) => {
  const children = React.Children.toArray(props.children);
  // const getWidth = () => window.innerWidth
  const [state, setState] = useState({
    activeIndex: 0,
    translate: 0,
    transition: 0.45
  });

  const { translate, transition, activeIndex } = state;

  const divRef = useRef<HTMLDivElement>(null);

  const getWidth = () => {
    if (divRef.current) {
      console.log(divRef.current.getBoundingClientRect().width);
      return divRef.current.offsetWidth;
    } else {
      return 500;
    }
  };

  // useEffect(() => {
  //   console.log("width", divRef.current ? divRef.current.offsetWidth : 0);
  // }, [divRef.current]);

  const nextSlide = () => {
    if (activeIndex === children.length - 1) {
      return setState({
        ...state,
        translate: 0,
        activeIndex: 0
      });
    }

    setState({
      ...state,
      activeIndex: activeIndex + 1,
      translate: (activeIndex + 1) * getWidth()
    });
  };

  const prevSlide = () => {
    if (activeIndex === 0) {
      return setState({
        ...state,
        translate: (children.length - 1) * getWidth(),
        activeIndex: children.length - 1
      });
    }

    setState({
      ...state,
      activeIndex: activeIndex - 1,
      translate: (activeIndex - 1) * getWidth()
    });
  };

  return (
    <div ref={divRef} className="carousel-container">
      <div
        style={{
          transform: `translateX(-${translate}px)`,
          transition: `transform ease-out ${transition}s`,
          // height: "100%",
          width: `${getWidth() * children.length}px`,
          display: "flex"
        }}
      >
        {children.map((slide, index) => (
          <div key={index} className="carousel-item">
            {slide}
          </div>
        ))}
      </div>

      <Dots activeIndex={activeIndex}>{props.children}</Dots>
      <button onClick={prevSlide} className="left">
        <ArrowIconLeft />
      </button>
      <button onClick={nextSlide} className="right">
        <ArrowIconRight />
      </button>
    </div>
  );
};

export default Carousel;
