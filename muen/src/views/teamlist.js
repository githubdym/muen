import React, { Component } from 'react'
import {get } from '../request/index'

export default class TeamList extends Component {
    state={
        groupList:[],
    }
    render() {
        let {groupList}=this.state
        console.log(this.state.groupList);
        return (
            <div>
                
                {
                    groupList&&groupList.map((item,i)=>
                    <div key={i}> {item.groupName} </div>
                    )
                }
               
            </div>
        )
    }
    componentDidMount(){
        get('/group/list').then(res=>{
            console.log(res.result)
            this.setState({
                groupList:res.result
            })
           
           
        })
    }
}
