import React from "react";
import {Carousel} from 'react-bootstrap';


import am from './../images/image_slider/am.jpg';
import food from './../images/image_slider/food.jpg';
import goi from './../images/image_slider/goi.jpg';
import biryani from './../images/image_slider/biryani.jpg';
import party from './../images/image_slider/party.jpg';
import temple from './../images/image_slider/temple.JPG';
import climb from './../images/image_slider/climb.jpg';



class Slider extends React.Component {
    render () {

        return (
            <center>
                <Carousel style={{width: "1200px", height: "550px"}}>

                <Carousel.Item style = {{ height: "1000px"}}>
                        <img  src={party} />
                    </Carousel.Item>
                    
                    <Carousel.Item style = {{ height: "1000px"}} >
                        <img  alt="900x500" src={am} />
                    </Carousel.Item>

                    <Carousel.Item style = {{ height: "1000px"}}>
                        <img  src={food} />
                    </Carousel.Item>

                    <Carousel.Item style = {{ height: "1000px"}}>
                        <img  src={goi} />
                    </Carousel.Item>

                    

                    <Carousel.Item style = {{ height: "1000px"}}>
                        <img  src={climb} />
                    </Carousel.Item>

                    <Carousel.Item style = {{ height: "1000px"}}>
                        <img  src={temple} />
                    </Carousel.Item>

                    <Carousel.Item style = {{ height: "1000px"}}>
                        <img  src={biryani} />
                    </Carousel.Item>

            </Carousel>
          </center >
        );
    }
}

export default Slider;