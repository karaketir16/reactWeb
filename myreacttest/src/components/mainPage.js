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


class MainPageBase extends Component{

    constructor(props) {
        super(props);
      this.state = {
        newTodo: "",
        todos: [],
        test: this.props.user,
        editorState: EditorState.createEmpty(),
      }; 
      console.log("MainPageBase Contructor");
    };

    

    uploadCallback = (file) => {
        console.log("Hey");
            var storageRef = this.props.firebase.storage.ref();
            return new Promise((resolve, reject) => {

                var uploadTask = storageRef.child('images/rivers.png').put(file);

                // Register three observers:
                // 1. 'state_changed' observer, called any time the state changes
                // 2. Error observer, called on failure
                // 3. Completion observer, called on successful completion
                uploadTask.on('state_changed', function(snapshot){
                  // Observe state change events such as progress, pause, and resume
                  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                  var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log('Upload is ' + progress + '% done');
                  switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                      console.log('Upload is paused');
                      break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                      console.log('Upload is running');
                      break;
                  }
                }, function(error) {
                  console.log("err", error);
                  reject(error.toString());
                }, function() {
                  // Handle successful uploads on complete
                  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                  uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                      
                    console.log('File available at', downloadURL);
                    resolve({data: {link: downloadURL}});
                  });
                });
            });
         


        // const formData = new FormData();
        // formData.append('file', file);
        // return new Promise((resolve, reject) => {
        // fetch('http://localhost:5000/uploadImage', {
        // method: 'POST',
        // body: formData
        // })
        // .then(res => res.json())
        // .then( resData => {
        // console.log(resData)
        // resolve({ data: { link: resData } });
        // })
        // .catch(error => {
        // console.log(error)
        // reject(error.toString())
        // })
        // })
        };
    
    onEditorStateChange = (editorState) =>
    {
        this.setState({
            editorState,
        });
    };

    loginButton = () =>
    {
        this.props.firebase.auth.signInWithPopup(this.props.firebase.provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            console.log("err", error);
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
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
            </Row>
            <Row>

            </Row>
            <Row>
                <Button onClick={this.loginButton}> Deneme </Button>
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
                        var data = editor.getData();
                        if(data.length < 26)
                        {
                            console.log("data1: ", data);
                            await editor.setData("<p>------</p>Cizgilerin Arasina Yaziyi Yazin<p>------</p>");
                            data = "<p>------</p><p>------</p>";
                            return;
                        }
                        if(data.slice(Math.max(data.length - 13, 0)) != "<p>------</p>")
                        {
                            console.log("data2: ", data);
                            await editor.setData(data + "<p>------</p>");
                            data = data + "<p>------</p>";
                        }
                        if(data.slice(0, 13) != "<p>------</p>")
                        {
                            console.log("data3: ", data);
                            await editor.setData("<p>------</p>" + data);
                            data = "<p>------</p>" + data;
                        }
                        console.log( data.slice(0, 13) );
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
        
}

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