import React, {Component} from "react";
import {Controlled as CodeMirror} from 'react-codemirror2';
import {Button, Header, Icon, Image, Modal} from 'semantic-ui-react'
import '../../../../node_modules/codemirror/lib/codemirror.css';
import '../../../../node_modules/codemirror/mode/javascript/javascript';
import './main.css'
import config from "../../../config";

var axios = require('axios');

const inlineStyle = {
    modal: {
        marginTop: '0px !important',
        marginLeft: 'auto',
        marginRight: 'auto'
    }
};

export default class ModalShowErrorsJavaClass extends Component {

    constructor(props) {
        super(props);
        this.state = {
            code: '',
            codeLine: 0,
            openModal: false,
            fileID: 0,
        };
        this.updateCode = this.updateCode.bind(this);
    }

    updateCode(newCode) {
        this.setState({
            code: newCode,
        });
    }

    componentDidMount() {
        this.getRepos();

    }

    componentWillMount(){
        this.setState({
            codeLine: this.props.codeLineID,
            fileID: this.props.fileID,
        })

    }

    show = () => this.setState({
        openModal: true,
    }, () => {
        console.log(this.props);
    });

    closethis = () => this.setState({
        openModal: false,
    });

    render() {
        var options = {
            lineNumbers: true,
            styleSelectedText: true,
            readonly:false,
        };

        return (
            <Modal open={this.state.openModal} onClose={this.closethis} style={inlineStyle.modal}>
                <Modal.Header>CODE</Modal.Header>
                <Modal.Content >
                    {/*//code mirror component*/}
                    <CodeMirror
                        value={this.state.code}
                        options={options}

                        onBeforeChange={(editor, data, value) => {

                        }}

                        editorDidMount = {(editor) => {
                            var line = this.props.codeLine;
                            editor.markText({line: line-1, ch: 0}, {line: line-1, ch: 110}, {className: "styled-background"});
                            var t = editor.charCoords({line: line-1, ch: 0}, "local").top;
                            editor.scrollTo(null, t - 5);
                        }}

                    />
                </Modal.Content>
            </Modal>


        );
    }

    getRepos() {
        axios.get(`http://${config.backendServer.host}:${config.backendServer.port}/file/${this.state.fileID}/source`)
            .then(response => {
                var codeRAW = response.data;
                this.setState({
                    code: codeRAW
                });
            });
    }

}