import React, {Component} from 'react';
import {Icon, Menu, Image} from 'semantic-ui-react';
import {Link} from 'react-router-dom'
import logo from '../../../resources/WSO2_Software_Logo.png';

export default class MenuBarComponent extends Component {

    constructor(props) {
        super(props);
        console.log('menu props', props, props.location);
        this.state = {activeItem: ''};
    }


    handleItemClick = (e, {name}) => {
        this.setState({activeItem: name})
    };

    setActiveItem = name => () => {
        this.setState({activeItem: name})
    };

    render() {
        return (
            <Menu size='massive' color={'grey'} inverted>
                <Menu.Item icon={<Image src={logo} size='tiny'/>}>

                </Menu.Item>
                <Menu.Item name='repository' color={'orange'} onClick={this.handleItemClick}
                           active={this.state.activeItem === 'repository'} as={Link} to='/repository'>
                    Repository
                </Menu.Item>
                <Menu.Item name='product' color={'orange'} onClick={this.handleItemClick}
                           active={this.state.activeItem === 'product'} as={Link} to='/product'>
                    Product
                </Menu.Item>
                <Menu.Item name='patch' color={'orange'} onClick={this.handleItemClick}
                           active={this.state.activeItem === 'patch'} as={Link} to='/patch'>
                </Menu.Item>

                <Menu.Item name='client' color={'orange'} onClick={this.handleItemClick}
                           active={this.state.activeItem === 'client'}>
                    Client
                </Menu.Item>
            </Menu>

        );
    }
}
