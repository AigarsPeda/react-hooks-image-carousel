import React from "react";
import Carousel from "./components/Carousel/Carousel";
import Img from "./assets/img1.jpg";
import "./index.scss";

const text = [
  "1AAAA https://images.unsplash.com/photo-1449034446853-66c86144b0ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80",
  "2AAAA https://images.unsplash.com/photo-1470341223622-1019832be824?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2288&q=80",
  "3AAAA https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2094&q=80",
  "4AAAA https://images.unsplash.com/photo-1534161308652-fdfcf10f62c4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2174&q=80"
];

const divWithText = text.map((card, index) => {
  return (
    <div className="test" key={index}>
      {card}
    </div>
  );
});

const App: React.FC = () => {
  return (
    <div className="main-container">
      <div className="main-carousel-container">
        {/* <Carousel autoPlay={7}>{divWithText}</Carousel> */}
        <Carousel>{divWithText}</Carousel>
      </div>

      <div className="main-image-container">
        <img src={Img} alt="goose" />
      </div>
    </div>
  );
};

export default App;
