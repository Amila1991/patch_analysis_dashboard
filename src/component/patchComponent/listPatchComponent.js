import React, {Component} from "react";
import {Redirect} from 'react-router-dom';
import axios from "axios/index";
import TableComponent from "../common/tableComponent";
import config from "../../config";
import constant from "../constant/constants";


/**
 * @author Amila Karunathilaka
 */

export default class ListPatchComponent extends Component {

    constructor(props) {
        super(props);
        console.log('repo list props', props, props.location);
        this.state = {
            headers: ["Patch Name", "Support JIRA", "Reported Date", "Product", "Client", "No of Changes", "No of File Changes"],
            columns: ["PATCH_NAME", "SUPPORT_JIRA", "REPORT_DATE", "PRODUCT_NAME", "CLIENT", "CHURNS", "NO_OF_FILES_CHANGES"],
            data: [],
            redirect: false,
            selectPatch: null,
            parentComponentType: null,
            value: ''
        };
    }

    componentWillMount() {
        console.log("patch display props", this.props, this.props.parentComponentType);
        let parentComponentType = this.props.parentComponentType ? this.props.parentComponentType : null;
        // switch(param) {
        //     case 'foo':
        //         return 'bar';
        //     default:
        //         return 'foo';
        // }
        this.setState({
            parentComponentType: parentComponentType,
            value: this.props.value ? this.props.value : '',
            headers: parentComponentType === constant.COMPONENT_TYPE.PRODUCT  ? ["Patch Name", "Support JIRA", "Reported Date", "Client", "No of Changes", "No of File Changes"] : this.state.headers ,
            columns: parentComponentType === constant.COMPONENT_TYPE.PRODUCT ? ["PATCH_NAME", "SUPPORT_JIRA", "REPORT_DATE", "CLIENT", "CHURNS", "NO_OF_FILES_CHANGES"] : this.state.columns
        });
    }

    onSetRedirect = patch => () => {
        //console.log('event repo', e);
        console.log('dsdsssddsdsdddsds', patch);
        this.setState({
            redirect: true,
            selectPatch: patch
        })
    };

    renderRedirect = () => {
        if (this.state.redirect) {
            let url = `/patch/${this.state.selectPatch}`;
            return <Redirect to={`/patch/${this.state.selectPatch.ID}`}/>
        }
    };


    handleClick = (e, {name}) => {
        this.setState({activeItem: name});
        axios.get('http://localhost:9090/patch')
            .then(response => {
                console.log(response);
                console.log(response.data);

                this.setState({repositories: response.data});

            });
    };


    retrieveRepositories = (sortColumn, sortDir, pageIndex, pageSize) => {
        console.log('ABC ', sortColumn, sortDir, pageSize, pageIndex);
        let pathParam = this.state.parentComponentType ? this.state.parentComponentType + '/' + this.state.value : '';
        axios.get(`http://${config.backendServer.host}:${config.backendServer.port}/patch/${pathParam}?pageIndex=` + pageIndex + '&pageSize=' + pageSize + '&sortColumn=' + sortColumn + '&sortDir=' + sortDir)
            .then(response => {
                console.log(response);
                console.log(response.data);

                this.setState({patches: response.data});
                console.log('instance',this.patchTable);
                this.patchTable.setStateProp(this.state.patches);


            });
    };


    render() {
        return (
            <div style={{
                marginTop: this.state.product === "all" ? '20px' : '10px'
            }}>
                <div>
                    {this.renderRedirect()}
                    <h2 style={{
                        marginLeft: '50px'
                    }}>Patches</h2>
                    <TableComponent
                        headers={this.state.headers}
                        sortable={true}
                        selectable={false}
                        columns={this.state.columns}
                        sortColumn={this.state.columns[2]}
                        sortDir={1}
                        onUpdateRecords={this.retrieveRepositories}
                        onCellClick={this.onSetRedirect}
                        ref={instance => this.patchTable = instance}
                    />
                </div>
            </div>
        );
    }
}