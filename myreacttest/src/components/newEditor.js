import React from 'react';
import ReactDOM from 'react-dom';
import SunEditor,{buttonList} from "suneditor-react";
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import Container from 'react-bootstrap/Container'


class newEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            innerhtml:"",
        };   
    };
    render = () => <Container>
                    <SunEditor setOptions={{
                        height: 200,
                        buttonList: buttonList.complex // Or Array of button list, eg. [['font', 'align'], ['image']]
                        // Other option
                    }}
                    onChange={context => this.setState({innerhtml:context})} 
                    />
                <Container dangerouslySetInnerHTML={{__html: this.state.innerhtml}}>
                </Container>
                </Container>
}

export default newEditor;