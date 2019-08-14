import React, { Component } from 'react'
import { Radio } from 'antd';
import {get } from '../request/index'
export default class UserProtel extends Component {
    state={
        groupList:[],
    }
    render() {
        let  {groupList}=this.state; 
        console.log(groupList)
        return (
            <div>
                <div>
                    {/* <Radio.Group defaultValue="a" buttonStyle="solid">
                            <Radio.Button value="a">Hangzhou</Radio.Button>
                        {
                           groupList.forEach(item => {
                                <Radio.Button value="">{item.groupName}</Radio.Button>
                            })
                        }
                    </Radio.Group> */}
                </div>
            </div>
        )
    }
    componentDidMount(){
        get('/group/list').then(res=>{
            this.setState({
                groupList:res.result
            })
            console.log(this.state.groupList)
        })
    }
}
