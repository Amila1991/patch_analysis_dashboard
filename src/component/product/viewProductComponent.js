import React, {Component} from "react";
import queryString from 'query-string';
import {Tab, Label, Header, Divider} from 'semantic-ui-react'
import ListRepositoryComponent from "../repository/listRepositoryComponent";
import ListPatchComponent from "../patchComponent/listPatchComponent";
import constant from "../constant/constants"


/**
 * @author Amila Karunathilaka
 */
//
// const panes = [
//     {menuItem: 'Tab 1', render: () => <Tab.Pane attached={false}><ListRepositoryComponent product={'all'}/></Tab.Pane>},
//     {menuItem: 'Tab 2', render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane>},
//     {menuItem: 'Tab 3', render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane>},
// ];


export default class ViewProductComponent extends Component {

    constructor(props) {
        super(props);
        console.log(props);
        console.log(this.props.location.search);
        console.log(queryString.parse(this.props.location.search));
        this.state = {
            headers: ["Repository name", "No of Patches", "Churn"],
            columns: ["REPOSITORY_NAME", "No_of_Patches", "CHURNS"],
            data: [],
            product: ''

        };
    }


    componentWillMount() {
        console.log("viw product display props", this.props, this.props.product);
        this.setState({
            product: this.props.match.params.product
        });
    }


    panes = () => {
        return [
            {
                menuItem: 'Repositories',
                render: () =>
                    <Tab.Pane attached={false}>
                        <ListRepositoryComponent
                            parentComponentType={constant.COMPONENT_TYPE.PRODUCT}
                            value={this.state.product}
                        />
                    </Tab.Pane>
            },
            {
                menuItem: 'Patches',
                render: () =>
                    <Tab.Pane attached={false}>
                        <ListPatchComponent
                            parentComponentType={constant.COMPONENT_TYPE.PRODUCT}
                            value={this.state.product}
                        />
                    </Tab.Pane>
            },
            {menuItem: 'Tab 3', render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane>},
        ];
    };


    render() {
        return (
            <div style={{
                marginTop: '25px',
                marginLeft: '25px',
                marginRight: '25px'
            }}>
                <h2 style={{
                    marginLeft: '50px',
                }}>{this.state.product}</h2>

                <Divider section/>
                {/*<h2>${this.props.match.params.product}</h2><br/>*/}
                <Tab menu={{secondary: true}} panes={this.panes()} attached/>
                {/*{`${this.props.match.params.org}/${this.props.match.params.repo}`}*/}
            </div>
        )
    }
}