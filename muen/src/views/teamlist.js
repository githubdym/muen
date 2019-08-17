import React, { Component } from 'react'
import {get,post } from '../request/index'
import { Pagination , Icon, Modal} from 'antd';
import '../css/team.css'
export default class TeamList extends Component {
    state={
        groupList:[],
        visible: false,
        leaderUserName:'',
        groupPersonNum:0,
        groupName:'',
        modalType:1,
        currentId:0,
    }
    render() {
        let {groupList,leaderUserName,groupName,groupPersonNum}=this.state
        return (
            <div className='teamList'>
                <div className='header'>
                    <h3>全部小组</h3>  
                    <p onClick={()=>{
                          this.showModal();
                          this.setState({
                            modalType:1
                          })
                    }}>添加小组</p>
                </div>
               
                <p><span>全选</span><span className='on' onClick={()=>{
                    
                }}>删除</span></p>
                <div className='team-con'>  
                {
                    groupList&&groupList.map((item,i)=>
                    <div key={i} className='teamBox'>
                        <b> {item.groupName}</b>
                       <Icon type="edit" theme="filled" style={{fontSize: 24,color:'blue'}}  
                       className='icon' onClick={
                           ()=>{
                             
                            this.showModal();
                            this.setState({
                              modalType:2,
                              currentId:item.groupId
                             })
                           }
                       } />
                       <Icon type="delete" theme="filled" style={{fontSize: 24,color:'red'}}
                       className='icon' onClick={this.delTeam.bind(this,item.groupId)}/>
                    </div>
                    )
                }
                </div> 
                <Modal
                    title="小组内容"
                    visible={this.state.visible}
                    onOk={this.state.modalType===1?this.addTeam.bind(this):this.editTeam.bind(this)}         
                    onCancel={this.hideModal}
                    okText="确认"
                    cancelText="取消"
                >
                <p><label>小组名称：</label><input value={groupName}  onChange={(e)=>{this.setState({groupName:e.target.value})}}/></p>
                <p><label>上限人数：</label><input value={groupPersonNum}  onChange={(e)=>{this.setState({groupPersonNum:e.target.value})}}/></p>
                <p><label>组长用户名：</label><input value={leaderUserName}  onChange={(e)=>{this.setState({leaderUserName:e.target.value})}}/></p>
                </Modal>
               <Pagination simple defaultCurrent={1} total={Math.ceil(groupList.length/6)} />
            </div>
        )
    }
    getGroup(){
        get('/group/list').then(res=>{
            this.setState({
                groupList:res.result
            })   
        })
    }
    componentDidMount(){
       this.getGroup();
    }
    // 弹出框
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
    // 增加
    addTeam(){
        this.setState({
            visible: false,
          });
        post('/group/add',{ 
            groupName:this.state.groupName,
            groupPersonNum: Number(this.state.groupPersonNum),
            leaderUserName: this.state.leaderUserName,
            groupIcon: '' || 'http://img0.imgtn.bdimg.com/it/u=2240033465,1427047201&fm=26&gp=0.jpg',
         }).then(res=>{
             if(res.code===1){
                    this.getGroup();  
                    this.hideModal(); 
             }else{
                 alert("添加失败")
             }
            
        })    
    }
    // 删除
    delTeam(id){
    
        post(' /group/delete',{groupId:id}).then(res=>{
            console.log(res);
            if(res.code===1){
                this.getGroup();  
            }else{
                alert('删除失败')
            }
        })
    }
    // 更改
    editTeam(){
        post('/group/update',{groupId:this.state.currentId,groupName:this.state.groupName,leaderUserName:this.state.leaderUserName,  groupPersonNum: Number(this.state.groupPersonNum)}).then(res=>{
            console.log(res);
            if(res.code===1){
                this.hideModal(); 
                this.getGroup();
                 
            }else{
                alert('修改失败')
            }
        })
    }
}
