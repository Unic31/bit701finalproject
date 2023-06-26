import React, {useState} from 'react';
import '../App.css';
import {useNavigate} from "react-router-dom";
import axios from "axios";

function LoginForm(props) {
    const [myid,setMyid]=useState('');
    const [mypass,setMypass]=useState('');
    const navi=useNavigate();

    //submit이벤트
    const onSubmitLogin=(e)=>{
        e.preventDefault();
        const url=`/member/login?myid=${myid}&mypass=${mypass}`;
        axios.get(url)
            .then(res=>{
                if(res.data.success==='yes'){
                    /*
                    localStorage: 직접 지우기 전에는 브라우저에 남아있음
                    sessionStroage: 브라우저 종료시 사라짐
                     */
                    sessionStorage.loginok="yes";
                    sessionStorage.myname=res.data.myname;
                    sessionStorage.myid=myid;
                    navi("/");
                    window.location.reload();
                }else{
                    alert("아이디나 비밀번호가 맞지 않습니다")
                    sessionStorage.loginok="no";
                    sessionStorage.myname="";
                    sessionStorage.myid="";
                }
            })
    }
    
    return (
        <div className={'login'}>
            <form onSubmit={onSubmitLogin}>
                <table className={'table table-bordered'}>
                    <tr>
                        <th style={{width:'100px',backgroundColor:'#ddd'}}>아이디</th>
                        <td>
                            <input type={'text'} className={'form-control'} placeholder={'아이디'} required autoFocus value={myid}
                                   onChange={(e)=>setMyid(e.target.value)}/>
                        </td>
                    </tr>
                    <tr>
                        <th style={{width:'100px',backgroundColor:'#ddd'}}>비밀번호</th>
                        <td>
                            <input type={'password'} className={'form-control'} placeholder={'비밀번호'} required autoFocus value={mypass}
                                   onChange={(e)=>setMypass(e.target.value)}/>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} className={'table-danger'} align={'center'}>
                            <button type={'submit'} className={'btn btn-default'} style={{width:'150px'}}>회원로그인</button>
                        </td>
                    </tr>
                </table>
            </form>
        </div>
    );
}

export default LoginForm;