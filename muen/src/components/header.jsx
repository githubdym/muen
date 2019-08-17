import React, { Component } from 'react'

const headerStyle={
    width:'100%',
    height:44,
    display:'flex',
    justifyContent:'flex-end',
    backgroundColor:'#1890ff',
    alignItems: 'center'
    
}
export default class Header extends Component {
    
    render() {
        return (
            <div style={headerStyle}>
                <img src="" alt=""/>
                <p>
                    <button onClick={()=>{
                        window.localStorage.removeItem('token');
                    }}> 退出 </button>
                    <span>修改密码</span>
                </p>
            </div>
        )
    }
}
