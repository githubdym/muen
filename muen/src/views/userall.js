import React, { Component } from 'react'
import { Input } from 'antd';

import {get} from '../request/index'
const { Search } = Input;


export default class UserAll extends Component {
    state={
      data:[],
    }
    render() {
        return (
            <div >
                <div className='conTop'>
                <Search
                    placeholder="用户昵称/姓名、电话"
                    onSearch={value => console.log(value)}
                    style={{ width: 200 }}
                />
                <span  className='addmember'>+添加成员</span></div>
                <div className='conBot'>
                  <div className='conBotLeft'>
                    <h5>全部用户</h5>
                    <p>  <span>全选</span> <span>删除</span> </p>

                    
                      <ul>
                        {
                          this.state.data&&this.state.data.map((item,i)=>
                          <li key={i}>
                                <input type='checkbox'/> 
                                {/* <img src=''/> */}
                                <b> {item.userName} </b>
                                <span>详情</span>
                                <span>设置管理</span>
                                <span>编辑</span>
                                <span>删除</span>

                            </li>
                          )
                        }
                       
                      </ul>
                      
                    </div>  
                  <div className='conBotRight'></div>  

                </div>
            </div>
        )
    }
    componentDidMount(){
        get('/user').then(res=>{
          this.state.data=res.result;
          console.log( this.state.data)
      })
    }
}
