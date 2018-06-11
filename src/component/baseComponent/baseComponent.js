import React, { Component } from 'react';
import MenuBarComponent from "./subComponent/menuBarComponent";
import {BrowserRouter, Route} from 'react-router-dom';
import App from "../../App";
import ListRepositoryComponent from "../repository/listRepositoryComponent";
import ListProductComponent from "../product/listProductComponent";
import ViewRepositoryComponent from "../repository/viewRepositoryComponent";
import ViewProductComponent from "../product/viewProductComponent";
import ListMostModifiedJavaClassesComponent
    from "../listMostModifiedJavaClassesComponent/listMostModifiedJavaClassesComponent";
import ViewModifiedJavaClassComponent from "../listMostModifiedJavaClassesComponent/viewModifiedJavaClassComponent";
import ListPatchComponent from "../patchComponent/listPatchComponent";

class BaseComponent extends Component{

    constructor(props) {
        console.log('base props', props, props.location);
        super(props);

    }

    render () {
        return (
            <BrowserRouter>
                <div>
                    <MenuBarComponent/>
                    <Route path="/app" component={App}/>
                    <Route path="/repository/:org/:repo" component={ViewRepositoryComponent}/>
                    <Route path="/repository" component={ListRepositoryComponent}  exact={true}/>
                    <Route path="/product" component={ListProductComponent} exact={true}/>
                    <Route path="/product/:product" component={ViewProductComponent}/>
                    <Route path="/file/mostModifiedJavaClasses" component={ListMostModifiedJavaClassesComponent} exact={true}/>
                    <Route path="/file/mostModifiedJavaClasses/:fileId" component={ViewModifiedJavaClassComponent}/>
                    <Route path="/patch" component={ListPatchComponent}/>

                </div>
            </BrowserRouter>
        );
    }
}

export default BaseComponent;