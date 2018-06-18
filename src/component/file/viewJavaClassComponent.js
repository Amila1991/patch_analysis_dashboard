import React, {Component} from "react";
import {Statistic, Label, Dimmer, Loader, Divider, Grid} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import axios from "axios/index";
import TableComponent from "../common/tableComponent";
import config from "../../config";


/**
 * @author Amila Karunathilaka
 */


export default class ViewJavaClassComponent extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        // console.log(this.props.location.search);

        this.state = {
            classId: 0,
            javaClass: {
                ID: 0,
                FILE_NAME: '',
                UPDATED_DATE: '',
                NO_OF_ISSUES: 0,
                NO_OF_PATCHES: 0,
                PRODUCT_NAME: '',
                TEST_COVERAGE: '',
                CHURNS: 0
            },
            headers: ["Error Lines", "Error Code", "Description"],
            columns: ["LINE", "ERROR_CODE", "DESCRIPTION"],
            issues: [],
            loading: false
        };
    }

    componentWillMount() {
        console.log("display props", this.props);
        this.setState({
            classId: this.props.match.params.fileId
        }, () => {
            this.retrieveJavaClass(this.state.classId);
        });

        console.log('props', this.state.sortColumn, this.state.sortDir, this.state.pageIndex, this.state.pageSize, this.state.headers, this.props.sortColumn);
        //this.onUpdateTable(this.state.sortColumn, this.state.sortDir, this.state.pageIndex, this.state.pageSize);
    }

    retrieveJavaClassIssues = (sortColumn, sortDir, pageIndex, pageSize) => {
        console.log('ABC ', this.state.javaClass);
        if (this.state.javaClass.NO_OF_ISSUES > 0) {
            this.setState({loading: true}, () => {
                axios.get(`http://${config.backendServer.host}:${config.backendServer.port}/file/${this.state.javaClass.ID}/issues?pageIndex=`+ pageIndex + '&pageSize=' + pageSize + '&sortColumn=' + sortColumn + '&sortDir=' + sortDir)
                    .then(response => {
                        console.log(response);
                        console.log(response.data);

                        console.log('instance 1', this.issuesTable);

                        this.setState({
                            issues: response.data,
                            loading: false
                        }, () => {
                            if (this.issuesTable) {
                                console.log("test");
                                this.issuesTable.setStateProp(this.state.issues.slice(0, 25));
                                // this.setState({loading: false});
                            }
                        });
                    });
            });
        }
    };
    //
    // loadJavaClassIssues = (sortColumn, sortDir, pageIndex, pageSize) => {
    //     console.log('table size : ', (pageIndex - 1) * pageSize, pageIndex * pageSize, this.state.issues, this.state.issues.slice((pageIndex - 1) * pageSize, pageIndex * pageSize));
    //     console.log('instance', this.issuesTable);
    //     if (this.issuesTable) {
    //         console.log("test");
    //         this.issuesTable.setStateProp(this.state.issues.slice((pageIndex - 1) * pageSize, pageIndex * pageSize));
    //     }
    // };

    retrieveJavaClass = (fileId) => {
        console.log("+++++++++++++++++++++++ parent Method ++++++++++++++++++++++++++++++");
        this.setState({loading: true}, () => {
            axios.get(`http://${config.backendServer.host}:${config.backendServer.port}/file/${fileId}`)
                .then(response => {
                    console.log(response);
                    console.log(response.data);

                    this.setState({
                        javaClass: response.data,
                        loading: false
                    }, () => {
                        this.retrieveJavaClassIssues('LINE', 0, 0, 25);
                    });
                });
        });
    };


    render() {
        console.log('issues ', this.state.issues.length);
        return (
            <div style={{
                marginTop: '25px',
                marginLeft: '25px',
                marginRight: '25px'
            }}>
                <Dimmer active={this.state.loading}>
                    <Loader>Loading</Loader>
                </Dimmer>
                <Grid columns={2} padded>
                    <Grid.Row>
                        <Grid.Column verticalAlign='middle' key='1'>
                            <h3>{this.state.javaClass.FILE_NAME}</h3>
                        </Grid.Column>
                        <Grid.Column key='2' textAlign='right'>
                            <Label color='blue' size='massive'>{this.state.javaClass.PRODUCT_NAME}</Label>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>


                {/*<div style={{*/}
                {/*alignmentAdjust: 'center'*/}
                {/*}}>*/}
                {/**/}
                {/*</div>*/}

                <Divider section/>

                <Statistic.Group style={{
                    marginLeft: '100px'
                }}>
                    <Statistic>
                        <Statistic.Value>{this.state.javaClass.NO_OF_PATCHES}</Statistic.Value>
                        <Statistic.Label>No of Patches</Statistic.Label>
                    </Statistic>
                    <Statistic>
                        <Statistic.Value>{this.state.javaClass.TEST_COVERAGE}</Statistic.Value>
                        <Statistic.Label>Test Coverage</Statistic.Label>
                    </Statistic>
                    <Statistic>
                        <Statistic.Value>{this.state.javaClass.CHURNS}</Statistic.Value>
                        <Statistic.Label>Line of Changes</Statistic.Label>
                    </Statistic>
                </Statistic.Group>
                <Divider section/>
                <div style={{
                    marginTop: '20px'
                }}>
                    {this.state.javaClass.NO_OF_ISSUES > 0 && <div>
                        <h2 style={{
                            marginLeft: '50px'
                        }}>Find Bug Issues</h2>
                        <TableComponent
                            headers={this.state.headers}
                            sortable={true}
                            selectable={false}
                            columns={this.state.columns}
                            sortColumn={this.state.columns[0]}
                            data={this.state.issues}
                            onUpdateRecords={this.retrieveJavaClassIssues}
                            ref={instance => this.issuesTable = instance}
                        />
                    </div>}
                </div>
            </div>)
    }
}