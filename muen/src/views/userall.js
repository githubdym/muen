import React, { Component } from 'react'
import { Input } from 'antd';
import { Table, Divider } from 'antd';
import { Modal } from 'antd';
import { get } from '../request/index'
import { Avatar } from "antd"
import { connect } from "react-redux"
import { post } from "../request/index"
import { Alert } from 'antd';
const { Search } = Input;

const rowSelection = {
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User', 
    name: record.name,
  }),
};
class UserAll extends Component {
  state = {
    visible: false,
    userName: "",
    password: "",
    realName: "",
    userType: "",
    phoneNum: "",
    address: "",
    type: "",
    record: {}
  }
  showModal = (record, type) => {
    this.setState({
      visible: true,
      type,
      record
    });

  };
  hideModal = () => {
    this.setState({
      visible: false,
    });

  };
  submit = () => {
    let { type, record } = this.state
    let {realName,userName,password,userType} =this.state
    console.log(type)
    switch (type) {
      case "REPLACE":
      this.hideModal()
        post("/user/update", {
          userId: record.key,
          userName:this.state.userName,
          address: this.state.address,
          realName: this.state.realName,
          password: this.state.password,
          phoneNum: this.state.phoneNum,
          userType: this.state.userType
        }).then(res => {
          console.log(res)
          if (res.code === 1) {
            this.props.replace({
              key: record.key,
              userId: record.key,
              address: this.state.address,
              userName: this.state.userName,
              realName: this.state.realName,
              password: this.state.password,
              phoneNum: this.state.phoneNum,
              userType: this.state.userType,
              userIcon: "http://img.sj33.cn/uploads/allimg/201611/7-1611010T648.jpg"
            })
          }
        })
    
      break;
      case "ADD":
      post('/register',{realName,userName,password,userType})
      .then(res => {
          if(res.code===1){
            this.props.add({
              key: record.key,
              userId: record.key,
              address: this.state.address,
              userName: this.state.userName,
              realName: this.state.realName,
              password: this.state.password,
              phoneNum: this.state.phoneNum,
              userType: this.state.userType,
              userIcon: "http://img.sj33.cn/uploads/allimg/201611/7-1611010T648.jpg"
            })
          }
      });
      this.hideModal()
  
    }
  
  };
  render() {
    let { list } = this.props;
    console.log(this.state.type)
    const columns = [
      {
        title: '用户头像',
        dataIndex: 'userIcon',
        key: 'userIcon',
        render: (key) => {
          return <Avatar src={key} style={{ width: 50, height: 50, background: "#f00" }}></Avatar>
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
        render: (text, record) => {
          return (
            <span>
              <span onClick={() => {
                this.showModal(record)
                this.setState({
                  userName: record.userName,
                  realName: record.realName,
                  userType: record.userType,
                  phoneNum: record.phoneNum
                })
              }}>详情</span>
              <Divider type="vertical" />
              <span onClick={() => {
                this.showModal()
              }}>设置管理</span>
              <Divider type="vertical" />
              <span onClick={() => {
                this.setState({
                  userName: record.userName,
                  realName: record.realName,
                  userType: record.userType,
                  phoneNum: record.phoneNum
                })
                this.showModal(record, "REPLACE")
              }}>修改</span>
              <Divider type="vertical" />
              <span onClick={() => {
                let userId = record.key
                post("/user/delete", { userId }).then(res => {
                  if (res.code === 1) {
                    
                    this.props.remove(userId)
                  }
                })
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
            onSearch={value =>{
              get(`/user/search?input=${value}`).then(res=>{
                if(res.code===1){
                  this.props.changeList(res.result)
                }
              })
            }}
            style={{ width: 200 }}
          />
          <span className='addmember' onClick={() => {
            this.setState({
              type:1
            })
           
              this.showModal("record","ADD")
            this.submit()
          }} >+添加成员</span></div>
        <div className='conBot'>
          <div className='conBotLeft'>
            <h5>全部用户</h5>
            <p>  <span>全选</span> <span>删除</span> </p>
            <Table columns={columns} dataSource={list} rowSelection={rowSelection} />
            <Modal
              title=""
              visible={this.state.visible}
              onOk={this.submit}
              onCancel={this.hideModal}
              okText="确认"
              cancelText="取消"
            >
              <p><label>用户名：</label><input value={this.state.userName} onChange={(e) => { this.setState({ userName: e.target.value }) }}></input></p>
              <p><label>姓名：</label><input value={this.state.realName} onChange={(e) => { this.setState({ realName: e.target.value }) }}></input></p>
              <p><label>密码：</label><input value={this.state.password} onChange={(e) => { this.setState({ password: e.target.value }) }}></input></p>
              <p><label>权限：</label><input value={this.state.userType} onChange={(e) => { this.setState({ userType: e.target.value }) }}></input></p>
              <p><label>电话：</label><input value={this.state.phoneNum} onChange={(e) => { this.setState({ phoneNum: e.target.value }) }}></input></p>
              <p><label>地址：</label><input value={this.state.address} onChange={(e) => { this.setState({ address: e.target.value }) }}></input></p>
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
          phoneNum: item.phoneNum
        })

      })
      this.props.get(newUserList)
    })
  }
}
export default connect(
  (state) => {
    return {
      list: state.userAll
    }

  },
  (dispatch) => {
    return {
      get(newUserList) {
        dispatch({
          type: "GET_LIST",
          data: newUserList
        })
      },
      remove(id) {
        dispatch({
          type: "DEL",
          data: id
        })
      },
      replace(obj) {
        dispatch({
          type: "REPLACE",
          data: obj
        })
      },
      add(obj){
        dispatch({
          type:"ADD",
          data:obj
        })
      },
      changeList(obj){
        dispatch({
          type:"CHANGE_LIST",
          data:obj
        })
      }
    }
  }
)(UserAll)
