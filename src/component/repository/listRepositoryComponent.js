import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {Label} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios'
import TableComponent from "../common/tableComponent";
import config from "../../config";

export default class ListRepositoryComponent extends Component {
// It's a data format example.
//     function priceFormatter(cell, row){
//     return '<i class="glyphicon glyphicon-usd"></i> ' + cell;
// }

    constructor(props) {
        super(props);
        console.log('repo list props', props, props.location);
        this.state = {
            headers: ["Repository name", "No of Patches", "Churn"],
            columns: ["REPOSITORY_NAME", "NO_OF_PATCHES", "CHURNS"],
            data: [],
            redirect: false,
            selectRepository: null,
            parentComponentType: null,
            value: ''
        };
    }

    // handleClick() {
    //     this.setState({ //the error happens here
    //         FirstName: 'Amila'
    //     });
    //     var repos = [];
    //     axios.get('http://localhost:9090/hello')
    //         .then(response => {
    //             console.log(response);
    //             console.log(response.data);
    //             props = response.data;
    //             repos = response.data;
    //
    //         });
    //
    //
    // }


    componentWillMount() {
        console.log("Repo display props", this.props, this.props.parentComponentType);
        this.setState({
            parentComponentType: this.props.parentComponentType ? this.props.parentComponentType : null,
            value: this.props.value ? this.props.value : ''
        });
    }

    onSetRedirect = repository => () => {
        //console.log('event repo', e);
        console.log('dsdsssddsdsdddsds', repository);
        this.setState({
            redirect: true,
            selectRepository: repository
        })
    };

    renderRedirect = () => {
        if (this.state.redirect) {
            console.log("repo 123 : ", this.state.selectRepository)
            let url = `/repository/${this.state.selectRepository.REPOSITORY_NAME}`;
            return <Redirect to={`/repository/${this.state.selectRepository.REPOSITORY_NAME}?product=all`}/>
        }
    };


    handleClick = (e, {name}) => {
        this.setState({activeItem: name});
        axios.get('http://localhost:9090/repository')
            .then(response => {
                console.log(response);
                console.log(response.data);

                this.setState({repositories: response.data});

            });
    };


    retrieveRepositories = (sortColumn, sortDir, pageIndex, pageSize) => {
        console.log('ABC ', sortColumn, sortDir, pageSize, pageIndex);
        let pathParam = this.state.parentComponentType ? this.state.parentComponentType + '/' + this.state.value : '';
        axios.get(`http://${config.backendServer.host}:${config.backendServer.port}/repository/${pathParam}?pageIndex=` + pageIndex + '&pageSize=' + pageSize + '&sortColumn=' + sortColumn + '&sortDir=' + sortDir)
            .then(response => {
                console.log(response);
                console.log(response.data);

                this.setState({repositories: response.data});
                this.repositoryTable.setStateProp(this.state.repositories);


            });
    };


    render() {
        return (
            <div style={{
                marginTop: this.state.product === "all" ? '20px' : '10px'
            }}>
                {this.renderRedirect()}
                <h2 style={{
                    marginLeft: '50px'
                }}>Repositories</h2>
                <div>
                    <TableComponent
                        headers={this.state.headers}
                        sortable={true}
                        selectable={true}
                        columns={this.state.columns}
                        sortColumn={this.state.columns[0]}
                        onUpdateRecords={this.retrieveRepositories}
                        onCellClick={this.onSetRedirect}
                        ref={instance => this.repositoryTable = instance}
                    />
                </div>
            </div>
        );
    }
}