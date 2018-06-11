import React, {Component} from "react";
import axios from "axios/index";
import {Redirect} from 'react-router-dom';
import TableComponent from "../common/tableComponent";
import ModalModifiedJavaClassComponent from "./modalModifiedJavaClassComponent";
import config from "../../config";


/**
 * @author Amila Karunathilaka
 */


export default class ListMostModifiedJavaClassesComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            headers: ["Product name", "File Name", "No of Patches", "No of Issues", "Test Coverage"],
            columns: ["PRODUCT_NAME", "FILE_NAME", "NO_OF_PATCHES", "NO_OF_ISSUES", "TEST_COVERAGE"],
            javaClasses: [],
            redirect: false,
            selectJavaClass:''
        };
    }


    handleClick = (e, { name }) => {
        this.setState({ activeItem: name });
        axios.get('http://localhost:9090/hello')
            .then(response => {
                console.log(response);
                console.log(response.data);

                this.setState({ repositories: response.data });

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


    retrieveMostModifiedJavaClasses = (sortColumn, sortDir, pageIndex, pageSize) => {
        console.log('ABC ', sortColumn, sortDir, pageSize, pageIndex);
        axios.get(`http://${config.backendServer.host}:${config.backendServer.port}/file/mostModifiedJavaClasses?pageIndex=` + pageIndex + '&pageSize=' + pageSize + '&sortColumn=' + sortColumn + '&sortDir=' + sortDir)
            .then(response => {
                console.log(response);
                console.log(response.data);

                this.setState({ javaClasses: response.data});
                this.classTable.setStateProp(this.state.javaClasses);
            });
    };


    render() {
        return (
            <div>
                {/*{this.renderRedirect()}*/}
                <ModalModifiedJavaClassComponent
                    ref={instance => this.classModal = instance}
                />
                <TableComponent
                    headers={this.state.headers}
                    sortable={true}
                    selectable={true}
                    columns={this.state.columns}
                    sortColumn={this.state.columns[2]}
                    sortDir={1}
                    onUpdateRecords={this.retrieveMostModifiedJavaClasses}
                    onCellClick={this.onSetRedirect}
                    ref={instance => this.classTable = instance}
                />
            </div>
        );
    }
}