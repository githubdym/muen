import React from 'react';
import {Switch,Redirect,Route} from 'react-router-dom';
export default function RouterView(props){

    let {routers}=props;
    let redirectArr=routers&&routers.filter(item=>item.redirect).map((item,i)=>
        <Redirect from={item.path} to={item.redirect} key={i} />
    )

    let routerArr=routers&&routers.filter(item=>!item.redirect)

    return <Switch>
        {
            routerArr.map((item,i)=><Route key={i} path={item.path} render={(props)=>{
               
                return <item.component  children={item.children} {...props} />
            }}  />)
            .concat(redirectArr)
        }
        </Switch>

}