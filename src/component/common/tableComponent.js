import React, {Component} from "react";
import {Icon, Select, Menu, Table, Grid} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import PropTypes from "prop-types";

/**
 * @author Amila Karunathilaka
 */

export default class TableComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            headers: [],
            columns: [],
            data: [],
            sortColumn: '',
            sortDir: 0,
            sortable: false,
            selectable: false,
            pageIndex: 1,
            pageSize: 25
        };
    }

    componentWillMount() {
        console.log("display props", this.props);
        this.setState({
            headers: this.props.headers,
            columns: this.props.columns ? this.props.columns : [],
            sortColumn: this.props.sortColumn ? this.props.sortColumn : (this.props.columns ? this.props.columns[0] : ''),
            sortable: this.props.sortable ? this.props.sortable : false,
            selectable: this.props.selectable ? this.props.selectable : false,
            sortDir: isNaN(this.props.sortDir) ? 0 : this.props.sortDir,
            data: this.props.data ? this.props.data : []
        }, () => {
            this.onUpdateTable(this.state.sortColumn, this.state.sortDir, this.state.pageIndex, this.state.pageSize)
        });

        console.log('props', this.state.sortColumn, this.state.sortDir, this.state.pageIndex, this.state.pageSize, this.state.headers, this.props.sortColumn);
        //this.onUpdateTable(this.state.sortColumn, this.state.sortDir, this.state.pageIndex, this.state.pageSize);
    }


    onUpdateTable = (sortColumn, sortDir, pageIndex, pageSize) => {
        this.props.onUpdateRecords(sortColumn, sortDir, pageIndex, pageSize);
    };

    onPaginationNoClick = (e, {name}) => {
        let index = parseInt(name);
        console.log('new index', name);
        this.setState({pageIndex: index}, () => {
            this.onUpdateTable(this.state.sortColumn, this.state.sortDir, this.state.pageIndex, this.state.pageSize);
        });
    };

    onPaginationNextClick = (e) => {
        let pageIndex = this.state.pageIndex + 1;
        this.setState({pageIndex: pageIndex});
        this.onUpdateTable(this.state.sortColumn, this.state.sortDir, pageIndex, this.state.pageSize);
    };

    onPaginationPreviousClick = (e) => {
        let pageIndex = this.state.pageIndex - 1;
        this.setState({pageIndex: pageIndex});
        this.onUpdateTable(this.state.sortColumn, this.state.sortDir, pageIndex, this.state.pageSize);
    };

    onChangePageSize = (e, {value}) => {
        console.log('change page Size', e, value);
        this.setState({
            pageSize: value
        }, () => {
            this.onUpdateTable(this.state.sortColumn, this.state.sortDir, this.state.pageIndex, this.state.pageSize);
        });

    };

    onSortClick = column => () => {
        console.log('change sort column', column, this.state.sortColumn);

        this.setState({
            sortColumn: this.state.sortColumn !== column ? column : this.state.sortColumn,
            sortDir: this.state.sortColumn !== column ? 0 : (this.state.sortDir + 1) % 2,
            pageIndex: 1,
        }, () => {
            this.onUpdateTable(this.state.sortColumn, this.state.sortDir, this.state.pageIndex, this.state.pageSize)
        });
        // if (this.state.sortColumn !== column) {
        //     this.setState({
        //         sortColumn: column,
        //         sortDir: 0
        //     }, () => {this.onUpdateTable(this.state.sortColumn, this.state.sortDir, this.state.pageIndex, this.state.pageSize)});
        // } else {
        //     this.setState({
        //         sortDir: (this.state.sortDir + 1) % 2
        //     }, () => {this.onUpdateTable(this.state.sortColumn, this.state.sortDir, this.state.pageIndex, this.state.pageSize)});
        // }

        // this.onUpdateTable(this.state.sortColumn, this.state.sortDir, this.state.pageIndex, this.state.pageSize);
    };

    setStateProp = (data) => {
        console.log('data', data);
        if (data.length > 0) {
            this.setState({
                data: data
            });
        } else if (this.state.pageIndex > 0) {
            this.setState(
                {
                    pageIndex: this.state.pageIndex - 1
                }, () => {
                    this.onUpdateTable(this.state.sortColumn, this.state.sortDir, this.state.pageIndex, this.state.pageSize);
                });
        }
    };

    generatePagination = () => {
        console.log("A", this.state.pageIndex);
        if (this.state.pageIndex >= 4) {
            console.log("B");
            return (
                <Menu floated='right' pagination>
                    <Menu.Item as='a' onClick={this.onPaginationPreviousClick} icon>
                        <Icon name='chevron left'/>
                    </Menu.Item>
                    <Menu.Item name={(this.state.pageIndex - 2).toString()} as='a' onClick={this.onPaginationNoClick}
                               active={this.state.pageIndex === this.state.pageIndex - 2}>{this.state.pageIndex - 2}</Menu.Item>
                    <Menu.Item name={(this.state.pageIndex - 1).toString()} as='a' onClick={this.onPaginationNoClick}
                               active={this.state.pageIndex === this.state.pageIndex - 1}>{this.state.pageIndex - 1}</Menu.Item>
                    <Menu.Item name={this.state.pageIndex.toString()} as='a' onClick={this.onPaginationNoClick}
                               active={this.state.pageIndex === this.state.pageIndex}>{this.state.pageIndex}</Menu.Item>
                    {this.state.data.length >= this.state.pageSize &&
                    <Menu.Item name={(this.state.pageIndex + 1).toString()} as='a' onClick={this.onPaginationNoClick}
                               active={this.state.pageIndex === this.state.pageIndex + 1}>{this.state.pageIndex + 1}</Menu.Item>}
                    {this.state.data.length >= this.state.pageSize &&
                    <Menu.Item as='a' onClick={this.onPaginationNextClick} icon>
                        <Icon name='chevron right'/>
                    </Menu.Item>}
                </Menu>);
        } else {
            console.log("C");
            return (
                <Menu floated='right' pagination>
                    {this.state.pageIndex > 1 && <Menu.Item as='a' onClick={this.onPaginationPreviousClick} icon>
                        <Icon name='chevron left'/>
                    </Menu.Item>}
                    <Menu.Item name={"1"} as='a' onClick={this.onPaginationNoClick}
                               active={this.state.pageIndex === 1}>1</Menu.Item>
                    {(this.state.data.length >= this.state.pageSize || this.state.pageIndex >= 2) &&
                    <Menu.Item name={"2"} as='a' onClick={this.onPaginationNoClick}
                               active={this.state.pageIndex === 2}>2</Menu.Item>}
                    {(this.state.data.length >= this.state.pageSize || this.state.pageIndex >= 3) &&
                    <Menu.Item name={"3"} as='a' onClick={this.onPaginationNoClick}
                               active={this.state.pageIndex === 3}>3</Menu.Item>}
                    {(this.state.data.length >= this.state.pageSize || this.state.pageIndex >= 4) &&
                    <Menu.Item name={"4"} as='a' onClick={this.onPaginationNoClick}
                               active={this.state.pageIndex === 4}>4</Menu.Item>}
                    {this.state.data.length >= this.state.pageSize &&
                    <Menu.Item as='a' onClick={this.onPaginationNextClick} icon>
                        <Icon name='chevron right'/>
                    </Menu.Item>}
                </Menu>
            );
        }
    };

    render() {
        const {sortable, selectable, headers, data, columns, sortColumn, sortDir, pageSize} = this.state;
        let options = [{key: 10, value: 10, text: '10', selected: true}, {key: 25, value: 25, text: '25'}, {
            key: 50,
            value: 50,
            text: '50'
        }, {key: 100, value: 100, text: '100'}];
        console.log('sortable', sortable);
        return (
            <div style={{
                marginLeft: '50px',
                marginRight: '50px'
            }}>
                <Table selectable={selectable} sortable={sortable} celled>
                    <Table.Header>
                        <Table.Row>
                            {headers.map((value, index) => {
                                console.log('index', index);
                                return (<Table.HeaderCell key={index}
                                                          sorted={sortColumn === columns[index] ? sortDir === 1 ? 'descending' : 'ascending' : null}
                                                          onClick={this.onSortClick(this.state.columns[index])}>{value}</Table.HeaderCell>)
                            })}
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {data.map((row, rowIndex) => {
                            return (
                                <Table.Row key={rowIndex}>
                                    {/* {Object.keys(row).map((key, columnIndex) => {
                                        console.log(key, row);
                                        return (<Table.Cell key={columnIndex} onClick={this.props.onCellClick ? this.props.onCellClick(row[Object.keys(row)[0]]) : () => void(0)}>{row[key]}</Table.Cell>)
                                    })}*/}
                                    {columns.map((key, columnIndex) => {
                                        console.log(key);
                                        return (<Table.Cell key={columnIndex}
                                                            onClick={this.props.onCellClick ? this.props.onCellClick(row) : () => void(0)}>{row[key]}</Table.Cell>)
                                    })}
                                </Table.Row>
                            )
                        })}
                    </Table.Body>

                    <Table.Footer fullWidth>
                        <Table.Row>
                            {/*<Table.HeaderCell colSpan={columns.length-1}>*/}
                            {/*<Grid>*/}
                            {/*<Grid.Column floated='left' width={columns.length-1}>*/}
                            {/*<div>*/}
                            {/*<h5>{'Item per Page '}*/}
                            {/*<Select placeholder='Item per Page' defaultValue={pageSize} onChange={this.onChangePageSize} options={options} upward compact />*/}
                            {/*</h5>*/}
                            {/*</div>*/}
                            {/*</Grid.Column>*/}
                            {/*</Grid>*/}
                            {/*</Table.HeaderCell>*/}
                            <Table.HeaderCell colSpan={columns.length}>
                                <h5>{'Item per Page '}
                                <Select placeholder='Item per Page' defaultValue={pageSize}
                                        onChange={this.onChangePageSize} options={options} upward compact/>

                                {this.generatePagination()}
                                </h5>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
            </div>
        );
    }
}


TableComponent.protoTypes = {
    headers: PropTypes.array.isRequired,
    sortable: PropTypes.bool.isRequired,
    selectable: PropTypes.bool.isRequired,
    columns: PropTypes.array,
    sortColumn: PropTypes.string,
    sortDir: PropTypes.number,
    onCellClick: PropTypes.func,
    onUpdateRecords: PropTypes.func.isRequired
};





