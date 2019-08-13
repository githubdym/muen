import React, { Component } from 'react'
import { Input } from 'antd';
import { Table, Divider, Tag } from 'antd';
import { get,post } from '../request/index'
const { Search } = Input;

const columns = [
  {
    title: '用户头像',
    dataIndex: 'userIcon',
    key: 'userIcon',
    render:(key) =>{
      return <img src={key} alt='' style={{width:50,height:50}}/>
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
    render: (text) =>{
      return(
        <span>
           <a href="">详情</a>
           <Divider type="vertical" />
           <a href="javascript:;">设置管理</a>
           <Divider type="vertical" />
          <a href="javascript:;">修改</a>
          <Divider type="vertical" />
          <a href="javascript:;">删除</a>
      </span>
      )

    } 
  },
]
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};
export default class UserAll extends Component {
  state = {
    userList: [],
  }
  render() {
    let { userList } = this.state;
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
