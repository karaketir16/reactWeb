import React, { Component } from 'react';
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import {connect} from "react-redux"
import {loginAction} from "../actions"
import { withFirebase } from './Firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

class LoginCompBase extends Component{
    constructor(props) {
        super(props);
      this.state = {
        user: this.props.user,
      }; 
      this.props.firebase.auth.onAuthStateChanged((user) => {
          this.setState(
              {user: user}
          );
          this.props.loginAction(user)
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
        this.state.user 
        ?
        <Container>{this.state.user.displayName}
        <Button onClick={() => this.props.firebase.auth.signOut()}> signout </Button>
        </Container>
        : 
        <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={this.props.firebase.auth}/>
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

const LoginComp = withFirebase(LoginCompBase);

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginComp);

