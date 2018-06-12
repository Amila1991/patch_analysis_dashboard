import React, {Component} from "react";
import {Statistic, Label, Modal, Dimmer, Loader} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import axios from "axios/index";
import TableComponent from "../common/tableComponent";
import config from "../../config";


/**
 * @author Amila Karunathilaka
 */


const inlineStyle = {
    modal: {
        marginTop: '0px !important',
        marginLeft: 'auto',
        marginRight: 'auto'
    }
};

export default class ModalJavaClassComponent extends Component {

    constructor(props) {
        super(props);
        console.log(props);
        // console.log(this.props.location.search);

        this.state = {
            openModal: false,
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
            issues: [],
            loading: false
        };
    }

    // componentWillMount() {
    //     this.retrieveModifiedJavaClassIssues();
    //     //this.onUpdateTable(this.state.sortColumn, this.state.sortDir, this.state.pageIndex, this.state.pageSize);
    // }

    //retrieveModifiedJavaClass = () => {
    //     axios.get(`http://localhost:9090/file/mostModifiedJavaClasses/${this.state.classId}`)
    //         .then(response => {
    //             console.log(response);
    //             console.log("retrieve data", response.data);
    //
    //             this.setState({modifiedJavaClass: response.data});
    //         });
    //     this.retrieveModifiedJavaClassIssues("LINE", 0, 1, 10);
    // };

    retrieveModifiedJavaClassIssues = () => {
         console.log('ABC ', this.state.modifiedJavaClass);
        if (this.state.modifiedJavaClass.NO_OF_ISSUES > 0) {
            this.setState({loading: true}, () => {
                axios.get(`http://${config.backendServer.host}:${config.backendServer.port}/file/${this.state.modifiedJavaClass.FILE_INFO_ID | this.state.modifiedJavaClass.ID}/issues`)
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

    loadModifiedJavaClassIssues = (sortColumn, sortDir, pageIndex, pageSize) => {
        console.log('table size : ', (pageIndex - 1) * pageSize, pageIndex * pageSize, this.state.issues, this.state.issues.slice((pageIndex - 1) * pageSize, pageIndex * pageSize));
        console.log('instance', this.issuesTable);
        if (this.issuesTable) {
            console.log("test");
            this.issuesTable.setStateProp(this.state.issues.slice((pageIndex - 1) * pageSize, pageIndex * pageSize));
        }
    };

    showModal = (modifiedJavaClass) => this.setState({
        openModal: true,
        modifiedJavaClass: modifiedJavaClass
    }, () => {
        this.retrieveModifiedJavaClassIssues();
    });


    close = () => this.setState({openModal: false});


    render() {
        console.log('issues 1 ', this.state.issues.length, this.state.loading);
        return (
            <div>
                <Dimmer active={this.state.loading}>
                    <Loader>Loading</Loader>
                </Dimmer>
                {!this.state.loading && <Modal size='fullscreen' open={this.state.openModal} onClose={this.close} style={inlineStyle.modal}>
                    <Modal.Header>{this.state.modifiedJavaClass.FILE_NAME}</Modal.Header>
                    <Modal.Content scrolling>
                        <Modal.Description>
                            <div style={{
                                marginLeft: '25px'
                            }}>
                                <Label color='blue' size='massive'>{this.state.modifiedJavaClass.PRODUCT_NAME}</Label>
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
                                {this.state.modifiedJavaClass.NO_OF_ISSUES > 0 && <TableComponent
                                    headers={this.state.headers}
                                    sortable={false}
                                    selectable={false}
                                    columns={this.state.columns}
                                    sortColumn={this.state.columns[0]}
                                    data={this.state.issues}
                                    onUpdateRecords={this.loadModifiedJavaClassIssues}
                                    ref={instance => this.issuesTable = instance}
                                />}
                            </div>

                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        {/*<Button primary>*/}
                        {/*/!*Proceed <Icon name='chevron right' />*!/*/}
                        {/*</Button>*/}
                    </Modal.Actions>
                </Modal>}
            </div>)
    }
}