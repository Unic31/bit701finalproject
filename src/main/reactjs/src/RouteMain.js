import React from 'react';
import {Route, Routes} from "react-router-dom";
import {Home, Menu} from "./components";
import {LoginForm, MemberForm, MemberList} from "./member";
import {BoardDetailPage, BoardForm, BoardList} from "./board";
import noimage from './image/noimage.png'
import {Logout} from "@mui/icons-material";


function RouteMain(props) {

    return (
        <div>
            <Menu/>
            <br style={{clear:'both'}}/><br/>
            <Routes>



                <Route path={'/'} element={<Home/>}/>
                <Route path={'/login'} element={<LoginForm/>}/>

                <Route path={'/member'}>
                    <Route path={'form'} element={<MemberForm/>}/>
                    <Route path={'list'} element={<MemberList/>}/>
                </Route>

                <Route path={'/board'}>
                    <Route path={'form'} element={<BoardForm/>}/>
                    <Route path={'list'} element={<BoardList/>}/>
                    <Route path={'list/:currentPage'} element={<BoardList/>}/>
                    <Route path={'detail/:num/:currentPage'} element={<BoardDetailPage/>}/>
                </Route>

                <Route path={'*'} element={
                    <div>
                        <h1>잘못된 url 주소입니다</h1>
                        <br/><br/>
                        <img alt={''} src={noimage}/>
                    </div>


                }/>




            </Routes>
        </div>
    );
}

export default RouteMain;