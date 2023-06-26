import React, {useEffect, useState} from 'react';
import '../App.css';
import axios from "axios";
import MemberRowList from "./MemberRowList";

function MemberList(props) {
    const [mlist,setMlist]=useState([]);
    const getList = () =>{
        axios.get("/member/list")
            .then(res=>{
                setMlist(res.data);
            })
    }
    useEffect(()=>{
        getList();
    },[])

    //삭제
    const deleteMember=(num)=>{
        const url="/member/delete?num="+num;
        axios.delete(url)
            .then(res=>{
                getList();
            })
    }
    return (
        <div>
            <h4>총 회원수 : {mlist.length}명</h4>
                    <table className={'table table-bordered'} style={{width:'600px'}}>
                        <tr style={{backgroundColor:'#ddd'}}>
                            <th style={{width:'40px'}}>번호</th>
                            <th style={{width:'60px'}}>회원명</th>
                            <th style={{width:'80px'}}>아이디</th>
                            <th style={{width:'150px'}}>주소</th>
                            <th style={{width:'100px'}}>가입일</th>
                            <th style={{width:'50px'}}>삭제</th>
                        </tr>
                        {
                            mlist.map((row,idx)=><MemberRowList key={idx} row={row} idx={idx}
                            onDelete={deleteMember}/>)
                        }
                    </table>
        </div>
    );
}

export default MemberList;