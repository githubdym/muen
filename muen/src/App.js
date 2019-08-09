import React from 'react';
import 'antd/dist/antd.css';
import {BrowserRouter} from "react-router-dom"
import RouterView from "./router/routerview"
import routers from "./router/routerconfig"
function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <RouterView routers={routers}></RouterView>
        </BrowserRouter>   
    </div>
  );
}

export default App;
