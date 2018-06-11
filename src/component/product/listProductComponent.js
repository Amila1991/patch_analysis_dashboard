import React, {Component} from "react";
import {Redirect} from 'react-router-dom';
import axios from "axios/index";
import TableComponent from "../common/tableComponent";
import config from "../../config";


/**
 * @author Amila Karunathilaka
 */


export default class ListProductComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            headers: ["Product name", "No of Patches", "Churn"],
            columns: ["PRODUCT_NAME", "NO_OF_PATCHES", "CHURNS"],
            data: [],
            redirect: false,
            selectProduct: ''
        };
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


    onSetRedirect = product => () => {
        //console.log('event repo', e);
        console.log('dsdsssddsdsdddsds', product);
        this.setState({
            redirect: true,
            selectProduct: product
        })
    };

    renderRedirect = () => {
        if (this.state.redirect) {
            console.log("repo 123 : ", this.state.selectProduct)
            let url = `/product/${this.state.selectProduct.PRODUCT_NAME}`;
            return <Redirect to={`/product/${this.state.selectProduct.PRODUCT_NAME}`}/>
        }
    };


    retrieveProducts = (sortColumn, sortDir, pageIndex, pageSize) => {
        console.log('ABC ', sortColumn, sortDir, pageSize, pageIndex, config);
        axios.get(`http://${config.backendServer.host}:${config.backendServer.port}/product?pageIndex=` + pageIndex + '&pageSize=' + pageSize + '&sortColumn=' + sortColumn + '&sortDir=' + sortDir)
            .then(response => {
                console.log(response);
                console.log(response.data);

                this.setState({products: response.data});
                this.productTable.setStateProp(this.state.products);


            });
    };


    render() {
        return (
            <div style={{
                marginTop: '20px'
            }}>
                <div>
                    {this.renderRedirect()}
                    <h2 style={{
                        marginLeft: '50px'
                    }}>Products</h2>
                    <TableComponent
                        headers={this.state.headers}
                        sortable={true}
                        selectable={true}
                        columns={this.state.columns}
                        sortColumn={this.state.columns[0]}
                        onUpdateRecords={this.retrieveProducts}
                        onCellClick={this.onSetRedirect}
                        ref={instance => this.productTable = instance}
                    />
                </div>
            </div>
        );
    }
}