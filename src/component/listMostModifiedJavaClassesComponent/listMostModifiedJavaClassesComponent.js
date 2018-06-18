import React, {Component} from "react";
import axios from "axios/index";
import {Redirect} from 'react-router-dom';
import TableComponent from "../common/tableComponent";
import config from "../../config";
import ListFileComponent from "../file/listFileComponent";


/**
 * @author Amila Karunathilaka
 */


export default class ListMostModifiedJavaClassesComponent extends ListFileComponent {

     constructor(props) {
         super(props);
     };

    renderRedirect = () => {
        if (this.state.redirect) {
            //let url =  `/file/${this.state.selectJavaClass}`;
            return <Redirect to={`/file/mostModifiedJavaClasses/${this.state.selectJavaClass.ID}`}/>
        }
    };

    setComponentHeading = () => {
        return 'Most Updated Java Classes';
    };


    // retrieveMostModifiedJavaClasses = (sortColumn, sortDir, pageIndex, pageSize) => {
    //     console.log('ABC ', sortColumn, sortDir, pageSize, pageIndex);
    //     axios.get(`http://${config.backendServer.host}:${config.backendServer.port}/file/mostModifiedJavaClasses?pageIndex=` + pageIndex + '&pageSize=' + pageSize + '&sortColumn=' + sortColumn + '&sortDir=' + sortDir)
    //         .then(response => {
    //             console.log(response);
    //             console.log(response.data);
    //
    //             this.setState({ javaClasses: response.data});
    //             this.classTable.setStateProp(this.state.javaClasses);
    //         });
    // };


    retrieveFiles = (sortColumn, sortDir, pageIndex, pageSize) => {
        console.log('ABC java class ', sortColumn, sortDir, pageSize, pageIndex);
        let pathParam = this.state.parentComponentType ? this.state.parentComponentType + '/' + this.state.value : '';
        axios.get(`http://${config.backendServer.host}:${config.backendServer.port}/file/mostModifiedJavaClasses?pageIndex=` + pageIndex + '&pageSize=' + pageSize + '&sortColumn=' + sortColumn + '&sortDir=' + sortDir)
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

    //
    // render() {
    //     return (
    //         <div>
    //             {this.renderRedirect()}
    //             {/*<ModalModifiedJavaClassComponent*/}
    //                 {/*ref={instance => this.classModal = instance}*/}
    //             {/*/>*/}
    //             <TableComponent
    //                 headers={this.state.headers}
    //                 sortable={true}
    //                 selectable={true}
    //                 columns={this.state.columns}
    //                 sortColumn={this.state.columns[2]}
    //                 sortDir={1}
    //                 onUpdateRecords={this.retrieveMostModifiedJavaClasses}
    //                 onCellClick={this.onSetRedirect}
    //                 ref={instance => this.classTable = instance}
    //             />
    //         </div>
    //     );
    // }
}