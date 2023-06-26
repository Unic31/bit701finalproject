package data.controller;

import data.dto.MemberDto;
import data.service.MemberSerive;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@CrossOrigin
@RequestMapping("/member")
@AllArgsConstructor
public class MemberController {
    MemberSerive memberSerive;

    @PostMapping("/insert")
    public void insert(@RequestBody MemberDto dto){

        System.out.println("insert>>"+dto);
        memberSerive.insertMember(dto);
    }

    @GetMapping("/list")
    public List<MemberDto> list(){
        System.out.println("list");
        return memberSerive.getAllMembers();
    }

    @DeleteMapping("/delete")
    public void delete(int num){
        System.out.println("delete>>"+num);
        memberSerive.deleteMember(num);
    }

    @GetMapping("/getname")
    public String getName(String myid){
        System.out.println("getname>>"+myid);
        return memberSerive.getName(myid);
    }
    @GetMapping("/searchid")
    public int searchId(String myid){
        System.out.println("searchid>>"+myid);
        return memberSerive.getSearchId(myid);
    }

    @GetMapping("/login")
    public Map<String, String> login(String myid, String mypass){
        System.out.println("login>>"+myid+","+mypass);
        int n= memberSerive.getLogin(myid, mypass);
        //성공시 가입한 이름도 같이 보낸다
        String myname="";
        if(n==1){
            myname=memberSerive.getName(myid);
        }
        Map<String, String> map = new HashMap<>();
        map.put("success",n==1?"yes":"no");
        map.put("myname",myname);
        return map;
    }

}
