import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom"
import MyCarousel from "./myCarousel"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Image from 'react-bootstrap/Image'
import MyNavbar from './myNavbar'
import Button from 'react-bootstrap/Button'
import Preview from './preview'
import {connect} from "react-redux"
import {loginAction} from "../actions"
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { withFirebase } from './Firebase';
import firebase from 'firebase'

import { Pagination } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'



import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import LoginComp from "./loginComp";


class MainPageBase extends Component{

    constructor(props) {
        super(props);
      this.state = {
        user: this.props.user,
        activePage: 15,
      }; 
      this.props.firebase.auth.onAuthStateChanged((user) => {
          this.setState(
              {user: user}
          );
          this.props.loginAction(user)
      });
    };

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
    }
    
    render = () => 
    (
        <Container>
            <Row>
                <Col xs={12} className="px-0">
                    <Image src="https://via.placeholder.com/1920x300" fluid />
                </Col>
            </Row>
            <Row>
                <Col xs={12} className="px-0">
                    <MyNavbar />
                </Col>
            </Row>
            <Row>
                <Col sm={12} className="px-0">
                    <MyCarousel />
                </Col>
            </Row>
            <Row>
                <Col sm={9} className="px-0">
                    <Preview image="https://via.placeholder.com/1920x1080" title="Test Basligi" text="\
                    In quis sagittis nibh. Donec non convallis mi. Sed bibendum velit volutpat, varius ipsum in, consectetur magna. Mauris eros nunc, tristique lobortis maximus vitae, venenatis vel augue. Pellentesque quis ullamcorper nibh, vitae feugiat lorem. Nulla vitae consectetur ligula, ac porttitor felis. Fusce rutrum tincidunt urna eu cursus. Interdum et malesuada fames ac ante ipsum primis in faucibus. In facilisis gravida tristique. Morbi gravida sem quis nibh fermentum, eget vulputate velit lacinia. Mauris sodales urna eu nulla ultrices, non volutpat velit congue. Quisque non eros vitae mauris mattis porta eget at ante. Nulla eget leo ex. Suspendisse ultrices vitae purus vel tincidunt.\
                    "/>
                    <Preview />
                    <Pagination defaultActivePage={5} totalPages={10} />
                </Col>
                <Col>
                    <LoginComp/>
                </Col>
            </Row>
            <Row>

            </Row>
            <Row>
            </Row>
        </Container>

    );
        
};

const mapStateToProps = (state) =>
{
    return {user: state.user};
};
const mapDispatchToProps = (dispatch) =>
{
    return {loginAction: (user) => dispatch(loginAction(user))};
};

const MainPage = withFirebase(MainPageBase);

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(MainPage);





// onChange={ async ( event, editor ) => {
//     var data = editor.getData();
//     if(data.length < 26)
//     {
//         console.log("data1: ", data);
//         await editor.setData("<p>------</p>Cizgilerin Arasina Yaziyi Yazin<p>------</p>");
//         data = "<p>------</p><p>------</p>";
//         return;
//     }
//     if(data.slice(Math.max(data.length - 13, 0)) != "<p>------</p>")
//     {
//         console.log("data2: ", data);
//         await editor.setData(data + "<p>------</p>");
//         data = data + "<p>------</p>";
//     }
//     if(data.slice(0, 13) != "<p>------</p>")
//     {
//         console.log("data3: ", data);
//         await editor.setData("<p>------</p>" + data);
//         data = "<p>------</p>" + data;
//     }
//     console.log( data.slice(0, 13) );
// } }