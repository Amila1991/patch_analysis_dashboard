import React, {Component} from "react";
import {Redirect} from 'react-router-dom';
import axios from "axios/index";
import TableComponent from "../common/tableComponent";
import config from "../../config";
import constant from "../constant/constants";
import ModalJavaClassComponent from "./modalJavaClassComponent";


/**
 * @author Amila Karunathilaka
 */


export default class ListFileComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            headers: ["Product name", "File Name", "No of Patches", "No of Change Lines", "No of Issues", "Test Coverage"],
            columns: ["PRODUCT_NAME", "FILE_NAME", "NO_OF_PATCHES", "CHURNS", "NO_OF_ISSUES", "TEST_COVERAGE"],
            files: [],
            redirect: false,
            selectJavaClass: ''
        };
    }

    componentWillMount() {
        console.log("Repo display props", this.props, this.props.parentComponentType);
        let parentComponentType = this.props.parentComponentType ? this.props.parentComponentType : null;
        this.setState({
            parentComponentType: parentComponentType,
            value: this.props.value ? this.props.value : '',
            headers: parentComponentType === constant.COMPONENT_TYPE.PRODUCT ? ["File Name", "No of Patches", "No of Change Lines",  "No of Issues", "Test Coverage"] : this.state.headers,
            columns: parentComponentType === constant.COMPONENT_TYPE.PRODUCT ? ["FILE_NAME", "NO_OF_PATCHES", "CHURNS", "NO_OF_ISSUES", "TEST_COVERAGE"] : this.state.columns
        });
    }

    onSetRedirect = javaClass => () => {
        console.log('dsdsssddsdsdddsds', javaClass);
        this.setState({
            redirect: true,
            selectJavaClass: javaClass
        })
    };

    renderRedirect = () => {
        if (this.state.redirect) {
            console.log("repo 123 : ", this.state.selectJavaClass);
            let url = `/file/${this.state.selectJavaClass.ID}`;
            return <Redirect to={`/file/javaClass/${this.state.selectJavaClass.ID}`}/>
        }
    };

    retrieveFiles = (sortColumn, sortDir, pageIndex, pageSize) => {
        console.log('ABC file ', sortColumn, sortDir, pageSize, pageIndex);
        let pathParam = this.state.parentComponentType ? this.state.parentComponentType + '/' + this.state.value : '';
        axios.get(`http://${config.backendServer.host}:${config.backendServer.port}/file/${pathParam}?pageIndex=` + pageIndex + '&pageSize=' + pageSize + '&sortColumn=' + sortColumn + '&sortDir=' + sortDir)
            .then(response => {
                console.log(response);
                console.log(response.data);

                response.data.map((row) => {
                    if (row.TEST_COVERAGE === '-1') {
                        row.TEST_COVERAGE = 'N/A';
                    }

                    if(row.NO_OF_ISSUES === -1) {
                        row.NO_OF_ISSUES = 'N/A';
                    }
                });

                this.setState({files: response.data});
                this.fileTable.setStateProp(this.state.files);
            });
    };

    setComponentHeading = () => {
        return 'Files';
    };

    render() {
        console.log('product  ' , this.state.parentComponentType, this.state.parentComponentType === null);
        return (
            <div style={{
                marginTop: this.state.parentComponentType === null ? '20px' : '10px'
            }}>
                {this.renderRedirect()}
                <h2 style={{
                    marginLeft: '50px'
                }}>{this.setComponentHeading()}</h2>
                <div>
                    <TableComponent
                        headers={this.state.headers}
                        sortable={true}
                        selectable={true}
                        columns={this.state.columns}
                        sortColumn={this.state.columns[2]}
                        sortDir={1}
                        onUpdateRecords={this.retrieveFiles}
                        onCellClick={this.onSetRedirect}
                        ref={instance => this.fileTable = instance}
                    />
                </div>
            </div>
        );
    }
}