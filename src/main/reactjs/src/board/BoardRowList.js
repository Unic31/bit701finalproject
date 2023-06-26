import React from 'react';
import {NavLink} from "react-router-dom";
import noimage from '../image/noimage.png'

function BoardRowList(props) {
    const {idx,no,row,currentPage}=props
    return (
        <tr>
            <td>{no-idx}</td>
            <td>
                <NavLink to={`/board/detail/${row.num}/${currentPage}`} style={{textDecoration:'none',color:'black',cursor:'pointer'}}>
                    {row.photo
                    ?
                    <img alt={''} src={`http://ovfjnvwkvfwf16981861.cdn.ntruss.com/board/${row.photo}?type=f&w=40&h=40&faceopt=true&ttype=jpg`}/>
                    :
                    <img alt={''} src={noimage} style={{width:'40px',height:'40px'}}/>}
                    <b>{row.subject}</b>
                </NavLink>
            </td>
            <td>{row.myname}</td>
            <td>{row.writeday.substring(0,10)}</td>
            <td>{row.readcount}</td>
        </tr>
    );
}

export default BoardRowList;