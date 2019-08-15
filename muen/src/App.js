import React from 'react';
import 'antd/dist/antd.css';
import {BrowserRouter} from "react-router-dom"
import RouterView from "./router/routerview"
import routers from "./router/routerconfig"
import {Provider} from "react-redux"
import Store from "./store/index.js"
function App() {
  return (
    <div className="App">
    <Provider store={Store}>
        <BrowserRouter>
            <RouterView routers={routers}></RouterView>
        </BrowserRouter>  
      </Provider> 
    </div>
  );
}

export default App;
