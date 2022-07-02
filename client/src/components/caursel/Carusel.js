import React from "react";
// Bootstrap
import Carousel from "react-bootstrap/Carousel";

// Style
import { caruselStyle } from "../../styles";
import "./style.css";
const useStyles = caruselStyle;

// Carusel of the images
const Carusel = ({ images, assetPage }) => {
  const classes = useStyles();
  return (
    <Carousel
      fade
      className={assetPage ? classes.Bigslider : classes.regularSlider}
      interval={2000}
    >
      {images &&
        images.map((image, i) => (
          <Carousel.Item key={i}>
            <img
              src={image.image}
              height={`${assetPage ? "300px" : "300px"}`}
              width={`${assetPage ? "100%" : "600px"}`}
              crop="scale"
              alt="slider1"
            />
          </Carousel.Item>
        ))}
    </Carousel>
  );
};

export default Carusel;
