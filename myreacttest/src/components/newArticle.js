import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom"
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
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { MDBInput } from "mdbreact";
import Select from "react-select";
import slugify from "slugify"

import './ckeditor.css'

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import SunEditor,{buttonList} from "suneditor-react";
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File



class NewArticleBase extends Component{

    constructor(props) {
        super(props);
      this.state = {
        newTodo: "",
        todos: [],
        test: this.props.user,
        submitText: "Gonder",
        header: "",
        writerList : [
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'vanilla', label: 'Vanilla' },
          ],
        selectedWriter: null,
        redirect: false,
      }; 

      var writersRef = this.props.firebase.database.ref('writers');
      writersRef.on('value', snapshot => {
          let tmp = [];
          for(const writer in snapshot.val())
          {
              let key = snapshot.val()[writer]["name"];
              tmp.push({value: key, label: key});
          }
          this.setState({writerList: tmp});
      });
    };
    
    // A handler executed when the user types or modifies the editor content.
    // It updates the state of the application.
    handleEditorDataChange = ( evt, editor ) =>{
        this.setState( {
            editorData: editor.getData()
        } );
    };

    // A handler executed when the editor has been initialized and is ready.
    // It synchronizes the initial data state and saves the reference to the editor instance.
    handleEditorInit = ( editor ) => {
        this.editor = editor;

        this.setState( {
            editorData: editor.getData()
        } );
    };

    headerChange = (event) =>
    {
        this.setState({header: event.target.value});
    };
    selectionChange = (selectedWriter) =>
    {
        this.setState({selectedWriter});
    };
    submit = (event) =>
    {
        this.setState({
            submitText: "Yukleniyor...",
        })
        let uid = slugify(this.state.header);
        // A post entry.
        var postData = {
            author: this.state.selectedWriter.value,
            body: this.state.editorData,
            title: this.state.header,
        };
        
        // Get a key for a new Post.
        this.props.firebase.database.ref('posts/secrets/' + uid).set(postData, (error => {
            if (error) {
                alert("Bir Sorun Olustu " + error);
                this.setState({
                    submitText: "Gonder",
                });
              } else {
                alert("Basariyla Kaydedildi.");
                this.setState({redirect: true});
              }
        }));

        this.props.firebase.database.ref('posts/opens/' + uid).set(postData, (error => {
            if (error) {
                alert("Bir Sorun Olustu " + error);
                this.setState({
                    submitText: "Gonder",
                });
              } else {
                alert("Basariyla Kaydedildi.");
                this.setState({redirect: true});
              }
        }));
    };


    render = () => {
        if(this.state.redirect)
        {
            return (<Redirect to="/admin"/>);
        }
        else 
            return     (
        <Container>
            <Row>
                <Col xm={9}>
                <MDBInput label="Yazinin Basligi" onChange={this.headerChange}/>
                </Col>
                <Col xm ={3} style={{"padding-top":"30px"}}>
                <Select
                    value={this.state.selectedWriter}
                    onChange={this.selectionChange}
                    options={this.state.writerList}
                    placeholder={"Yazar Secin"}
                />
                </Col>
            </Row>
            <Row>
                <Col sm={9}>
                    <CKEditor
                        editor={ ClassicEditor }

                        onInit={ this.handleEditorInit}
                        
                        onChange={this.handleEditorDataChange }
                        onBlur={ ( event, editor ) => {
                            console.log( 'Blur.', editor );
                        } }
                        onFocus={ ( event, editor ) => {
                            console.log( 'Focus.', editor );
                        } }
                        />
                </Col>
            </Row>
            <Button onClick={this.submit}>{this.state.submitText}</Button>
        </Container>

    )};
        
};

const mapStateToProps = (state) =>
{
    return {user: state.user};
};
const mapDispatchToProps = (dispatch) =>
{
    return {loginAction: (user) => dispatch(loginAction(user))};
};

const NewArticle = withFirebase(NewArticleBase);

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(NewArticle);





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


// loginButton = () =>
// {
//     this.props.firebase.auth.signInWithPopup(this.props.firebase.provider).then(function(result) {
//         // This gives you a Google Access Token. You can use it to access the Google API.
//         var token = result.credential.accessToken;
//         // The signed-in user info.
//         var user = result.user;
//         // ...
//       }).catch(function(error) {
//         // Handle Errors here.
//         console.log("err", error);
//         var errorCode = error.code;
//         var errorMessage = error.message;
//         // The email of the user's account used.
//         var email = error.email;
//         // The firebase.auth.AuthCredential type that was used.
//         var credential = error.credential;
//         // ...
//       });
// };


// uploadCallback = (file) => {
//     console.log("Hey");
//         var storageRef = this.props.firebase.storage.ref();
//         return new Promise((resolve, reject) => {

//             var uploadTask = storageRef.child('images/rivers.png').put(file);

//             // Register three observers:
//             // 1. 'state_changed' observer, called any time the state changes
//             // 2. Error observer, called on failure
//             // 3. Completion observer, called on successful completion
//             uploadTask.on('state_changed', function(snapshot){
//               // Observe state change events such as progress, pause, and resume
//               // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//               var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//               console.log('Upload is ' + progress + '% done');
//               switch (snapshot.state) {
//                 case firebase.storage.TaskState.PAUSED: // or 'paused'
//                   console.log('Upload is paused');
//                   break;
//                 case firebase.storage.TaskState.RUNNING: // or 'running'
//                   console.log('Upload is running');
//                   break;
//               }
//             }, function(error) {
//               console.log("err", error);
//               reject(error.toString());
//             }, function() {
//               // Handle successful uploads on complete
//               // For instance, get the download URL: https://firebasestorage.googleapis.com/...
//               uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                  
//                 console.log('File available at', downloadURL);
//                 resolve({data: {link: downloadURL}});
//               });
//             });
//         });