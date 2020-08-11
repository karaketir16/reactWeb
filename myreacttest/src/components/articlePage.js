import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import MyNavbar from './myNavbar'
import {connect} from "react-redux"
import {loginAction} from "../actions"
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { withFirebase } from './Firebase';
import LoginComp from "./loginComp";


import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

import './article.css';

class ArticlePageBase extends Component{

    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            articleName: this.props.match.params.articleName,
            articleBody: "Yukleniyor...",
            articleAuthor: "-",
            articleTitle: "Yukleniyor...",
            articleImage: "Yukleniyor...",
            articleDate: "Yukleniyor...",
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
                this.setState({articleBody:snapshot.val().body});

                var articleListElemRef = this.props.firebase.database.ref('posts/list/' + this.state.articleName);
                articleListElemRef.on('value', snapshot => {
                    this.setState({
                        articleTitle: snapshot.val().title,
                        articleImage: snapshot.val().image,
                        articleDate: snapshot.val().date,
                    });
                });

                var writersRef = this.props.firebase.database.ref('writers/' + snapshot.val().author);
                writersRef.on('value', snapshot => {
                    this.setState({articleAuthor: snapshot.val().name});
                });


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

            <MyNavbar />
            
            <Row>
                <Col sm={9} className="px-0">
                    <Col className="card" style={{"margin": "30px 0px"}}>
                        <Col className="card-body">
                            <h5 className="card-title">{this.state.articleTitle}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">Tarih {this.state.articleDate ? 
                            (new Date(this.state.articleDate)).toLocaleDateString("tr-TR", 
                            { year: 'numeric', month: 'long', day: 'numeric' } ) : "-"}</h6>
                            <h6 className="card-subtitle mb-2 text-muted">Yazar: {this.state.articleAuthor ? this.state.articleAuthor : "-"}</h6>
                            <img style={{marginBottom:"20px"}} className="card-img-top" src={this.state.articleImage} alt="Card cap"/>
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