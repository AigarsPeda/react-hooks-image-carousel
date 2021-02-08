import React, { useEffect, useRef, useState } from "react";
import Dots from "./Dots/Dots";
import ArrowIconLeft from "./Icons/ArrowIconLeft";
import ArrowIconRight from "./Icons/ArrowIconRight";

interface Props {
  children: React.ReactElement[];
  autoPlay?: number;
}

const Carousel: React.FC<Props> = (props) => {
  const { autoPlay, children: propsChildren } = props;
  const children = React.Children.toArray(propsChildren);

  const divRef = useRef<HTMLDivElement>(null);
  const transitionRef = useRef<() => void>();
  // const sliderRef = useRef();

  // const getWidth = () => window.innerWidth

  const firstSlide = children[0];
  const secondSlide = children[1];
  const lastSlide = children[children.length - 1];

  const getWidth = () => {
    if (divRef.current) {
      // console.log(divRef.current.getBoundingClientRect().width);
      return divRef.current.offsetWidth;
    } else {
      return 500;
    }
  };

  const [state, setState] = useState({
    activeIndex: 0,
    translate: getWidth(),
    transition: 0.45,
    _slides: [lastSlide, firstSlide, secondSlide]
  });
  const { translate, transition, activeIndex, _slides } = state;

  useEffect(() => {
    // eslint-disable-next-line functional/immutable-data
    transitionRef.current = smoothTransition;
  });

  useEffect(() => {
    const slider = divRef.current;

    if (slider === null) return;

    const smooth = (e: Event) => {
      // e type may bee wrong
      const element = e.target as HTMLButtonElement;
      if (element === null) return;

      if (
        element.className.includes("slider-content") &&
        transitionRef.current !== undefined
      ) {
        transitionRef.current();
      }
    };

    // const transitionEnd = slider.addEventListener("transitionend", smooth);
    slider.addEventListener("transitionend", smooth);

    return () => {
      // slider.removeEventListener("transitionend", transitionEnd);
      slider.removeEventListener("transitionend", smooth);
    };
  });

  useEffect(() => {
    if (autoPlay) {
      const play = () => {
        nextSlide();
      };

      const interval = setInterval(play, autoPlay * 1000);
      return () => clearInterval(interval);
    } else {
      return;
    }
  });

  const nextSlide = () => {
    setState({
      ...state,
      translate: translate + getWidth(),
      activeIndex: activeIndex === children.length - 1 ? 0 : activeIndex + 1
    });
  };

  const prevSlide = () => {
    setState({
      ...state,
      translate: 0,
      activeIndex: activeIndex === 0 ? children.length - 1 : activeIndex - 1
    });
  };

  useEffect(() => {
    if (transition === 0) setState((state) => ({ ...state, transition: 0.45 }));
  }, [transition]);

  const smoothTransition = () => {
    let _slides = [];

    // We're at the last slide.
    if (activeIndex === children.length - 1) {
      _slides = [children[children.length - 2], lastSlide, firstSlide];
    }

    // We're back at the first slide. Just reset to how it was on initial render
    else if (activeIndex === 0) {
      _slides = [lastSlide, firstSlide, secondSlide];
    }
    // Create an array of the previous last slide, and the next two slides that follow it.
    else {
      _slides = children.slice(activeIndex - 1, activeIndex + 2);
    }

    setState({
      ...state,
      _slides,
      transition: 0,
      translate: getWidth()
    });
  };

  return (
    <div ref={divRef} className="carousel-container">
      <div
        style={{
          transform: `translateX(-${translate}px)`,
          transition: `transform ease-out ${transition}s`,
          width: `${getWidth() * _slides.length}px`,
          display: "flex"
        }}
        className="slider-content"
      >
        {_slides.map((slide, index) => (
          <div key={index} className="carousel-item">
            {slide}
          </div>
        ))}
      </div>

      <Dots activeIndex={activeIndex}>{props.children}</Dots>
      {!autoPlay && (
        <>
          <button onClick={prevSlide} className="left">
            <ArrowIconLeft />
          </button>
          <button onClick={nextSlide} className="right">
            <ArrowIconRight />
          </button>
        </>
      )}
    </div>
  );
};

export default Carousel;
