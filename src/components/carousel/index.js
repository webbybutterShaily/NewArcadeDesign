import React, {useRef} from 'react';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import styled from 'styled-components';
const StyledSlider = styled(Slider)`
  .slick-list {
    padding: 0 !important;
  }
`;

let  settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, //4
    slidesToScroll: 1,
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3, //3
            // slidesToScroll: 3,
            // infinite: true,
            // dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2, // 2
            // slidesToScroll: 2,
            // initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2, //2
           // slidesToScroll: 1
          }
        }
      ]
};

const Carousel = (props) => {

    return (
      <div style={{marginLeft:"20px",marginRight:"20px"}}>
        <StyledSlider {...settings}>
            {props.children}
        </StyledSlider>
        </div>
    );
}

export default Carousel;