import React, {Component} from "react";
import axios from "axios/index";
import TableComponent from "../common/tableComponent";
import config from "../../config";
import constant from "../constant/constants";


/**
 * @author Amila Karunathilaka
 */


export default class ListFileComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            headers: ["Product name", "File Name", "No of Patches", "No of Issues", "Test Coverage"],
            columns: ["PRODUCT_NAME", "FILE_NAME", "NO_OF_PATCHES", "NO_OF_ISSUES", "TEST_COVERAGE"],
            javaClasses: [],
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
            headers: parentComponentType === constant.COMPONENT_TYPE.PRODUCT ? ["File Name", "No of Patches", "No of Issues", "Test Coverage"] : this.state.headers,
            columns: parentComponentType === constant.COMPONENT_TYPE.PRODUCT ? ["FILE_NAME", "NO_OF_PATCHES", "NO_OF_ISSUES", "TEST_COVERAGE"] : this.state.columns
        });
    }

    handleClick = (e, {name}) => {
        this.setState({activeItem: name});
        axios.get('http://localhost:9090/hello')
            .then(response => {
                console.log(response);
                console.log(response.data);

                this.setState({repositories: response.data});

            });
    };

    onSetRedirect = javaClass => () => {
        //console.log('event repo', e);
        console.log('dsdsssddsdsdddsds', javaClass);
        this.setState({
            redirect: true,
            selectJavaClass: javaClass
        }, () => {
            this.classModal.show(this.state.selectJavaClass);
        })
    };

    // renderRedirect = () => {
    //     if (this.state.redirect) {
    //         //let url =  `/file/${this.state.selectJavaClass}`;
    //         return <Redirect to={`/file/mostModifiedJavaClasses/${this.state.selectJavaClass.FILE_INFO_ID}`}/>
    //     }
    // };


    // retrieveMostModifiedJavaClasses = (sortColumn, sortDir, pageIndex, pageSize) => {
    //     console.log('ABC ', sortColumn, sortDir, pageSize, pageIndex);
    //     axios.get(`http://${config.backendServer.host}:${config.backendServer.port}/file/mostModifiedJavaClasses?pageIndex=` + pageIndex + '&pageSize=' + pageSize + '&sortColumn=' + sortColumn + '&sortDir=' + sortDir)
    //         .then(response => {
    //             console.log(response);
    //             console.log(response.data);
    //
    //             this.setState({javaClasses: response.data});
    //             this.classTable.setStateProp(this.state.javaClasses);
    //         });
    // };


    retrieveFiles = (sortColumn, sortDir, pageIndex, pageSize) => {
        console.log('ABC ', sortColumn, sortDir, pageSize, pageIndex);
        let pathParam = this.state.parentComponentType ? this.state.parentComponentType + '/' + this.state.value : '';
        axios.get(`http://${config.backendServer.host}:${config.backendServer.port}/file/${pathParam}?pageIndex=` + pageIndex + '&pageSize=' + pageSize + '&sortColumn=' + sortColumn + '&sortDir=' + sortDir)
            .then(response => {
                console.log(response);
                console.log(response.data);

                response.data.map((row, rowIndex) => {
                    if (row.TEST_COVERAGE === '-1') {
                        row.TEST_COVERAGE = 'N/A';
                    }

                    if(row.NO_OF_ISSUES === -1) {
                        row.NO_OF_ISSUES = 'N/A';
                    }
                });

                this.setState({repositories: response.data});
                this.fileTable.setStateProp(this.state.repositories);


            });
    };


    render() {
        return (
            <div style={{
                marginTop: this.state.product === "all" ? '20px' : '10px'
            }}>
                <h2 style={{
                    marginLeft: '50px'
                }}>Files</h2>
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