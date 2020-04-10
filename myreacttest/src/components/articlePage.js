import React, { Component } from 'react';
import {BrowserRouter as Router, Route, useParams} from "react-router-dom"
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

import './article.css';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import LoginComp from "./loginComp";


import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File


class ArticlePageBase extends Component{

    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            articleName: this.props.match.params.articleName,
            articleBody: "Yukleniyor...",
            articleAuthor: "Yukleniyor...",
        }; 
        this.props.firebase.auth.onAuthStateChanged((user) => {
            this.setState(
                {user: user}
            );
            this.props.loginAction(user)
        });

        var articleRef = this.props.firebase.database.ref('posts/opens/' + this.state.articleName);
        articleRef.on('value', snapshot => {
            if(snapshot.val())
            {
                this.setState({articleBody:snapshot.val().body,
                                articleAuthor: snapshot.val().author});
            }
            else{
                this.setState({articleBody:"Yazi Bulunamadi"});
            }
            });
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
                <Col sm={9} className="px-0">
                    <Col className="card" style={{"margin": "30px 0px"}}>
                        <Col className="card-body">
                            <h5 className="card-title">Nam si amitti vita beata potest, beata esse non potest</h5>
                            <h6 className="card-subtitle mb-2 text-muted">Tarih: 24 Aralık 2019</h6>
                            <h6 className="card-subtitle mb-2 text-muted">Yazar: {this.state.articleAuthor}</h6>
                            <img className="card-img-top" src="https://via.placeholder.com/1920x1080" alt="Card cap"/>
                            <div className="editor" dangerouslySetInnerHTML={{__html: this.state.articleBody}}/>
                        </Col>
                    </Col>
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

const ArticlePage = withFirebase(ArticlePageBase);

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ArticlePage);