import React, { Component } from 'react'
import { Radio } from 'antd';
import {get } from '../request/index'
import { Table, Divider, Tag } from 'antd';
import '../css/team.css'
export default class UserProtel extends Component {
    state={
        groupId:1003,
        groupNav:[],
        groupList:[]
    }
    render() {
        let  {groupId,groupList,groupNav}=this.state; 
        const columns = [
            {
              title: '用户名',
              dataIndex: 'userName',
              key: 'userName',
            },
            {
              title: '姓名',
              dataIndex: 'realName',
              key: 'realName',
            },
            {
              title: '电话',
              dataIndex: 'phoneNum',
              key: 'phoneNum',
            },
            {
              title: '次数',
              key: 'count',
              dataIndex: 'count',
            },
            {
              title: '操作',
              key: 'action',
              render: (text, record) => (
                <span>
                  <span>编辑</span>
                  <Divider type="vertical" />
                  <span>删除</span>
                </span>
              ),
            },
          ];
      //  console.log(groupList,groupId);
        return (
            <div>
                    <Radio.Group defaultValue="1003" buttonStyle="solid">
                            <Radio.Button value="1003"  onChange={(e)=>{
                                      this.setState({groupId:e.target.value})
                            }}> 沐恩小组</Radio.Button>
                            <Radio.Button value="1004"  onChange={(e)=>{
                                      this.setState({groupId:e.target.value})
                            }}>祷告小组</Radio.Button>
                            <Radio.Button value="1005"  onChange={(e)=>{
                                      this.setState({groupId:e.target.value})
                            }}>查经小组</Radio.Button>
                            <Radio.Button value="1006"  onChange={(e)=>{
                                      this.setState({groupId:e.target.value})
                            }}>音乐小组</Radio.Button>
                    </Radio.Group>
                    <p>   <span>+ 添加成员</span> <span> 批量操作  </span></p>
                    {/* <Table columns={columns} dataSource={} /> */} <div>
                </div>
            </div>
        )
    }
    componentDidMount(){
      get('/group/list').then(res=>{
        this.setState({
            groupNav:res.result
        })
      });
      get(`/group/members?groupId=${this.state.groupId}`).then(res=>{
        this.setState({
         groupList:res.result
       })
    })
       
    }
    componentDidUpdate(){
     
    }
}
