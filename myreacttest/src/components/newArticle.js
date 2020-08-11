import React, { Component } from 'react';
import {BrowserRouter as Redirect} from "react-router-dom"
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import {connect} from "react-redux"
import {loginAction} from "../actions"
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { withFirebase } from './Firebase';
import firebase from 'firebase'
import { MDBInput } from "mdbreact";
import Select from "react-select";
import SunEditor,{buttonList} from "suneditor-react";
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import Preview from './preview';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';


class NewArticleBase extends Component{

    constructor(props) {
        super(props);
        this.state = {
            articleUid: this.props.match.params.articleUid,
            submitText: "Gonder",
            header: "",
            writerList : [
                { value: 'chocolate', label: 'Chocolate' },
                { value: 'strawberry', label: 'Strawberry' },
                { value: 'vanilla', label: 'Vanilla' },
            ],
            selectedWriter: null,
            redirect: false,
            editorData: "",
            status: "secret",
            date: new Date(),
        }; 

        var writersRef = this.props.firebase.database.ref('writers');
        writersRef.on('value', snapshot => {
            let tmp = [];
            for(const writer in snapshot.val())
            {
                let name = snapshot.val()[writer]["name"];
                tmp.push({value: writer, label: name});
            }
            this.setState({writerList: tmp});
        });

        if(this.state.articleUid)
        {
            var articleListRef = this.props.firebase.database.ref('posts/list/' + this.state.articleUid);
            articleListRef.once('value', snapshot => {
                if(snapshot.val())
                {
                    var status = snapshot.val().status;
                    var image = snapshot.val().image;
                    var date = snapshot.val().date;
                    var text = snapshot.val().text;
                    this.setState({status});
                    this.setState({image});
                    this.setState({date: new Date(date)});
                    this.setState({text});
                    var articleRef = this.props.firebase.database.ref('posts/' + status + 's/' + this.state.articleUid);
                    articleRef.once('value', snapshot => {
                        if(snapshot.val())
                        {
                            this.setState({defaultEditorData:snapshot.val().body,
                                            header: snapshot.val().title,
                                        });
                            console.log("Defeddat:", this.state.defaultEditorData)
                            var writerUid = snapshot.val().author;
                            var writerRef = this.props.firebase.database.ref('writers/' + writerUid);
                            writerRef.once('value', snapshot => {
                                if(snapshot.val())
                                {
                                    this.setState({
                                            selectedWriter: {
                                                value: writerUid,
                                                label: snapshot.val().name,
                                                }
                                            });
                                }
                            });
                        }
                        else{
                            alert("Bir Sorun Olustu ");
                        }
                    });
                }
                else
                {
                    alert("Bir Sorun Olustu ");
                }
            });
        }
    };
    
    // A handler executed when the user types or modifies the editor content.
    // It updates the state of the application.
    handleEditorDataChange = ( context ) => {
        this.setState( {
            editorData: context
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
    imageChange = (event) =>
    {
        this.setState({image: event.target.value});
    };
    textChange = (event) =>
    {
        this.setState({text: event.target.value});
    };
    dateChange = date => this.setState({ date })
    selectionChange = (selectedWriter) =>
    {
        console.log("AuthorRRR: ", selectedWriter);
        this.setState({selectedWriter});
    };
    submit = (event) =>
    {
        this.setState({
            submitText: "Yukleniyor...",
        })

        var newPostKey = this.state.articleUid ? this.state.articleUid : firebase.database().ref().child('/posts/list/').push().key;

        var postData = {
            author: this.state.selectedWriter ? this.state.selectedWriter.value : null,
            body: this.state.editorData,
            title: this.state.header,
            postKey: newPostKey,
        };

        var updates = {};
        updates['/posts/' + this.state.status + 's/' + newPostKey] = postData;
        updates['/posts/list/'+ newPostKey] = {
                                status:this.state.status, 
                                title: this.state.header, 
                                postKey: newPostKey,
                                date: this.state.date.getTime(),
                                image: this.state.image,
                                text: this.state.text,        
                                author: this.state.selectedWriter ? this.state.selectedWriter.value : null,
                            };

        this.props.firebase.database.ref().update(updates, (error => {
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
                <Col sm={9}>
                <MDBInput label="Yazinin Basligi" onChange={this.headerChange} value={this.state.header}/>
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
                <MDBInput label="Kapak Resmi Linki" onChange={this.imageChange} value={this.state.image}/>
                </Col>
                <Col xm ={3} style={{"padding-top":"30px"}}>
                </Col>
            
            </Row>
            <Row>
                <Col sm={9}>
                <SunEditor setOptions={{
                        height: 800,
                        buttonList: buttonList.complex // Or Array of button list, eg. [['font', 'align'], ['image']]
                        // Other option
                    }}
                    setContents={this.state.defaultEditorData}
                    onChange={this.handleEditorDataChange} 
                    />
                </Col>
                <Col xm ={3}>
                    <Row>
                    <MDBInput value={this.state.text} onChange={this.textChange} style={{overflowY: "scroll"}}type="textarea" label="Tanitim Yazisi" rows="10" />
                    </Row>
                    <Row>
                        Yazi Tarihi: {(this.state.date).toLocaleDateString("tr-TR", {
                                                                                                year: 'numeric',
                                                                                                month: 'long',
                                                                                                day: 'numeric'
                                                                                                } )//.replace( / /g, '-' )
                                                                                                }

                    </Row>
                    <Row>
                        <DayPickerInput value={this.state.date} onDayChange={date => this.setState({date})} />
                    </Row>
                </Col>
            </Row>
            <Row>
            <Button onClick={this.submit}>{this.state.submitText}</Button>
            </Row>
            <Row>
                <Col sm={9}>
                    <Preview    title={this.state.header} 
                                image={this.state.image} 
                                text={this.state.text}
                                date = {this.state.date}
                                author = {this.state.selectedWriter ? this.state.selectedWriter.label : undefined}
                                />
                </Col>
            </Row>
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
    mapDispatchToProps)(NewArticle);
