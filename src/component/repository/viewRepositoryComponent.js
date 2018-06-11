import React, {Component} from "react";
import queryString from 'query-string';
import {Tab, Divider} from 'semantic-ui-react'
import constant from "../constant/constants";
import ListPatchComponent from "../patchComponent/listPatchComponent";
import ListFileComponent from "../file/listFileComponent";


export default class ViewRepositoryComponent extends Component {

    constructor(props) {
        super(props);
        console.log(props);
        console.log(this.props.location.search);
        console.log(queryString.parse(this.props.location.search));
        this.state = {
            headers: ["Repository name", "No of Patches", "Churn"],
            columns: ["REPOSITORY_NAME", "No_of_Patches", "CHURNS"],
            data: [],
            repository: '',

        };
    }

    componentWillMount() {
        console.log("viw product display props", this.props, this.props);
        this.setState({
            repository: `${this.props.match.params.org}/${this.props.match.params.repo}`
        });
    }

    panes = () => {
        return [
            {
                menuItem: 'Patches',
                render: () =>
                    <Tab.Pane attached={false}>
                        <ListPatchComponent
                            parentComponentType={constant.COMPONENT_TYPE.REPOSITORY}
                            value={this.state.repository}
                        />
                    </Tab.Pane>
            },
            {
                menuItem: 'Files',
                render: () =>
                    <Tab.Pane attached={false}>
                        <ListFileComponent
                            parentComponentType={constant.COMPONENT_TYPE.REPOSITORY}
                            value={this.state.repository}
                        />
                    </Tab.Pane>
            },
        ];
    };

    render() {
        return (
            <div style={{
                marginTop: '25px',
                marginLeft: '25px',
                marginRight: '25px'
            }}>
                {/*{`${this.props.match.params.org}/${this.props.match.params.repo}`}*/}
                <h2 style={{
                    marginLeft: '50px',
                }}>{this.state.repository}</h2>

                <Divider section/>
                {/*<h2>${this.props.match.params.product}</h2><br/>*/}
                <Tab menu={{secondary: true}} panes={this.panes()} attached/>
                {/*{`${this.props.match.params.org}/${this.props.match.params.repo}`}*/}
            </div>
        )
    }

}