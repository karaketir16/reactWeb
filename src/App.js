import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom"
import logo from './logo.svg';
import './App.css';
import MainPage from './components/mainPage';



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
      <Route path='/test' component={MainPage}/>
    </Router>

  );
}

export default App;
