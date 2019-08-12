import axios from 'axios';
let request=axios.create({
    baseURL:process.env.NODE_ENV==='production'?'':''
})
request.interceptors.request.use((config)=>{
    config.headers.authorization=
    ` Bearer ${localStorage.getItem('token')}`;
    return config
},(err)=>{
    console.log(err);
})
request.interceptors.response.use((response)=>{
    return response.data;
},(err)=>{
    console.log(err);
})
let get=(url)=>request.get(url);
let post=(url,params)=>request.post(url,params||{});

export {
    get,
    post
}