import React, {useState} from 'react';
import '../App.css';
import DaumPostcodeEmbed from "react-daum-postcode";

function MemberForm(props) {
    const [openPostcode, setOpenPostcode] = useState(false);
    const [myid,setMyid]=useState('');
    const [mypass,setMypass]=useState('');
    const [myaddress,setMyaddress]=useState('');
    const [myname,setMyname]=useState('');
    const [idcount,setCount]=useState(0);
    
    const onSubmitEvent=(e)=>{
        e.propertyIsEnumerable();//기본 이벤트 무효화
    }

    return (
        <div>
            <form onSubmit={onSubmitEvent}>
                <table className={'table'} style={{width:'500px'}}>
                    <caption align={'top'}><b>회원가입</b></caption>
                    <tbody>
                        <tr>
                            <th style={{width:'100px',background:'#b0e0e6'}}>이름</th>
                            <td>
                                <input type='text' className={'form-control'} placeholder={'이름입력'} required value={myname}
                                   onChange={(e)=>setMyname(e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <th style={{width:'100px',background:'#b0e0e6'}}>아이디</th>
                            <td>
                                <input type='text' className={'input-group'} placeholder={'ID'} required value={myid}
                                   onChange={(e)=>setMyid(e.target.value)}/>

                                <button className={'btn btn-outline-danger btn-sm'}>중복확인</button>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2} align={"center"}>
                               <button type={'submit'} className={'btn btn-outline-info'} style={{width:'100px'}}>가입하기</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}

export default MemberForm;