import React from 'react';
import Loadable from 'react-loadable'
const Home = Loadable({
    loader: () => import('../Home.js'),
    loading: Loading,
});
const TeamList = Loadable({
    loader: () => import("../views/teamlist"),
    loading: Loading,
});
const UserAll = Loadable({
    loader: () => import("../views/userall"),
    loading: Loading,
});
const UserProte = Loadable({
    loader: () => import('../views/userprotel'),
    loading: Loading,
});
function Loading() {
    return <div> loading ...</div>
}
const routers = [{
    path: "/home",
    component: Home,
    children: [
        {
            path: "/home/teamlist",
            component: TeamList
        },
        {
            path: "/home/userall",
            component: UserAll
        }, {
            path: "/home/userprotel",
            component: UserProte
        },]
}]

export default routers 