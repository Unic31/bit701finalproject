import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import noimage from '../image/noimage.png'

function BoardDetailPage(props) {
    const navi=useNavigate();
    const {num, currentPage} = useParams();
    const [data,setData]=useState('');
    const photoUrl = process.env.REACT_APP_BOARDURL;
    const myid=sessionStorage.myid;
    const loginok=sessionStorage.loginok;

    const list =()=>{
        axios.get("/board/detail?num="+num)
            .then(res=>{
                setData(res.data)
            })
    }
    useEffect(()=>{
        list();
    },[])

    const deleteboard=()=>{
        const b = window.confirm("삭제하시겠습니까?")
        if(b){
            if(myid==data.myid) {
                axios.delete('/board/delete?num=' + num)
                    .then(res => {
                        alert("삭제되었습니다");
                        navi(`/board/list/${currentPage}`);
                    })
            }else{
                alert("다른사람글 삭제x")
            }
        } else {
            return;
        }

    }
    return (
        <div>
            <div> 제목 : {data.subject}</div>
            <div> 작성자 : {data.myname}</div>
            <div> ID : {data&&data.myid.substring(0,2)}****</div>

            {
                data.photo?
                <img style={{width:'200px',height:'200px'}} alt={''} src={`https://kr.object.ncloudstorage.com/bit701-bucket-113/board/${data.photo}`}/>:
                    <img style={{width:'200px',height:'200px'}} alt={''} src={noimage}/>
            }
            <div>글내용 :<pre>{data.content}</pre></div>
            <div> 조회수 : {data.readcount}</div>
            <div> 작성일 : {data&&data.writeday.substring(0,10)}</div>
            <button onClick={()=>{navi("/board/form")}}>글 쓰기</button>
            <button onClick={()=>{navi(`/board/list/${currentPage}`)}}>글 목록</button>
            {
                loginok!=null && myid===data.myid?
                    <button onClick={()=>{
                        navi('/')
                    }}>글 수정</button>
                :
                ''
            }
            {
                loginok!=null && myid===data.myid?
                    <button onClick={deleteboard}>글 삭제</button>
                :
                ''
            }
        </div>
    );
}

export default BoardDetailPage;