import React, { Component } from 'react';
import MyCarousel from "./myCarousel"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import MyNavbar from './myNavbar'
import Preview from './preview'
import {connect} from "react-redux"
import {loginAction} from "../actions"
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { withFirebase } from './Firebase';
import { Pagination } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import LoginComp from "./loginComp";


const PERPAGE = 2;


class MainPageBase extends Component{

    constructor(props) {
        super(props);
      this.state = {
        user: this.props.user,
        articleList : [],
        activePage: 1,
        writers: {},
      }; 
      this.props.firebase.auth.onAuthStateChanged((user) => {
          this.setState(
              {user: user}
          );
          this.props.loginAction(user)
      });


      var articleListRef = this.props.firebase.database.ref('posts/list');
      articleListRef.on('value', snapshot => {
          let tmp = [];
          for(const article in snapshot.val())
          {
                if("open" === snapshot.val()[article].status)
                    tmp.push(snapshot.val()[article]);
          }

          tmp.sort((a,b)=>
          {
              
            let x = b.date - a.date;
            console.log(a,b,"X:",x);
            return x;
          });

          this.setState({articleList: tmp});
      });

      var writersRef = this.props.firebase.database.ref('writers');
      writersRef.on('value', snapshot => {
          this.setState({writers: snapshot.val()});
      });

    };

    handlePageChange = (e, {activePage}) => {
        this.setState({activePage});
    };

    sliceArr = () => {

    let sliced = this.state.articleList.slice((this.state.activePage-1)*PERPAGE, (this.state.activePage)*PERPAGE);
    // console.log("articleList:", this.state.)
    console.log("sliced:", sliced);
    
    return sliced.map( article => {
            let aWriter = (article.author ? (this.state.writers[article.author] ? this.state.writers[article.author].name : undefined) : undefined);
            return (
                <Preview image={article.image} title={article.title} text={article.text} 
                date={new Date(article.date)} 
                author={aWriter}
                url={"yazilar/" + article.postKey}/>
            );
        });
    };
    
    render = () => //className="px-0">
    (
        <Container >
            <Row>
                <Col xs={12} className="px-0">
                    <Image src="https://via.placeholder.com/1920x300" fluid />
                </Col>
            </Row>

            <MyNavbar />
            
            <Row>
                <Col sm={12} className="px-0">
                    <MyCarousel />
                </Col>
            </Row>
            <Row>
                <Col sm={9} className="px-0">
                    {this.sliceArr()}
                    <Pagination defaultActivePage={1} totalPages={Math.ceil(this.state.articleList.length/PERPAGE)} onPageChange={ this.handlePageChange }/>
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