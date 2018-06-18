import React, {Component} from "react";
import queryString from 'query-string';
import {Statistic, Label, Dimmer, Loader} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import axios from "axios/index";
import TableComponent from "../common/tableComponent";
import config from "../../config";
import ViewJavaClassComponent from "../file/viewJavaClassComponent";


/**
 * @author Amila Karunathilaka
 */


export default class ViewModifiedJavaClassComponent extends ViewJavaClassComponent {

    retrieveJavaClass = (fileId) => {
        console.log("+++++++++++++++++++++++ overrided Method ++++++++++++++++++++++++++++++");
        this.setState({loading: true}, () => {
            axios.get(`http://${config.backendServer.host}:${config.backendServer.port}/file/mostModifiedJavaClasses/${fileId}`)
                .then(response => {
                    console.log(response);
                    console.log(response.data);

                    this.setState({
                        javaClass: response.data,
                        loading: false
                    }, () => {
                        this.retrieveJavaClassIssues();
                    });
                });
        });
    };

    // constructor(props) {
    //     super(props);
    //     console.log(props);
    //     // console.log(this.props.location.search);
    //
    //     this.state = {
    //         classId: 0,
    //         javaClass: {
    //             ID: 0,
    //             FILE_NAME: '',
    //             UPDATED_DATE: '',
    //             NO_OF_ISSUES: 0,
    //             NO_OF_PATCHES: 0,
    //             PRODUCT_NAME: '',
    //             TEST_COVERAGE: '',
    //             CHURNS: 0
    //         },
    //         headers: ["Error Lines", "Error Code", "Description"],
    //         columns: ["LINE", "ERROR_CODE", "DESCRIPTION"],
    //         issues: [],
    //         loading: false
    //     };
    // }
    //
    // componentWillMount() {
    //     console.log("display props", this.props);
    //     this.setState({
    //         classId: this.props.match.params.fileId
    //     }, () => {
    //         this.retrieveJavaClass(this.state.classId);
    //     });
    //
    //     console.log('props', this.state.sortColumn, this.state.sortDir, this.state.pageIndex, this.state.pageSize, this.state.headers, this.props.sortColumn);
    //     //this.onUpdateTable(this.state.sortColumn, this.state.sortDir, this.state.pageIndex, this.state.pageSize);
    // }
    //
    // //retrieveModifiedJavaClass = () => {
    // //     axios.get(`http://localhost:9090/file/mostModifiedJavaClasses/${this.state.classId}`)
    // //         .then(response => {
    // //             console.log(response);
    // //             console.log("retrieve data", response.data);
    // //
    // //             this.setState({modifiedJavaClass: response.data});
    // //         });
    // //     this.retrieveModifiedJavaClassIssues("LINE", 0, 1, 10);
    // // };
    //
    // retrieveJavaClassIssues = () => {
    //     console.log('ABC ', this.state.javaClass);
    //     if (this.state.javaClass.NO_OF_ISSUES > 0) {
    //         this.setState({loading: true}, () => {
    //             axios.get(`http://${config.backendServer.host}:${config.backendServer.port}/file/${this.state.javaClass.ID}/issues`)
    //                 .then(response => {
    //                     console.log(response);
    //                     console.log(response.data);
    //
    //                     console.log('instance 1', this.issuesTable);
    //
    //                     this.setState({
    //                         issues: response.data,
    //                         loading: false
    //                     }, () => {
    //                         if (this.issuesTable) {
    //                             console.log("test");
    //                             this.issuesTable.setStateProp(this.state.issues.slice(0, 25));
    //                             // this.setState({loading: false});
    //                         }
    //                     });
    //                 });
    //         });
    //     }
    // };
    //
    // loadJavaClassIssues = (sortColumn, sortDir, pageIndex, pageSize) => {
    //     console.log('table size : ', (pageIndex - 1) * pageSize, pageIndex * pageSize, this.state.issues, this.state.issues.slice((pageIndex - 1) * pageSize, pageIndex * pageSize));
    //     console.log('instance', this.issuesTable);
    //     if (this.issuesTable) {
    //         console.log("test");
    //         this.issuesTable.setStateProp(this.state.issues.slice((pageIndex - 1) * pageSize, pageIndex * pageSize));
    //     }
    // };
    //
    // retrieveJavaClass = (fileId) => {
    //     this.setState({loading: true}, () => {
    //         axios.get(`http://${config.backendServer.host}:${config.backendServer.port}/file/mostModifiedJavaClasses/${fileId}`)
    //             .then(response => {
    //                 console.log(response);
    //                 console.log(response.data);
    //
    //                 this.setState({
    //                     javaClass: response.data,
    //                     loading: false
    //                 }, () => {
    //                     this.retrieveJavaClassIssues();
    //                 });
    //             });
    //     });
    // };
    //
    //
    // render() {
    //     console.log('issues ', this.state.issues.length);
    //     return (
    //         <div>
    //             <Dimmer active={this.state.loading}>
    //                 <Loader>Loading</Loader>
    //             </Dimmer>
    //             <div style={{
    //                 marginLeft: '25px'
    //             }}>
    //                 <Label color='blue' size='massive'>{this.state.javaClass.PRODUCT_NAME}</Label>
    //                 <h2>{this.state.javaClass.FILE_NAME}</h2>
    //             </div>
    //             <Statistic.Group style={{
    //                 marginLeft: '100px'
    //             }}>
    //                 <Statistic>
    //                     <Statistic.Value>{this.state.javaClass.NO_OF_PATCHES}</Statistic.Value>
    //                     <Statistic.Label>No of Patches</Statistic.Label>
    //                 </Statistic>
    //                 <Statistic>
    //                     <Statistic.Value>{this.state.javaClass.TEST_COVERAGE}</Statistic.Value>
    //                     <Statistic.Label>Test Coverage</Statistic.Label>
    //                 </Statistic>
    //             </Statistic.Group>
    //             <div style={{
    //                 marginTop: '50px'
    //             }}>
    //                 {this.state.javaClass.NO_OF_ISSUES > 0 && <TableComponent
    //                     headers={this.state.headers}
    //                     sortable={false}
    //                     selectable={false}
    //                     columns={this.state.columns}
    //                     sortColumn={this.state.columns[0]}
    //                     data={this.state.issues}
    //                     onUpdateRecords={this.loadJavaClassIssues}
    //                     ref={instance => this.issuesTable = instance}
    //                 />}
    //             </div>
    //         </div>)
    // }
}