import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom"
import logo from './logo.svg';
import './App.css';
import MainPage from './components/mainPage';
import AdminPanel from './components/adminPanel';
import NewArticle from './components/newArticle';
import ArticlePage from './components/articlePage';
import newEditor from './components/newEditor';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};


class App extends Component{

  constructor() 
  {
    super();
    this.state = {
      newTodo: "",
      todos: [],
      test: [<b>deneme</b>, <b>deneme</b>]
    };
  };

  render = () => (

    <Router>
      <Route path='/' exact component={MainPage}/>
      <Route path='/admin' component={AdminPanel}/>
      <Route path='/yeni-yazi' component={NewArticle}/>
      <Route path='/yazilar/:articleName' component={ArticlePage}/>
      <Route path='/test' component={newEditor}/>
    </Router>

  );
}

export default App;
