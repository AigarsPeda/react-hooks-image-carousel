import React, { useEffect, useRef, useState } from "react";
import Dots from "./Dots/Dots";
import ArrowIconLeft from "./Icons/ArrowIconLeft";
import ArrowIconRight from "./Icons/ArrowIconRight";

const TRANSITION_SPEED = 0.45;

interface Props {
  children: React.ReactElement[];
  autoPlay?: number;
}

// TODO: how to change transition speed if button clicked fast

const Carousel: React.FC<Props> = (props) => {
  const { autoPlay, children } = props;

  const divRef = useRef<HTMLDivElement>(null);

  const firstSlide = children[0];
  const secondSlide = children[1];
  const lastSlide = children[children.length - 1];

  const getWidth = () => {
    if (divRef.current) {
      return divRef.current.offsetWidth;
    } else {
      // TODO: fix magic number
      return 500;
    }
  };

  const [state, setState] = useState({
    activeIndex: 0,
    translate: getWidth(),
    transition: TRANSITION_SPEED,
    _slides: [lastSlide, firstSlide, secondSlide]
  });
  const { translate, transition, activeIndex, _slides } = state;

  useEffect(() => {
    const slider = divRef.current;

    if (slider === null) return;

    const smooth = (e: Event) => {
      // e type may bee wrong
      const element = e.target as HTMLButtonElement;
      if (element === null) return;

      if (element.className.includes("slider-content")) {
        smoothTransition();
      }
    };

    slider.addEventListener("transitionend", smooth);
    window.addEventListener("resize", handleResize);

    return () => {
      slider.removeEventListener("transitionend", smooth);
      window.removeEventListener("resize", handleResize);
    };
  });

  useEffect(() => {
    if (transition === 0)
      setState((state) => ({
        ...state,
        transition: TRANSITION_SPEED
      }));
  }, [transition]);

  const handleResize = () => {
    setState({
      ...state,
      translate: getWidth(),
      transition: 0
    });
  };

  useEffect(() => {
    if (!autoPlay) return;

    const play = () => {
      nextSlide();
    };

    const interval = setInterval(play, autoPlay * 1000);
    return () => {
      clearInterval(interval);
    };
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

  // TODO: add touch support
  // const [touchStart, setTouchStart] = useState(0);
  // const [touchEnd, setTouchEnd] = useState(0);

  // const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
  //   setTouchStart(e.targetTouches[0].clientX);
  // };

  // const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
  //   setTouchEnd(e.targetTouches[0].clientX);
  // };

  // const handleTouchEnd = () => {
  //   if (touchStart - touchEnd > 150) {
  //     // do your stuff here for left swipe
  //     nextSlide();
  //   }

  //   if (touchStart - touchEnd < -150) {
  //     // do your stuff here for right swipe
  //     prevSlide();
  //   }
  // };

  return (
    <div ref={divRef} className="carousel-container">
      <ul
        style={{
          transform: `translateX(-${translate}px)`,
          transition: `transform ease-out ${transition}s`,
          width: `${getWidth() * _slides.length}px`,
          display: "flex",
          willChange: "transform"
        }}
        className="slider-content"
      >
        {_slides.map((slide, index) => (
          <li
            key={index}
            className="carousel-item"
            // onTouchStart={handleTouchStart}
            // onTouchMove={handleTouchMove}
            // onTouchEnd={handleTouchEnd}
          >
            {slide}
          </li>
        ))}
      </ul>

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
