import React, { Component } from 'react'
import { Input } from 'antd';
import { Table, Divider } from 'antd';
import { Modal } from 'antd';
import { get } from '../request/index'
import {Avatar} from "antd"
const { Search } = Input;

const rowSelection = {
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};
 class UserAll extends Component {
    state = {
    userList: [],
    visible: false ,
    userName:"",
    passWord:"",
    realName:"",
    userType:"",
    phoneNum:"",
    address:""
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  hideModal = () => {
    this.setState({
      visible: false,
    });
  };
  render() {
    let { userList } = this.state;
    const columns = [
      {
        title: '用户头像',
        dataIndex: 'userIcon',
        key: 'userIcon',
        render:(key) =>{
          return <Avatar src={key} style={{width:50,height:50,background:"#f00"}}></Avatar>
        }
      }, 
      {
        title: '用户名',
        dataIndex: 'userName',
        key: 'userName',
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: (text,record) =>{
          return(
            <span>
               <span onClick={()=>{
                    this.showModal()
                    console.log(record)
                    this.setState({
                      userName:record.userName,
                      realName:record.realName,
                      userType:record.userType,
                      phoneNum:record.phoneNum
                    })
                    console.log(this.state.userName)
               }}>详情</span>
               <Divider type="vertical" />
               <span onClick={()=>{
                    this.showModal()
               }}>设置管理</span>
               <Divider type="vertical" />
              <span onClick={()=>{
                    this.showModal()
               }}>修改</span>
              <Divider type="vertical" />
              <span onClick={()=>{
                    this.showModal()
               }}>删除</span>
          </span>
          )
    
        } 
      },
    ]    
    return (
      <div >
        <div className='conTop'>
          <Search
            placeholder="用户昵称/姓名、电话"
            onSearch={value => console.log(value)}
            style={{ width: 200 }}
          />
          <span className='addmember'>+添加成员</span></div>
        <div className='conBot'>
          <div className='conBotLeft'>
            <h5>全部用户</h5>
            <p>  <span>全选</span> <span>删除</span> </p>
            <Table columns={columns} dataSource={userList}  rowSelection={rowSelection}  />
            <Modal
          title="Modal"
          visible={this.state.visible}
          onOk={this.hideModal}
          onCancel={this.hideModal}
          okText="确认"
          cancelText="取消"
        >
          <p><label>用户名：</label><input value={this.state.userName} onChange={(e)=>{this.setState({userName:e.target.value})}}></input></p>
          <p><label>姓名：</label><input value={this.state.realName} onChange={(e)=>{this.setState({realName:e.target.value})}}></input></p>
          <p><label>密码：</label><input value={this.state.passWord} onChange={(e)=>{this.setState({passWord:e.target.value})}}></input></p>
          <p><label>权限：</label><input value={this.state.userType} onChange={(e)=>{this.setState({userType:e.target.value})}}></input></p>
          <p><label>电话：</label><input value={this.state.phoneNum} onChange={(e)=>{this.setState({phoneNum:e.target.value})}}></input></p>
          <p><label>地址：</label><input value={this.state.address} onChange={(e)=>{this.setState({address:e.target.value})}}></input></p>
        </Modal>
          </div>
          <div className='conBotRight'></div>

        </div>
      </div>
    )
 
  }
  
  componentDidMount() {
    get('/user').then(res => {
      let newUserList = [];
      res.result.forEach((item, i) => {
        newUserList.push({
          key: item.userId,
          userName: item.userName,
          userIcon: item.userIcon,
          userType: item.userType,
          realName: item.realName,
          phoneNum:item.phoneNum
        })
        
      })
     
      this.setState({
        userList: newUserList
      })
    })
  }
}
export default UserAll
