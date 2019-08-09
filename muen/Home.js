import React, { Component } from 'react'
<<<<<<< HEAD
import { Menu, Icon } from 'antd';
import "./css/home.css"
const { SubMenu } = Menu;

=======
// import axios from "axios"
>>>>>>> 30c21ff59a7f4fb38995137760867b89c6d330bb
export default class Home extends Component {
    state = {
        collapsed: false,
    };
    toggleCollapsed = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        })
    }
    render() {
        return (
<<<<<<< HEAD
            <div className="home">
                <div className="nav">
                <Menu
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={this.state.collapsed}
                >   
                    <SubMenu
                        key="sub1"
                        title={
                            <span>
                                <Icon type="mail" />
                                <span >用户管理</span>
                            </span>
                        }
                    >
                        
                        <Menu.Item key="6" onClick={()=>{
                                    this.props.history.push("/userAll")
                                }}>所有用户</Menu.Item>
                      
                    </SubMenu>
                    <SubMenu
                        key="sub2"
                        title={
                            <span>
                                <Icon type="appstore" />
                                <span >小组管理</span>
                            </span>
                        }
                    >
                        <Menu.Item key="9" ><span onClick={()=>{
                                    this.props.history.push("/teamList")
                                }}>小组列表</span></Menu.Item>
                        <Menu.Item key="10"><span onClick={()=>{
                                    this.props.history.push("/userProtel")
                                }}>成员管理</span></Menu.Item>
                      
                    </SubMenu>
                </Menu>
            </div>
            
            
=======
            <div>

>>>>>>> 30c21ff59a7f4fb38995137760867b89c6d330bb
            </div>
     
        )
    }
<<<<<<< HEAD
=======
    componentDidMount(){
     
    }
>>>>>>> 30c21ff59a7f4fb38995137760867b89c6d330bb
}
