import React, { Component } from 'react'
import { Radio } from 'antd';
import {get } from '../request/index'
import { Table, Divider } from 'antd';
import '../css/team.css'
import {connect} from 'react-redux'
import {getData} from '../store/reducers/getTeamId'
class UserProtel extends Component {
    state={
        groupId:1003,
        groupNav:[],
        groupList:[],
        teamMember:[],
    }
    render() {
        // let  {groupId,groupList,groupNav}=this.state; 
       console.log(this.state.teamMember);
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
              render: () => (
                <span>
                  <span>编辑</span>
                  <Divider type="vertical" />
                  <span>删除</span>
                </span>
              ),
            },
          ];
   
        return (
            <div>
                    <Radio.Group defaultValue="1003" buttonStyle="solid">
                            <Radio.Button value="1003"  onChange={(e)=>{
                                      this.props.saveID(e.target.value*1)
                            }}> 沐恩小组</Radio.Button>
                            <Radio.Button value="1004"  onChange={(e)=>{
                                   
                                      this.props.saveID(e.target.value*1)

                            }}>祷告小组</Radio.Button>
                            <Radio.Button value="1005"  onChange={(e)=>{
                                    
                                      this.props.saveID(e.target.value*1)

                            }}>查经小组</Radio.Button>
                            <Radio.Button value="1006"  onChange={(e)=>{
                                      this.props.saveID(e.target.value*1)
                            }}>音乐小组</Radio.Button>
                    </Radio.Group>
                    <p>   <span>+ 添加成员</span> <span> 批量操作  </span></p>
            
                    <Table columns={columns} dataSource={this.props.teamMember[0]&&this.props.teamMember[0]} /> <div>
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
    }
    componentWillReceiveProps(nextProps) {
      console.log(nextProps.teamMember[0],22222222);
      this.setState({
        teamMember: nextProps.teamMember[0]
      });
     }
}
export default connect((state)=>{
  return {
        teamMember:state.getTeamId
    }
  },
(dispatch)=>{
  return{
      saveID(data){
        console.log(data,111);
        dispatch(getData(data))
        
      }
  }
})(UserProtel)
