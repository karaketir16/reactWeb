import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom"
import MyCarousel from "./myCarousel"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import MyNavbar from './myNavbar'
class MainPage extends Component{

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
        <Container>
            <Row>
                <Col xs={12}>
                    <Image src="https://via.placeholder.com/1920x300" fluid />
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <MyNavbar />
                </Col>
            </Row>
            <Row>
                <Col sm={12}>
                    <MyCarousel />
                </Col>
            </Row>
        </Container>

    );
        
}

export default MainPage;