import React, { Component } from 'react'
import { Menu, Icon,} from 'antd';
import RouterView from "./router/routerview"
import "./css/home.css"
import Header from './components/header'
const { SubMenu } = Menu;
export default class Home extends Component {
    state = {
        collapsed: false,
    };
    toggleCollapsed = () => {
        // this.setState({
        //     collapsed: !this.state.collapsed,
        // })
    }
    render() {
        return (
        <div>   
            <Header />  
            <div className="home">
              
                <div className="nav">
                <Menu
                    defaultSelectedKeys={['1']}
                    // defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="light"
                    // inlineCollapsed={this.state.collapsed}
                >   
                    <SubMenu
                        title={
                            <span>
                               <Icon type="home" />
                                <span >用户管理</span>
                            </span>
                        }
                    >
                        
                        <Menu.Item key="6" onClick={()=>{
                                    this.props.history.push("/home/userAll")
                                }}>所有用户</Menu.Item>
                      
                    </SubMenu>
                    <SubMenu
                        title={
                            <span>
                               <Icon type="team" />
                                <span>小组管理</span>
                            </span>
                        }
                    >
                        <Menu.Item key="9" ><span onClick={()=>{
                                    this.props.history.push("/home/teamList")
                                }}>小组列表</span></Menu.Item>
                        <Menu.Item key="10"><span onClick={()=>{
                                    this.props.history.push("/home/userProtel")
                                }}>成员管理</span></Menu.Item>
                      
                    </SubMenu>
                </Menu>
                
            </div>
                <div className="content">
                    <RouterView routers={this.props.children}></RouterView>
                </div>
            </div>
         </div>
     
        )
    }
}
