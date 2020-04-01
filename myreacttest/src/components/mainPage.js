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

import './ckeditor.css'

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';


class MainPageBase extends Component{

    constructor(props) {
        super(props);
      this.state = {
        newTodo: "",
        todos: [],
        user: this.props.user,
        editorState: EditorState.createEmpty(),
      }; 
      this.props.firebase.auth.onAuthStateChanged((user) => {
          this.setState(
              {user: user}
          );
          this.props.loginAction(user)
          console.log("uuuser:", user);
      });

      console.log("MainPageBase Contructor");
    };

    onEditorStateChange = (editorState) =>
    {
        this.setState({
            editorState,
        });
    };
    uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
        signInSuccessUrl: '/signedIn',
        // We will display Google and Facebook as auth providers.
        signInOptions: [
            this.props.firebase.app.auth.GoogleAuthProvider.PROVIDER_ID,
            this.props.firebase.app.auth.FacebookAuthProvider.PROVIDER_ID,
            this.props.firebase.app.auth.TwitterAuthProvider.PROVIDER_ID,
            this.props.firebase.app.auth.GithubAuthProvider.PROVIDER_ID
        ]
      };

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
                    <Preview />
                    <Preview />
                </Col>
                <Col>
                {
                    this.state.user 
                    ?
                    <Container>{this.state.user.displayName}
                    <Button onClick={() => this.props.firebase.auth.signOut()}> signout </Button>
                    </Container>
                    : 
                    <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={this.props.firebase.auth}/>
                     
                }
                </Col>
            </Row>
            <Row>

            </Row>
            <Row>
            </Row>
            <h2>Using CKEditor 5 build in React</h2>
                <CKEditor

                    editor={ ClassicEditor }

                    onInit={ editor => {
                        // You can store the "editor" and use when it is needed.
                        editor.setData("<p>------</p><p>Yazi</p><p>------</p>");
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ async ( event, editor ) => {

                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />
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