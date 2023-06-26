import React, {useState} from 'react';
import '../App.css';
import DaumPostcodeEmbed from "react-daum-postcode";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios";
import {useNavigate} from "react-router-dom";

function MemberForm(props) {
    const [openPostcode, setOpenPostcode] = useState(false);
    const [myid, setMyid] = useState('');
    const [mypass, setMypass] = useState('');
    const [myaddress1, setMyaddress1] = useState('');
    const [myaddress2, setMyaddress2] = useState('');
    const [myname, setMyname] = useState('');
    const [btnok, setBtnok] = useState(false);
    const navi = useNavigate();


    const onSubmitEvent = (e) => {
        e.propertyIsEnumerable();//기본 이벤트 무효화
        if (!btnok) {
            alert("중복확인 버튼을 눌러주세요");
            return;
        }
        axios.post("/member/insert", {myname, myid, mypass, myaddress: `${myaddress1} ${myaddress2}`})
            .then(res => {
                alert("가입되었습니다");
                navi("/login");
            })
    }

    //중복확인 버튼 이벤트
    const btnJungbok=()=>{
        let url="/member/searchid?myid="+myid;
        axios.get(url)
            .then(res=>{
                if(Number(res.data)===0){
                    alert("가입 가능한 아이디입니다.")
                    setBtnok(true);
                }else{
                    alert("이미 가입되어있는 아이디입니다");
                    setMyid('');
                    setBtnok(false);
                }
            })
    }

    //dialog
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        setOpenPostcode(current => !current);
    };

    const handleClose = () => {
        setOpen(false);
        setOpenPostcode(false);
    };

    //주소검색
    // 주소 선택 이벤트
    const handle = {
        // 주소 선택 이벤트
        selectAddress: (data) => {
            console.log(`
                주소: ${data.address},
                아파트명 : ${data.buildingName},
                우편번호: ${data.zonecode}
            `)
            setMyaddress1(`(${data.zonecode})${data.address}${data.buildingName}`)
            setOpen(false);
            setOpenPostcode(false);
        },
    };


    return (
        <div>
            <form onSubmit={onSubmitEvent}>
                <table className={'table'} style={{width: '500px'}}>
                    <caption align={'top'}><b>회원가입</b></caption>
                    <tbody>
                    <tr>
                        <th style={{width: '100px', background: '#b0e0e6'}}>이름</th>
                        <td>
                            <input type='text' className={'form-control'} placeholder={'이름입력'} required value={myname}
                                   onChange={(e) => setMyname(e.target.value)}/>
                        </td>
                    </tr>
                    <tr>
                        <th style={{width: '100px', background: '#b0e0e6'}}>아이디</th>
                        <td className={'input-group'}>
                            <input type='text' className={'form-control'} placeholder={'ID'} required value={myid}
                                   onChange={(e) => {
                                       setMyid(e.target.value)
                                       setBtnok(false);
                                   }}/>

                            <button type={'button'} className={'btn btn-outline-danger btn-sm'} onClick={btnJungbok}>중복확인</button>
                        </td>
                    </tr>
                    <tr>
                        <th style={{width: '100px', background: '#b0e0e6'}}>비밀번호</th>
                        <td>
                            <input type='password' className={'form-control'} placeholder={'비밀번호'} required
                                   value={mypass}
                                   onChange={(e) => {
                                       setMypass(e.target.value)
                                   }}/>
                        </td>
                    </tr>
                    <tr>
                        <th style={{width: '100px', background: '#b0e0e6'}}>주소</th>
                        <td>
                            <div className={'input-group'}>
                                <input type='text' className={'form-control'} placeholder={'주소'} required readOnly
                                       value={myaddress1}/>
                                <button type={'button'} className={'btn btn-sm btn-outline-success'}
                                        onClick={handleClickOpen}>주소검색
                                </button>
                            </div>
                            <div>
                                <input type={"text"} className={'form-control'} value={myaddress2} onChange={(e) => {
                                    setMyaddress2(e.target.value);
                                }} placeholder={'상세주소를 입력해 주세요'}/>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} align={"center"}>
                            <button type={'submit'} className={'btn btn-outline-info'} style={{width: '100px'}}
                                    onClick={btnJungbok}>가입하기
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>

            {/*dialog*/}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    우편번호검색
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {openPostcode &&
                            <DaumPostcodeEmbed
                                onComplete={handle.selectAddress}  // 값을 선택할 경우 실행되는 이벤트
                                autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                                defaultQuery='행운1길 3' // 팝업을 열때 기본적으로 입력되는 검색어
                            />}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleClose} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default MemberForm;