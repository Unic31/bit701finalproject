import React from 'react';
import '../App.css';
import {NavLink, useNavigate} from "react-router-dom";

function Menu(props) {
    const username = sessionStorage.getItem('myname');
    const navi=useNavigate();
        return (
            <ul className={'menu'}>
                <li>
                    <NavLink to={"/"}>Home</NavLink>
                </li>
                <li>
                    <NavLink to={"/member/form"}>회원가입</NavLink>
                </li>
                <li>
                    <NavLink to={"/member/list"}>회원목록</NavLink>
                </li>
                <li>
                    <NavLink to={"/board/list/1"}>게시판</NavLink>
                </li>

                    {
                        username=="" || username==null ?
                            <li>
                            <NavLink  to={"/login"}>로그인</NavLink>
                            </li>
                            :
                            <li style={{width:'250px',backgroundColor:'#ddd',cursor:'pointer'}}
                                onClick={()=> {
                                    let b = window.confirm("로그아웃 하시겠습니까?")
                                    if(b) {
                                        sessionStorage.loginok = "no";
                                        sessionStorage.myname = "";
                                        sessionStorage.myid = "";
                                        navi("/")
                                        window.location.reload();
                                    }else{
                                        alert("ㅗ")
                                    }
                            }}>{username}님 로그인중</li>
                    }

            </ul>
        );

}


export default Menu;