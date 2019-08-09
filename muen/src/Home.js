import React, { Component } from 'react'
import axios from "axios"
export default class Home extends Component {
    render() {
        return (
            <div>
                这是home页面
            </div>
        )
    }
    componentDidMount(){
        axios.get("api/login").then(res=>{
            console.log(res)
        })   
    }
}
