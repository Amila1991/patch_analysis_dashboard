import React, {Component} from "react";
import queryString from 'query-string';
import {Statistic, Label} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import axios from "axios/index";
import TableComponent from "../common/tableComponent";
import config from "../../config";


/**
 * @author Amila Karunathilaka
 */


export default class ViewModifiedJavaClassComponent extends Component {

    constructor(props) {
        super(props);
        console.log(props);
        console.log(this.props.location.search);

        this.state = {
            classId: 0,
            modifiedJavaClass: {
                FILE_INFO_ID: 0,
                FILE_NAME: '',
                FROM_DATE: '',
                NO_OF_ISSUES: 0,
                NO_OF_PATCHES: 0,
                PRODUCT_NAME: '',
                TEST_COVERAGE: '',
                TO_DATE: ''
            },
            headers: ["Error Lines", "Error Code", "Description"],
            columns: ["LINE", "ERROR_CODE", "DESCRIPTION"],
            issues: []
        };
    }

    componentWillMount() {
        console.log("display props", this.props);
        this.setState({
            classId: this.props.match.params.fileId
        }, () => {
            this.retrieveModifiedJavaClass();
        });

        console.log('props', this.state.sortColumn, this.state.sortDir, this.state.pageIndex, this.state.pageSize, this.state.headers, this.props.sortColumn);
        //this.onUpdateTable(this.state.sortColumn, this.state.sortDir, this.state.pageIndex, this.state.pageSize);
    }

    retrieveModifiedJavaClass = () => {
        axios.get(`http://localhost:9090/file/mostModifiedJavaClasses/${this.state.classId}`)
            .then(response => {
                console.log(response);
                console.log("retrieve data", response.data);

                this.setState({modifiedJavaClass: response.data});
            });
        this.retrieveModifiedJavaClassIssues("LINE", 0, 1, 10);
    };

    retrieveModifiedJavaClassIssues = (sortColumn, sortDir, pageIndex, pageSize) => {
        console.log('ABC ', sortColumn, sortDir, pageSize, pageIndex, this.state.classId);
        axios.get(`http://${config.backendServer.host}:${config.backendServer.port}/file/mostModifiedJavaClasses/${this.state.classId}/issues?pageIndex=` + pageIndex + '&pageSize=' + pageSize + '&sortColumn=' + sortColumn + '&sortDir=' + sortDir)
            .then(response => {
                console.log(response);
                console.log(response.data);

                this.setState({
                    issues: response.data
                }, () =>{
                    if (this.issuesTable) {
                        this.issuesTable.setStateProp(this.state.issues);
                    }
                } );
            });
    };


    render() {
        console.log('issues ', this.state.issues.length);
        return (<div>
            <div style={{
                marginLeft: '25px'
            }}>
                <Label color='blue' size='massive'>{this.state.modifiedJavaClass.PRODUCT_NAME}</Label>
                <h2>{this.state.modifiedJavaClass.FILE_NAME}</h2>
            </div>
            <Statistic.Group style={{
                marginLeft: '100px'
            }}>
                <Statistic>
                    <Statistic.Value>{this.state.modifiedJavaClass.NO_OF_PATCHES}</Statistic.Value>
                    <Statistic.Label>No of Patches</Statistic.Label>
                </Statistic>
                <Statistic>
                    <Statistic.Value>{this.state.modifiedJavaClass.TEST_COVERAGE}</Statistic.Value>
                    <Statistic.Label>Test Coverage</Statistic.Label>
                </Statistic>
            </Statistic.Group>
            <div style={{
                marginTop: '50px'
            }}>
                {this.state.issues.length > 0 && <TableComponent
                    headers={this.state.headers}
                    sortable={true}
                    selectable={false}
                    columns={this.state.columns}
                    sortColumn={this.state.columns[0]}
                    onUpdateRecords={this.retrieveModifiedJavaClassIssues}
                    ref={instance => this.issuesTable = instance}
                />}
            </div>
        </div>)
    }
}