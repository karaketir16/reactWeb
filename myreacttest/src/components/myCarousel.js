import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel'

class MyCarousel extends Component{

    constructor() 
    {
      super();
      this.state = {
        newTodo: "",
        todos: [],
        test: [<b>deneme</b>, <b>deneme</b>]
      };
    };


    render = () => 
    (
        <Carousel>
            <Carousel.Item>
            <img
            className="d-block w-100"
            src="https://via.placeholder.com/1920x1080"
            alt="First slide"
            />
            <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
            <img
            className="d-block w-100"
            src="https://via.placeholder.com/1920x1080"
            alt="Third slide"
            />
            <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
            <img
            className="d-block w-100"
            src="https://via.placeholder.com/1920x1080"
            alt="Third slide"
            />
            <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
            </Carousel.Item>
        </Carousel>


    );
        
}

export default MyCarousel;